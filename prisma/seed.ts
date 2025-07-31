import { PrismaClient, Category, AvailabilityStatus } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

// Define types for our artwork data
interface ArtworkData {
  id: string
  title: string
  category: string
  subcategory: string
  dimensions: string
  medium: string
  price: number
  description: string
  image: string
  featured: boolean
}

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user for gallery management
  const admin = await prisma.adminUser.upsert({
    where: { email: 'evgenia@evgeniaportnov.com' },
    update: {},
    create: {
      email: 'evgenia@evgeniaportnov.com',
      name: 'Evgenia Portnov',
      role: 'super_admin',
      authId: 'temp-auth-id', // This would come from Supabase auth
    },
  })

  console.log('✅ Created admin user:', admin.name)

  // Read artwork data
  const artworkDataPath = join(process.cwd(), '..', 'artwork-data.json')
  const artworkData = JSON.parse(readFileSync(artworkDataPath, 'utf-8'))
  const artworks: ArtworkData[] = artworkData.artworks

  // Define emotional tags mapping based on categories
  const emotionalTagsMap: Record<string, string[]> = {
    birds: ['freedom', 'joy', 'lightness', 'transformation', 'hope'],
    nature: ['grounding', 'peace', 'growth', 'renewal', 'harmony'],
    animals: ['connection', 'wisdom', 'strength', 'companionship', 'intuition'],
    abstract: ['flow', 'release', 'creativity', 'expression', 'energy'],
    portraits: ['identity', 'reflection', 'empowerment', 'authenticity', 'courage'],
  }

  console.log(`📦 Processing ${artworks.length} artworks...`)

  // Map artwork categories to enum values
  const categoryMap: Record<string, Category> = {
    birds: 'birds' as Category,
    flowers: 'flowers' as Category,
    nature: 'flowers' as Category, // Map nature to flowers
    towns: 'towns' as Category,
    animals: 'birds' as Category, // Map animals to birds
    abstract: 'flowers' as Category, // Map abstract to flowers
    portraits: 'towns' as Category, // Map portraits to towns
  }

  let createdCount = 0

  // Create artworks
  for (const artwork of artworks) {
    const category = artwork.category.toLowerCase()
    const mappedCategory = categoryMap[category] || ('flowers' as Category)
    const emotionalTags = emotionalTagsMap[category] || ['beauty', 'inspiration']

    // Parse dimensions
    const dimensionMatch = artwork.dimensions.match(/(\d+)cm\s*[Xx]\s*(\d+)cm/)
    const width = dimensionMatch && dimensionMatch[1] ? parseInt(dimensionMatch[1], 10) : 50
    const height = dimensionMatch && dimensionMatch[2] ? parseInt(dimensionMatch[2], 10) : 50

    try {
      await prisma.artwork.create({
        data: {
          title: artwork.title,
          slug: artwork.id,
          category: mappedCategory,
          subcategory: artwork.subcategory || undefined,
          medium: artwork.medium || 'Acrylic on Canvas',
          creationYear: 2023, // Default year
          seoDescription: artwork.description || `A beautiful ${category} painting by Evgenia Portnov`,
          pricing: {
            original: artwork.price,
          },
          dimensions: {
            width,
            height,
            unit: 'cm',
          },
          emotionalTags,
          storyBehindBrushstroke: `This piece emerged during a moment of deep connection with ${category === 'birds' ? 'the freedom of flight' : category === 'nature' ? 'the natural world' : 'creative energy'}. Each stroke was guided by an intention to capture and share the healing power of this experience.`,
          primaryImage: {
            url: `/artwork/${artwork.image}`,
            altText: artwork.title,
            colorProfile: 'sRGB',
          },
          detailImages: [],
          featured: artwork.featured,
          availabilityStatus: 'available' as AvailabilityStatus,
          isOriginal: true,
          searchTags: [category, ...emotionalTags],
        },
      })
      createdCount++
    } catch (error) {
      console.error(`Failed to create artwork "${artwork.title}":`, error)
    }
  }

  console.log(`✅ Created ${createdCount} artworks`)

  // Create sample collector
  const collector = await prisma.collector.upsert({
    where: { email: 'collector@example.com' },
    update: {},
    create: {
      email: 'collector@example.com',
      name: 'Jane Smith',
              preferences: {
          categories: ['birds', 'flowers'],
          priceRange: { min: 300, max: 1000 },
          emotionalThemes: ['peace', 'joy', 'freedom'],
        },
        vipStatus: false,
    },
  })

  console.log('✅ Created sample collector:', collector.name)

  // Create sample exhibition
  const exhibition = await prisma.exhibition.create({
    data: {
      title: 'Healing Through Color',
      description: 'An exploration of the therapeutic power of art through vibrant colors and emotional expression.',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-02-15'),
      location: 'Virtual Gallery',
      isFeatured: true,
    },
  })

  console.log('✅ Created sample exhibition:', exhibition.title)

  // Add some artworks to the exhibition
  const exhibitionArtworks = await prisma.artwork.findMany({
    take: 5,
  })

  for (const artwork of exhibitionArtworks) {
    await prisma.exhibitionArtwork.create({
      data: {
        exhibitionId: exhibition.id,
        artworkId: artwork.id,
      },
    })
  }

  console.log('✅ Added artworks to exhibition')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  }) 