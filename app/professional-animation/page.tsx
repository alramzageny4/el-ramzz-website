'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LazyVideo from '@/components/LazyVideo'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Ultra-Optimized Video Player with Advanced Buffering
function VideoPlayerWithBuffering({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const bufferingControllerRef = useRef<AbortController | null>(null)
  const bufferedRangesRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const preloadVideoChunk = async (startByte: number, endByte: number) => {
      const rangeKey = `${startByte}-${endByte}`
      if (bufferedRangesRef.current.has(rangeKey)) return
      
      try {
        const controller = new AbortController()
        bufferingControllerRef.current = controller
        
        const response = await fetch(src, {
          headers: { Range: `bytes=${startByte}-${endByte}` },
          signal: controller.signal,
        })

        if (response.ok && response.status === 206) {
          bufferedRangesRef.current.add(rangeKey)
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.warn('Pre-buffering failed:', error)
        }
      }
    }

    const getByteRangeForTime = async (targetTime: number, duration: number) => {
      if (!duration || !video.duration) return null
      
      const ratio = targetTime / duration
      const estimatedSize = video.buffered.length > 0 ? 
        (video.buffered.end(video.buffered.length - 1) / video.currentTime) * 
        (video.buffered.end(video.buffered.length - 1) - video.buffered.start(0)) : 
        1000000
      
      const startByte = Math.floor(ratio * estimatedSize)
      const endByte = Math.min(startByte + 500000, estimatedSize)
      
      return { startByte, endByte }
    }

    const handleProgress = async () => {
      if (video.buffered.length > 0 && video.duration) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const currentTime = video.currentTime
        const duration = video.duration

        if (bufferedEnd - currentTime < 15 && bufferedEnd < duration) {
          const targetTime = Math.min(currentTime + 20, duration - 1)
          
          const byteRange = await getByteRangeForTime(targetTime, duration)
          if (byteRange) {
            preloadVideoChunk(byteRange.startByte, byteRange.endByte)
          }
        }
      }
    }

    const handleTimeUpdate = () => {
      if (video.buffered.length > 0 && video.duration) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const currentTime = video.currentTime
        
        if (bufferedEnd - currentTime < 8) {
          handleProgress()
        }
      }
    }

    const handleLoadedMetadata = async () => {
      if (video.duration) {
        const byteRange = await getByteRangeForTime(30, video.duration)
        if (byteRange) {
          preloadVideoChunk(byteRange.startByte, byteRange.endByte)
        }
      }
    }

    const handleCanPlayThrough = () => {
      video.preload = 'auto'
      handleProgress()
    }

    video.preload = 'auto'
    
    video.addEventListener('progress', handleProgress)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplaythrough', handleCanPlayThrough)

    if (video.readyState >= 1) {
      handleLoadedMetadata()
      handleProgress()
    }

    return () => {
      video.removeEventListener('progress', handleProgress)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      
      if (bufferingControllerRef.current) {
        bufferingControllerRef.current.abort()
      }
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      autoPlay
      preload="auto"
      className="w-full h-auto object-contain"
      controlsList="nodownload"
      playsInline
      crossOrigin="anonymous"
      muted
    >
      Your browser does not support the video tag.
    </video>
  )
}

