'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

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
      className="relative py-24 px-6 overflow-hidden z-10"
    >
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-6xl font-bold text-white mb-4">
            {t('services_title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('services_subtitle')}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group film-grain"
            >
              <div className="relative h-full p-2 sm:p-4 md:p-6 bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-lg md:rounded-xl hover:border-neon-purple transition-all duration-150 hover:shadow-glow-purple hover:-translate-y-2">
                {/* Large image placeholder with purple overlay */}
                <div className="relative w-full h-24 sm:h-32 md:h-48 lg:h-64 mb-1 sm:mb-2 md:mb-4 rounded-md md:rounded-lg overflow-hidden bg-gradient-purple-blue">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title}
                    fill
                    loading="lazy"
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent z-10"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 leading-tight">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-[10px] sm:text-xs md:text-sm hidden sm:block">{feature.description}</p>
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

