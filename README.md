# Evgenia Gallery

An art gallery website for artist Evgenia Portnov, showcasing original paintings organized around themes of healing, transformation, and emotional well-being.

## Features

- **Curated gallery** with artwork organized into thematic collections (Birds, Flowers, Towns)
- **Individual artwork pages** with detailed descriptions, dimensions, pricing, and the story behind each piece
- **Collector accounts** with authentication, wishlists, and inquiry submissions
- **Admin dashboard** for managing artworks, exhibitions, orders, and collector inquiries
- **E-commerce** with Stripe integration for purchasing originals and prints
- **Exhibition management** for showcasing curated groups of work
- **Responsive design** with Framer Motion animations and optimized image delivery
- **SEO-friendly** with server-side rendering and structured metadata

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma 6
- **Authentication:** Supabase Auth (`@supabase/ssr`)
- **Payments:** Stripe
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com) project (PostgreSQL database + auth)
- A [Stripe](https://stripe.com) account (optional, for payments)

### Installation

```bash
git clone https://github.com/itsmeboris/evgenia-gallery.git
cd evgenia-gallery
npm install
```

### Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=<your Supabase project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your Supabase anon key>
SUPABASE_SERVICE_ROLE_KEY=<your Supabase service role key>
DATABASE_URL=<your Supabase PostgreSQL connection string>
```

Optional (for payments):

```
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

See [SETUP_ENV.md](SETUP_ENV.md) for more detail. For Supabase project configuration (auth, RLS policies, SQL schema), see [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

### Database Setup

Push the Prisma schema to your database and seed it with initial data:

```bash
npm run db:push
npm run db:seed
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:push` | Push schema changes to the database |
| `npm run db:seed` | Seed the database with artwork data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:migrate` | Create and apply a migration |

## Project Structure

```
src/
  app/
    (public)/       # Public pages (about, exhibitions)
    (auth)/         # Login and registration
    (admin)/admin/  # Admin dashboard
    artwork/[id]/   # Individual artwork pages
  components/
    artwork/        # Gallery grid and artwork display
    auth/           # Authentication UI
    ui/             # Shared UI primitives
  lib/              # Database client, auth helpers, utilities
prisma/
  schema.prisma     # Database schema
  seed.ts           # Seed script
supabase/
  config.sql        # Auth and RLS policy setup
```

## Deployment

The project is configured for deployment on Vercel. Push to the `main` branch for automatic production deploys. See [DEPLOYMENT.md](DEPLOYMENT.md) for the full guide, including environment variable configuration, domain setup, and performance tuning.

## License

All rights reserved. Artwork images and content are the property of Evgenia Portnov.
