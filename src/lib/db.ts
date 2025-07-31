import { PrismaClient, Category } from '@prisma/client'
import {
  getRealArtworkById,
  getRealAvailableArtworks,
  getRealArtworksByCategory,
  realDataStats
} from './real-data'

// Singleton pattern for Prisma Client to prevent too many connections in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create Prisma client only if DATABASE_URL is available
let prisma: PrismaClient | null = null

if (process.env.DATABASE_URL) {
  prisma = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
}

export { prisma }

// Re-export all Prisma types for easy access
export * from '@prisma/client'

// Custom type utilities for common patterns
export type ArtworkWithRelations = Awaited<
  ReturnType<typeof getArtworkWithRelations>
>

// Example query helpers
export async function getArtworkWithRelations(id: string) {
  if (!prisma) {
    // Return real artwork data for development
    return getRealArtworkById(id)
  }

  return prisma.artwork.findUnique({
    where: { id },
    include: {
      inquiries: {
        include: {
          collector: true,
        },
      },
      exhibitions: {
        include: {
          exhibition: true,
        },
      },
    },
  })
}

export async function getAvailableArtworks() {
  if (!prisma) {
    // Return real artwork data for development
    // Only log once during development builds
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PHASE) {
      console.log('🎨 Using real artwork data - Database not connected')
      console.log('📊 Real data stats:', realDataStats)
    }
    return getRealAvailableArtworks()
  }

  return prisma.artwork.findMany({
    where: {
      availabilityStatus: 'available',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getArtworksByCategory(category: string) {
  if (!prisma) {
    // Return real artwork data for development
    return getRealArtworksByCategory(category)
  }

  return prisma.artwork.findMany({
    where: {
      category: category as Category,
      availabilityStatus: 'available',
    },
  })
}

// Error handling wrapper
export async function dbQuery<T>(
  operation: () => Promise<T>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await operation()
    return { data }
  } catch (error) {
    console.error('Database query error:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}