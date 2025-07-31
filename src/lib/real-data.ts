import rawArtworkData from '../../artwork-data.json'
import { Category } from '@prisma/client'

// Raw data structure from artwork-data.json
interface RawArtwork {
  id: string
  title: string
  category: string
  subcategory: string
  dimensions: string
  medium: string
  price: number | null
  description: string
  image: string
  featured: boolean
}

// Transformation function to convert raw data to expected Prisma-like structure
function transformArtwork(raw: RawArtwork, index: number) {
  // Parse dimensions (e.g., "20cm X 20cm" -> {width: 20, height: 20, unit: 'cm'})
  const dimensionMatch = raw.dimensions.match(/(\d+)\s*cm\s*[xX]\s*(\d+)\s*cm/i)
  const dimensions = dimensionMatch ? {
    width: parseInt(dimensionMatch[1]!),
    height: parseInt(dimensionMatch[2]!),
    unit: 'cm'
  } : { width: 40, height: 40, unit: 'cm' }

  // Convert image path from old format to new format
  // "images/artwork/birds/Image1.webp" -> "/artwork/birds/Image1.jpg"
  const imagePath = raw.image
    .replace('images/artwork/', '/artwork/')
    .replace(/\.webp$/, '.jpg')

  // Enhanced emotional tags for therapeutic art experience
  const emotionalTagsByCategory: Record<string, string[]> = {
    birds: ['liberation', 'transcendence', 'spiritual_freedom', 'emotional_release', 'boundless_potential', 'rising_above'],
    floral: ['transformation', 'healing_energy', 'inner_growth', 'renewal_cycle', 'gentle_healing', 'flourishing_spirit'],
    towns: ['sanctuary', 'peaceful_refuge', 'emotional_home', 'grounding', 'cherished_moments', 'inner_peace']
  }

  // Healing-focused story templates reflecting Evgenia's therapeutic art mission
  const storyTemplates: Record<string, string> = {
    birds: `In my journey from technology to art, ${raw.title.toLowerCase()} emerged as a meditation on liberation. This piece invites you to release limiting beliefs and soar beyond self-imposed boundaries. The flowing brushstrokes mirror the movement of breaking free from constraints, whether professional, emotional, or spiritual. Each viewer may find their own moment of transcendence within these wings of possibility.`,
    floral: `${raw.title.toLowerCase()} bloomed during a particularly transformative period in my artistic practice. The gentle healing energy captured here reflects nature's infinite capacity for renewal—something I discovered when transitioning from the analytical world of technology to the intuitive realm of art. This piece whispers of patience with personal growth, the beauty of gradual transformation, and the courage to bloom authentically.`,
    towns: `${raw.title} holds the essence of sanctuary that I sought when changing careers from tech to art. This piece represents the emotional homes we create within ourselves—places of safety where we can reflect, grow, and find peace. The warm tones and gentle composition invite viewers to find their own inner refuge, a space where memories and dreams can coexist in harmony.`
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
    storyBehindBrushstroke: raw.description || storyTemplates[raw.category] || `A beautiful ${raw.category} artwork that captures the essence of nature and emotion.`,
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
    pricing: { original: raw.price || 0 },
    featured: raw.featured,
    galleryOrder: index + 1,
    seoDescription: `${raw.title} - Original ${raw.medium} by Evgenia Portnov. ${raw.dimensions}.`,
    searchTags: [
      raw.category,
      raw.title.toLowerCase(),
      raw.medium.toLowerCase(),
      ...(emotionalTagsByCategory[raw.category] || [])
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