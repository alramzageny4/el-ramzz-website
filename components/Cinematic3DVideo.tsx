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

  // تحميل البيانات بشكل lazy بعد تحميل الصفحة الأساسية
  useEffect(() => {
    // استخدام requestIdleCallback للتحميل في وقت فراغ المتصفح
    const loadAnimation = () => {
      // تحميل بعد 3 ثواني من تحميل الصفحة (قبل الظهور بوقت كافٍ)
      loadTimerRef.current = setTimeout(() => {
        setShouldLoad(true)
        fetch('/Businessman flies up with rocket.json', {
          priority: 'low', // تحميل منخفض الأولوية
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
      }, 3000) // 3 ثواني بعد تحميل الصفحة
    }

    // استخدام requestIdleCallback إذا كان متاحاً
    if ('requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(loadAnimation, { timeout: 5000 })
    } else {
      // Fallback للمتصفحات التي لا تدعم requestIdleCallback
      loadAnimation()
    }

    return () => {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // بعد 5.5 ثانية من تحميل الصفحة، ابدأ الأنيميشن
    // فقط إذا تم تحميل البيانات
    if (!animationLoaded) return

    const timer = setTimeout(() => {
      if (containerRef.current) {
        setIsVisible(true)

        // استخدام requestAnimationFrame لضمان أداء أفضل
        requestAnimationFrame(() => {
          // إنشاء Timeline للأنيميشن مع تحسينات
          timelineRef.current = gsap.timeline({
            onStart: () => {
              if (containerRef.current) {
                containerRef.current.style.opacity = '1'
              }
            },
            defaults: {
              ease: 'power3.out',
            },
          })

          // الخطوة 1: الظهور من اليسار للمنتصف - أسرع
          timelineRef.current.fromTo(
            containerRef.current,
            {
              x: '-100vw',
              opacity: 0,
              scale: 0.9,
              rotationY: -10,
            },
            {
              x: '0',
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 1.2, // تقليل المدة من 1.8 إلى 1.2 ثانية
              ease: 'power2.out', // أسرع من power3
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
    }, 5500) // 5.5 ثانية

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
            scale: 0.9,
            rotationY: 15,
            duration: 1.8,
            ease: 'power3.in',
          })
          .to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                setHasPlayed(true)
                // تنظيف شامل
                if (timelineRef.current) {
                  timelineRef.current.kill()
                  timelineRef.current = null
                }
                // تنظيف الذاكرة
                setAnimationData(null)
                if (lottieRef.current) {
                  lottieRef.current.destroy()
                }
              },
            },
            '-=0.3'
          )
      }
    })
  }, [])

  // استخدام useMemo للستايلات لتقليل إعادة الحساب (يجب أن يكون قبل أي return)
  const containerStyle = useMemo(
    () => ({
      opacity: 0,
      willChange: 'transform, opacity' as const,
      backgroundColor: 'transparent',
      transform: 'translateZ(0)', // GPU acceleration
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
      {/* تأثير التوهج النيون - محسّن */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl"
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
              filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.4))',
              willChange: 'transform',
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

      {/* تأثيرات إضافية للعمق - محسّنة */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent blur-2xl"
          style={{ willChange: 'opacity' }}
        />
      </div>
    </div>
  )
}

