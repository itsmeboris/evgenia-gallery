# Environment Setup Instructions

To run the development server, create a `.env.local` file in the root directory with these variables:

```bash
# Supabase Configuration (Get from https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database URL (Get from Supabase dashboard)
DATABASE_URL=your-database-url

# Development
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## For Day 1 Testing (Without Supabase)

The app will now run without Supabase configured. You'll see warnings in the console, but the site will work!

## For Day 2 (With Supabase)

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and anon key
3. Add them to `.env.local`
4. Restart the dev server 