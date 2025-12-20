import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'

export const metadata: Metadata = {
  title: 'ترويج طبي - الرمز | مونتاج فيديوهات ترويجية للأطباء',
  description: 'مونتاج احترافي لفيديوهات ترويجية للأطباء في مجالات التجميل والجراحة مع شرح احترافي، تأثيرات بصرية متقدمة، وتصميم يبرز الخبرة والثقة. فيديو طبي، ترويج طبي، medical video.',
  keywords: [
    'فيديو طبي',
    'ترويج طبي',
    'إعلان طبيب',
    'مونتاج طبي',
    'medical video',
    'doctor promotion',
    'medical marketing',
    'healthcare video',
  ],
  openGraph: {
    title: 'ترويج طبي - الرمز | مونتاج فيديوهات ترويجية للأطباء',
    description: 'مونتاج احترافي لفيديوهات ترويجية للأطباء في مجالات التجميل والجراحة مع شرح احترافي.',
    url: `${baseUrl}/video-editing/medical-promotion`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/video-editing/medical-promotion`,
  },
}

export default function MedicalPromotionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

