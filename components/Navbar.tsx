'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Handle hash navigation on page load
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - offset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
          setActiveSection(hash)
        }
      }, 300)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Only check sections if on home page
      if (pathname === '/') {
        const sections = ['home', 'about', 'speakers', 'schedule', 'faq'] as const
        const current = sections.find(section => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 150 && rect.bottom >= 150
          }
          return false
        })
        if (current) setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setActiveSection(sectionId)
    
    // If not on home page, navigate to home first
    if (pathname !== '/') {
      router.push(`/#${sectionId}`)
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - offset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      }, 100)
      return
    }
    
    // If on home page, just scroll
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      // Ultra-fast smooth scroll with optimized performance
      const startY = window.pageYOffset
      const distance = offsetPosition - startY
      const duration = Math.min(300, Math.abs(distance) * 0.5)
      const startTime = performance.now()
      
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
        
        window.scrollTo(0, startY + distance * ease)
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }
      
      requestAnimationFrame(animateScroll)
    }
  }

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_services') },
    { id: 'speakers', label: t('nav_portfolio') },
    { id: 'schedule', label: t('nav_process') },
    { id: 'faq', label: t('nav_faq') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out ${
        scrolled
          ? 'bg-dark-navy/90 backdrop-blur-xl border-b border-purple-500/30 shadow-lg shadow-purple-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center hover:scale-105 transition-transform duration-150 cursor-pointer ml-0"
          >
            <Image
              src="/ChatGPT Image Nov 21, 2025, 08_46_14 PM.png"
              alt="الرمز - EL RAMZ Logo"
              width={200}
              height={70}
              className="h-16 md:h-20 w-auto object-contain brightness-110 contrast-110"
              priority
              quality={100}
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 mr-4 md:mr-6">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-150 group ${
                    activeSection === item.id
                      ? 'text-lavender'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple via-blue-violet to-neon-purple glow-purple animate-pulse"></span>
                  )}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple to-blue-violet opacity-0 group-hover:opacity-100 transition-all duration-150 transform scale-x-0 group-hover:scale-x-100 origin-center"></span>
                  <span className="absolute inset-0 bg-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 -z-10"></span>
                </Link>
              ))}
            </div>
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-150 group border border-purple-500/30 rounded-lg hover:border-purple-400/50"
              aria-label="Toggle language"
            >
              <span className="relative z-10 font-bold flex items-center gap-2">
                <span>{language === 'ar' ? '🇺🇸 EN' : '🇸🇦 AR'}</span>
              </span>
              <span className="absolute inset-0 bg-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 -z-10"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3 mr-4">
            <button
              onClick={toggleLanguage}
              className="relative px-3 py-2 text-xs font-medium text-gray-300 hover:text-white transition-all duration-150 border border-purple-500/30 rounded-lg"
              aria-label="Toggle language"
            >
              {language === 'ar' ? '🇺🇸 EN' : '🇸🇦 AR'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-white hover:text-lavender transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-2 border-t border-purple-500/30 bg-dark-navy/95 backdrop-blur-xl">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  handleNavClick(e, item.id)
                  setMobileMenuOpen(false)
                }}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 ${
                  activeSection === item.id
                    ? 'text-lavender bg-purple-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

