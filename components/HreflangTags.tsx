'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { usePathname } from 'next/navigation'
import Head from 'next/head'

export default function HreflangTags() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alramz-agency.com'
  
  // Get current path without language prefix
  const currentPath = pathname === '/' ? '' : pathname
  
  return (
    <>
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}${currentPath}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${currentPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${currentPath}`} />
    </>
  )
}

