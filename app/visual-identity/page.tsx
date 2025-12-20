'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { X } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// صور Dynamu™ (نستخدم جميع الصور الحالية)
const dynamuImages = [
  'imageye___-_imgi_133_d181d3217447605.68b40f8836376.jpg',
  'imageye___-_imgi_134_d208a2217447605.68b40f896f1bb.jpg',
  'imageye___-_imgi_36_b95441217447605.6866801224aa0.png',
  'imageye___-_imgi_39_4c52a3217447605.68b413872c331.jpg',
  'imageye___-_imgi_47_928457217447605.68b40f89d9de4.jpg',
  'imageye___-_imgi_48_ddac55217447605.6791053fc52a7.jpg',
  'imageye___-_imgi_49_3b07e0217447605.6791053fc5860.jpg',
  'imageye___-_imgi_50_fa42be217447605.6790d2d3a75c9.jpg',
  'imageye___-_imgi_51_5c531d217447605.6866fd8a25a6b.png',
  'imageye___-_imgi_52_c1b8c5217447605.6790d2d3a7110.jpg',
  'imageye___-_imgi_55_7b25f8217447605.679153bea3ead.jpg',
  'imageye___-_imgi_57_feff80217447605.68668012251c9.png',
  'imageye___-_imgi_572_c0d715217447605.685dc3640ec87.jpg',
  'imageye___-_imgi_573_c0d715217447605.685dc3640ec87.jpg',
  'imageye___-_imgi_575_4c52a3217447605.68b413872c331.jpg',
  'imageye___-_imgi_58_d181d3217447605.68b40f8836376.jpg',
  'imageye___-_imgi_583_d3ae92217447605.679b9246722b3.jpg',
  'imageye___-_imgi_59_4beaf7217447605.68b40f8835c7b.png',
  'imageye___-_imgi_60_4d5ecd217447605.686680122593b.jpg',
  'imageye___-_imgi_601_fa5a05217447605.685e9956e025e.jpg',
  'imageye___-_imgi_607_ddac55217447605.6791053fc52a7.jpg',
  'imageye___-_imgi_619_3b07e0217447605.6791053fc5860.jpg',
  'imageye___-_imgi_62_d208a2217447605.68b40f896f1bb.jpg',
  'imageye___-_imgi_625_fa42be217447605.6790d2d3a75c9.jpg',
  'imageye___-_imgi_629_c1b8c5217447605.6790d2d3a7110.jpg',
  'imageye___-_imgi_639_7b25f8217447605.679153bea3ead.jpg',
  'imageye___-_imgi_65_3a6907217447605.679f7f5f25ca3.png',
  'imageye___-_imgi_66_e6c6d6217447605.67915b2e119b0.jpg',
  'imageye___-_imgi_671_37fd4a217447605.679e083610226.jpg',
  'imageye___-_imgi_674_37fd4a217447605.679e083610226.jpg',
  'imageye___-_imgi_681_3a6907217447605.679f7f5f25ca3.png',
  'imageye___-_imgi_683_7da0f6217447605.68668012242c8.png',
  'imageye___-_imgi_686_555883217447605.6866801225f23.png',
  'imageye___-_imgi_696_4fcef4217447605.68b40fde71b0c.png',
  'imageye___-_imgi_703_550d43217447605.68b413872bd90.jpg',
  'imageye___-_imgi_71_4fcef4217447605.68b40fde71b0c.png',
  'imageye___-_imgi_74_550d43217447605.68b413872bd90.jpg',
]

// صور مخبز خانه
const bakeryImages = [
  'photo_2025-11-28_12-23-25.jpg',
  'photo_2025-11-28_12-23-41.jpg',
  'photo_2025-11-28_12-23-45.jpg',
  'photo_2025-11-28_12-23-50.jpg',
  'photo_2025-11-28_12-23-54.jpg',
  'photo_2025-11-28_12-23-59.jpg',
  'photo_2025-11-28_12-24-03.jpg',
  'photo_2025-11-28_12-24-09.jpg',
  'photo_2025-11-28_12-24-13.jpg',
  'photo_2025-11-28_12-24-18.jpg',
  'photo_2025-11-28_12-24-25.jpg',
]

