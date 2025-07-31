import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma, getAvailableArtworks } from '@/lib/db'
import { EmotionalTags } from '@/components/artwork/EmotionalTags'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDimensions } from '@/lib/utils'

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Section */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
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

          {/* Information Section */}
          <div className="space-y-6">
            {/* Title and basic info */}
            <div>
              <h1 className="text-3xl font-display text-gray-900 mb-2">
                {artwork.title}
              </h1>
              <p className="text-lg text-gray-600">
                {artwork.creationYear}
                {artwork.creationMonth && ` • ${new Date(0, artwork.creationMonth - 1).toLocaleString('default', { month: 'long' })}`}
              </p>
            </div>

            {/* Emotional tags */}
            {artwork.emotionalTags && artwork.emotionalTags.length > 0 && (
              <EmotionalTags tags={artwork.emotionalTags} size="md" />
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

            {/* Story behind the brushstroke */}
            {artwork.storyBehindBrushstroke && (
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-gray-900">Story Behind the Brushstroke</h2>
                <p className="text-gray-700 leading-relaxed">
                  {artwork.storyBehindBrushstroke}
                </p>
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

              {/* Action buttons */}
              {artwork.availabilityStatus === 'available' && (
                <div className="space-y-3">
                  <Button variant="primary" size="lg" className="w-full">
                    Inquire About This Artwork
                  </Button>
                  <Button variant="secondary" size="lg" className="w-full">
                    Add to Wishlist
                  </Button>
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