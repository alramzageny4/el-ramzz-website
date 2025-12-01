'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Stars3D from './Stars3D'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const starsContainerRef = useRef<HTMLDivElement>(null)
  const nebulaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Calculate hero section height and set background effects to start after it
    const updatePosition = () => {
      const heroSection = document.getElementById('home')
      if (heroSection && containerRef.current) {
        const heroHeight = heroSection.offsetHeight
        containerRef.current.style.top = `${heroHeight}px`
      }
    }

    // Initial calculation
    updatePosition()

    // Update on window resize
    window.addEventListener('resize', updatePosition)
    
    // Optimized parallax effect with requestAnimationFrame
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY
          if (starsContainerRef.current) {
            starsContainerRef.current.style.transform = `translateY(${scrolled * 0.1}px)`
          }
          if (nebulaRef.current) {
            nebulaRef.current.style.transform = `translateY(${scrolled * 0.05}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed left-0 right-0 w-full pointer-events-none z-0"
      style={{ 
        top: '70vh', // Fallback, will be updated by useEffect
        bottom: 0,
        height: 'auto',
        backgroundColor: 'transparent',
        background: 'transparent',
      }}
    >
      {/* Deep Space Background Gradient - Unified color */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'transparent'
        }}
      ></div>

      {/* Nebula Clouds (Space atmosphere) */}
      <div 
        ref={nebulaRef}
        className="absolute inset-0 w-full h-full opacity-40"
      >
        {/* Purple Nebula */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-radial from-purple-900/30 via-purple-800/20 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
        {/* Blue Nebula */}
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[500px] bg-gradient-radial from-blue-900/30 via-blue-800/20 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        {/* Lavender Nebula */}
        <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[400px] bg-gradient-radial from-purple-700/25 via-blue-700/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* 3D Stars System with Neural Network */}
      <div 
        ref={starsContainerRef}
        className="absolute inset-0 w-full h-full"
      >
        <Stars3D />
      </div>


      {/* Shooting stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-1 h-1 bg-white rounded-full animate-shooting-star"></div>
        <div className="absolute top-1/2 right-0 w-1 h-1 bg-purple-400 rounded-full animate-shooting-star" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-shooting-star" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Small shooting stars at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-60 overflow-visible pointer-events-none">
        {/* Shooting star 1 - Left to Right */}
        <div 
          className="absolute w-1 h-1 bg-purple-400 rounded-full animate-shooting-star-bottom"
          style={{ 
            bottom: '100px',
            left: '0',
            animationDelay: '0s',
            boxShadow: '0 0 6px rgba(168, 85, 247, 1), 0 0 12px rgba(168, 85, 247, 0.8), 0 0 20px rgba(168, 85, 247, 0.6)',
            filter: 'brightness(1.3)'
          }}
        ></div>
        
        {/* Shooting star 2 - Right to Left */}
        <div 
          className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full animate-shooting-star-bottom-reverse"
          style={{ 
            bottom: '120px',
            right: '0',
            animationDelay: '2.5s',
            boxShadow: '0 0 4px rgba(99, 102, 241, 1), 0 0 8px rgba(99, 102, 241, 0.8), 0 0 15px rgba(99, 102, 241, 0.6)',
            filter: 'brightness(1.3)'
          }}
        ></div>
        
        {/* Shooting star 3 - Left to Right */}
        <div 
          className="absolute w-0.5 h-0.5 bg-lavender rounded-full animate-shooting-star-bottom"
          style={{ 
            bottom: '90px',
            left: '0',
            animationDelay: '5s',
            boxShadow: '0 0 4px rgba(192, 132, 252, 1), 0 0 8px rgba(192, 132, 252, 0.8), 0 0 15px rgba(192, 132, 252, 0.6)',
            filter: 'brightness(1.3)'
          }}
        ></div>
      </div>
    </div>
  )
}

