# Supabase Setup Guide for Evgenia Art Gallery

This guide will help you set up Supabase authentication for your art gallery website.

## 🚀 Quick Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in/up
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `evgenia-art-gallery`
   - **Database Password**: Choose a strong password (save it safely)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for setup to complete (2-3 minutes)

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ`)
   - **service_role key** (starts with `eyJ`) - **Keep this secret!**

### 3. Configure Environment Variables

Create a `.env.local` file in your project root and add:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**⚠️ Important**: Never commit `.env.local` to version control!

### 4. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/config.sql`
4. Click "Run" to execute the schema setup

This will create:
- User profiles table with roles (visitor, collector, admin)
- Collector inquiries table
- Row Level Security (RLS) policies
- Automatic user profile creation triggers

### 5. Configure Authentication Settings

1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Under **General settings**:
   - Set **Site URL** to your production domain (e.g., `https://evgenia-gallery.vercel.app`)
   - Add redirect URLs for development: `http://localhost:3000`
3. Under **Email**:
   - Configure your email provider (or use Supabase's built-in)
   - Customize email templates if desired

### 6. Create Your First Admin User

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Enter your email and password
4. Click "Create user"
5. After creation, go to **Table Editor** → **user_profiles**
6. Find your user record and change the `role` from `visitor` to `admin`

### 7. Test the Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/auth/login`
3. You should see the login form (no longer showing the configuration warning)
4. Try logging in with your admin credentials
5. You should be redirected to `/admin/dashboard`

## 🔧 Advanced Configuration

### Email Templates

Customize your authentication emails in **Authentication** → **Email Templates**:

- **Confirm signup**: Sent when users register
- **Magic Link**: For passwordless login (if enabled)
- **Change Email Address**: When users update their email
- **Reset Password**: For password recovery

### Security Settings

1. **Enable RLS**: Already configured in the schema
2. **JWT Settings**: Default settings work well
3. **Rate Limiting**: Consider enabling for production

### Production Deployment

When deploying to production (Vercel, etc.):

1. Add environment variables to your hosting platform
2. Update **Site URL** in Supabase settings to your production domain
3. Add production domain to **Redirect URLs**

## 🎨 Gallery-Specific Features

### User Roles

The gallery supports three user roles:

- **Visitor**: Can browse gallery, register account
- **Collector**: Can make inquiries about artwork
- **Admin**: Full gallery management access

### Collector Inquiries

When users are authenticated, they can:
- Submit inquiries about specific artworks
- Track their inquiry history
- Receive email notifications

### Admin Functions

Admin users can:
- Manage user roles
- View and respond to collector inquiries
- Access admin dashboard and future e-commerce features

## 🛟 Troubleshooting

### Common Issues

1. **"Authentication is not configured" error**:
   - Check that `.env.local` exists and has correct values
   - Restart your development server

2. **Login redirects to error page**:
   - Verify Supabase credentials are correct
   - Check that user exists in Supabase dashboard

3. **Admin dashboard access denied**:
   - Ensure user role is set to `admin` in `user_profiles` table

4. **Email confirmation not working**:
   - Check email settings in Supabase dashboard
   - Verify Site URL is configured correctly

### Getting Help

- Check the [Supabase documentation](https://supabase.com/docs)
- Join the [Supabase Discord](https://discord.supabase.com)
- Review this gallery's authentication code in `src/lib/auth.ts`

## 🎉 Next Steps

Once authentication is working:

1. **E-commerce Integration**: Set up Stripe for artwork sales
2. **Collector CRM**: Implement inquiry management system
3. **Enhanced Admin Panel**: Add artwork management features
4. **Email Notifications**: Set up automated collector communications

Your art gallery now has professional-grade authentication! 🎨✨