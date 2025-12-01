'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/contexts/LanguageContext'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Speaker = {
  name: string
  role: string
  company: string
  image: string
  link: string | null
  description?: string | null
  isImage?: boolean
}

export default function Speakers() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const speakers: Speaker[] = [
    {
      name: t('portfolio_item1_title'),
      role: t('portfolio_item1_role'),
      company: t('portfolio_item1_company'),
      image: '/photo_2025-11-28_20-33-4640.jpg',
      link: '/visual-identity',
      description: null,
      isImage: true,
    },
    {
      name: t('portfolio_item2_title'),
      role: t('portfolio_item2_role'),
      company: t('portfolio_item2_company'),
      image: '/1764354410.png',
      link: '/video-editing',
      description: null,
      isImage: true,
    },
    {
      name: t('portfolio_item3_title'),
      role: t('portfolio_item3_role'),
      company: t('portfolio_item3_company'),
      image: '/Gemini_Generated_Image_ttgcqmttgcqmttgc.png',
      link: '/professional-animation',
      description: null,
      isImage: true,
    },
  ]

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
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
      id="speakers"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden z-10"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-6xl font-bold text-white mb-4">
            {t('portfolio_title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-3">
            {t('portfolio_subtitle')}
          </p>
          <p className="text-lg text-purple-400/80 max-w-2xl mx-auto font-medium">
            {t('portfolio_cta')}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {speakers.map((speaker, index) => {
            const cardContent = (
              <div
                className={`relative h-full p-2 sm:p-4 md:p-6 bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 md:border-2 rounded-lg md:rounded-xl hover:border-neon-purple transition-all duration-150 hover:shadow-glow-purple hover:-translate-y-2 ${
                  speaker.link ? 'cursor-pointer' : ''
                }`}
              >
                {/* Image placeholder with purple overlay */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/10] mb-1 sm:mb-2 md:mb-4 rounded-md md:rounded-lg overflow-hidden bg-gradient-purple-blue">
                  {speaker.isImage ? (
                    <>
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, (max-width: 1200px) 33vw, 33vw"
                        loading="lazy"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-dark-navy/40 flex items-center justify-center text-2xl sm:text-4xl md:text-6xl lg:text-8xl">
                        {speaker.image}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                    </>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 leading-tight">{speaker.name}</h3>
                  <p className="text-lavender text-[10px] sm:text-xs md:text-sm font-semibold mb-0.5 sm:mb-1">{speaker.role}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 hidden sm:block">{speaker.company}</p>
                  {speaker.description && (
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-4 mt-2 px-2 hidden md:block">{speaker.description}</p>
                  )}
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-purple-blue opacity-0 group-hover:opacity-10 transition-opacity duration-150 -z-10 blur-xl"></div>
              </div>
            )

            return (
              <div
                key={index}
                className="relative group film-grain"
              >
                {speaker.link ? (
                  <Link href={speaker.link} prefetch={true} className="block">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

