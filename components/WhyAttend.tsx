'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import CardCarousel from './CardCarousel'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function WhyAttend() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: '/1764355698.png',
      title: t('service_design'),
      description: t('service_design_desc'),
    },
    {
      icon: '/1764356060.png',
      title: t('service_video'),
      description: t('service_video_desc'),
    },
    {
      icon: '/1764356655.png',
      title: t('service_animation'),
      description: t('service_animation_desc'),
    },
  ]

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-2 sm:px-4 md:px-6 overflow-hidden z-10"
    >
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="section-title text-5xl md:text-6xl font-bold text-white mb-4">
            {t('services_title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('services_subtitle')}
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <CardCarousel>
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group film-grain h-full"
              >
                <div className="relative h-full p-5 bg-dark-navy/60 backdrop-blur-sm border-2 border-purple-500/50 rounded-2xl hover-only-border transition-all duration-300 hover-only-shadow flex flex-row items-center gap-5 min-h-[180px] shadow-xl">
                  {/* Large icon on mobile - 140x140 */}
                  <div className="relative w-[140px] h-[140px] flex-shrink-0 rounded-xl overflow-hidden bg-gradient-purple-blue shadow-lg">
                    <Image 
                      src={feature.icon} 
                      alt={feature.title}
                      fill
                      loading="lazy"
                      quality={95}
                      className="object-cover"
                      sizes="140px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent z-10"></div>
                  </div>
                  <div className="text-left flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight truncate">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-2">{feature.description}</p>
                  </div>

                  {/* Glow effect on hover only (not on touch/active) */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-purple-blue opacity-0 hover-only-opacity transition-opacity duration-150 -z-10 blur-xl"></div>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>

        {/* Desktop Grid */}
        <div ref={cardsRef} className="hidden sm:grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group film-grain"
            >
              <div className="relative h-full p-2 md:p-4 lg:p-6 bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-lg md:rounded-xl hover:border-neon-purple transition-all duration-150 hover:shadow-glow-purple hover:-translate-y-2 flex flex-col items-stretch">
                <div className="relative w-full aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9] mb-2 md:mb-3 rounded-md md:rounded-lg overflow-hidden bg-gradient-purple-blue">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title}
                    fill
                    loading="lazy"
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent z-10"></div>
                </div>
                <div className="text-center flex-[0.1] flex flex-col justify-center">
                  <h3 className="text-sm md:text-lg lg:text-xl font-bold text-white mb-1 md:mb-2 leading-tight">{feature.title}</h3>
                  <p className="text-[10px] md:text-sm text-gray-400 leading-relaxed hidden md:block">{feature.description}</p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-purple-blue opacity-0 group-hover:opacity-10 transition-opacity duration-150 -z-10 blur-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

