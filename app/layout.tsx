import type { Metadata } from 'next'
import './globals.css'
import ToasterProvider from '@/components/ToasterProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Cinematic3DVideo from '@/components/Cinematic3DVideo'

export const metadata: Metadata = {
  title: {
    default: 'الرمز - وكالة التصميم الإبداعية',
    template: '%s | الرمز'
  },
  description: 'وكالة إبداعية متخصصة في التصميم والمونتاج والأنيميشن. نحول أفكارك إلى واقع رقمي مذهل بجودة عالية وإبداع لا محدود.',
  keywords: ['تصميم جرافيكي', 'مونتاج فيديو', 'أنيميشن', 'موشن جرافيك', 'هوية بصرية', 'مصر'],
  authors: [{ name: 'الرمز - وكالة التصميم' }],
  creator: 'الرمز',
  publisher: 'الرمز',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alramz-agency.com'),
  alternates: {
    canonical: '/',
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
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
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
          <Cinematic3DVideo />
          {children}
          <ToasterProvider />
        </LanguageProvider>
      </body>
    </html>
  )
}

