// Structured Data (JSON-LD) for SEO

export interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  logo: string
  description: string
  address?: {
    '@type': string
    addressCountry: string
    addressLocality: string
  }
  contactPoint?: {
    '@type': string
    telephone: string
    contactType: string
    email?: string
  }
  sameAs?: string[]
}

export interface LocalBusinessSchema {
  '@context': string
  '@type': string
  name: string
  image: string
  '@id': string
  url: string
  telephone: string
  priceRange: string
  address: {
    '@type': string
    addressLocality: string
    addressCountry: string
  }
  geo?: {
    '@type': string
    latitude: string
    longitude: string
  }
  openingHoursSpecification?: {
    '@type': string
    dayOfWeek: string[]
    opens: string
    closes: string
  }
}

export interface ServiceSchema {
  '@context': string
  '@type': string
  serviceType: string
  provider: {
    '@type': string
    name: string
  }
  areaServed: {
    '@type': string
    name: string
  }
  description: string
}

export interface BreadcrumbListSchema {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item: string
  }>
}

export interface FAQPageSchema {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elramzz.com'

export function getOrganizationSchema(language: 'ar' | 'en' = 'ar'): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: language === 'ar' ? 'الرمز - وكالة التصميم الإبداعية' : 'Al-Ramz - Creative Design Agency',
    url: baseUrl,
    logo: `${baseUrl}/ChatGPT Image Nov 21, 2025, 08_46_14 PM.png`,
    description: language === 'ar' 
      ? 'وكالة إبداعية متخصصة في التصميم والمونتاج والأنيميشن. نحول أفكارك إلى واقع رقمي مذهل بجودة عالية وإبداع لا محدود.'
      : 'Creative agency specialized in design, video editing, and animation. We transform your ideas into amazing digital reality with high quality and unlimited creativity.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: language === 'ar' ? 'مصر' : 'Egypt',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201023142124',
      contactType: 'customer service',
      email: 'alramzagency@gmail.com',
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=61559193041396',
      'https://www.instagram.com/alramzagency?igsh=YTF4amI1MDNzMXFi',
      'https://www.tiktok.com/@alramzagency',
    ],
  }
}

export function getLocalBusinessSchema(language: 'ar' | 'en' = 'ar'): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: language === 'ar' ? 'الرمز - وكالة التصميم الإبداعية' : 'Al-Ramz - Creative Design Agency',
    image: `${baseUrl}/ChatGPT Image Nov 21, 2025, 08_46_14 PM.png`,
    '@id': baseUrl,
    url: baseUrl,
    telephone: '+201023142124',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: language === 'ar' ? 'مصر' : 'Egypt',
      addressCountry: 'EG',
    },
  }
}

export function getServiceSchema(
  serviceType: string,
  description: string,
  language: 'ar' | 'en' = 'ar'
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    provider: {
      '@type': 'Organization',
      name: language === 'ar' ? 'الرمز - وكالة التصميم' : 'Al-Ramz Design Agency',
    },
    areaServed: {
      '@type': 'Country',
      name: language === 'ar' ? 'مصر' : 'Egypt',
    },
    description,
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export interface VideoObjectSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  thumbnailUrl?: string
  uploadDate?: string
  contentUrl?: string
  embedUrl?: string
  duration?: string
}

export function getVideoObjectSchema(
  name: string,
  description: string,
  videoUrl: string,
  thumbnailUrl?: string
): VideoObjectSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: thumbnailUrl || `${baseUrl}/11.png`,
    contentUrl: videoUrl,
    uploadDate: new Date().toISOString(),
  }
}

