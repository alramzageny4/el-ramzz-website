import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alramz-agency.com'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - الرمز | وكالة التصميم الإبداعية',
  description: 'سياسة الخصوصية لموقع الرمز - وكالة التصميم الإبداعية. نلتزم بحماية خصوصيتك وبياناتك الشخصية. Privacy Policy.',
  keywords: [
    'سياسة الخصوصية',
    'privacy policy',
    'حماية البيانات',
    'data protection',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'سياسة الخصوصية - الرمز',
    description: 'سياسة الخصوصية لموقع الرمز - وكالة التصميم الإبداعية. نلتزم بحماية خصوصيتك وبياناتك الشخصية.',
    url: `${baseUrl}/privacy`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

