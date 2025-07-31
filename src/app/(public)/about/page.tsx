import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-sage-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Artist Portrait */}
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-sage-100">
                <Image
                  src="/images/artist/evgenia-portrait.jpg"
                  alt="Evgenia Portnov - Artist Portrait"
                  fill
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>

              {/* Floating quote */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <p className="text-sm text-gray-600 italic">
                  &ldquo;Art became my bridge from logic to healing—a language that speaks directly to the soul.&rdquo;
                </p>
              </div>
            </div>

            {/* Artist Story */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-display text-gray-900 mb-4">
                  Evgenia Portnov
                </h1>
                <p className="text-xl text-turquoise-600 font-medium">
                  From Technology to Therapeutic Art
                </p>
              </div>

              <div className="prose prose-lg text-gray-700">
                <p>
                  My journey from the analytical world of technology to the intuitive realm of therapeutic art
                  wasn&apos;t planned—it was necessary. After years of building digital solutions, I discovered that
                  my true calling lay in creating visual experiences that heal, transform, and connect us to our
                  deepest emotions.
                </p>

                <p>
                  What began as a personal exploration of creativity during a career transition became a profound
                  understanding: art has the power to facilitate healing in ways that words often cannot. Each
                  brushstroke became a meditation, each color choice a step toward emotional liberation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    View Gallery
                  </Button>
                </Link>
                <Link href="#philosophy">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    My Philosophy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artistic Philosophy Section */}
      <section id="philosophy" className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display text-gray-900 mb-4">
              The Healing Power of Art
            </h2>
            <p className="text-xl text-gray-600">
              My artistic philosophy centers on the belief that art can be a profound catalyst for personal transformation and emotional healing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Birds - Liberation */}
            <div className="text-center p-6 rounded-xl bg-blue-50">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Liberation</h3>
              <p className="text-gray-600">
                Birds represent our capacity to transcend limitations and soar beyond self-imposed boundaries.
                These pieces inspire emotional release and spiritual freedom.
              </p>
            </div>

            {/* Flowers - Growth */}
            <div className="text-center p-6 rounded-xl bg-rose-50">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3V1m0 6V5m0 6v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">
                Flowers embody nature&apos;s infinite capacity for renewal and transformation. These works encourage
                patience with personal growth and the courage to bloom authentically.
              </p>
            </div>

            {/* Towns - Sanctuary */}
            <div className="text-center p-6 rounded-xl bg-amber-50">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sanctuary</h3>
              <p className="text-gray-600">
                Towns represent the emotional homes we create within ourselves—safe spaces for reflection,
                memory, and the peaceful integration of our experiences.
              </p>
            </div>
          </div>

          {/* Personal Statement */}
          <div className="bg-sage-50 rounded-2xl p-8 lg:p-12">
            <blockquote className="text-xl lg:text-2xl text-gray-800 italic text-center leading-relaxed">
              &ldquo;In my transition from technology to art, I discovered that healing isn&apos;t about forgetting our past—
              it&apos;s about transforming our relationship with it. Each painting is an invitation for viewers to embark
              on their own journey of emotional discovery and growth.&rdquo;
            </blockquote>
            <div className="text-center mt-6">
              <cite className="text-gray-600 font-medium">— Evgenia Portnov</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-display text-gray-900 text-center mb-12">
            My Artistic Journey
          </h2>

          <div className="space-y-8">
            {/* Technology Background */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Technology Professional</h3>
                <p className="text-gray-600 mt-1">
                  Years of building digital solutions taught me precision, problem-solving, and the beauty
                  of systematic thinking—skills that now inform my artistic process.
                </p>
              </div>
            </div>

            {/* Career Transition */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">The Transformation</h3>
                <p className="text-gray-600 mt-1">
                  A period of personal reflection led to the realization that my true calling lay in creating
                  meaningful connections through visual art rather than digital interfaces.
                </p>
              </div>
            </div>

            {/* Artistic Discovery */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Healing Through Art</h3>
                <p className="text-gray-600 mt-1">
                  Each brushstroke became a meditation, each canvas a space for emotional exploration.
                  I discovered that art could facilitate healing in profound and unexpected ways.
                </p>
              </div>
            </div>

            {/* Current Mission */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-turquoise-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Mission</h3>
                <p className="text-gray-600 mt-1">
                  Creating therapeutic art that serves as a bridge between the analytical and intuitive,
                  helping others find their own paths to emotional healing and personal growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display text-gray-900 mb-6">
            Begin Your Own Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore my gallery and discover which pieces speak to your own path of healing and transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Explore Gallery
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Connect With Me
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}