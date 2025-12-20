'use client'

import Script from 'next/script'
import { getOrganizationSchema, getLocalBusinessSchema, type OrganizationSchema, type LocalBusinessSchema } from '@/lib/structured-data'
import { useLanguage } from '@/contexts/LanguageContext'

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'both'
  additionalSchemas?: Array<Record<string, any>>
}

export default function StructuredData({ type = 'both', additionalSchemas = [] }: StructuredDataProps) {
  const { language } = useLanguage()

  const schemas: Array<Record<string, any>> = []

  if (type === 'organization' || type === 'both') {
    schemas.push(getOrganizationSchema(language))
  }

  if (type === 'localBusiness' || type === 'both') {
    schemas.push(getLocalBusinessSchema(language))
  }

  if (additionalSchemas.length > 0) {
    schemas.push(...additionalSchemas)
  }

  if (schemas.length === 0) return null

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

