'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon3D from './Icon3D'
import { useLanguage } from '@/contexts/LanguageContext'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Schedule items are now defined inside the component to use translations

export default function Schedule() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>([])

  const schedule = [
    {
      icon: '/lamp.png',
      number: '1',
      title: t('process_step1'),
      speaker: t('process_step1_sub'),
      description: t('process_step1_desc'),
      iconSize: 'large' as const,
      mobileIconSize: 'small' as const,
    },
    {
      icon: '/color-palette.png',
      number: '2',
      title: t('process_step2'),
      speaker: t('process_step2_sub'),
      description: t('process_step2_desc'),
      iconSize: 'large' as const,
      mobileIconSize: 'small' as const,
    },
    {
      icon: '/pencil-folder.png',
      number: '3',
      title: t('process_step3'),
      speaker: t('process_step3_sub'),
      description: t('process_step3_desc'),
      iconSize: 'large' as const,
      mobileIconSize: 'small' as const,
    },
    {
      icon: '/launch.png',
      number: '4',
      title: t('process_step4'),
      speaker: t('process_step4_sub'),
      description: t('process_step4_desc'),
      iconSize: 'medium' as const,
      mobileIconSize: 'small' as const,
    },
  ]

  useEffect(() => {
    if (itemsRef.current && sectionRef.current) {
      const items = itemsRef.current.children
      
      // Initialize visibility state
      setVisibleItems(new Array(items.length).fill(false))

      // Enhanced animations for each item
      Array.from(items).forEach((item, index) => {
        const card = item.querySelector('.schedule-card')
        const iconContainer = item.querySelector('.icon-container')
        
        if (card && iconContainer) {
          // Card animation - slide and fade with 3D effect
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: -50,
              rotationY: -5,
              scale: 0.98,
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.4,
              delay: index * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                onEnter: () => {
                  setVisibleItems(prev => {
                    const newState = [...prev]
                    newState[index] = true
                    return newState
                  })
                },
              },
            }
          )

          // Icon container animation - separate from card
          gsap.fromTo(
            iconContainer,
            {
              scale: 0.8,
              rotation: -45,
              opacity: 0,
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.4,
              delay: index * 0.08 + 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }
  }, [])

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden z-10"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="section-title text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
            {t('process_title')}
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-purple-blue mx-auto mb-4 md:mb-6"></div>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            {t('process_subtitle')}
          </p>
        </div>

        <div ref={itemsRef} className="space-y-4 md:space-y-8">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="relative group film-grain"
            >
              <div className="schedule-card relative p-4 md:p-6 lg:p-8 bg-gradient-to-r from-dark-navy/80 via-purple-900/20 to-dark-navy/80 backdrop-blur-sm border-l-2 md:border-l-4 border-neon-purple rounded-lg hover:shadow-glow-purple transition-all duration-200 hover:scale-[1.02] hover:border-l-4 md:hover:border-l-8">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <div className="icon-container flex-shrink-0 flex items-center justify-center">
                    {/* Mobile: small icon, Desktop: original size */}
                    <div className="md:hidden">
                      <Icon3D 
                        icon={item.icon} 
                        index={index}
                        isVisible={visibleItems[index] || false}
                        size={item.mobileIconSize || 'small'}
                      />
                    </div>
                    <div className="hidden md:block">
                      <Icon3D 
                        icon={item.icon} 
                        index={index}
                        isVisible={visibleItems[index] || false}
                        size={item.iconSize || 'medium'}
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-purple-blue">
                        {item.number}
                      </span>
                      <h3 className={`text-lg md:text-xl lg:text-2xl ${language === 'ar' ? 'font-bold' : 'font-normal'} ${language === 'en' ? 'font-sans' : ''} text-white`} style={language === 'en' ? { fontFamily: "'Cairo', 'Inter', sans-serif" } : {}}>{item.title}</h3>
                    </div>
                    {item.speaker && (
                      <p className="text-sm md:text-base text-lavender font-semibold mb-2 md:mb-3">{item.speaker}</p>
                    )}
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-purple-blue opacity-0 group-hover:opacity-20 transition-opacity duration-200 -z-10 blur-2xl"></div>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-200 -z-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

