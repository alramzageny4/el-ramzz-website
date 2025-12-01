'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyAttend from '@/components/WhyAttend'
import Speakers from '@/components/Speakers'
import Achievements from '@/components/Achievements'
import Testimonials from '@/components/Testimonials'
import SocialIcons from '@/components/SocialIcons'
import Schedule from '@/components/Schedule'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import BackgroundEffects from '@/components/BackgroundEffects'
import LoadingScreen from '@/components/LoadingScreen'
import ErrorBoundary from '@/components/ErrorBoundary'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // Optimize GSAP for performance
  gsap.config({ nullTargetWarn: false })
}

export default function Home() {
  useEffect(() => {
    // Optimized scroll animations for better performance
    const sections = document.querySelectorAll('section:not(#home)')
    
    // Use Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    sections.forEach((section, index) => {
      // Simplified section animation - faster and lighter
      gsap.fromTo(
        section,
        { 
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
            markers: false,
            once: true, // Only animate once for better performance
          },
        }
      )

      // Simplified title animation - only if visible
      const title = section.querySelector('h1, h2')
      if (title) {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      // Simplified cards animation - faster stagger
      const cards = section.querySelectorAll('.grid > *')
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }
    })

    // Subtle parallax effect for hero video
    const hero = document.getElementById('home')
    const video = hero?.querySelector('video')
    if (hero && video) {
      gsap.to(video, {
        yPercent: -15,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <ErrorBoundary>
      <main className="relative w-full overflow-x-hidden">
        <LoadingScreen />
        <Navbar />
        <SocialIcons />
        <div className="relative w-full">
          <Hero />
          <BackgroundEffects />
          <WhyAttend />
          <Speakers />
          <Achievements />
          <Testimonials />
          <Schedule />
          <FAQ />
          <Footer />
        </div>
      </main>
    </ErrorBoundary>
  )
}