// صور G
const gImages = [
  'imageye___-_imgi_172_ad6e11236650649.68eff3aedd1f9.jpg',
  'imageye___-_imgi_179_b31d4e236650649.68eff3aedd860.jpg',
  'imageye___-_imgi_181_b872c4236650649.68eff3ac3383e.jpg',
  'imageye___-_imgi_188_b872c4236650649.68eff3ac3383e.jpg',
  'imageye___-_imgi_190_038f32236650649.68eff3ac331f7.jpg',
  'imageye___-_imgi_202_b62f7d236650649.68eff3ac340f1.jpg',
  'imageye___-_imgi_215_0edbda236650649.68eff3ad54569.jpg',
  'imageye___-_imgi_220_8b73cf236650649.68eff3ad54d92.jpg',
  'imageye___-_imgi_226_33cdd0236650649.68eff3ad53dab.jpg',
  'imageye___-_imgi_229_33cdd0236650649.68eff3ad53dab.jpg',
  'imageye___-_imgi_259_34da95236650649.68f5c9dcb8d6c.jpg',
  'imageye___-_imgi_262_ae416f236650649.68f5c9de57f25.jpg',
  'imageye___-_imgi_265_b0729f236650649.68f5c9de5cd2f.jpg',
  'imageye___-_imgi_268_05bc04236650649.68f5c9de5b06d.jpg',
  'imageye___-_imgi_271_d3db8d236650649.68f5c9de58e29.jpg',
  'imageye___-_imgi_274_001017236650649.68f5c9de57943.jpg',
  'imageye___-_imgi_277_e1b682236650649.68f5c9de5bd72.jpg',
  'imageye___-_imgi_280_925324236650649.68f5c9de595a2.jpg',
  'imageye___-_imgi_283_87aa8c236650649.68f5c9de5a535.jpg',
  'imageye___-_imgi_286_a025b1236650649.68f5c9de59d85.jpg',
  'imageye___-_imgi_289_1c5879236650649.68f5c9de5b7d9.jpg',
  'imageye___-_imgi_292_725381236650649.68f5c9de5aad5.jpg',
  'imageye___-_imgi_295_5458de236650649.68f5c9de58542.jpg',
  'imageye___-_imgi_298_2d15d7236650649.68f5c9de5c2e3.jpg',
]

// صور A
const aImages = [
  'imageye___-_imgi_519_8799cb224724547.681072c859bd1.jpg',
  'imageye___-_imgi_526_dda9c7224724547.681072c855681.jpg',
  'imageye___-_imgi_529_913e17224724547.681072c8547e1.jpg',
  'imageye___-_imgi_532_42930d224724547.681072c85161d.jpg',
  'imageye___-_imgi_543_162fdc224724547.681072c859630.jpg',
  'imageye___-_imgi_549_da6b33224724547.681072c855f19.jpg',
  'imageye___-_imgi_552_87b8b1224724547.681072c8565ba.jpg',
  'imageye___-_imgi_555_418416224724547.681072c8533d5.jpg',
  'imageye___-_imgi_558_ef431f224724547.681072c851de2.jpg',
  'imageye___-_imgi_561_fb0dd2224724547.681072c854e48.jpg',
  'imageye___-_imgi_567_b5d4f5224724547.681072c8525ff.jpg',
  'imageye___-_imgi_570_7532cc224724547.681072c8589b5.jpg',
  'imageye___-_imgi_573_4ba5b3224724547.681072c858299.jpg',
  'imageye___-_imgi_580_19e1bd224724547.681072c856e76.jpg',
  'imageye___-_imgi_583_d03623224724547.681072c85c2fc.jpg',
  'imageye___-_imgi_586_1d6341224724547.681072c85dda6.jpg',
  'imageye___-_imgi_589_fa6114224724547.681072c85b95c.jpg',
  'imageye___-_imgi_592_dba313224724547.681072c85cae2.jpg',
]

// صور qq
const qqImages = [
  'imageye___-_imgi_462_b5d302239360975.6927698d765eb.png',
  'imageye___-_imgi_464_ab4abd239360975.6927698d6f053.png',
  'imageye___-_imgi_466_e40de0239360975.6927698d6e9a7.png',
  'imageye___-_imgi_468_fe7fa8239360975.6927698d6f7e2.png',
  'imageye___-_imgi_470_03cfdc239360975.6927698d719cc.png',
  'imageye___-_imgi_472_96c120239360975.6927698d753f1.png',
  'imageye___-_imgi_474_898e0e239360975.6927698d749a7.png',
  'imageye___-_imgi_476_4cdb3b239360975.6927698d76cca.png',
  'imageye___-_imgi_478_d2f793239360975.6927698d6fe19.png',
  'imageye___-_imgi_480_d918a5239360975.6927698d72202.png',
  'imageye___-_imgi_482_52396a239360975.6927698d733c9.png',
  'imageye___-_imgi_484_1e0d22239360975.6927698d7095e.png',
  'imageye___-_imgi_486_abbb91239360975.6927698d73f56.png',
  'imageye___-_imgi_488_35f2a9239360975.6927698d778cc.png',
  'imageye___-_imgi_490_c9abf0239360975.6927698d75f85.png',
  'imageye___-_imgi_491_38bfe0239360975.6927698d72861.png',
  'imageye___-_imgi_492_38bfe0239360975.6927698d72861.png',
]

