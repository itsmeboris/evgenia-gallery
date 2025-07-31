'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Artwork } from '@/lib/db'
import { EmotionalTags } from './EmotionalTags'
import { formatPrice, formatDimensions, artworkImageSizes } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ArtworkCardProps {
  artwork: Artwork & {
    dimensions: { width: number; height: number; unit: string }
    primaryImage: { url: string; altText: string }
    pricing: { original?: number }
  }
  priority?: boolean
  onTagClick?: (tag: string) => void
}

export function ArtworkCard({ artwork, priority = false, onTagClick }: ArtworkCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Calculate aspect ratio for image container
  const aspectRatio = artwork.dimensions.height / artwork.dimensions.width

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/artwork/${artwork.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          {/* Image container with aspect ratio */}
          <div
            className="relative w-full"
            style={{ paddingBottom: `${aspectRatio * 100}%` }}
          >
            <Image
              src={artwork.primaryImage.url}
              alt={artwork.primaryImage.altText}
              fill
              sizes={artworkImageSizes.gallery}
              quality={85}
              className={cn(
                "object-cover transition-all duration-500",
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
                isHovered && 'scale-110'
              )}
              onLoad={() => setImageLoaded(true)}
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>

          {/* Hover overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
            isHovered ? 'opacity-100' : 'opacity-0'
          )}>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-sm font-medium mb-2">{artwork.medium}</p>
              <p className="text-xs">{formatDimensions(artwork.dimensions)}</p>
            </div>
          </div>

          {/* Status badges */}
          {artwork.availabilityStatus === 'sold' && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Sold
            </div>
          )}
          {artwork.featured && artwork.availabilityStatus === 'available' && (
            <div className="absolute top-2 right-2 bg-turquoise-500 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
          )}
        </div>

                <div className="mt-3 space-y-2">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-turquoise-600 transition-colors leading-tight">
            {artwork.title}
          </h3>

          {/* Compact Emotional tags for clean layout */}
          {artwork.emotionalTags && artwork.emotionalTags.length > 0 && (
            <div onClick={(e) => e.preventDefault()} className="min-h-[1.5rem]">
              <EmotionalTags
                tags={artwork.emotionalTags.slice(0, 2)}
                size="sm"
                onClick={onTagClick}
              />
            </div>
          )}

          {/* Price */}
          <p className="text-base font-medium text-gray-900">
            {artwork.pricing.original
              ? formatPrice(artwork.pricing.original)
              : 'Price on request'
            }
          </p>
        </div>
      </Link>
    </motion.article>
  )
}