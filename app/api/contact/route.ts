import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  service: z.string().min(1),
  message: z.string().min(10).max(500),
})

// Service names mapping
const serviceNames: Record<string, string> = {
  design: 'التصميم الجرافيكي',
  video: 'المونتاج والتحرير',
  animation: 'الأنيميشن والموشن جرافيك',
  other: 'أخرى',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = contactSchema.parse(body)

    // Map service code to service name
    const serviceName = serviceNames[validatedData.service] || validatedData.service

    // Send emails
    try {
      await sendContactEmail({
        ...validatedData,
        service: serviceName,
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Still return success to user, but log the error
      // In production, you might want to save to database as backup
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' 
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'البيانات غير صحيحة',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.' 
      },
      { status: 500 }
    )
  }
}

