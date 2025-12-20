import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'

export const metadata: Metadata = {
  title: 'الأنيميشن الاحترافي - الرمز | أنيميشن ثلاثي الأبعاد وموشن جرافيك',
  description: 'أنيميشن احترافي ثلاثي الأبعاد وموشن جرافيك في مصر. نحول أفكارك إلى أنيميشن مذهل بجودة عالية. أنيميشن 3D، موشن جرافيك، بورد أنيميشن، animation، motion graphics.',
  keywords: [
    'أنيميشن',
    'أنيميشن ثلاثي الأبعاد',
    'موشن جرافيك',
    'بورد أنيميشن',
    'أنيميشن احترافي',
    '3D animation',
    'motion graphics',
    'animation',
    '2D animation',
    '3D animation Egypt',
    'motion graphics Egypt',
  ],
  openGraph: {
    title: 'الأنيميشن الاحترافي - الرمز | أنيميشن ثلاثي الأبعاد وموشن جرافيك',
    description: 'أنيميشن احترافي ثلاثي الأبعاد وموشن جرافيك في مصر. نحول أفكارك إلى أنيميشن مذهل بجودة عالية.',
    url: `${baseUrl}/professional-animation`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/professional-animation`,
  },
}

export default function ProfessionalAnimationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

