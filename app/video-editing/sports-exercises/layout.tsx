import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'

export const metadata: Metadata = {
  title: 'مونتاج فيديوهات التمارين الرياضية - الرمز | مونتاج احترافي للتمارين',
  description: 'مونتاج احترافي لفيديوهات التمارين الرياضية مع شرح تفصيلي للحركات والتقنيات، تأثيرات بصرية متقدمة، وتصميم جذاب يبرز التفاصيل. مونتاج تمارين، فيديو رياضي، video editing exercises.',
  keywords: [
    'مونتاج تمارين',
    'فيديو رياضي',
    'مونتاج فيديو تمارين',
    'فيديو تمارين',
    'مونتاج رياضي',
    'video editing exercises',
    'fitness video editing',
    'exercise video production',
  ],
  openGraph: {
    title: 'مونتاج فيديوهات التمارين الرياضية - الرمز',
    description: 'مونتاج احترافي لفيديوهات التمارين الرياضية مع شرح تفصيلي للحركات والتقنيات، تأثيرات بصرية متقدمة.',
    url: `${baseUrl}/video-editing/sports-exercises`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/video-editing/sports-exercises`,
  },
}

export default function SportsExercisesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

