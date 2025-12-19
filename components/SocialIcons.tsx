'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SocialIcon {
  name: string
  icon: JSX.Element
  url: string
  color: string
}

export default function SocialIcons() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate hero height and position icons below it - NEVER touch hero
  useEffect(() => {
    const updatePosition = () => {
      const heroSection = document.getElementById('home')
      if (heroSection && containerRef.current) {
        const heroRect = heroSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY
        const heroHeight = heroSection.offsetHeight
        const heroTopInDocument = heroSection.offsetTop
        
        // CRITICAL: If we haven't scrolled past the hero yet, hide icons completely
        // This prevents icons from appearing when standing on hero (scrollY = 0)
        if (scrollY < heroHeight) {
          // Hero is still in viewport or we're at the top - HIDE icons completely
          containerRef.current.style.opacity = '0'
          containerRef.current.style.pointerEvents = 'none'
          containerRef.current.style.visibility = 'hidden'
          return
        }
        
        // Only show icons after we've scrolled past the hero
        // Calculate where hero ends in viewport
        const heroBottomInViewport = heroRect.bottom
        
        // If hero is still visible in viewport (partially scrolled)
        if (heroRect.bottom > 0 && heroRect.top < windowHeight) {
          // Calculate how much space is available below hero in viewport
          const spaceBelowHero = windowHeight - heroBottomInViewport
          
          // Minimum safe distance from hero (150px to ensure complete separation)
          const minSafeDistance = 150
          
          // Only show if there's enough space below hero
          if (spaceBelowHero >= minSafeDistance) {
            containerRef.current.style.top = 'auto'
            containerRef.current.style.bottom = `${spaceBelowHero - 20}px`
            containerRef.current.style.opacity = '1'
            containerRef.current.style.pointerEvents = 'auto'
            containerRef.current.style.visibility = 'visible'
          } else {
            // Not enough space - hide icons
            containerRef.current.style.opacity = '0'
            containerRef.current.style.pointerEvents = 'none'
            containerRef.current.style.visibility = 'hidden'
          }
        } else if (heroRect.top >= windowHeight) {
          // Hero is completely scrolled past - icons can be visible at bottom
          containerRef.current.style.top = 'auto'
          containerRef.current.style.bottom = '100px'
          containerRef.current.style.opacity = '1'
          containerRef.current.style.pointerEvents = 'auto'
          containerRef.current.style.visibility = 'visible'
        } else {
          // Hero is above viewport - keep icons at safe bottom
          containerRef.current.style.top = 'auto'
          containerRef.current.style.bottom = '100px'
          containerRef.current.style.opacity = '1'
          containerRef.current.style.pointerEvents = 'auto'
          containerRef.current.style.visibility = 'visible'
        }
      }
    }

    // Initial calculation with delay to ensure DOM is ready
    const initTimer = setTimeout(updatePosition, 100)
    updatePosition()

    // Update on window resize and scroll (throttled for performance)
    let ticking = false
    const handleUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePosition()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('resize', handleUpdate)
    window.addEventListener('scroll', handleUpdate, { passive: true })
    
    return () => {
      clearTimeout(initTimer)
      window.removeEventListener('resize', handleUpdate)
      window.removeEventListener('scroll', handleUpdate)
    }
  }, [])

  const socialIcons: SocialIcon[] = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://www.facebook.com/profile.php?id=61559193041396',
      color: 'text-blue-500',
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: 'https://www.instagram.com/alramzz1?igsh=MXQyc3MxNzlwM2tvOQ==',
      color: 'text-pink-500',
    },
    {
      name: 'TikTok',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@alramzagency?_r=1&_t=ZS-91oBgLRBnls',
      color: 'text-white',
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      url: 'https://wa.me/201023142124',
      color: 'text-green-500',
    },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    // Animate desktop icons entrance
    const desktopIcons = containerRef.current.querySelectorAll('.social-icon')
    
    if (desktopIcons.length > 0) {
      gsap.fromTo(
        desktopIcons,
        {
          opacity: 0,
          x: -30,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // Hover animations for desktop
      desktopIcons.forEach((icon) => {
        const iconElement = icon as HTMLElement
        
        iconElement.addEventListener('mouseenter', () => {
          gsap.to(iconElement, {
            scale: 1.2,
            y: -5,
            duration: 0.2,
            ease: 'power2.out',
          })
        })

        iconElement.addEventListener('mouseleave', () => {
          gsap.to(iconElement, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          })
        })
      })
    }

  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed left-6 z-50 hidden lg:flex flex-col gap-4 transition-opacity duration-300"
      style={{ top: 'auto', bottom: 'auto' }}
    >
      {socialIcons.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-icon relative w-12 h-12 flex items-center justify-center rounded-full bg-dark-navy/60 backdrop-blur-sm border-2 border-purple-500/30 hover:border-neon-purple transition-all duration-300 hover:shadow-glow-purple ${social.color} hover:scale-110`}
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}

