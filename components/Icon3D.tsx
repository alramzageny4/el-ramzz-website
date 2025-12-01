'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

interface Icon3DProps {
  icon: string
  index: number
  isVisible: boolean
  size?: 'small' | 'medium' | 'large'
}

export default function Icon3D({ icon, index, isVisible, size = 'medium' }: Icon3DProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-28 h-28',
  }
  
  const imagePixelSizes = {
    small: 48,
    medium: 72,
    large: 88,
  }
  
  const containerSize = sizeClasses[size]
  const imagePixelSize = imagePixelSizes[size]
  const iconRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!iconRef.current || !containerRef.current) return

    if (isVisible) {
      // Entrance animation - 3D flip effect with bounce
      gsap.fromTo(
        iconRef.current,
        {
          rotationX: -90,
          rotationY: -45,
          scale: 0.3,
          opacity: 0,
        },
        {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: 'back.out(2.5)',
        }
      )

      // Continuous floating animation with rotation (without glow)
      const floatAnimation = gsap.to(iconRef.current, {
        y: -15,
        rotationY: 15,
        duration: 3 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      })

      // Set initial glow to be invisible
      if (glowRef.current) {
        gsap.set(glowRef.current, {
          opacity: 0,
          scale: 1,
        })
      }

      // Hover animation setup
      const handleMouseEnter = () => {
        if (floatAnimation) {
          floatAnimation.pause()
        }
        gsap.killTweensOf(iconRef.current)
        gsap.to(iconRef.current, {
          scale: 1.3,
          rotationY: '+=360',
          rotationX: 20,
          z: 60,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
        // Show glow on hover
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            scale: 1.8,
            opacity: 0.7,
            duration: 0.6,
            ease: 'power2.out',
          })
        }
      }

      const handleMouseLeave = () => {
        // Kill all ongoing animations first
        gsap.killTweensOf(iconRef.current)
        
        // Reset to initial state
        gsap.to(iconRef.current, {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            // Restart float animation after reset is complete
            if (floatAnimation) {
              floatAnimation.restart()
            }
          },
        })
        
        // Hide glow when mouse leaves
        if (glowRef.current) {
          gsap.killTweensOf(glowRef.current)
          gsap.to(glowRef.current, {
            scale: 1,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          })
        }
      }

      containerRef.current.addEventListener('mouseenter', handleMouseEnter)
      containerRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        floatAnimation.kill()
        containerRef.current?.removeEventListener('mouseenter', handleMouseEnter)
        containerRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isVisible, index])

  return (
    <div ref={containerRef} className={`relative ${containerSize} cursor-pointer flex items-center justify-center mx-auto`} style={{ perspective: '1000px' }}>
      <div
        ref={iconRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main icon with 3D effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          {icon.startsWith('/') ? (
            <div 
              className="relative transform-gpu flex items-center justify-center"
              style={{ 
                width: `${imagePixelSize}px`,
                height: `${imagePixelSize}px`,
                transform: 'translateZ(30px)',
                filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
              }}
            >
              <Image
                src={icon}
                alt="Icon"
                width={imagePixelSize}
                height={imagePixelSize}
                className="object-contain"
                quality={100}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ) : (
            <div 
              className="text-5xl transform-gpu filter drop-shadow-lg flex items-center justify-center"
              style={{ 
                transform: 'translateZ(30px)',
                textShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
              }}
            >
              {icon}
            </div>
          )}
        </div>

        {/* Animated glow effect - only on hover */}
        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-purple-blue rounded-full opacity-0 blur-2xl transform-gpu transition-opacity duration-300"
          style={{ 
            transform: 'translateZ(-20px) scale(1.5)',
            filter: 'blur(20px)',
          }}
        ></div>

        {/* Secondary glow layer - only on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-full opacity-0 blur-xl transform-gpu transition-opacity duration-300 group-hover:opacity-20"
          style={{ transform: 'translateZ(-10px) scale(1.3)' }}
        ></div>

        {/* Outer glow ring */}
        <div
          className="absolute inset-0 border-2 border-purple-400/30 rounded-full transform-gpu"
          style={{ transform: 'translateZ(10px) scale(1.1)' }}
        ></div>
      </div>
    </div>
  )
}
