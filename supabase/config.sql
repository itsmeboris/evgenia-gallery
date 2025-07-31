-- Evgenia Art Gallery - Safe Configuration (Handles Existing Policies)
-- This safely drops and recreates everything

-- Drop ALL existing policies first
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.collector_inquiries;
DROP POLICY IF EXISTS "Users can insert own inquiries" ON public.collector_inquiries;
DROP POLICY IF EXISTS "Users can create inquiries" ON public.collector_inquiries;
DROP POLICY IF EXISTS "Admins can manage all inquiries" ON public.collector_inquiries;
DROP POLICY IF EXISTS "Enable read for users based on user_id" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;

-- Drop triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS set_user_profiles_updated_at ON public.user_profiles;
DROP TRIGGER IF EXISTS set_collector_inquiries_updated_at ON public.collector_inquiries;

-- Create user_profiles table (if not exists)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'visitor' CHECK (role IN ('visitor', 'collector', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collector inquiries table (if not exists)
CREATE TABLE IF NOT EXISTS public.collector_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  artwork_id TEXT NOT NULL,
  artwork_title TEXT,
  message TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on both tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collector_inquiries ENABLE ROW LEVEL SECURITY;

-- Create SIMPLE policies for user_profiles (no recursion)
CREATE POLICY "read_own_profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "update_own_profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "insert_own_profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for collector_inquiries
CREATE POLICY "read_own_inquiries" ON public.collector_inquiries
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "insert_own_inquiries" ON public.collector_inquiries
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Manually create your profile with admin role (UPSERT)
INSERT INTO public.user_profiles (id, email, full_name, role)
VALUES (
  '3ec3d666-5dce-40a6-9dbd-fdda0c87be4d',
  'sobol@post.bgu.ac.il',
  'Gallery Admin',
  'admin'
) ON CONFLICT (id) DO UPDATE SET 
  role = 'admin',
  updated_at = NOW();