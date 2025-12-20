import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'

export const metadata: Metadata = {
  title: 'مونتاج التصوير الجوي للعقارات - الرمز | طائرات بدون طيار',
  description: 'مونتاج احترافي للتصوير الجوي للعقارات باستخدام طائرات بدون طيار مع تأثيرات بصرية متقدمة، انتقالات سلسة، وتصميم يبرز جمال العقار من زوايا مختلفة. تصوير جوي، درون، drone real estate.',
  keywords: [
    'تصوير جوي',
    'درون عقارات',
    'مونتاج جوي',
    'طائرة بدون طيار',
    'drone real estate',
    'aerial video',
    'real estate drone',
    'property video',
  ],
  openGraph: {
    title: 'مونتاج التصوير الجوي للعقارات - الرمز',
    description: 'مونتاج احترافي للتصوير الجوي للعقارات باستخدام طائرات بدون طيار مع تأثيرات بصرية متقدمة.',
    url: `${baseUrl}/video-editing/real-estate-drone`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/video-editing/real-estate-drone`,
  },
}

export default function RealEstateDroneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

