import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export type UserRole = 'visitor' | 'collector' | 'admin'

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  role: UserRole
  created_at: string
  updated_at: string
}

/**
 * Get the current authenticated user and their profile
 * Returns null if not authenticated or if Supabase is not configured
 */
export async function getCurrentUser(): Promise<{ user: User; profile: UserProfile | null } | null> {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return null
    }

    // Get user profile with role information
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      // Profile might not exist yet, create default visitor profile
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || null,
          role: 'visitor'
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating user profile:', createError)
        return { user, profile: null }
      }

      return { user, profile: newProfile }
    }

    return { user, profile }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Require authentication for a page/component
 * Redirects to login if not authenticated
 */
export async function requireAuth(): Promise<{ user: User; profile: UserProfile }> {
  const result = await getCurrentUser()

  if (!result || !result.user) {
    redirect('/login')
  }

  if (!result.profile) {
    throw new Error('User profile not found')
  }

  return { user: result.user, profile: result.profile }
}

/**
 * Require admin role for a page/component
 * Redirects to login or home page if not authorized
 */
export async function requireAdmin(): Promise<{ user: User; profile: UserProfile }> {
  const { user, profile } = await requireAuth()

  if (profile.role !== 'admin') {
    redirect('/')
  }

  return { user, profile }
}

/**
 * Check if user has specific role
 */
export async function hasRole(role: UserRole): Promise<boolean> {
  const result = await getCurrentUser()
  return result?.profile?.role === role
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  updates: Partial<Pick<UserProfile, 'full_name' | 'role'>>
): Promise<UserProfile | null> {
  try {
    const supabase = await createClient()
    const { user } = await requireAuth()

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
    return null
  }
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<UserProfile[]> {
  await requireAdmin()

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error getting all users:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error getting all users:', error)
    return []
  }
}

/**
 * Update user role (admin only)
 */
export async function updateUserRole(userId: string, role: UserRole): Promise<boolean> {
  await requireAdmin()

  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('user_profiles')
      .update({ role })
      .eq('id', userId)

    if (error) {
      console.error('Error updating user role:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error updating user role:', error)
    return false
  }
}