type Project = {
  id: string
  titleKey: string
  roleKey: string
  companyKey: string
  descriptionKey: string
  thumbnail: string
  images: string[]
}

// Helper function to get image path based on project id
const getImagePath = (projectId: string, image: string): string => {
  if (projectId === 'bakery') return `/c/${image}`
  if (projectId === 'g') return `/G/${image}`
  if (projectId === 'a') return `/A/${image}`
  if (projectId === 'qq') return `/qq/${image}`
  return `/p/${image}`
}

export default function VisualIdentityPage() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  // تعريف المشاريع
  const projects: Project[] = [
    {
      id: 'dynamu',
      titleKey: 'portfolio_item4_title',
      roleKey: 'portfolio_item4_role',
      companyKey: 'portfolio_item4_company',
      descriptionKey: 'portfolio_item4_description',
      thumbnail: '/p/imageye___-_imgi_133_d181d3217447605.68b40f8836376.jpg',
      images: dynamuImages,
    },
    {
      id: 'bakery',
      titleKey: 'portfolio_item5_title',
      roleKey: 'portfolio_item5_role',
      companyKey: 'portfolio_item5_company',
      descriptionKey: 'portfolio_item5_description',
      thumbnail: '/c/photo_2025-11-28_12-23-25.jpg',
      images: bakeryImages,
    },
    {
      id: 'g',
      titleKey: 'portfolio_item6_title',
      roleKey: 'portfolio_item6_role',
      companyKey: 'portfolio_item6_company',
      descriptionKey: 'portfolio_item6_description',
      thumbnail: '/G/imageye___-_imgi_172_ad6e11236650649.68eff3aedd1f9.jpg',
      images: gImages,
    },
    {
      id: 'a',
      titleKey: 'portfolio_item7_title',
      roleKey: 'portfolio_item7_role',
      companyKey: 'portfolio_item7_company',
      descriptionKey: 'portfolio_item7_description',
      thumbnail: '/A/imageye___-_imgi_519_8799cb224724547.681072c859bd1.jpg',
      images: aImages,
    },
    {
      id: 'qq',
      titleKey: 'portfolio_item8_title',
      roleKey: 'portfolio_item8_role',
      companyKey: 'portfolio_item8_company',
      descriptionKey: 'portfolio_item8_description',
      thumbnail: '/qq/imageye___-_imgi_462_b5d302239360975.6927698d765eb.png',
      images: qqImages,
    },
  ]

  // Preload thumbnail images for all projects on page load for faster card display
  useEffect(() => {
    const preloadThumbnails = () => {
      projects.forEach((project, index) => {
        const img = new window.Image()
        img.src = project.thumbnail
        img.loading = 'eager'
        img.fetchPriority = 'high'
        // Preload thumbnail immediately with decode for better performance
        if (img.decode) {
          img.decode().catch(() => {})
        }
        // Also add prefetch link for browser optimization
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'image'
        link.href = project.thumbnail
        link.fetchPriority = 'high'
        document.head.appendChild(link)
      })
    }
    // Small delay to ensure DOM is ready
    const timer = setTimeout(preloadThumbnails, 100)
    return () => clearTimeout(timer)
  }, [])

  // Preload ALL images immediately in parallel for maximum speed
  // This ensures images continue loading even if hover preloading didn't complete
  useEffect(() => {
    if (selectedProject && selectedProject.images.length > 0) {
      // Load ALL images in parallel immediately - no waiting!
      const preloadAllImages = () => {
        selectedProject.images.forEach((image, index) => {
          // Check if already loaded first
          const img = new window.Image()
          const imagePath = getImagePath(selectedProject.id, image)
          img.src = imagePath
          
          // If already complete (from hover preloading), mark immediately
          if (img.complete) {
            setLoadedImages(prev => {
              const newSet = new Set(prev)
              newSet.add(index)
              return newSet
            })
          } else {
            // Otherwise, continue loading
            img.crossOrigin = 'anonymous'
            img.decoding = 'async'
            img.loading = 'eager'
            img.fetchPriority = index < 5 ? 'high' : 'auto'
            img.onload = () => {
              setLoadedImages(prev => {
                const newSet = new Set(prev)
                newSet.add(index)
                return newSet
              })
            }
            img.onerror = () => {
              // Mark as loaded even on error to prevent infinite loading
              setLoadedImages(prev => {
                const newSet = new Set(prev)
                newSet.add(index)
                return newSet
              })
            }
          }
        })
      }
      
      // Start loading immediately - no delay!
      preloadAllImages()
    }
  }, [selectedProject])

  useEffect(() => {
    // Animation for cards
    if (cardsRef.current) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === 'Escape') {
          setSelectedProject(null)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [selectedProject])

  // Preload ALL images on card hover - ACTUAL loading, not just prefetch!
  // This is the KEY to instant loading like Behance
  const prefetchProjectImages = (project: Project) => {
    // Preload thumbnail first for instant display
    const thumbnailImg = new window.Image()
    thumbnailImg.src = project.thumbnail
    thumbnailImg.loading = 'eager'
    thumbnailImg.fetchPriority = 'high'
    thumbnailImg.decode?.().catch(() => {})
    
    // Load ALL images in background when hovering - they'll be ready when user clicks!
    project.images.forEach((image, index) => {
      // Use actual Image loading, not just prefetch link
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.decoding = 'async'
      img.loading = 'eager'
      img.fetchPriority = index < 3 ? 'high' : 'auto'
      img.src = getImagePath(project.id, image)
      
      // Also add prefetch link for browser optimization
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = 'image'
      link.href = getImagePath(project.id, image)
      link.fetchPriority = index < 3 ? 'high' : 'auto'
      document.head.appendChild(link)
    })
  }

  const openProject = (project: Project) => {
    // Images should already be loading from hover, but ensure they're marked as loaded if cached
    // Check which images are already loaded/cached
    const checkCachedImages = () => {
      project.images.forEach((image, index) => {
        const img = new window.Image()
        img.src = getImagePath(project.id, image)
        if (img.complete) {
          // Image is already loaded (from hover preloading)
          setLoadedImages(prev => new Set([...prev, index]))
        } else {
          // Continue loading if not already loaded
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]))
          }
        }
      })
    }
    
    setSelectedProject(project)
    setLoadedImages(new Set())
    
    // Check cached images immediately
    checkCachedImages()
    
    // Scroll to top when opening full view
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Images are already preloaded, this is just for fallback
  // Removed Intersection Observer since we load all images immediately

  // Full View Mode - Behance Style (Scrollable Gallery)
  if (selectedProject) {
    return (
      <main className="relative min-h-screen bg-black">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">{t(selectedProject.titleKey)}</h1>
            <button
              onClick={() => setSelectedProject(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Gallery - Behance Style Dynamic Masonry Layout */}
        <div className="pt-20 px-4 md:px-6 lg:px-8">
          {selectedProject.images.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              {(() => {
                // Create dynamic blocks like Behance
                const blocks: Array<{
                  type: 'single' | 'double' | 'triple' | 'tall'
                  images: Array<{ index: number; image: string }>
                }> = []
                
                let currentIndex = 0
                const images = selectedProject.images
                
                while (currentIndex < images.length) {
                  const blockPattern = Math.floor(blocks.length / 4) % 4
                  
                  if (blockPattern === 0) {
                    // Single large image
                    if (currentIndex < images.length) {
                      blocks.push({
                        type: 'single',
                        images: [{ index: currentIndex, image: images[currentIndex] }]
                      })
                      currentIndex++
                    }
                  } else if (blockPattern === 1) {
                    // Double images
                    if (currentIndex + 1 < images.length) {
                      blocks.push({
                        type: 'double',
                        images: [
                          { index: currentIndex, image: images[currentIndex] },
                          { index: currentIndex + 1, image: images[currentIndex + 1] }
                        ]
                      })
                      currentIndex += 2
                    } else if (currentIndex < images.length) {
                      blocks.push({
                        type: 'single',
                        images: [{ index: currentIndex, image: images[currentIndex] }]
                      })
                      currentIndex++
                    }
                  } else if (blockPattern === 2) {
                    // Triple images
                    if (currentIndex + 2 < images.length) {
                      blocks.push({
                        type: 'triple',
                        images: [
                          { index: currentIndex, image: images[currentIndex] },
                          { index: currentIndex + 1, image: images[currentIndex + 1] },
                          { index: currentIndex + 2, image: images[currentIndex + 2] }
                        ]
                      })
                      currentIndex += 3
                    } else if (currentIndex < images.length) {
                      blocks.push({
                        type: 'single',
                        images: [{ index: currentIndex, image: images[currentIndex] }]
                      })
                      currentIndex++
                    }
                  } else {
                    // Tall single image (half width)
                    if (currentIndex < images.length) {
                      blocks.push({
                        type: 'tall',
                        images: [{ index: currentIndex, image: images[currentIndex] }]
                      })
                      currentIndex++
                    }
                  }
                }
                
                return (
                  <div className="space-y-6 md:space-y-8">
                    {blocks.map((block, blockIndex) => (
                      <div
                        key={blockIndex}
                        className={`w-full ${
                          block.type === 'single' ? 'flex justify-center items-center' :
                          block.type === 'double' ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6' :
                          block.type === 'triple' ? 'grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6' :
                          'flex justify-center items-center'
                        }`}
                      >
                        {block.images.map(({ index, image }) => (
                          <div
                            key={index}
                            id={`image-${index}`}
                            data-index={index}
                            className={`relative group ${
                              block.type === 'single' ? 'w-full max-w-5xl mx-auto' :
                              block.type === 'double' ? 'w-full' :
                              block.type === 'triple' ? 'w-full' :
                              'w-full md:w-1/2 max-w-2xl mx-auto'
                            }`}
                          >
                            {loadedImages.has(index) ? (
                              <div className="relative w-full rounded-lg overflow-hidden bg-gray-900/30 border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-lg">
                                <Image
                                  src={getImagePath(selectedProject.id, image)}
                                  alt={`${t(selectedProject.titleKey)} - ${t(selectedProject.roleKey)} - ${index + 1} - ${t('visual_identity_title')} - الرمز وكالة التصميم`}
                                  width={block.type === 'single' ? 1200 : block.type === 'triple' ? 600 : 800}
                                  height={block.type === 'tall' ? 1600 : 1200}
                                  className="w-full h-auto object-cover"
                                  quality={85}
                                  loading="eager"
                                  priority={index < 5}
                                  fetchPriority={index < 5 ? 'high' : 'auto'}
                                  unoptimized={false}
                                />
                              </div>
                            ) : (
                              <div className={`relative w-full rounded-lg overflow-hidden bg-gray-900/50 border border-white/10 ${
                                block.type === 'tall' ? 'aspect-[2/3]' : 'aspect-[4/3]'
                              }`}>
                                <div className="w-full h-full bg-gray-900/50 animate-pulse flex items-center justify-center">
                                  <div className="w-10 h-10 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-20">
              <p className="text-white/60 text-lg">جاري إضافة الصور قريباً...</p>
            </div>
          )}
        </div>
      </main>
    )
  }

  // Projects Cards View
  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative pt-32 pb-16 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="section-title text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {t('visual_identity_title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-purple-blue mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('visual_identity_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Cards Section */}
      <section className="relative py-16 px-4 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
        
        <div ref={cardsRef} className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProject(project)}
                onMouseEnter={() => {
                  // Start loading ALL images immediately on hover - Behance style!
                  prefetchProjectImages(project)
                }}
                onTouchStart={() => {
                  // Also preload on touch for mobile
                  prefetchProjectImages(project)
                }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-full p-2 sm:p-4 md:p-6 bg-dark-navy/60 backdrop-blur-sm border border-purple-500/30 md:border-2 rounded-lg md:rounded-xl hover:border-neon-purple transition-all duration-300 hover:shadow-glow-purple hover:-translate-y-2">
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-32 sm:h-48 md:h-64 lg:h-80 mb-2 sm:mb-3 md:mb-6 rounded-md md:rounded-lg overflow-hidden bg-gradient-purple-blue">
                    <Image
                      src={project.thumbnail}
                      alt={`${t(project.titleKey)} - ${t(project.roleKey)} - ${t('visual_identity_title')} - الرمز وكالة التصميم`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 50vw"
                      loading="eager"
                      quality={85}
                      priority
                      fetchPriority="high"
                      unoptimized={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                  </div>

                  {/* Project Info */}
                  <div className="text-center">
                    <h3 className={`text-xs sm:text-sm md:text-lg lg:text-2xl ${language === 'ar' ? 'font-bold' : 'font-normal'} ${language === 'en' ? 'font-sans' : ''} text-white mb-1 sm:mb-2 leading-tight`} style={language === 'en' ? { fontFamily: "'Cairo', 'Inter', sans-serif" } : {}}>{t(project.titleKey)}</h3>
                    <p className="text-lavender text-[10px] sm:text-xs md:text-sm font-semibold mb-0.5 sm:mb-1">{t(project.roleKey)}</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 md:mb-3 hidden sm:block">{t(project.companyKey)}</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm leading-relaxed px-1 sm:px-2 line-clamp-2 sm:line-clamp-3 md:line-clamp-4 hidden md:block">
                      {t(project.descriptionKey)}
                    </p>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-purple-blue opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
