'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactForm from '@/components/ContactForm'
import { useLanguage } from '@/contexts/LanguageContext'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactPage() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden min-h-screen"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="section-title text-5xl md:text-6xl font-bold text-white mb-4">
            {t('contact_title')}
          </h1>
          <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('contact_subtitle')}
          </p>
        </div>

        <div ref={formRef} className="relative">
          <div className="bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 md:p-12 hover:border-neon-purple transition-all duration-300">
            <ContactForm />
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          <div className="group relative text-center p-2 sm:p-4 md:p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)]">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-4 transition-all duration-300 group-hover:border-white/30 group-hover:scale-110">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="relative z-10 text-xs sm:text-sm md:text-lg font-bold text-white mb-1 sm:mb-2 leading-tight">{t('contact_email')}</h3>
            <p className="relative z-10 text-[10px] sm:text-xs md:text-base text-gray-400">
              <a href="mailto:alramzagency@gmail.com" className="hover:text-lavender transition-colors break-all">
                <span className="hidden sm:inline">alramzagency@gmail.com</span>
                <span className="sm:hidden">Email</span>
              </a>
            </p>
          </div>

          <div className="group relative text-center p-2 sm:p-4 md:p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)]">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-4 transition-all duration-300 group-hover:border-white/30 group-hover:scale-110">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="relative z-10 text-xs sm:text-sm md:text-lg font-bold text-white mb-1 sm:mb-2 leading-tight">{t('contact_phone')}</h3>
            <p className="relative z-10 text-[10px] sm:text-xs md:text-base text-gray-400">
              <a href="https://wa.me/201093467510" target="_blank" rel="noopener noreferrer" className="hover:text-lavender transition-colors">
                <span className="hidden sm:inline">01093467510</span>
                <span className="sm:hidden">Phone</span>
              </a>
            </p>
          </div>

          <div className="group relative text-center p-2 sm:p-4 md:p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)]">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-4 transition-all duration-300 group-hover:border-white/30 group-hover:scale-110">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="relative z-10 text-xs sm:text-sm md:text-lg font-bold text-white mb-1 sm:mb-2 leading-tight">{t('contact_location')}</h3>
            <p className="relative z-10 text-[10px] sm:text-xs md:text-base text-gray-400">{t('contact_location_value')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

