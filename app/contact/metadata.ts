import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'

export const contactMetadata: Metadata = {
  title: 'تواصل معنا - الرمز | وكالة التصميم الإبداعية',
  description: 'تواصل مع وكالة الرمز للتصميم والمونتاج والأنيميشن. نحن هنا لمساعدتك في تحويل أفكارك إلى واقع رقمي مذهل. تواصل معنا اليوم واحصل على عرض سعر مخصص.',
  keywords: [
    'تواصل معنا',
    'وكالة تصميم',
    'طلب عرض سعر',
    'تصميم جرافيكي',
    'مونتاج فيديو',
    'أنيميشن',
    'contact us',
    'design agency',
    'get quote',
  ],
  openGraph: {
    title: 'تواصل معنا - الرمز | وكالة التصميم الإبداعية',
    description: 'تواصل مع وكالة الرمز للتصميم والمونتاج والأنيميشن. نحن هنا لمساعدتك في تحويل أفكارك إلى واقع رقمي مذهل.',
    url: `${baseUrl}/contact`,
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الرمز',
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
}

