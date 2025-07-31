'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LogoutButton } from './LogoutButton'
import type { User } from '@supabase/supabase-js'

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // If Supabase is not configured, just show the sign in link
    if (!supabase) {
      setLoading(false)
      return
    }

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
    )
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-gray-700 hover:text-turquoise-600 transition-colors"
      >
        Sign in
      </Link>
    )
  }

  // Check if user is admin based on email or metadata
  const isAdmin = user.email === 'evgenia@evgeniaportnov.com' || user.user_metadata?.role === 'admin'

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-turquoise-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.email?.[0]?.toUpperCase() || 'U'}
          </span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-700">{user.email}</p>
          {isAdmin && (
            <p className="text-xs text-turquoise-600">Admin</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {isAdmin && (
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-turquoise-600 transition-colors"
          >
            Dashboard
          </Link>
        )}
        <LogoutButton size="sm" />
      </div>
    </div>
  )
}