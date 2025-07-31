import { Button } from "@/components/ui/Button"
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid"
import { AuthStatus } from "@/components/auth/AuthStatus"
import { getAvailableArtworks } from "@/lib/db"
import Link from "next/link"

export default async function HomePage() {
  // Fetch artworks from database
  const artworks = await getAvailableArtworks()

  // Transform to match component expectations
  const transformedArtworks = artworks.map(artwork => ({
    ...artwork,
    dimensions: artwork.dimensions as { width: number; height: number; unit: string },
    primaryImage: artwork.primaryImage as { url: string; altText: string },
    pricing: artwork.pricing as { original?: number },
  }))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-display text-2xl text-gray-900">
              Evgenia Portnov
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-turquoise-600">
                About
              </Link>
              <Link href="/exhibitions" className="text-sm font-medium text-gray-700 hover:text-turquoise-600">
                Exhibitions
              </Link>
              <AuthStatus />
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-display font-light text-gray-900 mb-6">
              Healing Through Art
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 font-display">
              A Journey of Transformation and Beauty
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-500 to-turquoise-700 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover the transformative power of art. Each painting tells a story of resilience,
              hope, and the beauty found in life's journey.
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="#gallery">
                <Button size="lg" variant="primary">
                  View Gallery
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="secondary">
                  Artist's Story
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-gray-900 mb-4">
              Available Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each piece is created with the intention of bringing healing energy and beauty into your space.
            </p>
          </div>

          {/* Artwork Grid */}
          {transformedArtworks.length > 0 ? (
            <ArtworkGrid
              artworks={transformedArtworks}
              categories={['birds', 'flowers', 'towns']}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                The gallery is being prepared. Please check back soon!
              </p>
              <Link href="/admin/dashboard">
                <Button variant="secondary">
                  Admin Login
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 px-6 py-16 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display text-gray-900 mb-4">
              Inquiries & Commissions
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Interested in a piece or commissioning a custom artwork?
              I'd love to hear from you.
            </p>
            <Button size="lg" variant="primary">
              Get in Touch
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 Evgenia Portnov. All rights reserved.</p>
            <p className="mt-2">
              Made with 💙 by{' '}
              <a
                href="https://github.com/bromdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-turquoise-600 hover:text-turquoise-700"
              >
                Brom Digital
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
