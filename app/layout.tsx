import type { Metadata } from 'next'
import './globals.css'
import ToasterProvider from '@/components/ToasterProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Cinematic3DVideo from '@/components/Cinematic3DVideo'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: {
    default: 'الرمز - وكالة التصميم الإبداعية',
    template: '%s | الرمز'
  },
  description: 'وكالة إبداعية متخصصة في التصميم والمونتاج والأنيميشن. نحول أفكارك إلى واقع رقمي مذهل بجودة عالية وإبداع لا محدود. تصميم جرافيكي، مونتاج فيديو احترافي، أنيميشن ثلاثي الأبعاد، هوية بصرية متكاملة في مصر.',
  keywords: [
    'تصميم جرافيكي',
    'مونتاج فيديو',
    'أنيميشن',
    'موشن جرافيك',
    'هوية بصرية',
    'تصميم شعار',
    'مونتاج احترافي',
    'وكالة تصميم',
    'تصميم في مصر',
    'أنيميشن ثلاثي الأبعاد',
    'graphic design',
    'video editing',
    'animation',
    'motion graphics',
    'logo design',
    'brand identity',
    'creative agency',
    'design agency Egypt',
  ],
  authors: [{ name: 'الرمز - وكالة التصميم' }],
  creator: 'الرمز',
  publisher: 'الرمز',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'),
  icons: {
    icon: [
      { url: '/ChatGPT Image Nov 21, 2025, 08_46_14 PM.png', sizes: '32x32', type: 'image/png' },
      { url: '/ChatGPT Image Nov 21, 2025, 08_46_14 PM.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/ChatGPT Image Nov 21, 2025, 08_46_14 PM.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/ChatGPT Image Nov 21, 2025, 08_46_14 PM.png',
  },
  alternates: {
    canonical: '/',
    languages: {
      'ar': '/',
      'en': '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: '/',
    title: 'الرمز - وكالة التصميم الإبداعية',
    description: 'وكالة إبداعية متخصصة في التصميم والمونتاج والأنيميشن',
    siteName: 'الرمز',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'الرمز - وكالة التصميم',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الرمز - وكالة التصميم الإبداعية',
    description: 'وكالة إبداعية متخصصة في التصميم والمونتاج والأنيميشن',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'SpstkClP6yPd0hmedgYOinJoI4Fcg9kkPxMZwtnZ-wM',
    // yandex: 'your-yandex-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>
          <StructuredData type="both" />
          <Cinematic3DVideo />
          {children}
          <ToasterProvider />
        </LanguageProvider>
      </body>
    </html>
  )
}

