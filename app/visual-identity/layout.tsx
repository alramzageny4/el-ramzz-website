import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'

export const metadata: Metadata = {
  title: 'الهوية البصرية - الرمز | تصميم شعار وهوية بصرية متكاملة',
  description: 'تصميم هوية بصرية متكاملة وشعار احترافي لعلامتك التجارية. نحول رؤيتك إلى هوية بصرية قوية ومميزة تعكس قيم شركتك. تصميم شعار، هوية بصرية، براندنج في مصر.',
  keywords: [
    'هوية بصرية',
    'تصميم شعار',
    'براندنج',
    'هوية تجارية',
    'تصميم هوية بصرية',
    'شعار احترافي',
    'brand identity',
    'logo design',
    'visual identity',
    'branding',
    'corporate identity',
  ],
  openGraph: {
    title: 'الهوية البصرية - الرمز | تصميم شعار وهوية بصرية متكاملة',
    description: 'تصميم هوية بصرية متكاملة وشعار احترافي لعلامتك التجارية. نحول رؤيتك إلى هوية بصرية قوية ومميزة.',
    url: `${baseUrl}/visual-identity`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/visual-identity`,
  },
}

export default function VisualIdentityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

