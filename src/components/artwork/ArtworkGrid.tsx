'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Artwork, Category } from '@/lib/db'
import { ArtworkCard } from './ArtworkCard'
import { cn } from '@/lib/utils'

interface ArtworkGridProps {
  artworks: Array<Artwork & {
    dimensions: { width: number; height: number; unit: string }
    primaryImage: { url: string; altText: string }
    pricing: { original?: number }
  }>
  categories?: Category[]
  initialCategory?: Category | 'all'
  onTagFilter?: (tag: string) => void
  className?: string
}

const categoryLabels: Record<Category | 'all', string> = {
  all: 'All Collections',
  birds: 'Liberation & Freedom',
  flowers: 'Growth & Renewal',
  towns: 'Peace & Sanctuary',
}

const categoryDescriptions: Record<Category | 'all', string> = {
  all: 'Explore all therapeutic art collections',
  birds: 'Release limiting beliefs and soar beyond boundaries',
  flowers: 'Embrace transformation and gentle healing energy',
  towns: 'Find grounding and create emotional refuge',
}

export function ArtworkGrid({
  artworks,
  categories = ['birds', 'flowers', 'towns'],
  initialCategory = 'all',
  onTagFilter,
  className
}: ArtworkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(initialCategory)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(12)
  const { ref, inView } = useInView({ threshold: 0.1 })

  // Filter artworks
  const filteredArtworks = artworks.filter(artwork => {
    const categoryMatch = selectedCategory === 'all' || artwork.category === selectedCategory
    const tagMatch = !selectedTag || artwork.emotionalTags?.includes(selectedTag)
    return categoryMatch && tagMatch
  })

  // Load more when scrolling
  useEffect(() => {
    if (inView && displayCount < filteredArtworks.length) {
      setDisplayCount(prev => prev + 12)
    }
  }, [inView, displayCount, filteredArtworks.length])

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null)
    } else {
      setSelectedTag(tag)
      onTagFilter?.(tag)
    }
  }

  return (
    <div className={cn('space-y-8', className)}>
            {/* Enhanced Category Filter with Mobile-First Design */}
      <div className="text-center mb-8">
        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6">Choose Your Healing Journey</h3>

        {/* Mobile-Optimized Category Pills */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 justify-center mb-4 sm:mb-6">
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSelectedTag(null)
            }}
            className={cn(
              'w-full sm:w-auto px-4 sm:px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2 touch-manipulation',
              selectedCategory === 'all'
                ? 'bg-turquoise-600 text-white border-turquoise-600 shadow-lg font-semibold scale-105'
                : 'bg-white text-gray-700 border-gray-200 hover:border-turquoise-300 hover:bg-turquoise-50 active:scale-95'
            )}
          >
            {categoryLabels.all}
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setSelectedTag(null)
              }}
              className={cn(
                'w-full sm:w-auto px-4 sm:px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2 touch-manipulation',
                selectedCategory === category
                  ? 'bg-turquoise-600 text-white border-turquoise-600 shadow-lg font-semibold scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-turquoise-300 hover:bg-turquoise-50 active:scale-95'
              )}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Active Category Description - Mobile Optimized */}
        <p className="text-sm sm:text-base text-gray-600 italic max-w-sm sm:max-w-md mx-auto px-4">
          {categoryDescriptions[selectedCategory]}
        </p>
      </div>

                  {/* Simplified Emotional Tag Filter */}
      {selectedTag && (
        <div className="text-center bg-turquoise-50 rounded-lg p-4 border border-turquoise-100 mb-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-medium text-turquoise-800">
              Showing artworks for: <strong>{selectedTag.replace('_', ' ')}</strong>
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-turquoise-600 hover:text-turquoise-800 font-bold text-lg leading-none bg-turquoise-100 hover:bg-turquoise-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              title="Clear filter"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Results Summary - Only show if not using tag filter */}
      {!selectedTag && (
        <div className="text-center text-sm text-gray-600 mb-6">
          {selectedCategory !== 'all' ? (
            <span>Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} in <strong>{categoryLabels[selectedCategory]}</strong></span>
          ) : (
            <span>{filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} in the collection</span>
          )}
        </div>
      )}

      {/* Mobile-Optimized Artwork Grid with Improved Alignment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-max">
        <AnimatePresence mode="popLayout">
          {filteredArtworks.slice(0, displayCount).map((artwork, index) => (
            <motion.div
              key={artwork.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ArtworkCard
                artwork={artwork}
                priority={index < 6}
                onTagClick={handleTagClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load more trigger */}
      {displayCount < filteredArtworks.length && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-turquoise-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-turquoise-500 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-turquoise-500 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      )}

      {/* Accessible Empty state */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg">No artworks found matching your criteria.</p>
            <p className="text-sm text-gray-500">Try adjusting your filters to discover more healing art.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedTag(null)
              }}
              className="mt-4 inline-flex items-center px-4 py-2 text-turquoise-600 hover:text-turquoise-700 font-medium bg-turquoise-50 hover:bg-turquoise-100 rounded-lg transition-colors touch-manipulation"
              aria-label="Clear all filters and show all artworks"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}