'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/contexts/LanguageContext'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LazyVideo from '@/components/LazyVideo'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Helper function to extract YouTube video ID
function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to extract Vimeo video ID
function getVimeoId(url: string): string | null {
  const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i
  const match = url.match(regExp)
  return match ? match[1] : null
}

export default function VideoEditingPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<{
    type: 'youtube' | 'vimeo' | 'direct' | null
    url: string
    title: string
  } | null>(null)

  // Categories data
  const categories = [
    {
      id: 'sports',
      title: t('video_category_sports'),
      description: t('video_category_sports_desc'),
      icon: 'glb', // Use GLB model instead of emoji
      items: [
        {
          title: t('video_sports_item1'),
          description: t('video_sports_item1_desc'),
          image: '/11.png',
          videoUrl: '',
          videoSrc: 'https://video-cdn-elramz.b-cdn.net/exercises/3.mp4', // Video for preview
          link: '/video-editing/sports-exercises', // Link to separate page
        },
        {
          title: t('video_sports_item2'),
          description: t('video_sports_item2_desc'),
          image: '/11.png',
          videoUrl: '',
          videoSrc: 'https://video-cdn-elramz.b-cdn.net/4.mp4', // Video for preview
          link: '/video-editing/sports-ads', // Link to separate page
        },
      ],
    },
    {
      id: 'real-estate',
      title: t('video_category_real_estate'),
      description: t('video_category_real_estate_desc'),
      icon: '🏢',
      items: [
        {
          title: t('video_real_estate_item1'),
          description: t('video_real_estate_item1_desc'),
          image: '/11.png',
          videoUrl: '',
          videoSrc: 'https://video-cdn-elramz.b-cdn.net/real%20estate-20251127T095223Z-1-001/real%20estate/Drone/1.mp4', // Video for preview
          link: '/video-editing/real-estate-drone', // Link to separate page
        },
        {
          title: t('video_real_estate_item2'),
          description: t('video_real_estate_item2_desc'),
          image: '/11.png',
          videoUrl: '',
          videoSrc: 'https://video-cdn-elramz.b-cdn.net/real%20estate-20251127T095223Z-1-001/real%20estate/Real%20estate%20offers/3.mp4', // Video for preview
          link: '/video-editing/real-estate-content', // Link to separate page
        },
      ],
    },
    {
      id: 'medical',
      title: t('video_category_medical'),
      description: t('video_category_medical_desc'),
      icon: '🏥',
      items: [
        {
          title: t('video_medical_item1'),
          description: t('video_medical_item1_desc'),
          image: '/11.png',
          videoUrl: '',
          videoSrc: 'https://video-cdn-elramz.b-cdn.net/doctor-20251127T104520Z-1-001/doctor/1.mp4', // Video for preview
          link: '/video-editing/medical-promotion', // Link to separate page
        },
      ],
    },
    {
      id: 'cars',
      title: t('video_category_cars'),
      description: t('video_category_cars_desc'),
      icon: '🚗',
      items: [
        {
          title: t('video_cars_item1'),
          description: t('video_cars_item1_desc'),
          image: '/11.png',
          videoUrl: '',
          videoSrc: 'https://video-cdn-elramz.b-cdn.net/car/1.mp4', // Video for preview
          link: '/video-editing/cars-editing', // Link to separate page
        },
      ],
    },
  ]

  useEffect(() => {
    // Prefetch all video pages on mount for instant navigation
    const videoPages = [
      '/video-editing/sports-exercises',
      '/video-editing/sports-ads',
      '/video-editing/real-estate-drone',
      '/video-editing/real-estate-content',
      '/video-editing/medical-promotion',
      '/video-editing/cars-editing',
    ]
    
    // Prefetch pages in background
    videoPages.forEach(page => {
      router.prefetch(page)
    })

    // Animate sections on scroll - optimized for performance
    let sectionsAnimation: gsap.core.Tween | null = null
    const cardAnimations: gsap.core.Tween[] = []

    if (categoriesRef.current) {
      const sections = categoriesRef.current.children
      sectionsAnimation = gsap.fromTo(
        sections,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5, // Reduced from 0.8
          stagger: 0.15, // Reduced from 0.2
          ease: 'power2.out', // Simpler easing
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }

    // Animate cards within each section - optimized
    const categorySections = document.querySelectorAll('.category-section')
    categorySections.forEach((section) => {
      const cards = section.querySelectorAll('.category-card')
      const animation = gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4, // Reduced from 0.6
          stagger: 0.08, // Reduced from 0.1
          ease: 'power2.out', // Simpler easing
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
      cardAnimations.push(animation)
    })

    // Cleanup function
    return () => {
      if (sectionsAnimation) {
        sectionsAnimation.kill()
      }
      cardAnimations.forEach((anim) => anim.kill())
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === categoriesRef.current || 
            Array.from(categorySections).some(section => trigger.vars.trigger === section)) {
          trigger.kill()
        }
      })
    }
  }, [router])

  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative pt-32 pb-16 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="section-title text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {t('video_editing_title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('video_editing_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Sections */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
        
        <div ref={categoriesRef} className="max-w-7xl mx-auto relative z-10 space-y-24">
          {categories.map((category, categoryIndex) => (
            <div
              key={category.id}
              className="category-section"
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4">
                  {category.title}
                </h2>
                <div className="w-20 h-1 bg-gradient-purple-blue mx-auto mb-4"></div>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Category Cards */}
              <div className={`grid ${
                category.items.length === 1 
                  ? 'grid-cols-1 max-w-md mx-auto' 
                  : category.items.length === 2 
                  ? 'grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto' 
                  : category.items.length === 4
                  ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto'
                  : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8'
              }`}>
                {category.items.map((item, itemIndex) => {
                  const hasLink = (item as any).link
                  const hasVideo = item.videoUrl || item.videoSrc
                  const preserveAspectRatio = (item as any).preserveAspectRatio
                  
                  const handleVideoClick = () => {
                    if (item.videoUrl || item.videoSrc) {
                      let type: 'youtube' | 'vimeo' | 'direct' = 'direct'
                      let url = item.videoSrc || item.videoUrl || ''
                      
                      if (item.videoUrl) {
                        if (getYouTubeId(item.videoUrl)) {
                          type = 'youtube'
                          url = item.videoUrl
                        } else if (getVimeoId(item.videoUrl)) {
                          type = 'vimeo'
                          url = item.videoUrl
                        }
                      }
                      
                      setSelectedVideo({ type, url, title: item.title })
                    }
                  }
                  
                  const cardContent = (
                    <div 
                      className={`relative h-full p-2 sm:p-4 md:p-6 bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 md:border-2 rounded-lg md:rounded-xl hover:border-neon-purple transition-all duration-300 hover:shadow-glow-purple hover:-translate-y-2 ${
                        !hasLink ? 'cursor-pointer' : ''
                      }`}
                      onClick={!hasLink ? handleVideoClick : undefined}
                    >
                      {/* Video/Image Thumbnail */}
                      <div className={`relative w-full mb-2 sm:mb-3 md:mb-4 rounded-md md:rounded-lg overflow-hidden bg-black/20 group ${
                        preserveAspectRatio ? 'h-auto min-h-[8rem] sm:min-h-[10rem] md:min-h-[12rem] flex items-center justify-center py-2 sm:py-3 md:py-4' : 'h-24 sm:h-32 md:h-40 lg:h-48'
                      }`}>
                        {/* If item has a link, show video preview - Only play on hover */}
                        {(item as any).link && item.videoSrc ? (
                          <>
                            <LazyVideo
                              src={item.videoSrc}
                              className={`w-full ${preserveAspectRatio ? 'h-auto object-contain' : 'h-full object-cover'}`}
                              muted
                              playsInline
                              preload="none"
                              autoPlay={false}
                              loop={false}
                              onMouseEnter={(e) => {
                                const videoElement = e.currentTarget
                                // Only load and play on hover
                                if (videoElement.readyState === 0) {
                                  videoElement.load()
                                }
                                videoElement.currentTime = 0.5
                                videoElement.play().catch(() => {})
                              }}
                              onMouseLeave={(e) => {
                                const videoElement = e.currentTarget
                                videoElement.pause()
                                videoElement.currentTime = 0
                              }}
                            />
                            {/* Play Button Overlay - Shows on hover */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-20">
                              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-purple-blue flex items-center justify-center shadow-glow-purple opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent z-10 pointer-events-none"></div>
                          </>
                        ) : item.videoUrl || item.videoSrc ? (
                          <>
                            {/* Show video directly with proper aspect ratio preservation */}
                            {preserveAspectRatio ? (
                              <LazyVideo
                                src={item.videoSrc || item.videoUrl || ''}
                                className="w-full h-auto object-contain"
                                muted
                                playsInline
                                preload="metadata"
                                autoPlay={false}
                                loop={false}
                              />
                            ) : (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                loading="lazy"
                                quality={85}
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            )}
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-all duration-300 z-20">
                              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-purple-blue flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent z-10"></div>
                          </>
                        ) : (
                          <>
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              loading="lazy"
                              quality={85}
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent z-10"></div>
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-relaxed hidden sm:block">
                          {item.description}
                        </p>
                      </div>

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-purple-blue opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl"></div>
                    </div>
                  )
                  
                  return (
                    <div
                      key={itemIndex}
                      className={`category-card relative group film-grain ${
                        category.items.length === 2 ? 'lg:max-w-md' : ''
                      }`}
                    >
                      {hasLink ? (
                        <Link 
                          href={hasLink}
                          prefetch={true}
                          className="block"
                          onMouseEnter={() => {
                            // Aggressive prefetch on hover for instant navigation
                            router.prefetch(hasLink)
                            // Also prefetch related resources
                            if (typeof window !== 'undefined') {
                              const link = document.createElement('link')
                              link.rel = 'prefetch'
                              link.href = hasLink
                              document.head.appendChild(link)
                            }
                          }}
                        >
                          {cardContent}
                        </Link>
                      ) : (
                        cardContent
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-white mb-6">
            {t('video_editing_cta_title')}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t('video_editing_cta_desc')}
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="group relative px-8 py-4 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 text-white font-bold text-base rounded-full overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95"
          >
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            
            {/* Shimmer animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <span className="relative z-10 transition-all duration-150 group-hover:tracking-wider">{t('video_editing_cta_button')}</span>
          </button>
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            {selectedVideo.type === 'youtube' && (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.url)}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            )}
            
            {selectedVideo.type === 'vimeo' && (
              <iframe
                src={`https://player.vimeo.com/video/${getVimeoId(selectedVideo.url)}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            )}
            
            {selectedVideo.type === 'direct' && (
              <video
                src={selectedVideo.url}
                controls
                autoPlay
                className="w-full h-full"
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

