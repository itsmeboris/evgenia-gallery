import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Image optimization utilities
export function generateBlurDataURL(width: number = 8, height: number = 8): string {
  // Generate a simple blur placeholder
  const canvas = typeof window !== 'undefined'
    ? document.createElement('canvas')
    : null;

  if (!canvas) {
    // Fallback blur data URL for SSR
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }

  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Create a simple gradient for blur effect
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f3f4f6')
    gradient.addColorStop(0.5, '#e5e7eb')
    gradient.addColorStop(1, '#d1d5db')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  return canvas.toDataURL('image/jpeg', 0.1)
}

// Optimized image sizes for responsive display
export const artworkImageSizes = {
  gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  detail: '(max-width: 1024px) 100vw, 50vw',
  thumbnail: '(max-width: 640px) 25vw, 20vw'
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDimensions(dimensions: { width: number; height: number; unit: string }): string {
  return `${dimensions.width}${dimensions.unit} × ${dimensions.height}${dimensions.unit}`
}