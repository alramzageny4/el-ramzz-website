import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alramz-agency.com'

export const metadata: Metadata = {
  title: 'مونتاج إعلانات الجيم والمدربين - الرمز | إعلانات ترويجية احترافية',
  description: 'مونتاج إعلانات ترويجية احترافية للجيم والمدربين مع تأثيرات بصرية جذابة، موشن جرافيك متقدم، وتصميم يبرز الخدمات والمنتجات. إعلان جيم، إعلان مدرب، gym ads.',
  keywords: [
    'إعلان جيم',
    'إعلان مدرب',
    'مونتاج إعلان رياضي',
    'إعلان ترويجي',
    'gym ads',
    'fitness ads',
    'trainer promotion',
    'sports advertising',
  ],
  openGraph: {
    title: 'مونتاج إعلانات الجيم والمدربين - الرمز',
    description: 'مونتاج إعلانات ترويجية احترافية للجيم والمدربين مع تأثيرات بصرية جذابة، موشن جرافيك متقدم.',
    url: `${baseUrl}/video-editing/sports-ads`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/video-editing/sports-ads`,
  },
}

export default function SportsAdsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

