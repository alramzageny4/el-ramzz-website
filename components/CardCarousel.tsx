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
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

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

  // Scroll to specific card index
  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return
    
    const container = scrollRef.current
    const cardWidth = container.clientWidth * 0.9 // 90% of container width
    const gap = 16 // gap between cards
    const scrollPosition = index * (cardWidth + gap)
    
    // For RTL, we need to handle scroll differently
    if (isRTL) {
      // In RTL mode, scroll to negative position or use scrollLeft differently
      const maxScroll = container.scrollWidth - container.clientWidth
      container.scrollTo({
        left: maxScroll - scrollPosition,
        behavior: 'smooth'
      })
    } else {
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  // Handle next/previous navigation
  const goToNext = () => {
    if (currentIndex < totalCards - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      scrollToCard(nextIndex)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      scrollToCard(prevIndex)
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

  // Handle scroll events to update current index
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      updateScrollButtons()
      
      // Calculate current card index based on scroll position
      const cardWidth = container.clientWidth * 0.9
      const gap = 16
      let scrollPos = container.scrollLeft
      
      if (isRTL) {
        // In RTL, calculate from the end
        const maxScroll = container.scrollWidth - container.clientWidth
        scrollPos = maxScroll - scrollPos
      }
      
      const newIndex = Math.round(scrollPos / (cardWidth + gap))
      const clampedIndex = Math.max(0, Math.min(newIndex, totalCards - 1))
      
      if (clampedIndex !== currentIndex) {
        setCurrentIndex(clampedIndex)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollButtons()

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [currentIndex, totalCards, isRTL])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Snap to nearest card after drag
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.9
      const gap = 16
      let scrollPos = scrollRef.current.scrollLeft
      
      if (isRTL) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        scrollPos = maxScroll - scrollPos
      }
      
      const newIndex = Math.round(scrollPos / (cardWidth + gap))
      scrollToCard(Math.max(0, Math.min(newIndex, totalCards - 1)))
    }
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    // Snap to nearest card after touch
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.9
      const gap = 16
      let scrollPos = scrollRef.current.scrollLeft
      
      if (isRTL) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        scrollPos = maxScroll - scrollPos
      }
      
      const newIndex = Math.round(scrollPos / (cardWidth + gap))
      scrollToCard(Math.max(0, Math.min(newIndex, totalCards - 1)))
    }
  }

  // Arrow button component
  const ArrowButton = ({ 
    direction, 
    onClick, 
    disabled 
  }: { 
    direction: 'left' | 'right'
    onClick: () => void
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
    
    if (!show) return null

    return (
      <button
        onClick={onClick}
        disabled={disabled || !show}
        className={`
          absolute top-1/2 -translate-y-1/2 z-20
          ${isRTL ? (isLeft ? 'left-2' : 'right-2') : (isLeft ? 'left-2' : 'right-2')}
          w-10 h-10 sm:w-12 sm:h-12
          flex items-center justify-center
          rounded-full
          bg-dark-navy/80 backdrop-blur-sm
          border border-purple-500/50
          text-purple-400
          hover:text-neon-purple
          hover:border-neon-purple
          hover:bg-dark-navy/90
          active:scale-95
          transition-all duration-200
          shadow-lg
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
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
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={`
          flex overflow-x-auto overflow-y-hidden
          snap-x snap-mandatory
          scrollbar-hide
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
          scroll-smooth
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
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
              transition-transform duration-300 ease-out
              ${index === currentIndex 
                ? 'scale-100 opacity-100' 
                : 'scale-90 opacity-70'
              }
            `}
            style={{
              scrollSnapAlign: 'center',
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Arrow buttons - only show on mobile */}
      <div className="sm:hidden">
        <ArrowButton
          direction="left"
          onClick={goToPrevious}
          disabled={currentIndex === 0 && !isRTL || currentIndex === totalCards - 1 && isRTL}
        />
        <ArrowButton
          direction="right"
          onClick={goToNext}
          disabled={currentIndex === totalCards - 1 && !isRTL || currentIndex === 0 && isRTL}
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

