'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { useLanguage } from '@/contexts/LanguageContext'

type ContactFormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export default function ContactForm() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactSchema = useMemo(() => z.object({
    name: z.string().min(2, t('contact_validation_name_min')).max(50, t('contact_validation_name_max')),
    email: z.string().email(t('contact_validation_email')),
    phone: z.string().min(10, t('contact_validation_phone_min')).max(15, t('contact_validation_phone_max')),
    service: z.string().min(1, t('contact_validation_service')),
    message: z.string().min(10, t('contact_validation_message_min')).max(500, t('contact_validation_message_max')),
  }), [t])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // إرسال البيانات إلى نظام الإدارة
      const managementSystemUrl = process.env.NEXT_PUBLIC_MANAGEMENT_API_URL || 'https://el-ramzz.vercel.app'
      const apiKey = process.env.NEXT_PUBLIC_MANAGEMENT_API_KEY || 'ramzz-agency-secret-key-2024'
      
      const response = await fetch(`${managementSystemUrl}/api/clients/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          mobile: data.phone, // استخدام نفس الرقم للجوال
          company_name: data.service, // استخدام نوع الخدمة كاسم الشركة
          message: data.message,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || t('contact_validation_error_send'))
      }

      const result = await response.json()
      toast.success(result.message || t('contact_form_success'))
      reset()
    } catch (error: any) {
      // معالجة أفضل للأخطاء
      if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_CONNECTION_REFUSED')) {
        toast.error('تعذر الاتصال بنظام الإدارة. يرجى المحاولة مرة أخرى لاحقاً.')
      } else {
        toast.error(error.message || t('contact_form_error'))
      }
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
            {t('contact_form_name')} <span className="text-red-400">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className={`w-full px-4 py-3 bg-dark-navy/60 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-purple-500/30 focus:border-neon-purple focus:ring-neon-purple'
            }`}
            placeholder={t('contact_form_name_placeholder')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
            {t('contact_form_email')} <span className="text-red-400">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className={`w-full px-4 py-3 bg-dark-navy/60 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-purple-500/30 focus:border-neon-purple focus:ring-neon-purple'
            }`}
            placeholder={t('contact_form_email_placeholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
            {t('contact_form_phone')} <span className="text-red-400">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className={`w-full px-4 py-3 bg-dark-navy/60 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.phone
                ? 'border-red-500 focus:ring-red-500'
                : 'border-purple-500/30 focus:border-neon-purple focus:ring-neon-purple'
            }`}
            placeholder={t('contact_form_phone_placeholder')}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>

        {/* Service Field */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-white mb-2">
            {t('contact_form_service')} <span className="text-red-400">*</span>
          </label>
          <select
            {...register('service')}
            id="service"
            className={`w-full px-4 py-3 bg-dark-navy/60 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.service
                ? 'border-red-500 focus:ring-red-500'
                : 'border-purple-500/30 focus:border-neon-purple focus:ring-neon-purple'
            }`}
          >
            <option value="">{t('contact_form_service_placeholder')}</option>
            <option value="design">{t('contact_form_service_design')}</option>
            <option value="video">{t('contact_form_service_video')}</option>
            <option value="animation">{t('contact_form_service_animation')}</option>
            <option value="other">{t('contact_form_service_other')}</option>
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-400">{errors.service.message}</p>
          )}
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
          {t('contact_form_message')} <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          className={`w-full px-4 py-3 bg-dark-navy/60 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
            errors.message
              ? 'border-red-500 focus:ring-red-500'
              : 'border-purple-500/30 focus:border-neon-purple focus:ring-neon-purple'
          }`}
          placeholder={t('contact_form_message_placeholder')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`group relative w-full px-8 py-4 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.3)] ${
          isSubmitting
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:scale-105 active:scale-95'
        }`}
      >
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
        
        {/* Animated glow effect */}
        {!isSubmitting && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            
            {/* Shimmer animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </>
        )}
        
        {isSubmitting ? (
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('contact_form_submitting')}
          </span>
        ) : (
          <span className="relative z-10">{t('contact_form_submit')}</span>
        )}
      </button>
    </form>
  )
}

