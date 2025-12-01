import nodemailer from 'nodemailer'

interface EmailData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export async function sendContactEmail(data: EmailData) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'alramzagency@gmail.com',
      pass: process.env.EMAIL_PASSWORD, // App Password from Gmail
    },
  })

  // Email to company
  const companyMailOptions = {
    from: process.env.EMAIL_USER || 'alramzagency@gmail.com',
    to: 'alramzagency@gmail.com',
    subject: `رسالة جديدة من ${data.name} - ${data.service}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0F172A; color: #ffffff;">
        <h2 style="color: #A855F7; border-bottom: 2px solid #A855F7; padding-bottom: 10px;">
          رسالة جديدة من نموذج التواصل
        </h2>
        
        <div style="background-color: #1E1B4B; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p><strong style="color: #C084FC;">الاسم:</strong> ${data.name}</p>
          <p><strong style="color: #C084FC;">البريد الإلكتروني:</strong> <a href="mailto:${data.email}" style="color: #A855F7;">${data.email}</a></p>
          <p><strong style="color: #C084FC;">رقم الهاتف:</strong> <a href="tel:${data.phone}" style="color: #A855F7;">${data.phone}</a></p>
          <p><strong style="color: #C084FC;">الخدمة المطلوبة:</strong> ${data.service}</p>
        </div>
        
        <div style="background-color: #1E1B4B; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h3 style="color: #C084FC; margin-top: 0;">الرسالة:</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #A855F7; text-align: center; color: #9CA3AF; font-size: 12px;">
          <p>هذه الرسالة تم إرسالها من موقع الرمز - وكالة التصميم</p>
        </div>
      </div>
    `,
    text: `
رسالة جديدة من نموذج التواصل

الاسم: ${data.name}
البريد الإلكتروني: ${data.email}
رقم الهاتف: ${data.phone}
الخدمة المطلوبة: ${data.service}

الرسالة:
${data.message}
    `,
  }

  // Confirmation email to user
  const userMailOptions = {
    from: process.env.EMAIL_USER || 'alramzagency@gmail.com',
    to: data.email,
    subject: 'شكراً لتواصلك معنا - الرمز',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0F172A; color: #ffffff;">
        <h2 style="color: #A855F7; border-bottom: 2px solid #A855F7; padding-bottom: 10px;">
          شكراً لتواصلك معنا
        </h2>
        
        <div style="background-color: #1E1B4B; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p>عزيزي/عزيزتي <strong style="color: #C084FC;">${data.name}</strong>،</p>
          
          <p>شكراً لتواصلك معنا في <strong style="color: #A855F7;">الرمز - وكالة التصميم</strong>.</p>
          
          <p>لقد استلمنا رسالتك بخصوص خدمة <strong style="color: #C084FC;">${data.service}</strong> وسنتواصل معك في أقرب وقت ممكن.</p>
          
          <p>نقدر ثقتك بنا ونتطلع للعمل معك!</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #1E1B4B; border-radius: 8px; border-right: 4px solid #A855F7;">
          <p style="margin: 0; color: #C084FC;"><strong>معلومات التواصل:</strong></p>
          <p style="margin: 5px 0;">البريد الإلكتروني: <a href="mailto:alramzagency@gmail.com" style="color: #A855F7;">alramzagency@gmail.com</a></p>
          <p style="margin: 5px 0;">الموقع: مصر</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #A855F7; text-align: center; color: #9CA3AF; font-size: 12px;">
          <p>الرمز - وكالة التصميم الإبداعية</p>
          <p>مصر</p>
        </div>
      </div>
    `,
    text: `
شكراً لتواصلك معنا

عزيزي/عزيزتي ${data.name}،

شكراً لتواصلك معنا في الرمز - وكالة التصميم.

لقد استلمنا رسالتك بخصوص خدمة ${data.service} وسنتواصل معك في أقرب وقت ممكن.

نقدر ثقتك بنا ونتطلع للعمل معك!

معلومات التواصل:
البريد الإلكتروني: alramzagency@gmail.com
الموقع: مصر

الرمز - وكالة التصميم الإبداعية
    `,
  }

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(userMailOptions),
    ])

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

