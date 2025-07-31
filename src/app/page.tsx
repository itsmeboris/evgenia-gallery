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
      {/* Enhanced Professional Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="font-display text-xl sm:text-2xl text-gray-900 hover:text-turquoise-600 transition-colors"
              aria-label="Evgenia Portnov Digital Art Gallery - Home"
            >
              Evgenia Portnov
            </Link>
            <nav className="flex items-center space-x-3 sm:space-x-6" role="navigation" aria-label="Main navigation">
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-turquoise-600 transition-colors px-2 py-1 rounded"
              >
                About
              </Link>
              <Link
                href="/exhibitions"
                className="text-sm font-medium text-gray-700 hover:text-turquoise-600 transition-colors px-2 py-1 rounded"
              >
                Exhibitions
              </Link>
              <AuthStatus />
            </nav>
          </div>
        </div>
      </header>

      <main role="main">
        {/* Enhanced Hero Section with Accessibility */}
        <section className="relative px-6 py-12 sm:py-16 mx-auto max-w-7xl" aria-labelledby="hero-heading">
          <div className="text-center">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-7xl font-display font-light text-gray-900 mb-6">
              Healing Through Art
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 font-display">
              A Journey of Transformation and Beauty
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-500 to-turquoise-700 mx-auto mb-8" aria-hidden="true"></div>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              Discover the transformative power of art. Each painting tells a story of resilience,
              hope, and the beauty found in life's journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <Link href="#gallery">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">
                  View Gallery
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Artist's Story
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Gallery Section with Therapeutic Categories */}
        <section id="gallery" className="px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-gray-900 mb-6">
              Art for Healing & Transformation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover artwork designed to nurture your emotional well-being. Each collection offers
              a unique pathway to healing, growth, and inner peace.
            </p>

            {/* Therapeutic Categories Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Liberation & Freedom</h3>
                <p className="text-sm text-gray-600">Birds collection - Release limiting beliefs and soar beyond boundaries</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Growth & Renewal</h3>
                <p className="text-sm text-gray-600">Flowers collection - Embrace transformation and gentle healing energy</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Peace & Sanctuary</h3>
                <p className="text-sm text-gray-600">Towns collection - Find grounding and create emotional refuge</p>
              </div>
            </div>
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
