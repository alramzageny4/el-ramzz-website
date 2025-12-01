'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Reduced delay for faster initial load
    const timer = setTimeout(() => {
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.3,
        onComplete: () => setLoading(false),
      })
    }, 300) // Reduced from 1500ms to 300ms

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="loading-screen fixed inset-0 z-50 bg-dark-navy flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-neon-purple rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-purple-blue bg-clip-text text-transparent">
          Loading...
        </h2>
      </div>
    </div>
  )
}

