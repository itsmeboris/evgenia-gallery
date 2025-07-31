# Deployment Guide - Evgenia Gallery

## 🚀 Vercel Deployment

This project is configured for seamless deployment on Vercel.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Supabase Project**: Create a project at [supabase.com](https://supabase.com)

### Initial Setup

#### 1. Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select "Next.js" as the framework
4. Keep all default settings

#### 2. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=your-database-url

# Site URL (Required)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Stripe (Optional - for e-commerce)
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

#### 3. Database Setup

1. Get your database URL from Supabase Dashboard → Settings → Database
2. Run migrations locally first:
   ```bash
   npm run db:push
   npm run db:seed
   ```

### Deployment Workflow

#### Automatic Deployments

- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a unique URL
- **Rollback**: One-click in Vercel dashboard

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Performance Optimization

Our Vercel configuration includes:

- **Image Optimization**: Automatic WebP conversion
- **Edge Functions**: Fast API responses
- **Caching**: 1-year cache for artwork images
- **CDN**: Global distribution for fast loading

### Monitoring

1. **Analytics**: Enable in Vercel Dashboard
2. **Speed Insights**: Monitor Core Web Vitals
3. **Error Tracking**: View in Functions tab

### Domain Configuration

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Configure DNS:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

### Security Headers

Automatically configured in `vercel.json`:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

### Troubleshooting

#### Build Failures

1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set

#### Database Connection Issues

1. Confirm DATABASE_URL is correct
2. Check Supabase connection pooling settings
3. Ensure IP is whitelisted (Vercel IPs are dynamic)

#### Performance Issues

1. Enable Vercel Analytics
2. Check function execution times
3. Review image sizes and optimization

### CI/CD with GitHub Actions

Our GitHub Actions workflow automatically:
- Runs tests on every PR
- Checks code quality
- Validates build
- Comments deployment URL on PR

### Rollback Procedure

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"
4. Confirm rollback

### Environment-Specific Settings

#### Development
```bash
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Staging
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://staging.evgeniaportnov.com
```

#### Production
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://evgeniaportnov.com
```

### Best Practices

1. **Always test locally first**: `npm run build && npm start`
2. **Use preview deployments**: Test features before merging
3. **Monitor performance**: Check Speed Insights regularly
4. **Keep secrets secure**: Never commit `.env` files
5. **Use environment variables**: Different values per environment

### Support

- **Vercel Status**: [status.vercel.com](https://status.vercel.com)
- **Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Support**: [vercel.com/support](https://vercel.com/support) 