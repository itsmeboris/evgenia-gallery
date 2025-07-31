'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import type { User } from '@supabase/supabase-js'

interface AuthStatusProps {
  className?: string
  hideDashboardButton?: boolean
}

interface UserProfile {
  id: string
  email: string
  full_name?: string
  role: 'visitor' | 'collector' | 'admin'
}

export function AuthStatus({ className, hideDashboardButton = false }: AuthStatusProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUserAndProfile = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }

      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          // Fetch user profile
          const { data: userProfile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          setProfile(userProfile)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUserAndProfile()

    // Listen for auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user ?? null)
          if (event === 'SIGNED_OUT') {
            setProfile(null)
            router.refresh()
          } else if (session?.user) {
            // Fetch profile for new user
            supabase
              .from('user_profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
              .then(({ data }) => setProfile(data))
          }
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [supabase, router])

  const handleSignOut = async () => {
    if (!supabase) return

    setIsLoggingOut(true)
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className={className}>
        <div className="animate-pulse">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!supabase) {
    return null // Don't show auth status if Supabase is not configured
  }

  if (!user) {
    return (
      <div className={className}>
        <Link href="/login">
          <Button variant="secondary" size="sm">
            Sign In
          </Button>
        </Link>
      </div>
    )
  }

  // Get display name - prefer full name, fallback to email
  const displayName = profile?.full_name || user.email
  const isAdmin = profile?.role === 'admin'

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          Welcome, {displayName}
        </span>
        {isAdmin && !hideDashboardButton && (
          <Link href="/admin/dashboard">
            <Button variant="secondary" size="sm">
              Dashboard
            </Button>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Signing out...' : 'Sign Out'}
        </Button>
      </div>
    </div>
  )
}