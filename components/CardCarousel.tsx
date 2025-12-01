'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface CardCarouselProps {
  children: ReactNode[]
  className?: string
}

export default function CardCarousel({ children, className = '' }: CardCarouselProps) {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const isRTL = language === 'ar'
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const dragStartTime = useRef(0)

  const totalCards = children.length

  // Initialize scroll position on mount
  useEffect(() => {
    if (scrollRef.current && currentIndex === 0) {
      // Small delay to ensure layout is ready
      setTimeout(() => {
        scrollToCard(0)
      }, 100)
    }
  }, [])

  // Update scroll buttons visibility
  const updateScrollButtons = () => {
    if (!scrollRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    const threshold = 5 // threshold for "at edge"
    
    // For RTL, scrollLeft is negative or behaves differently
    if (isRTL) {
      // In RTL, scrollLeft might be negative or work differently
      setCanScrollRight(Math.abs(scrollLeft) > threshold)
      setCanScrollLeft(Math.abs(scrollLeft) < maxScroll - threshold)
    } else {
      setCanScrollLeft(scrollLeft > threshold)
      setCanScrollRight(scrollLeft < maxScroll - threshold)
    }
  }

  // Scroll to specific card index - works with RTL (fast transition)
  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return
    
    const container = scrollRef.current
    const cards = container.children
    if (!cards[index]) return
    
    const cardElement = cards[index] as HTMLElement
    
    // Use scrollIntoView for better RTL support with fast animation
    const containerRect = container.getBoundingClientRect()
    const cardRect = cardElement.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2
    const cardCenter = cardRect.left + cardRect.width / 2
    const currentScroll = container.scrollLeft
    const scrollDistance = cardCenter - containerCenter
    
    // Fast animation: 200ms for smooth but quick transition
    const startTime = performance.now()
    const duration = 200
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Smooth easing function (ease-out)
      const ease = 1 - Math.pow(1 - progress, 3)
      
      container.scrollLeft = currentScroll + scrollDistance * ease
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        // Ensure final position is correct
        cardElement.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
    
    requestAnimationFrame(animateScroll)
  }

  // Handle next/previous navigation - works with RTL
  const goToNext = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < totalCards) {
      setCurrentIndex(nextIndex)
      // Use setTimeout to ensure state update before scroll
      setTimeout(() => {
        scrollToCard(nextIndex)
      }, 10)
    }
  }

  const goToPrevious = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex)
      // Use setTimeout to ensure state update before scroll
      setTimeout(() => {
        scrollToCard(prevIndex)
      }, 10)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (isRTL) {
          goToNext()
        } else {
          goToPrevious()
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (isRTL) {
          goToPrevious()
        } else {
          goToNext()
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('keydown', handleKeyDown)
      container.setAttribute('tabindex', '0')
    }

    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [currentIndex, isRTL])

  // Update data attributes for active card glow effect
  useEffect(() => {
    if (!scrollRef.current) return
    
    const cards = scrollRef.current.children
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement
      const isActive = i === currentIndex
      card.setAttribute('data-is-active', isActive.toString())
      
      // Update glow effect in child card
      const cardContainer = card.querySelector('.card-glow-container') as HTMLElement
      if (cardContainer) {
        cardContainer.setAttribute('data-is-active', isActive.toString())
      }
    }
  }, [currentIndex, totalCards])

  // Handle scroll events to update current index - works with RTL
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      // Debounce scroll events for better performance
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        updateScrollButtons()
        
        // Find the card closest to center - works with RTL
        const containerRect = container.getBoundingClientRect()
        const containerCenter = containerRect.left + containerRect.width / 2
        
        let closestIndex = 0
        let closestDistance = Infinity
        
        for (let i = 0; i < container.children.length; i++) {
          const card = container.children[i] as HTMLElement
          const cardRect = card.getBoundingClientRect()
          const cardCenter = cardRect.left + cardRect.width / 2
          const distance = Math.abs(cardCenter - containerCenter)
          
          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = i
          }
        }
        
        if (closestIndex !== currentIndex) {
          setCurrentIndex(closestIndex)
        }
      }, 50)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollButtons()

    return () => {
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [currentIndex, totalCards, isRTL])

  // Mouse drag handlers - professional native scroll approach
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    startX.current = e.pageX
    scrollLeft.current = scrollRef.current.scrollLeft
    // Prevent text selection during drag
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX
    const deltaX = x - startX.current
    // Smooth direct scroll update
    scrollRef.current.scrollLeft = scrollLeft.current - deltaX
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    // CSS scroll-snap will handle the snap automatically
  }

  // Touch handlers - professional native scroll with momentum
  const touchStartX = useRef(0)
  const touchScrollLeft = useRef(0)
  const lastTouchX = useRef(0)
  const velocity = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    touchStartX.current = e.touches[0].pageX
    lastTouchX.current = e.touches[0].pageX
    touchScrollLeft.current = scrollRef.current.scrollLeft
    velocity.current = 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    const x = e.touches[0].pageX
    const deltaX = x - touchStartX.current
    const deltaTime = 16 // Approximate frame time
    
    // Calculate velocity for momentum
    velocity.current = (x - lastTouchX.current) / deltaTime
    lastTouchX.current = x
    
    // Direct scroll update - smooth and responsive
    scrollRef.current.scrollLeft = touchScrollLeft.current - deltaX
  }

  const handleTouchEnd = () => {
    if (!scrollRef.current) return
    
    // CSS scroll-snap will handle the snap automatically
    // The browser's native scroll-snap will provide smooth, professional snapping
  }

  // Arrow button component
  const ArrowButton = ({ 
    direction, 
    onClick, 
    disabled 
  }: { 
    direction: 'left' | 'right'
    onClick: (e: React.MouseEvent) => void
    disabled: boolean
  }) => {
    const isLeft = direction === 'left'
    // Determine if button should be shown based on current index and direction
    let show = false
    if (isLeft) {
      show = isRTL ? currentIndex < totalCards - 1 : currentIndex > 0
    } else {
      show = isRTL ? currentIndex > 0 : currentIndex < totalCards - 1
    }
    
    if (!show || disabled) return null

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          absolute top-1/2 -translate-y-1/2 z-30
          ${isRTL ? (isLeft ? 'left-2' : 'right-2') : (isLeft ? 'left-2' : 'right-2')}
          w-10 h-10 sm:w-12 sm:h-12
          flex items-center justify-center
          rounded-full
          bg-dark-navy/90 backdrop-blur-sm
          border-2 border-purple-500/70
          text-purple-400
          hover:text-neon-purple
          hover:border-neon-purple
          hover:bg-dark-navy
          active:scale-95
          transition-all duration-200
          shadow-xl
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-purple-500/50
        `}
        aria-label={isLeft ? (isRTL ? 'Next card' : 'Previous card') : (isRTL ? 'Previous card' : 'Next card')}
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
      </button>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Scrollable container - professional native scroll with CSS snap */}
      <div
        ref={scrollRef}
        className={`
          flex overflow-x-auto overflow-y-hidden
          snap-x snap-mandatory
          scrollbar-hide
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={`
              flex-shrink-0
              w-[90%] sm:w-[90%] md:w-[48%] lg:w-[33.333%]
              px-2
              snap-center
              transition-all duration-300 ease-out
              ${index === currentIndex 
                ? 'scale-100 opacity-100' 
                : 'scale-90 opacity-70'
              }
            `}
            style={{
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always',
            }}
            data-card-index={index}
            data-is-active={index === currentIndex}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Arrow buttons - only show on mobile */}
      <div className="sm:hidden">
        <ArrowButton
          direction="left"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (isRTL) {
              goToNext()
            } else {
              goToPrevious()
            }
          }}
          disabled={isRTL ? currentIndex >= totalCards - 1 : currentIndex <= 0}
        />
        <ArrowButton
          direction="right"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (isRTL) {
              goToPrevious()
            } else {
              goToNext()
            }
          }}
          disabled={isRTL ? currentIndex <= 0 : currentIndex >= totalCards - 1}
        />
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

