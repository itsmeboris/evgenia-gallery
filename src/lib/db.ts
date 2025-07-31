import { PrismaClient, Category } from '@prisma/client'
import {
  realArtworks,
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

// Mock data for development when database is not available
const mockArtworks = [
  {
    id: '1',
    title: 'Morning Birds',
    slug: 'morning-birds',
    category: 'birds' as const,
    subcategory: 'songbirds',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 40, height: 40, unit: 'cm' },
    weight: null,
    creationYear: 2023,
    creationMonth: 3,
    storyBehindBrushstroke: 'This piece emerged during a peaceful morning, capturing the essence of freedom and joy that birds bring to our lives.',
    emotionalTags: ['freedom', 'joy', 'peace'],
    inspirationSource: 'Morning meditation',
    primaryImage: {
      url: '/artwork/placeholder.svg',
      altText: 'Morning Birds - Acrylic painting of colorful birds',
      colorProfile: 'sRGB'
    },
    detailImages: [],
    roomViewImage: null,
    videoUrl: null,
    availabilityStatus: 'available' as const,
    isOriginal: true,
    editionInfo: null,
    pricing: { original: 850 },
    featured: true,
    galleryOrder: 1,
    seoDescription: 'Beautiful acrylic painting of morning birds bringing joy and freedom',
    searchTags: ['birds', 'morning', 'freedom', 'joy'],
    searchVector: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    artist: null,
    inquiries: [],
    orderItems: [],
    collectorWishlists: [],
    exhibitions: []
  },
  {
    id: '2',
    title: 'Healing Garden',
    slug: 'healing-garden',
    category: 'flowers' as const,
    subcategory: 'garden',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 50, height: 60, unit: 'cm' },
    weight: null,
    creationYear: 2023,
    creationMonth: 5,
    storyBehindBrushstroke: 'A meditation on growth and renewal, this garden represents the healing power of nature.',
    emotionalTags: ['growth', 'healing', 'renewal', 'peace'],
    inspirationSource: 'Spring garden',
    primaryImage: {
      url: '/artwork/placeholder.svg',
      altText: 'Healing Garden - Vibrant flower painting',
      colorProfile: 'sRGB'
    },
    detailImages: [],
    roomViewImage: null,
    videoUrl: null,
    availabilityStatus: 'available' as const,
    isOriginal: true,
    editionInfo: null,
    pricing: { original: 1200 },
    featured: true,
    galleryOrder: 2,
    seoDescription: 'Vibrant acrylic painting of a healing garden with flowers',
    searchTags: ['flowers', 'garden', 'healing', 'nature'],
    searchVector: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    artist: null,
    inquiries: [],
    orderItems: [],
    collectorWishlists: [],
    exhibitions: []
  },
  {
    id: '3',
    title: 'Coastal Dreams',
    slug: 'coastal-dreams',
    category: 'towns' as const,
    subcategory: 'seascape',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 60, height: 40, unit: 'cm' },
    weight: null,
    creationYear: 2023,
    creationMonth: 7,
    storyBehindBrushstroke: 'Inspired by the tranquil beauty of coastal towns, this piece invites viewers to find peace in simplicity.',
    emotionalTags: ['tranquility', 'dreams', 'peace', 'reflection'],
    inspirationSource: 'Mediterranean coast',
    primaryImage: {
      url: '/artwork/placeholder.svg',
      altText: 'Coastal Dreams - Serene coastal town painting',
      colorProfile: 'sRGB'
    },
    detailImages: [],
    roomViewImage: null,
    videoUrl: null,
    availabilityStatus: 'available' as const,
    isOriginal: true,
    editionInfo: null,
    pricing: { original: 950 },
    featured: false,
    galleryOrder: 3,
    seoDescription: 'Serene acrylic painting of a coastal town',
    searchTags: ['coast', 'town', 'sea', 'tranquility'],
    searchVector: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    artist: null,
    inquiries: [],
    orderItems: [],
    collectorWishlists: [],
    exhibitions: []
  }
]

// Example query helpers
export async function getArtworkWithRelations(id: string) {
  if (!prisma) {
    // Return real artwork data for development
    console.log('📦 Using real artwork data - Database not connected')
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
    console.log('🎨 Using real artwork data - Database not connected')
    console.log('📊 Real data stats:', realDataStats)
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
    console.log(`🎨 Getting real artworks for category: ${category}`)
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