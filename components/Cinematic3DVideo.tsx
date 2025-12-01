'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'

// Dynamic import لـ Lottie لتقليل الحجم الأولي
const Lottie = dynamic(
  () => import('lottie-react').then((mod) => ({ default: mod.default || mod })),
  {
    ssr: false,
    loading: () => null,
  }
)

export default function Cinematic3DVideo() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [animationData, setAnimationData] = useState<any>(null)
  const [animationLoaded, setAnimationLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const lottieRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const loadTimerRef = useRef<NodeJS.Timeout | null>(null)

  // تحميل البيانات بشكل lazy بعد تحميل الصفحة الأساسية - محسّن للأداء
  useEffect(() => {
    // استخدام Intersection Observer لتأخير التحميل حتى يكون المستخدم قريباً من العنصر
    const loadAnimation = () => {
      // تحميل بعد 5 ثواني من تحميل الصفحة (تأخير أكبر لتقليل التأثير على الأداء)
      loadTimerRef.current = setTimeout(() => {
        setShouldLoad(true)
        // استخدام fetch مع cache و priority منخفض
        fetch('/Businessman flies up with rocket.json', {
          cache: 'force-cache', // استخدام cache إذا كان متاحاً
        } as RequestInit)
          .then((res) => {
            if (!res.ok) throw new Error('Failed to load animation')
            return res.json()
          })
          .then((data) => {
            setAnimationData(data)
            setAnimationLoaded(true)
          })
          .catch((error) => {
            console.error('Error loading Lottie animation:', error)
            // في حالة الخطأ، لا نعرض الأنيميشن
            setHasPlayed(true)
          })
      }, 5000) // زيادة التأخير إلى 5 ثواني لتقليل التأثير على تحميل الصفحة
    }

    // استخدام requestIdleCallback مع timeout أطول
    if ('requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(loadAnimation, { timeout: 8000 })
    } else {
      // Fallback: تحميل بعد 6 ثواني
      setTimeout(loadAnimation, 6000)
    }

    return () => {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // بعد تحميل البيانات، ابدأ الأنيميشن - محسّن للأداء
    if (!animationLoaded) return

    const timer = setTimeout(() => {
      if (containerRef.current) {
        setIsVisible(true)

        // استخدام requestAnimationFrame لضمان أداء أفضل
        requestAnimationFrame(() => {
          // إنشاء Timeline للأنيميشن مع تحسينات للأداء
          timelineRef.current = gsap.timeline({
            onStart: () => {
              if (containerRef.current) {
                containerRef.current.style.opacity = '1'
              }
            },
            defaults: {
              ease: 'power2.out', // استخدام power2 بدلاً من power3 (أسرع)
            },
          })

          // الخطوة 1: الظهور من اليسار للمنتصف - أسرع وأخف
          timelineRef.current.fromTo(
            containerRef.current,
            {
              x: '-100vw',
              opacity: 0,
              scale: 0.95, // تقليل scale change لتقليل الحسابات
              // إزالة rotationY لتقليل الحسابات 3D
            },
            {
              x: '0',
              opacity: 1,
              scale: 1,
              duration: 0.8, // تقليل المدة من 1.2 إلى 0.8 ثانية
              ease: 'power1.out', // استخدام power1 (أسرع من power2)
              onComplete: () => {
                // بعد الوصول للمنتصف مباشرة، ابدأ تشغيل Lottie
                if (lottieRef.current) {
                  requestAnimationFrame(() => {
                    lottieRef.current?.play()
                  })
                }
              },
            }
          )
        })
      }
    }, 1000) // تقليل التأخير إلى 1 ثانية بعد تحميل البيانات

    return () => {
      clearTimeout(timer)
    }
  }, [animationLoaded])

  // معالج انتهاء الأنيميشن مع useCallback لتحسين الأداء
  const handleComplete = useCallback(() => {
    if (!containerRef.current || !timelineRef.current) return

    // استخدام requestAnimationFrame للأداء الأفضل
    requestAnimationFrame(() => {
      if (timelineRef.current && containerRef.current) {
        timelineRef.current
          .to(containerRef.current, {
            x: '100vw',
            scale: 0.95, // تقليل scale change
            // إزالة rotationY لتقليل الحسابات 3D
            duration: 1.0, // تقليل المدة من 1.8 إلى 1.0 ثانية
            ease: 'power1.in', // استخدام power1 (أسرع)
          })
          .to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.3, // تقليل المدة من 0.5 إلى 0.3 ثانية
              onComplete: () => {
                setHasPlayed(true)
                // تنظيف شامل وفوري
                if (timelineRef.current) {
                  timelineRef.current.kill()
                  timelineRef.current = null
                }
                // تنظيف الذاكرة فوراً
                setAnimationData(null)
                if (lottieRef.current) {
                  lottieRef.current.destroy()
                  lottieRef.current = null
                }
                // تنظيف container style
                if (containerRef.current) {
                  containerRef.current.style.display = 'none'
                }
              },
            },
            '-=0.2' // تقليل overlap
          )
      }
    })
  }, [])

  // استخدام useMemo للستايلات لتقليل إعادة الحساب (يجب أن يكون قبل أي return)
  const containerStyle = useMemo(
    () => ({
      opacity: 0,
      willChange: 'transform' as const, // تقليل willChange لتقليل استهلاك الذاكرة
      backgroundColor: 'transparent',
      transform: 'translateZ(0)', // GPU acceleration
      backfaceVisibility: 'hidden' as const, // تحسين الأداء
      WebkitBackfaceVisibility: 'hidden' as const,
    }),
    []
  )

  // إذا تم تشغيل الأنيميشن بالفعل أو لم يتم تحميله، لا تعرضه
  if (hasPlayed || !shouldLoad) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={containerStyle}
      aria-hidden="true"
    >
      {/* تأثير التوهج النيون - محسّن (مخفف) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-full h-full bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-2xl"
          style={{ willChange: 'opacity' }}
        />
      </div>

      {/* Lottie Animation - wrapper لإزالة الخلفية */}
      {animationData && (
        <div
          className="relative z-10"
          style={{
            mixBlendMode: 'lighten' as const,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          <div
            className="w-auto h-[60vh] max-w-[90vw]"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.4))', // تقليل drop-shadow لتقليل الحسابات
              willChange: 'transform',
              transform: 'translateZ(0)', // GPU acceleration
            }}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              onComplete={handleComplete}
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid meet',
              }}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
              }}
            />
          </div>
        </div>
      )}

      {/* تأثيرات إضافية للعمق - محسّنة (مخففة) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-radial from-purple-500/5 via-blue-500/2 to-transparent blur-xl"
          style={{ willChange: 'opacity' }}
        />
      </div>
    </div>
  )
}

