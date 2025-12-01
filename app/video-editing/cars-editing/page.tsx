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

    // Advanced pre-buffering using Fetch API
    const preloadVideoChunk = async (startByte: number, endByte: number) => {
      const rangeKey = `${startByte}-${endByte}`
      if (bufferedRangesRef.current.has(rangeKey)) return
      
      try {
        const controller = new AbortController()
        bufferingControllerRef.current = controller
        
        const response = await fetch(src, {
          headers: {
            Range: `bytes=${startByte}-${endByte}`,
          },
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
          
          // No seeking - just pre-load chunks
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
      className="w-full h-full"
      controlsList="nodownload"
      playsInline
      crossOrigin="anonymous"
      muted
    >
      Your browser does not support the video tag.
    </video>
  )
}

export default function CarsEditingPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string
    title: string
  } | null>(null)
  const preloadVideoRef = useRef<HTMLVideoElement | null>(null)

  // Videos data - فيديوهات مونتاج السيارات
  const videos: Array<{
    id: number
    title: string
    videoSrc: string
    thumbnail: string
  }> = [
    {
      id: 1,
      title: 'مونتاج احترافي للسيارات - عرض تفصيلي',
      videoSrc: 'https://video-cdn-elramz.b-cdn.net/car/1.mp4',
      thumbnail: '',
    },
    {
      id: 2,
      title: 'فيديو ترويجي للسيارات - تأثيرات بصرية متقدمة',
      videoSrc: 'https://video-cdn-elramz.b-cdn.net/car/2.mp4',
      thumbnail: '',
    },
  ]

  // Pre-buffer video when selected for instant playback
  useEffect(() => {
    if (selectedVideo && selectedVideo.url) {
      // Create hidden video element to pre-buffer
      const preloadVideo = document.createElement('video')
      preloadVideo.src = selectedVideo.url
      preloadVideo.preload = 'auto'
      preloadVideo.muted = true
      preloadVideo.style.display = 'none'
      document.body.appendChild(preloadVideo)
      
      // Start buffering immediately
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
    // Animate videos on scroll
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
              العودة
            </button>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {t('video_cars_item1')}
            </h1>
            <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('video_cars_item1_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="video-card relative group film-grain"
                >
                  <div 
                    className="relative h-full p-6 bg-dark-navy/60 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl hover:border-neon-purple transition-all duration-300 hover:shadow-glow-purple hover:-translate-y-2 cursor-pointer"
                    onClick={() => setSelectedVideo({ url: video.videoSrc, title: video.title })}
                  >
                    {/* Video Preview */}
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gradient-purple-blue group">
                      <LazyVideo
                        src={video.videoSrc}
                        className="w-full h-full"
                        muted
                        playsInline
                        loop={false}
                        autoPlay={false}
                        preload="none"
                        onMouseEnter={(e) => {
                          const videoElement = e.currentTarget
                          // Pre-buffer video on hover for instant playback when clicked
                          if (videoElement.readyState === 0) {
                            videoElement.load()
                            // Start aggressive buffering
                            videoElement.preload = 'auto'
                          }
                          // Pre-buffer more data
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
                      
                      {/* Play Button Overlay - Shows on hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-20">
                        <div className="w-16 h-16 rounded-full bg-gradient-purple-blue flex items-center justify-center shadow-glow-purple opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent z-10 pointer-events-none"></div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {video.title}
                      </h3>
                    </div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-purple-blue opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">سيتم إضافة الفيديوهات قريباً</p>
            </div>
          )}
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
            <VideoPlayerWithBuffering src={selectedVideo.url} />
          </div>
        </div>
      )}
    </main>
  )
}

