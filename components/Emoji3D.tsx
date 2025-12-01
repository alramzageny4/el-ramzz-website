'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Emoji3DProps {
  emoji: string
  className?: string
}

export default function Emoji3D({ emoji, className = '' }: Emoji3DProps) {
  const emojiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (emojiRef.current) {
      // Subtle floating animation
      gsap.to(emojiRef.current, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }
  }, [])

  return (
    <div 
      ref={emojiRef}
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        fontSize: '4rem',
        filter: 'drop-shadow(0 10px 20px rgba(168, 85, 247, 0.3))',
      }}
    >
      <div
        style={{
          transform: 'translateZ(20px)',
          textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
        }}
      >
        {emoji}
      </div>
    </div>
  )
}

