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
  all: 'All Works',
  birds: 'Birds',
  flowers: 'Flowers',
  towns: 'Towns & Landscapes',
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
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedCategory('all')
            setSelectedTag(null)
          }}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedCategory === 'all'
              ? 'bg-turquoise-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              selectedCategory === category
                ? 'bg-turquoise-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Active tag filter */}
      {selectedTag && (
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Filtering by emotion:
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-turquoise-100 text-turquoise-700">
              {selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="ml-2 hover:text-turquoise-900"
              >
                ×
              </button>
            </span>
          </span>
        </div>
      )}

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

      {/* Empty state */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No artworks found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSelectedTag(null)
            }}
            className="mt-4 text-turquoise-600 hover:text-turquoise-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}