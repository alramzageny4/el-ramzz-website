'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function PrivacyPage() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current && typeof window !== 'undefined') {
      try {
        // Animate main section
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: 'power2.out' 
          }
        )

        // Animate header
        const header = sectionRef.current.querySelector('.page-header')
        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        }

        // Animate all h2 titles with stagger effect
        const titles = contentRef.current?.querySelectorAll('h2')
        if (titles && titles.length > 0) {
          gsap.fromTo(
            titles,
            {
              opacity: 0,
              y: 50,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        }

        // Animate content cards with stagger
        const cards = contentRef.current?.querySelectorAll('div.bg-dark-navy')
        if (cards && cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 40,
              scale: 0.98,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        }
      } catch (error) {
        console.error('GSAP animation error:', error)
        // Fallback: just show the content
        if (sectionRef.current) {
          sectionRef.current.style.opacity = '1'
        }
      }
    }

    return () => {
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <Navbar />
      <section
        ref={sectionRef}
        className="relative min-h-screen py-24 px-6 overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="page-header text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {t('privacy_title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">
              {t('privacy_last_updated')}
            </p>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Introduction */}
            <div className="bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_intro_title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('privacy_intro_text')}
              </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_collect_title')}</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {t('privacy_collect_text')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>{t('privacy_collect_item1')}</li>
                <li>{t('privacy_collect_item2')}</li>
                <li>{t('privacy_collect_item3')}</li>
                <li>{t('privacy_collect_item4')}</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_use_title')}</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {t('privacy_use_text')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>{t('privacy_use_item1')}</li>
                <li>{t('privacy_use_item2')}</li>
                <li>{t('privacy_use_item3')}</li>
                <li>{t('privacy_use_item4')}</li>
              </ul>
            </div>

            {/* Data Protection */}
            <div className="bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_protection_title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('privacy_protection_text')}
              </p>
            </div>

            {/* Your Rights */}
            <div className="bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_rights_title')}</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {t('privacy_rights_text')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>{t('privacy_rights_item1')}</li>
                <li>{t('privacy_rights_item2')}</li>
                <li>{t('privacy_rights_item3')}</li>
                <li>{t('privacy_rights_item4')}</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_cookies_title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('privacy_cookies_text')}
              </p>
            </div>

            {/* Contact */}
            <div className="bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{t('privacy_contact_title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('privacy_contact_text')}
              </p>
              <p className="text-gray-300 mt-4">
                <strong className="text-white">البريد الإلكتروني:</strong>{' '}
                <a href="mailto:alramzagency@gmail.com" className="text-lavender hover:underline">
                  alramzagency@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

