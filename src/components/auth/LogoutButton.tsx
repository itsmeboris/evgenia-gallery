'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

interface LogoutButtonProps {
  showConfirmation?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LogoutButton({
  showConfirmation = false,
  variant = 'ghost',
  size = 'md',
  className = '',
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    if (showConfirmation) {
      const confirmed = confirm('Are you sure you want to log out?')
      if (!confirmed) return
    }

    setIsLoading(true)

    try {
      if (supabase) {
        await supabase.auth.signOut()
      }
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? 'Logging out...' : 'Log out'}
    </Button>
  )
} 