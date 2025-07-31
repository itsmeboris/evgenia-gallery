import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma, getAvailableArtworks } from '@/lib/db'
import { EmotionalTags } from '@/components/artwork/EmotionalTags'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDimensions, artworkImageSizes } from '@/lib/utils'

// Generate static params for all artworks
export async function generateStaticParams() {
  if (!prisma) {
    // Use mock data slugs
    const artworks = await getAvailableArtworks()
    return artworks.map((artwork) => ({
      id: artwork.slug,
    }))
  }

  const artworks = await prisma.artwork.findMany({
    select: { slug: true }
  })

  return artworks.map((artwork) => ({
    id: artwork.slug,
  }))
}

async function getArtwork(slug: string) {
  if (!prisma) {
    // Use mock data
    const artworks = await getAvailableArtworks()
    const artwork = artworks.find(a => a.slug === slug)
    if (!artwork) {
      notFound()
    }
    return artwork
  }

  const artwork = await prisma.artwork.findUnique({
    where: { slug }
  })

  if (!artwork) {
    notFound()
  }

  return artwork
}

export default async function ArtworkDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const artwork = await getArtwork(resolvedParams.id)

  // Type assertions for JSON fields
  const dimensions = artwork.dimensions as { width: number; height: number; unit: string }
  const primaryImage = artwork.primaryImage as { url: string; altText: string; colorProfile?: string }
  const pricing = artwork.pricing as { original?: number; prints?: Record<string, number> }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
          {/* Image Section - Mobile Optimized */}
          <div className="relative">
            <div className="lg:sticky lg:top-8">
              <div className="relative aspect-square sm:aspect-auto sm:h-[400px] lg:h-[600px] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText}
                  fill
                  sizes={artworkImageSizes.detail}
                  quality={90}
                  className="object-contain"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>

              {/* Detail images would go here */}
              {artwork.detailImages && artwork.detailImages.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {/* Detail image thumbnails */}
                </div>
              )}
            </div>
          </div>

          {/* Information Section - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6">
            {/* Title and basic info - Mobile Friendly */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-display text-gray-900 mb-2">
                {artwork.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                {artwork.creationYear}
                {artwork.creationMonth && ` • ${new Date(0, artwork.creationMonth - 1).toLocaleString('default', { month: 'long' })}`}
              </p>
            </div>

            {/* Enhanced Emotional Journey */}
            {artwork.emotionalTags && artwork.emotionalTags.length > 0 && (
              <div className="bg-gradient-to-r from-turquoise-50 to-blue-50 rounded-xl p-6 border border-turquoise-100">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Emotional Benefits</h3>
                <p className="text-sm text-gray-600 mb-4">This artwork is designed to cultivate these healing qualities:</p>
                <EmotionalTags tags={artwork.emotionalTags} size="md" />
              </div>
            )}

            {/* Medium and dimensions */}
            <div className="border-t border-b border-gray-200 py-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Medium</span>
                <span className="text-gray-900 font-medium">{artwork.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions</span>
                <span className="text-gray-900 font-medium">{formatDimensions(dimensions)}</span>
              </div>
              {artwork.isOriginal && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Edition</span>
                  <span className="text-gray-900 font-medium">Original</span>
                </div>
              )}
            </div>

            {/* Enhanced Story Section */}
            {artwork.storyBehindBrushstroke && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                <div className="text-center border-b border-gray-100 pb-6">
                  <h2 className="text-2xl font-display text-gray-900 mb-2">Story Behind the Brushstroke</h2>
                  <p className="text-sm text-gray-600 italic">A personal journey of healing and transformation</p>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg font-light first-letter:text-4xl first-letter:font-bold first-letter:text-turquoise-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                    {artwork.storyBehindBrushstroke}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">E</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Evgenia Portnov</p>
                      <p className="text-sm text-gray-600">Tech-to-Art Healing Journey</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Price and availability */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-medium text-gray-900">
                  {pricing.original
                    ? formatPrice(pricing.original)
                    : 'Price on request'
                  }
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  artwork.availabilityStatus === 'available'
                    ? 'bg-green-100 text-green-800'
                    : artwork.availabilityStatus === 'sold'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {artwork.availabilityStatus === 'available' ? 'Available' :
                   artwork.availabilityStatus === 'sold' ? 'Sold' :
                   artwork.availabilityStatus === 'reserved' ? 'Reserved' : 'Inquire'}
                </span>
              </div>

              {/* Enhanced Action buttons */}
              {artwork.availabilityStatus === 'available' && (
                <div className="space-y-3">
                  <Button variant="primary" size="lg" className="w-full group">
                    <span>Connect with This Artwork</span>
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                  <Button variant="secondary" size="lg" className="w-full">
                    Save to Collection
                  </Button>
                  <div className="text-center text-sm text-gray-600 mt-4">
                    <p className="italic">Each artwork comes with a personalized story about its therapeutic intention</p>
                  </div>
                </div>
              )}
            </div>

            {/* SEO description */}
            {artwork.seoDescription && (
              <div className="text-sm text-gray-600 italic">
                {artwork.seoDescription}
              </div>
            )}
          </div>
        </div>

        {/* Related artworks section would go here */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-display text-gray-900 mb-8">You May Also Like</h2>
          {/* Related artwork grid */}
        </div>
      </div>
    </div>
  )
}