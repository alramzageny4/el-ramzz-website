'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/contexts/LanguageContext'
import StructuredData from '@/components/StructuredData'
import { getFAQSchema } from '@/lib/structured-data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FAQ() {
  const { t, language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  const faqs = [
    {
      question: t('faq_q1'),
      answer: t('faq_a1'),
    },
    {
      question: t('faq_q2'),
      answer: t('faq_a2'),
    },
    {
      question: t('faq_q3'),
      answer: t('faq_a3'),
    },
    {
      question: t('faq_q4'),
      answer: t('faq_a4'),
    },
    {
      question: t('faq_q5'),
      answer: t('faq_a5'),
    },
  ]

  useEffect(() => {
    if (itemsRef.current) {
      const items = itemsRef.current.children
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
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

  const faqSchema = getFAQSchema(faqs)

  return (
    <>
      <StructuredData additionalSchemas={[faqSchema]} />
      <section
        id="faq"
        ref={sectionRef}
        className="relative py-24 px-6 overflow-hidden z-10"
      >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-6xl font-bold text-white mb-4">
            {t('faq_title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('faq_subtitle')}
          </p>
        </div>

        <div ref={itemsRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="relative group film-grain"
            >
              <div className="relative bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden hover:border-neon-purple transition-all duration-150">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full p-6 ${language === 'ar' ? 'text-right' : 'text-left'} flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''} justify-between hover:bg-purple-900/20 transition-colors duration-150`}
                >
                  <h3 className={`text-xl font-bold text-white ${language === 'ar' ? 'pr-4' : 'pl-4'}`}>{faq.question}</h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-purple-blue flex items-center justify-center transition-transform duration-150 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  >
                    <span className="text-white font-bold">+</span>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-150 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`p-6 pt-0 text-gray-300 border-t border-purple-500/20 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {index === 4 ? (
                      <div className="space-y-4">
                        <p>{faq.answer}</p>
                        <Link
                          href="/contact"
                          className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 text-white font-semibold rounded-lg hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 group overflow-hidden"
                        >
                          {/* Glass reflection effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
                          
                          {/* Animated glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                          
                          {/* Shimmer animation */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          
                          <span className="relative z-10">{language === 'ar' ? 'اذهب إلى صفحة التواصل' : 'Go to Contact Page'}</span>
                          <svg 
                            className={`relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    ) : (
                      faq.answer
                    )}
                  </div>
                </div>

                {/* Glow divider */}
                {index < faqs.length - 1 && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

