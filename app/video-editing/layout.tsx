import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'

export const metadata: Metadata = {
  title: 'مونتاج الفيديو الاحترافي - الرمز | مونتاج فيديو وتحرير احترافي',
  description: 'خدمات مونتاج فيديو احترافية في مصر. مونتاج فيديو ترويجي، رياضي، عقاري، طبي، وسيارات مع تأثيرات بصرية متقدمة. مونتاج احترافي، تحرير فيديو، video editing.',
  keywords: [
    'مونتاج فيديو',
    'تحرير فيديو',
    'مونتاج احترافي',
    'مونتاج فيديو ترويجي',
    'مونتاج رياضي',
    'مونتاج عقاري',
    'video editing',
    'video production',
    'video post-production',
    'professional video editing',
    'video editing Egypt',
  ],
  openGraph: {
    title: 'مونتاج الفيديو الاحترافي - الرمز | مونتاج فيديو وتحرير احترافي',
    description: 'خدمات مونتاج فيديو احترافية في مصر. مونتاج فيديو ترويجي، رياضي، عقاري، طبي، وسيارات مع تأثيرات بصرية متقدمة.',
    url: `${baseUrl}/video-editing`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/video-editing`,
  },
}

export default function VideoEditingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

