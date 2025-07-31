import { cn } from '@/lib/utils'

interface EmotionalTagsProps {
  tags: string[]
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: (tag: string) => void
}

// Color mapping for different emotional themes
const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  // Positive emotions
  joy: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  peace: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  love: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  hope: { bg: 'bg-turquoise-50', text: 'text-turquoise-700', border: 'border-turquoise-200' },
  
  // Transformative emotions
  growth: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  transformation: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  renewal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  
  // Grounding emotions
  grounding: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  wisdom: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  strength: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
  
  // Creative emotions
  creativity: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  freedom: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  expression: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
}

// Default color for tags not in the mapping
const defaultColor = { bg: 'bg-turquoise-50', text: 'text-turquoise-700', border: 'border-turquoise-200' }

export function EmotionalTags({ tags, size = 'md', className, onClick }: EmotionalTagsProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => {
        const colors = tagColors[tag.toLowerCase()] || defaultColor
        const isClickable = !!onClick

        const className = cn(
          'inline-flex items-center rounded-full font-medium border transition-all duration-200',
          sizeClasses[size],
          colors.bg,
          colors.text,
          colors.border,
          isClickable && 'cursor-pointer hover:scale-105 hover:shadow-sm'
        )

        if (isClickable) {
          return (
            <button
              key={tag}
              onClick={() => onClick(tag)}
              className={className}
              title={`Filter by ${tag}`}
              type="button"
            >
              {tag}
            </button>
          )
        }

        return (
          <span
            key={tag}
            className={className}
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
}