'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Achievement {
  value: number
  suffix: string
  label: string
  description: string
}

export default function Achievements() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [countersStarted, setCountersStarted] = useState(false)

  const achievements: Achievement[] = [
    {
      value: 250,
      suffix: '+',
      label: t('achievements_projects'),
      description: t('achievements_projects_desc'),
    },
    {
      value: 150,
      suffix: '+',
      label: t('achievements_clients'),
      description: t('achievements_clients_desc'),
    },
    {
      value: 5,
      suffix: '+',
      label: t('achievements_years'),
      description: t('achievements_years_desc'),
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || countersStarted) return

    // Animate section entrance
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        onComplete: () => {
          setCountersStarted(true)
        },
      }
    )

    // Animate cards with smooth stagger effect
    const cards = sectionRef.current?.querySelectorAll('.achievement-card')
    if (cards) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.85,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2, // Increased stagger for more noticeable delay
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }
  }, [countersStarted])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 md:px-6 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('achievements_title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('achievements_subtitle')}
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              index={index}
              countersStarted={countersStarted}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function AchievementCard({
  achievement,
  index,
  countersStarted,
}: {
  achievement: Achievement
  index: number
  countersStarted: boolean
}) {
  const [count, setCount] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!countersStarted) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = achievement.value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newCount = Math.min(
        Math.floor(increment * currentStep),
        achievement.value
      )
      setCount(newCount)

      if (currentStep >= steps) {
        setCount(achievement.value)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [countersStarted, achievement.value])

  useEffect(() => {
    if (!cardRef.current) return

    // Hover animation
    const card = cardRef.current
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="achievement-card relative group"
    >
      {/* Glassmorphism Card - Enhanced Glass Effect */}
      <div className="relative h-full p-2 sm:p-4 md:p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-lg md:rounded-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.3)] transition-all duration-300 overflow-hidden">
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
        
        {/* Subtle Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Number - Strong Green Neon */}
          <div className="mb-1 sm:mb-2">
            <div className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-none drop-shadow-[0_2px_8px_rgba(34,197,94,0.6)]" style={{ color: '#22c55e' }}>
              {count.toLocaleString()}
              {achievement.suffix && (
                <span className="text-sm sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">{achievement.suffix}</span>
              )}
            </div>
          </div>

          {/* Label - White Text */}
          <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight">
            {achievement.label}
          </h3>
        </div>
      </div>
    </div>
  )
}

