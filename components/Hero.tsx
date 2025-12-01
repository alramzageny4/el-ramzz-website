'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t, language } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const button2Ref = useRef<HTMLAnchorElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure video plays and keep loading hidden
    if (videoRef.current && loadingRef.current) {
      const video = videoRef.current
      const loading = loadingRef.current
      
      // Keep loading hidden from the start
      loading.style.display = 'none'
      loading.style.opacity = '0'
      loading.style.pointerEvents = 'none'
      
      // Try to play video immediately
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video autoplay prevented:', error)
        })
      }
      
      // Ensure video is visible
      video.style.opacity = '1'
      video.style.visibility = 'visible'
    }

    // Split text into words for water drop animation
    if (titleRef.current && subtitleRef.current && descriptionRef.current) {
      const titleText = titleRef.current.textContent || ''
      const titleWords = titleText.split(' ')
      titleRef.current.innerHTML = titleWords.map((word, i) => 
        `<span class="inline-block word-drop" style="opacity: 0; transform: translateY(-150px) scale(0.8);">${word}</span>`
      ).join(' ')
      
      const subtitleText = subtitleRef.current.textContent || ''
      const subtitleWords = subtitleText.split(' ')
      subtitleRef.current.innerHTML = subtitleWords.map((word, i) => 
        `<span class="inline-block word-drop" style="opacity: 0; transform: translateY(-150px) scale(0.8);">${word}</span>`
      ).join(' ')
      
      const descText = descriptionRef.current.textContent || ''
      const descLines = descText.split('<br>')
      descriptionRef.current.innerHTML = descLines.map((line, lineIdx) => {
        const words = line.split(' ')
        return words.map((word, wordIdx) => 
          `<span class="inline-block word-drop" style="opacity: 0; transform: translateY(-150px) scale(0.8);">${word}</span>`
        ).join(' ') + (lineIdx < descLines.length - 1 ? '<br />' : '')
      }).join('')

      // Animate title words (water drop effect with gentle bounce)
      const titleSpans = titleRef.current.querySelectorAll('span')
      titleSpans.forEach((span, i) => {
        gsap.to(span, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'elastic.out(1, 0.5)', // Gentle bounce like water drop
        })
      })

      // Animate subtitle words
      const subtitleSpans = subtitleRef.current.querySelectorAll('span')
      subtitleSpans.forEach((span, i) => {
        gsap.to(span, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          delay: 0.3 + (i * 0.07),
          ease: 'elastic.out(1, 0.5)',
        })
      })

      // Animate description words
      const descSpans = descriptionRef.current.querySelectorAll('span')
      descSpans.forEach((span, i) => {
        gsap.to(span, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: 0.6 + (i * 0.06),
          ease: 'elastic.out(1, 0.5)',
        })
      })
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-[60vh] min-h-[500px] md:h-[70vh] md:min-h-[600px] overflow-hidden"
    >
      {/* Hero Video with Overlay Content */}
      <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        {/* Full Width Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105 z-0"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center 40%',
            transform: 'translateZ(0) scale(1.05)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        >
          <source src="/panr.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video loading placeholder - Hidden by default */}
        <div 
          ref={loadingRef}
          className="absolute inset-0 z-1 flex items-center justify-center"
          style={{ 
            display: 'none',
            opacity: 0,
            pointerEvents: 'none',
            backgroundColor: '#0F172A'
          }}
        >
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        </div>


        {/* Professional Gradient Overlay - Lighter for better video visibility */}
        <div 
          className="absolute inset-0 z-5"
          style={{
            background: `
              linear-gradient(to bottom, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.1) 50%, rgba(15, 23, 42, 0.2) 100%),
              linear-gradient(to top, rgba(15, 23, 42, 0.25) 0%, transparent 100%),
              linear-gradient(to right, rgba(15, 23, 42, 0.15) 0%, transparent 50%, rgba(15, 23, 42, 0.1) 100%),
              radial-gradient(ellipse at top left, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(99, 102, 241, 0.08) 0%, transparent 50%)
            `
          }}
        ></div>


        {/* Content Overlay on Video - Original position */}
        <div className="absolute inset-0 z-20 flex items-end justify-start pb-8 md:pb-12 lg:pb-16 px-4 md:px-6 lg:px-8">
          <div className={`max-w-5xl w-full ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {/* Main Content - Above buttons */}
            <div className={`mb-6 md:mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {/* Main Headline */}
              <div className="mb-4 md:mb-5">
                <p
                  ref={titleRef}
                  className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold leading-tight drop-shadow-2xl ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  style={{
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(168, 85, 247, 0.3)'
                  }}
                >
                  {t('hero_title')}
                </p>
              </div>

              {/* Subtitle */}
              <div className="mb-3 md:mb-4">
                <p
                  ref={subtitleRef}
                  className={`text-xl md:text-2xl lg:text-3xl text-white font-semibold leading-relaxed drop-shadow-xl ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  style={{
                    textShadow: '0 3px 15px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(168, 85, 247, 0.2)'
                  }}
                >
                  {t('hero_subtitle')}
                </p>
              </div>

              {/* Description */}
              <p 
                ref={descriptionRef}
                className={`text-base md:text-lg lg:text-xl text-white/95 mb-6 md:mb-8 max-w-3xl font-medium leading-relaxed drop-shadow-lg ${language === 'ar' ? 'text-right mr-0' : 'text-left'}`}
                style={{
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
                }}
              >
                {t('hero_description')}
              </p>
            </div>

            {/* Buttons - Same position for both languages */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button 
                ref={buttonRef}
                onClick={() => {
                  const element = document.getElementById('speakers')
                  if (element) {
                    const offset = 80
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    const offsetPosition = elementPosition - offset

                    // Ultra-fast smooth scroll
                    const startY = window.pageYOffset
                    const distance = offsetPosition - startY
                    const duration = Math.min(300, Math.abs(distance) * 0.5)
                    const startTime = performance.now()
                    
                    const animateScroll = (currentTime: number) => {
                      const elapsed = currentTime - startTime
                      const progress = Math.min(elapsed / duration, 1)
                      const ease = progress < 0.5 
                        ? 2 * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 2) / 2
                      
                      window.scrollTo(0, startY + distance * ease)
                      
                      if (progress < 1) {
                        requestAnimationFrame(animateScroll)
                      }
                    }
                    
                    requestAnimationFrame(animateScroll)
                  }
                }}
                className="group relative px-8 py-3.5 border-2 border-purple-400 text-white font-semibold text-sm md:text-base rounded-full bg-transparent hover:bg-purple-400/10 transition-all duration-200 overflow-hidden hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 transition-all duration-150 group-hover:tracking-wider">{t('hero_button_portfolio')}</span>
                <div className="absolute inset-0 border-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 bg-white/5"></div>
              </button>
              <a
                ref={button2Ref}
                href="/contact"
                className="group relative px-8 py-3.5 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 text-white font-semibold text-sm md:text-base rounded-full overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 animate-gentle-float"
              >
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
                
                {/* Subtle animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Gentle shimmer animation */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
                
                <span className="relative z-10 transition-all duration-300 group-hover:tracking-wider">{t('hero_button_contact')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

