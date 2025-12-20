import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alramz-agency.com'

export const metadata: Metadata = {
  title: 'شروط الخدمة - الرمز | وكالة التصميم الإبداعية',
  description: 'شروط الخدمة لموقع الرمز - وكالة التصميم الإبداعية. الشروط والأحكام الخاصة بخدمات التصميم والمونتاج والأنيميشن. Terms of Service.',
  keywords: [
    'شروط الخدمة',
    'terms of service',
    'الشروط والأحكام',
    'terms and conditions',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'شروط الخدمة - الرمز',
    description: 'شروط الخدمة لموقع الرمز - وكالة التصميم الإبداعية. الشروط والأحكام الخاصة بخدمات التصميم والمونتاج.',
    url: `${baseUrl}/terms`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

