'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Testimonial {
  name: string
  position: string
  company: string
  image: string
  comment: string
}

export default function Testimonials() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      name: t('testimonial1_name'),
      position: t('testimonial1_position'),
      company: '',
      image: '/احمد محمد.png',
      comment: t('testimonial1_comment'),
    },
    {
      name: t('testimonial2_name'),
      position: t('testimonial2_position'),
      company: t('testimonial2_company'),
      image: '/ميثاء بنت سلطان.jpg',
      comment: t('testimonial2_comment'),
    },
    {
      name: t('testimonial3_name'),
      position: t('testimonial3_position'),
      company: t('testimonial3_company'),
      image: '/خالد عبدالله.jpg',
      comment: t('testimonial3_comment'),
    },
    {
      name: t('testimonial4_name'),
      position: t('testimonial4_position'),
      company: '',
      image: '/راكان.jpg',
      comment: t('testimonial4_comment'),
    },
    {
      name: t('testimonial5_name'),
      position: t('testimonial5_position'),
      company: '',
      image: '/سعود.jpg',
      comment: t('testimonial5_comment'),
    },
  ]

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    const x = e.touches[0].pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate section entrance
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    )

    // Animate title
    const title = sectionRef.current.querySelector('.section-title')
    if (title) {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }

    // Animate cards with 3D effect
    const cards = sectionRef.current.querySelectorAll('.testimonial-card')
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
          rotationY: -20,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }
  }, [])

  // Simple hover effect - only forward movement (z-axis)
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.testimonial-card')
    if (!cards) return

    cards.forEach((card) => {
      const cardElement = card as HTMLElement
      
      const handleMouseEnter = () => {
        // Only move forward on hover - no rotation, no side movement
        gsap.to(cardElement, {
          z: 80,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      const handleMouseLeave = () => {
        // Return to scroll-based position
        const containerRect = containerRef.current?.getBoundingClientRect()
        const cardRect = cardElement.getBoundingClientRect()
        if (containerRect) {
          const containerCenter = containerRect.left + containerRect.width / 2
          const cardCenter = cardRect.left + cardRect.width / 2
          const distanceFromCenter = (cardCenter - containerCenter) / (containerRect.width / 2)
          const rotateY = distanceFromCenter * 22
          const translateZ = Math.abs(distanceFromCenter) * 30
          const scale = 1 - Math.abs(distanceFromCenter) * 0.1
          
          gsap.to(cardElement, {
            rotationY: rotateY,
            z: translateZ,
            scale: scale,
            opacity: 1 - Math.abs(distanceFromCenter) * 0.15,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      }

      cardElement.addEventListener('mouseenter', handleMouseEnter)
      cardElement.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        cardElement.removeEventListener('mouseenter', handleMouseEnter)
        cardElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [containerRef])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 md:px-6 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('testimonials_title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('testimonials_subtitle')}
          </p>
        </div>

        {/* Draggable 3D Cards Container - Show 2 cards at a time */}
        <div
          ref={containerRef}
          className="relative overflow-x-auto overflow-y-hidden pb-8 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
            .comment-scroll::-webkit-scrollbar {
              width: 4px;
            }
            .comment-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .comment-scroll::-webkit-scrollbar-thumb {
              background: rgba(168, 85, 247, 0.3);
              border-radius: 2px;
            }
            .comment-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(168, 85, 247, 0.5);
            }
          `}</style>
          
          <div 
            className="flex gap-4 md:gap-6 px-4 md:px-8"
            style={{ 
              width: 'max-content',
              perspective: '1500px',
              perspectiveOrigin: 'center center',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  index,
  containerRef,
}: {
  testimonial: Testimonial
  index: number
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })

  // Update rotation based on scroll position for 3D effect
  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return

    const container = containerRef.current
    const card = cardRef.current

    const updateRotation = () => {
      if (!containerRef.current || !cardRef.current) return
      
      // Get card position relative to container center
      const containerRect = container.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      
      const containerCenter = containerRect.left + containerRect.width / 2
      const cardCenter = cardRect.left + cardRect.width / 2
      
      // Calculate distance from center
      const distanceFromCenter = (cardCenter - containerCenter) / (containerRect.width / 2)
      
      // Apply 3D rotation based on position - smoother and less aggressive
      const rotateY = distanceFromCenter * 22 // Max 22 degrees rotation (reduced from 35)
      const rotateX = Math.abs(distanceFromCenter) * 5 // Reduced X rotation
      const translateZ = Math.abs(distanceFromCenter) * 30 // Reduced Z translation for depth
      const scale = 1 - Math.abs(distanceFromCenter) * 0.1 // Reduced scale down
      const opacity = 1 - Math.abs(distanceFromCenter) * 0.15 // Reduced fade for better visibility
      
      setRotation({ x: rotateX, y: rotateY, z: translateZ })
      
      // Apply transform with scale and opacity
      gsap.to(card, {
        rotationY: rotateY,
        rotationX: rotateX,
        z: translateZ,
        scale: scale,
        opacity: opacity,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateRotation)
    }

    container.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateRotation)
    updateRotation() // Initial update

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateRotation)
    }
  }, [containerRef])

  return (
    <div
      ref={cardRef}
      className="testimonial-card relative group flex-shrink-0"
      style={{
        width: '380px',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        scrollSnapAlign: 'center',
      }}
    >
      {/* Glassmorphism Card with 3D Effect */}
      <div 
        className="relative h-full p-5 md:p-6 bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:border-white/20 hover:shadow-[0_12px_40px_0_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-300 overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30"></div>
        
        {/* 3D Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
          {/* Comment */}
          <p className="text-gray-200 text-sm md:text-base leading-loose mb-4 max-h-[180px] overflow-y-auto pr-2 comment-scroll">
            "{testimonial.comment}"
          </p>

          {/* Client Info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 flex-shrink-0 shadow-lg">
              {testimonial.image.startsWith('data:') ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%239C27B0" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24"%3E' + testimonial.name.charAt(0) + '%3C/text%3E%3C/svg%3E'
                  }}
                />
              )}
            </div>

            {/* Name and Position */}
            <div className="flex-1">
              <h4 className="text-white font-bold text-lg mb-1">
                {testimonial.name}
              </h4>
              <p className="text-gray-400 text-sm">
                {testimonial.position}
              </p>
              {testimonial.company && (
                <p className="text-purple-400 text-sm">
                  {testimonial.company}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-300"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-300"></div>
      </div>
    </div>
  )
}
