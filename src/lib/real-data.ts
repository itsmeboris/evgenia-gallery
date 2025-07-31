import rawArtworkData from '../../artwork-data.json'
import { Category } from '@prisma/client'

// Raw data structure from artwork-data.json
interface RawArtwork {
  id: string
  title: string
  category: 'birds' | 'floral' | 'towns'
  subcategory: string
  dimensions: string
  medium: string
  price: number
  description: string
  image: string
  featured: boolean
}

// Transformation function to convert raw data to expected Prisma-like structure
function transformArtwork(raw: RawArtwork, index: number) {
  // Parse dimensions (e.g., "20cm X 20cm" -> {width: 20, height: 20, unit: 'cm'})
  const dimensionMatch = raw.dimensions.match(/(\d+)\s*cm\s*[xX]\s*(\d+)\s*cm/i)
  const dimensions = dimensionMatch ? {
    width: parseInt(dimensionMatch[1]),
    height: parseInt(dimensionMatch[2]),
    unit: 'cm'
  } : { width: 40, height: 40, unit: 'cm' }

  // Convert image path from old format to new format
  // "images/artwork/birds/Image1.webp" -> "/artwork/birds/Image1.jpg"
  const imagePath = raw.image
    .replace('images/artwork/', '/artwork/')
    .replace(/\.webp$/, '.jpg')

  // Generate emotional tags based on category
  const emotionalTagsByCategory = {
    birds: ['freedom', 'joy', 'flight', 'nature'],
    floral: ['growth', 'beauty', 'renewal', 'healing'],
    towns: ['serenity', 'memories', 'warmth', 'peace']
  }

  // Generate story based on category and title
  const storyTemplates = {
    birds: `This ${raw.title.toLowerCase()} represents the essence of freedom and the boundless spirit that soars within us all.`,
    floral: `The delicate beauty of ${raw.title.toLowerCase()} captures nature's healing power and the promise of renewal.`,
    towns: `${raw.title} invites us to find peace in the simple moments and cherish the places that hold our memories.`
  }

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    category: (raw.category === 'floral' ? 'flowers' : raw.category) as Category, // Map floral to flowers for schema compatibility
    subcategory: raw.subcategory || null,
    medium: raw.medium,
    dimensions,
    weight: null,
    creationYear: 2023,
    creationMonth: Math.floor(Math.random() * 12) + 1,
    storyBehindBrushstroke: raw.description || storyTemplates[raw.category],
    emotionalTags: emotionalTagsByCategory[raw.category] || ['beauty', 'art'],
    inspirationSource: `Artist's ${raw.category} collection`,
    primaryImage: {
      url: imagePath,
      altText: `${raw.title} - ${raw.medium}`,
      colorProfile: 'sRGB'
    },
    detailImages: [],
    roomViewImage: null,
    videoUrl: null,
    availabilityStatus: 'available' as const,
    isOriginal: true,
    editionInfo: null,
    pricing: { original: raw.price },
    featured: raw.featured,
    galleryOrder: index + 1,
    seoDescription: `${raw.title} - Original ${raw.medium} by Evgenia Portnov. ${raw.dimensions}.`,
    searchTags: [
      raw.category,
      raw.title.toLowerCase(),
      raw.medium.toLowerCase(),
      ...emotionalTagsByCategory[raw.category]
    ],
    searchVector: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    artist: null,
    inquiries: [],
    orderItems: [],
    collectorWishlists: [],
    exhibitions: []
  }
}

// Transform all artworks
export const realArtworks = rawArtworkData.artworks.map(transformArtwork)

// Export specific functions for compatibility with existing code
export function getRealArtworkById(id: string) {
  return realArtworks.find(artwork => artwork.id === id) || null
}

export function getRealAvailableArtworks() {
  return realArtworks.filter(artwork => artwork.availabilityStatus === 'available')
}

export function getRealArtworksByCategory(category: string) {
  const normalizedCategory = category === 'flowers' ? 'flowers' : 
                            category === 'floral' ? 'flowers' : category
  return realArtworks.filter(artwork => 
    artwork.category === normalizedCategory &&
    artwork.availabilityStatus === 'available'
  )
}

// Statistics for debugging
export const realDataStats = {
  total: realArtworks.length,
  byCategory: {
    birds: realArtworks.filter(a => a.category === 'birds').length,
    flowers: realArtworks.filter(a => a.category === 'flowers').length,
    towns: realArtworks.filter(a => a.category === 'towns').length,
  },
  featured: realArtworks.filter(a => a.featured).length
}

console.log('🎨 Real artwork data loaded:', realDataStats)