export default function ProfessionalAnimationPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string
    title: string
  } | null>(null)
  const preloadVideoRef = useRef<HTMLVideoElement | null>(null)

  // Videos data - Professional Animation videos with original aspect ratio preserved
  const videos = [
    {
      id: 1,
      title: t('video_animation_item1'),
      videoSrc: 'https://video-cdn-elramz.b-cdn.net/Cgi-20251201T103441Z-1-001/Cgi/2432fd0e-1e9f-4018-b2c1-12b5ff79e6c8_1.mp4',
      thumbnail: '/11.png',
    },
    {
      id: 2,
      title: t('video_animation_item2'),
      videoSrc: 'https://video-cdn-elramz.b-cdn.net/Cgi-20251201T103441Z-1-001/Cgi/2432fd0e-1e9f-4018-b2c1-12b5ff79e6c8_2.mp4',
      thumbnail: '/11.png',
    },
    {
      id: 3,
      title: t('video_animation_item3'),
      videoSrc: 'https://video-cdn-elramz.b-cdn.net/Cgi-20251201T103441Z-1-001/Cgi/2432fd0e-1e9f-4018-b2c1-12b5ff79e6c8_3.mp4',
      thumbnail: '/11.png',
    },
    {
      id: 4,
      title: t('video_animation_item4'),
      videoSrc: 'https://video-cdn-elramz.b-cdn.net/Cgi-20251201T103441Z-1-001/Cgi/2432fd0e-1e9f-4018-b2c1-12b5ff79e6c8.mp4',
      thumbnail: '/11.png',
    },
  ]

  // Pre-buffer video when selected for instant playback
  useEffect(() => {
    if (selectedVideo && selectedVideo.url) {
      const preloadVideo = document.createElement('video')
      preloadVideo.src = selectedVideo.url
      preloadVideo.preload = 'auto'
      preloadVideo.muted = true
      preloadVideo.style.display = 'none'
      document.body.appendChild(preloadVideo)
      
      preloadVideo.load()
      preloadVideoRef.current = preloadVideo
      
      return () => {
        if (preloadVideoRef.current) {
          document.body.removeChild(preloadVideoRef.current)
          preloadVideoRef.current = null
        }
      }
    }
  }, [selectedVideo])

  useEffect(() => {
    let animation: gsap.core.Tween | null = null
    
    if (sectionRef.current) {
      const videoCards = sectionRef.current.querySelectorAll('.video-card')
      animation = gsap.fromTo(
        videoCards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }

    return () => {
      if (animation) {
        animation.kill()
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

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
            <button
              onClick={() => router.back()}
              className="mb-6 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('nav_home')}
            </button>
            <h1 className={`section-title text-5xl md:text-6xl lg:text-7xl ${language === 'ar' ? 'font-bold' : 'font-normal'} ${language === 'en' ? 'font-sans' : ''} text-white mb-6`} style={language === 'en' ? { fontFamily: "'Cairo', 'Inter', sans-serif" } : {}}>
              {t('video_category_animation')}
            </h1>
            <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('video_category_animation_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {videos.map((video) => (
              <div
                key={video.id}
                className="video-card relative group film-grain"
              >
                <div 
                  className="relative h-full p-2 sm:p-4 md:p-6 bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 md:border-2 rounded-lg md:rounded-xl hover:border-neon-purple transition-all duration-300 hover:shadow-glow-purple hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedVideo({ url: video.videoSrc, title: video.title })}
                >
                  {/* Video Preview - Preserving original aspect ratio */}
                  <div className="relative w-full mb-2 sm:mb-3 md:mb-4 rounded-md md:rounded-lg overflow-hidden bg-black/20 group min-h-[8rem] sm:min-h-[10rem] md:min-h-[12rem] flex items-center justify-center py-2 sm:py-3 md:py-4">
                    <LazyVideo
                      src={video.videoSrc}
                      className="w-full h-auto object-contain"
                      muted
                      playsInline
                      loop={false}
                      autoPlay={false}
                      preload="metadata"
                      onMouseEnter={(e) => {
                        const videoElement = e.currentTarget
                        if (videoElement.readyState === 0) {
                          videoElement.load()
                          videoElement.preload = 'auto'
                        }
                        if (videoElement.readyState >= 2) {
                          videoElement.currentTime = 0
                          videoElement.play().catch(() => {})
                        }
                      }}
                      onMouseLeave={(e) => {
                        const videoElement = e.currentTarget
                        videoElement.pause()
                        videoElement.currentTime = 0
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-20">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-purple-blue flex items-center justify-center shadow-glow-purple opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent z-10 pointer-events-none"></div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className={`text-xs sm:text-sm md:text-lg lg:text-xl text-white mb-1 sm:mb-2 leading-tight ${language === 'ar' ? 'font-bold' : 'font-normal'} ${language === 'en' ? 'font-sans' : ''}`} style={language === 'en' ? { fontFamily: "'Cairo', 'Inter', sans-serif" } : {}}>
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-relaxed hidden sm:block">
                      {t('video_animation_item1_desc')}
                    </p>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-purple-blue opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Video Modal - Preserving original aspect ratio */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl"
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

            {/* Video Player - Preserving original aspect ratio */}
            <div className="p-4">
              <VideoPlayerWithBuffering src={selectedVideo.url} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

