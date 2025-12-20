import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alramz-agency.com'

export const metadata: Metadata = {
  title: 'مونتاج سيارات - الرمز | مونتاج فيديوهات سيارات احترافي',
  description: 'مونتاج احترافي لفيديوهات السيارات مع تأثيرات ديناميكية متقدمة، انتقالات سلسة، وتصميم يبرز تفاصيل السيارة وجمالها. مونتاج سيارات، فيديو سيارة، car video editing.',
  keywords: [
    'مونتاج سيارات',
    'فيديو سيارة',
    'إعلان سيارة',
    'مونتاج سيارات احترافي',
    'car video editing',
    'automotive video',
    'car commercial',
    'vehicle video',
  ],
  openGraph: {
    title: 'مونتاج سيارات - الرمز | مونتاج فيديوهات سيارات احترافي',
    description: 'مونتاج احترافي لفيديوهات السيارات مع تأثيرات ديناميكية متقدمة، انتقالات سلسة، وتصميم يبرز التفاصيل.',
    url: `${baseUrl}/video-editing/cars-editing`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/video-editing/cars-editing`,
  },
}

export default function CarsEditingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

