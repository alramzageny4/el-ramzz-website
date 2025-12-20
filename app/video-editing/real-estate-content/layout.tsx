import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alramz-agency.com'

export const metadata: Metadata = {
  title: 'محتوى عروض العقارات - الرمز | مونتاج عروض عقارية احترافية',
  description: 'مونتاج احترافي لمحتوى عروض العقارات مع تأثيرات بصرية جذابة، تصميم متقدم يبرز المميزات، وتحرير احترافي يجذب العملاء. مونتاج عقاري، عروض عقارية، real estate content.',
  keywords: [
    'مونتاج عقاري',
    'عروض عقارية',
    'محتوى عقاري',
    'إعلان عقاري',
    'real estate content',
    'property video',
    'real estate marketing',
    'property promotion',
  ],
  openGraph: {
    title: 'محتوى عروض العقارات - الرمز',
    description: 'مونتاج احترافي لمحتوى عروض العقارات مع تأثيرات بصرية جذابة، تصميم متقدم يبرز المميزات.',
    url: `${baseUrl}/video-editing/real-estate-content`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/video-editing/real-estate-content`,
  },
}

export default function RealEstateContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

