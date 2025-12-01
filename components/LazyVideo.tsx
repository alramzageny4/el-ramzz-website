'use client'

import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface LazyVideoProps {
  src: string
  className?: string
  muted?: boolean
  playsInline?: boolean
  loop?: boolean
  autoPlay?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  onMouseEnter?: (e: React.MouseEvent<HTMLVideoElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLVideoElement>) => void
  poster?: string
}

export default function LazyVideo({
  src,
  className = '',
  muted = true,
  playsInline = true,
  loop = false,
  autoPlay = false,
  preload = 'none',
  onMouseEnter,
  onMouseLeave,
  poster,
}: LazyVideoProps) {
  const [videoRef, isIntersecting] = useIntersectionObserver<HTMLVideoElement>({
    threshold: 0.1,
    rootMargin: '100px',
  })
  const videoElementRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [hasThumbnail, setHasThumbnail] = useState(false)

  useEffect(() => {
    if (isIntersecting && !shouldLoad) {
      setShouldLoad(true)
    }
  }, [isIntersecting, shouldLoad])

  useEffect(() => {
    const video = videoElementRef.current
    if (!video || !shouldLoad) return

    // Always load metadata to show first frame as thumbnail
    const handleLoadedMetadata = () => {
      // Seek to first frame to show as thumbnail (without playing)
      if (video.readyState >= 1) {
        video.currentTime = 0.1
        setHasThumbnail(true)
      }
    }

    const handleCanPlay = () => {
      setHasThumbnail(true)
    }

    const handleProgress = () => {
      // Pre-buffer video when metadata is loaded for instant playback
      if (video.buffered.length > 0 && video.buffered.end(0) > 2) {
        // Video has buffered at least 2 seconds, ready for playback
        setHasThumbnail(true)
      }
    }

    const handleLoadedData = () => {
      setHasThumbnail(true)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('progress', handleProgress)
    video.addEventListener('loadeddata', handleLoadedData)

    // Force load metadata and start buffering even if preload is 'none'
    if (preload === 'none') {
      video.load()
      // Start buffering immediately for faster playback
      video.preload = 'metadata'
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('progress', handleProgress)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [shouldLoad, preload])

  return (
    <div className={`relative ${className}`} ref={videoRef}>
      {shouldLoad && (
        <video
          ref={videoElementRef}
          src={src}
          className={`w-full ${className.includes('object-contain') ? 'h-auto object-contain' : 'h-full object-cover'} ${hasThumbnail ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          muted={muted}
          playsInline={playsInline}
          loop={loop}
          autoPlay={autoPlay}
          preload="metadata"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          poster={poster}
        >
          Your browser does not support the video tag.
        </video>
      )}
      {!hasThumbnail && shouldLoad && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

