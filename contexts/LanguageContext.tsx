'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'ar' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  ar: {
    // Navigation
    nav_home: 'الرئيسية',
    nav_services: 'خدماتنا',
    nav_portfolio: 'أعمالنا',
    nav_process: 'عملنا',
    nav_faq: 'الأسئلة',
    nav_contact: 'تواصل معنا',
    
    // Hero
    hero_title: 'وكالة إبداعية متخصصة',
    hero_subtitle: 'في التصميم والمونتاج والأنيميشن',
    hero_description: 'نحول أفكارك إلى واقع رقمي مذهل',
    hero_button_portfolio: 'شاهد أعمالنا',
    hero_button_contact: 'تواصل معنا',
    
    // Services
    services_title: 'خدماتنا',
    services_subtitle: 'حلول إبداعية شاملة لتحويل رؤيتك إلى واقع رقمي مذهل',
    service_design: 'التصميم',
    service_design_desc: 'تصميم جرافيكي إبداعي يلبي احتياجاتك - شعارات، هويات بصرية، مطبوعات، وتصاميم احترافية.',
    service_video: 'المونتاج',
    service_video_desc: 'مونتاج فيديو احترافي مع تأثيرات بصرية متقدمة، إضافة صوت، وتحرير عالي الجودة.',
    service_animation: 'الأنيميشن',
    service_animation_desc: 'أنيميشن ثنائي وثلاثي الأبعاد، موشن جرافيك، وبورد أنيميشن احترافي.',
    
    // Portfolio
    portfolio_title: 'أعمالنا',
    portfolio_subtitle: 'مجموعة مختارة من مشاريعنا الإبداعية في مختلف المجالات',
    portfolio_cta: 'اضغط على أي بطاقة وشاهد أعمالنا',
    
    // Process
    process_title: 'كيف نعمل',
    process_subtitle: 'عملية عمل منظمة وواضحة لضمان تحقيق أفضل النتائج',
    process_step1: 'الاستشارة والتخطيط',
    process_step1_sub: 'مرحلة التخطيط',
    process_step1_desc: 'نستمع لأفكارك ونفهم احتياجاتك لنضع خطة عمل واضحة ومفصلة',
    process_step2: 'التصميم والتطوير',
    process_step2_sub: 'مرحلة الإبداع',
    process_step2_desc: 'نبدأ في تحويل الأفكار إلى تصاميم ومشاريع حقيقية بجودة عالية',
    process_step3: 'المراجعة والتعديل',
    process_step3_sub: 'مرحلة التحسين',
    process_step3_desc: 'نستمع لملاحظاتك ونقوم بالتعديلات اللازمة حتى نصل للنتيجة المثالية',
    process_step4: 'التسليم والدعم',
    process_step4_sub: 'مرحلة الإتمام',
    process_step4_desc: 'نسلم المشروع النهائي مع دعم فني مستمر لضمان رضاك التام',
    
    // FAQ
    faq_title: 'الأسئلة الشائعة',
    faq_subtitle: 'إجابات على أكثر الأسئلة شيوعاً حول خدماتنا',
    faq_q1: 'ما هي الخدمات التي تقدمونها؟',
    faq_a1: 'نقدم خدمات التصميم الجرافيكي، المونتاج والتحرير، والأنيميشن والموشن جرافيك.',
    faq_q2: 'كم تستغرق مدة إنجاز المشروع؟',
    faq_a2: 'تختلف المدة حسب نوع وحجم المشروع. المشاريع البسيطة قد تستغرق أسبوعاً، بينما المشاريع الكبيرة قد تحتاج لعدة أسابيع. نحدد الجدول الزمني بعد مناقشة تفاصيل المشروع.',
    faq_q3: 'ما هي أسعار الخدمات؟',
    faq_a3: 'الأسعار تختلف حسب نوع المشروع وتعقيده. نقدم عروض أسعار مخصصة بعد مناقشة احتياجاتك. تواصل معنا للحصول على عرض سعر مناسب.',
    faq_q4: 'هل تقدمون خدمات التعديل بعد التسليم؟',
    faq_a4: 'نعم، نضمن عدد معين من التعديلات ضمن العقد. كما نقدم دعم فني بعد التسليم لضمان رضاك التام.',
    faq_q5: 'كيف يمكنني التواصل معكم؟',
    faq_a5: 'يمكنك التواصل معنا عبر البريد الإلكتروني، الهاتف، أو من خلال نموذج التواصل في الموقع. نرد على جميع الاستفسارات خلال 24 ساعة.',
    
    // Achievements
    achievements_title: 'إنجازاتنا',
    achievements_subtitle: 'أرقام تعكس رحلة من الإبداع والتميز والالتزام بتحويل الأفكار إلى واقع رقمي مذهل',
    achievements_projects: 'مشروع منجز',
    achievements_projects_desc: 'مشاريع متنوعة في مختلف المجالات، كل مشروع يحكي قصة نجاح وإبداع',
    achievements_clients: 'عميل سعيد',
    achievements_clients_desc: 'عملاء راضون عن خدماتنا، ثقة متبادلة وشراكات طويلة الأمد',
    achievements_years: 'سنة خبرة',
    achievements_years_desc: 'سنوات من التطور المستمر والابتكار في عالم التصميم والمحتوى الرقمي',
    
    // Testimonials
    testimonials_title: 'آراء عملائنا',
    testimonials_subtitle: 'ماذا يقول عملاؤنا عن تجربتهم معنا - شهادات حقيقية من عملاء راضين',
    testimonial1_name: 'أحمد محمد',
    testimonial1_position: 'مدير تسويق العين',
    testimonial1_comment: 'تعاملت مع فريق الرمز على عدة مشاريع، والنتيجة دائماً تتجاوز التوقعات. الاحترافية في العمل، الالتزام بالمواعيد، والقدرة على تحويل أفكارنا المعقدة إلى محتوى بصري قوي ومؤثر. أنصح بشدة بالتعامل معهم.',
    testimonial2_name: 'ميثاء بنت سلطان',
    testimonial2_position: 'مديرة التسويق',
    testimonial2_company: 'شركة الإمارات للتطوير',
    testimonial2_comment: 'صراحة تعاملي مع وكالة الرمز للمونتاج كان تجربة ناجحة من أول يوم، وإلى اليوم الشغل بينّا مستمر بدون توقف. شغلي كان يحتاج خبرة ومتابعة دقيقة، وهم فاهمين كل التفاصيل ويتابعون أول بأول بدون ما أذكّرهم. يعجبني إنهم يستوعبون الفكرة بسرعة ويرجعون لي شغل مرتب وواضح، وكل مرة يثبتون إن اختياري لهم كان صح. وبإذن الله مكملين مع بعض لأن الراحة بالتعامل وجودة الشغل مو شي يتعوض.',
    testimonial3_name: 'خالد عبدالله',
    testimonial3_position: 'مدير المشاريع',
    testimonial3_company: 'مجموعة العقارات الكبرى',
    testimonial3_comment: 'بصراحة تعاملي مع الشركة كان من أول يوم محترم وواضح، ومن ساعتها وإحنا مكملين شغل مع بعض. أنا شغلي في العقارات محتاج متابعة وسرعة في التنفيذ، وهما صراحة قدّها… بيردّوا بسرعة، وبيتابعوا كل تفصيلة، وبيسهّلوا عليّا حاجات كتير كنت بفكّر إنها هتاخد وقت ومجهود. كل مرة بيطلعوا شغل مظبوط ومحترم، وده اللي خلاني مكمّل معاهم لحد دلوقتي. بصراحة ناس تتوثق فيهم.',
    testimonial4_name: 'راكان بن محمد بن عبدالله',
    testimonial4_position: 'مطوّر محتوى رقمي',
    testimonial4_comment: 'تعاملي مع وكالة الرمز كان ممتاز من أول يوم. شغلي يعتمد على مونتاج معقد وتقنيات 3D، وهم دايمًا ينفذونه بدقة عالية ويسلّمونه في الوقت المحدد. المدير متعاون جدًا ويفهم أي تعديل بسرعة، وفريق العمل متابعة كل خطوة بدقة. بصراحة، تعاملهم الاحترافي وجودة شغلهم خلتني أستمر معاهم وما أتردد أطلب أي مشروع جديد.',
    testimonial5_name: 'سعود بن ناصر بن فهد',
    testimonial5_position: 'منسق إنتاج / مساعد مونتاج',
    testimonial5_comment: 'تعاملي مع وكالة الرمز للمونتاج من أوّل يوم كان مريح وواضح، ومن وقتها والشغل بينّا مستمر ولا توقّف. المشروعات اللي أشتغل عليها تحتاج خبرة ومتابعة دقيقة، والرمز بصراحة ما يقصّرون… فاهمين الشغل ويردّون بسرعة ويتابعون معي خطوة بخطوة. كل مرة يعطوني شغل نظيف ومتقن، وهذا اللي خلّاني أستمر معهم. صراحة شغلهم يرفع الرأس، ومكمّلين مع بعض بإذن الله.',
    
    // Footer
    footer_brand: 'الرمز',
    footer_description: 'وكالة إبداعية متخصصة في التصميم والمونتاج والأنيميشن. نحول أفكارك إلى واقع رقمي مذهل بجودة عالية وإبداع لا محدود.',
    footer_quick_links: 'روابط سريعة',
    footer_contact: 'تواصل معنا',
    footer_rights: '© 2026 الرمز - وكالة التصميم. جميع الحقوق محفوظة.',
    footer_privacy: 'سياسة الخصوصية',
    footer_terms: 'شروط الخدمة',
    
    // Privacy Policy
    privacy_title: 'سياسة الخصوصية',
    privacy_last_updated: 'آخر تحديث: يناير 2026',
    privacy_intro_title: 'مقدمة',
    privacy_intro_text: 'نحن في الرمز ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام خدماتنا.',
    privacy_collect_title: 'المعلومات التي نجمعها',
    privacy_collect_text: 'نجمع المعلومات التالية لتقديم خدماتنا بشكل أفضل:',
    privacy_collect_item1: 'الاسم والبريد الإلكتروني ورقم الهاتف',
    privacy_collect_item2: 'معلومات المشروع والتفاصيل المطلوبة',
    privacy_collect_item3: 'معلومات الدفع (يتم التعامل معها بشكل آمن)',
    privacy_collect_item4: 'معلومات الاستخدام والتفاعل مع الموقع',
    privacy_use_title: 'كيف نستخدم المعلومات',
    privacy_use_text: 'نستخدم المعلومات المجمعة للأغراض التالية:',
    privacy_use_item1: 'تقديم وتنفيذ الخدمات المطلوبة',
    privacy_use_item2: 'التواصل معك بخصوص مشروعك',
    privacy_use_item3: 'تحسين خدماتنا وتجربة المستخدم',
    privacy_use_item4: 'إرسال تحديثات وعروض خاصة (بموافقتك)',
    privacy_protection_title: 'حماية البيانات',
    privacy_protection_text: 'نستخدم تقنيات أمان متقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف. جميع البيانات يتم تشفيرها ونقلها بشكل آمن.',
    privacy_rights_title: 'حقوقك',
    privacy_rights_text: 'لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:',
    privacy_rights_item1: 'الحق في الوصول إلى معلوماتك الشخصية',
    privacy_rights_item2: 'الحق في تصحيح أو تحديث معلوماتك',
    privacy_rights_item3: 'الحق في حذف معلوماتك الشخصية',
    privacy_rights_item4: 'الحق في الاعتراض على معالجة معلوماتك',
    privacy_cookies_title: 'ملفات تعريف الارتباط (Cookies)',
    privacy_cookies_text: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح، لكن قد يؤثر ذلك على وظائف الموقع.',
    privacy_contact_title: 'اتصل بنا',
    privacy_contact_text: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا:',
    
    // Terms of Service
    terms_title: 'شروط الخدمة',
    terms_last_updated: 'آخر تحديث: يناير 2026',
    terms_intro_title: 'مقدمة',
    terms_intro_text: 'باستخدام خدمات الرمز، أنت توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا.',
    terms_services_title: 'الخدمات المقدمة',
    terms_services_text: 'نقدم خدمات إبداعية تشمل:',
    terms_services_item1: 'التصميم الجرافيكي والهويات البصرية',
    terms_services_item2: 'مونتاج وتحرير الفيديو',
    terms_services_item3: 'الأنيميشن والموشن جرافيك',
    terms_services_item4: 'خدمات إبداعية أخرى حسب الطلب',
    terms_payment_title: 'شروط الدفع',
    terms_payment_text: 'يتم الدفع وفقاً للشروط التالية:',
    terms_payment_item1: 'يتم طلب دفعة مقدمة قبل بدء المشروع',
    terms_payment_item2: 'يتم دفع المبلغ المتبقي عند إتمام المشروع',
    terms_payment_item3: 'جميع الأسعار نهائية بعد الموافقة على العرض',
    terms_timeline_title: 'الجدول الزمني',
    terms_timeline_text: 'نلتزم بالجدول الزمني المتفق عليه في العقد. قد يتأخر التسليم في حالات قاهرة أو عند طلب تعديلات إضافية بعد الموافقة على التصاميم الأولية.',
    terms_revisions_title: 'التعديلات',
    terms_revisions_text: 'نضمن عدد معين من التعديلات ضمن العقد. التعديلات الإضافية قد تتطلب رسوم إضافية. يجب تقديم طلبات التعديل خلال فترة زمنية محددة بعد التسليم.',
    terms_ip_title: 'الملكية الفكرية',
    terms_ip_text: 'بعد استكمال الدفع الكامل، تنتقل جميع حقوق الملكية الفكرية للعمل المنجز إلى العميل. يحتفظ الرمز بالحق في استخدام العمل في محفظة الأعمال لأغراض العرض والتسويق.',
    terms_cancellation_title: 'الإلغاء',
    terms_cancellation_text: 'يمكن إلغاء المشروع من قبل أي من الطرفين. في حالة الإلغاء، يحق للرمز الاحتفاظ بالدفعة المقدمة مقابل العمل المنجز حتى تاريخ الإلغاء. لا يمكن استرداد الدفعة المقدمة بعد بدء العمل.',
    terms_liability_title: 'تحديد المسؤولية',
    terms_liability_text: 'لا نتحمل المسؤولية عن أي أضرار غير مباشرة أو عرضية قد تنتج عن استخدام خدماتنا. نضمن جودة العمل المتفق عليه في العقد.',
    terms_contact_title: 'اتصل بنا',
    terms_contact_text: 'إذا كان لديك أي أسئلة حول شروط الخدمة، يرجى التواصل معنا:',
    
    // Portfolio
    portfolio_item1_title: 'هوية بصرية متكاملة',
    portfolio_item1_role: 'تصميم جرافيكي',
    portfolio_item1_company: 'شعار + هوية بصرية',
    portfolio_item2_title: 'مونتاج فيديو احترافي',
    portfolio_item2_role: 'مونتاج وتحرير',
    portfolio_item2_company: 'فيديو + تأثيرات',
    portfolio_item3_title: 'أنيميشن احترافي',
    portfolio_item3_role: 'موشن جرافيك',
    portfolio_item3_company: 'بورد أنيميشن',
    portfolio_item4_title: 'Dynamu™',
    portfolio_item4_role: 'هوية بصرية متكاملة',
    portfolio_item4_company: 'تطبيق موبايل - قطع غيار سيارات',
    portfolio_item4_description: 'Dynamu™ هو تطبيق موبايل مصري متخصص في بيع قطع غيار السيارات الأصلية. تم إطلاقه برؤية جلب الثقة والسرعة والراحة إلى سوق السيارات، ويهدف Dynamu إلى تبسيط عملية طلب قطع الغيار للعملاء من الفئة A & B. في عام 2025، تواصل المؤسسون معي لبناء العلامة التجارية من الصفر — من الاستراتيجية والتسمية إلى نظام هوية بصرية كامل.',
    portfolio_item5_title: 'مخبز خانه',
    portfolio_item5_role: 'هوية بصرية متكاملة',
    portfolio_item5_company: 'مخبز ومخبوزات',
    portfolio_item5_description: 'هوية بصرية متكاملة لمخبز متخصص في المخبوزات التقليدية والحلويات الأصيلة.',
    portfolio_item6_title: 'WHQ.CO',
    portfolio_item6_role: 'هوية بصرية متكاملة',
    portfolio_item6_company: 'شركة وهق للمقاولات',
    portfolio_item6_description: 'هوية بصرية متكاملة لشركة وهق للمقاولات - تصميم شعار احترافي ونظام هوية بصرية شامل يعكس قوة الشركة وثقتها في مجال المقاولات.',
    portfolio_item7_title: 'شقرا للشماغ',
    portfolio_item7_role: 'هوية بصرية متكاملة',
    portfolio_item7_company: 'شماغ وملابس تقليدية',
    portfolio_item7_description: 'هوية بصرية متكاملة لعلامة شقرا للشماغ - تصميم شعار احترافي يعكس الأصالة والأناقة في عالم الشماغ والملابس التقليدية. الشماغ هو قطعة أساسية في التراث العربي الأصيل، وتم تصميم الهوية البصرية لتبرز جودة المنتج وأصالته مع الحفاظ على الطابع العصري.',
    portfolio_item8_title: 'ARFAJ | OUTDOOR SPACE DESIGN STUDIO',
    portfolio_item8_role: 'هوية بصرية متكاملة',
    portfolio_item8_company: 'استوديو تصميم المساحات الخارجية',
    portfolio_item8_description: 'هوية بصرية متكاملة لاستوديو ARFAJ لتصميم المساحات الخارجية - تصميم شعار احترافي ونظام هوية بصرية شامل يعكس الإبداع والتميز في تصميم المساحات الخارجية.',
    
    // Contact
    contact_title: 'تواصل معنا',
    contact_subtitle: 'نحن هنا لمساعدتك. أخبرنا عن مشروعك وسنتواصل معك في أقرب وقت ممكن',
    contact_email: 'البريد الإلكتروني',
    contact_phone: 'الهاتف',
    contact_location: 'الموقع',
    contact_location_value: 'مصر',
    contact_form_name: 'الاسم',
    contact_form_email: 'البريد الإلكتروني',
    contact_form_phone: 'رقم الهاتف',
    contact_form_service: 'الخدمة المطلوبة',
    contact_form_message: 'الرسالة',
    contact_form_name_placeholder: 'أدخل اسمك الكامل',
    contact_form_email_placeholder: 'example@email.com',
    contact_form_phone_placeholder: '05xxxxxxxx',
    contact_form_service_placeholder: 'اختر الخدمة',
    contact_form_message_placeholder: 'أخبرنا عن مشروعك...',
    contact_form_service_design: 'التصميم الجرافيكي',
    contact_form_service_video: 'المونتاج والتحرير',
    contact_form_service_animation: 'الأنيميشن والموشن جرافيك',
    contact_form_service_other: 'أخرى',
    contact_form_submit: 'إرسال الرسالة',
    contact_form_submitting: 'جاري الإرسال...',
    contact_form_success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
    contact_form_error: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    contact_validation_name_min: 'الاسم يجب أن يكون على الأقل حرفين',
    contact_validation_name_max: 'الاسم طويل جداً',
    contact_validation_email: 'البريد الإلكتروني غير صحيح',
    contact_validation_phone_min: 'رقم الهاتف غير صحيح',
    contact_validation_phone_max: 'رقم الهاتف طويل جداً',
    contact_validation_service: 'يرجى اختيار خدمة',
    contact_validation_message_min: 'الرسالة يجب أن تكون على الأقل 10 أحرف',
    contact_validation_message_max: 'الرسالة طويلة جداً',
    contact_validation_error_send: 'فشل إرسال الرسالة',
    
    // Visual Identity Page
    visual_identity_title: 'الهوية البصرية',
    visual_identity_subtitle: 'مجموعة شاملة من أعمال الهوية البصرية والتصميم الجرافيكي',
    
    // Video Editing Page
    video_editing_title: 'مونتاج الفيديو الاحترافي',
    video_editing_subtitle: 'خدمات مونتاج فيديو متخصصة في مختلف المجالات مع تأثيرات بصرية احترافية',
    video_editing_cta_title: 'جاهز لبدء مشروعك؟',
    video_editing_cta_desc: 'تواصل معنا اليوم واحصل على عرض سعر مخصص لمشروعك',
    video_editing_cta_button: 'تواصل معنا',
    
    // Video Categories
    video_category_sports: 'الفيديوهات الرياضية',
    video_category_sports_desc: 'مونتاج احترافي للفيديوهات الرياضية مع تأثيرات ديناميكية وتحرير متقدم',
    video_sports_item1: 'تمارين',
    video_sports_item1_desc: 'مونتاج احترافي لفيديوهات التمارين مع شرح تفصيلي للحركات والتقنيات، تأثيرات بصرية متقدمة، وتصميم جذاب يبرز التفاصيل',
    video_sports_item2: 'إعلانات',
    video_sports_item2_desc: 'مونتاج إعلانات ترويجية احترافية للجيم والمدربين مع تأثيرات بصرية جذابة، موشن جرافيك متقدم، وتصميم يبرز الخدمات والمنتجات',
    
    video_category_real_estate: 'فيديوهات العقارات',
    video_category_real_estate_desc: 'مونتاج احترافي للعروض العقارية مع تأثيرات بصرية جذابة وتصميم متقدم لعرض العقارات',
    video_real_estate_item1: 'مونتاج جوي للعقارات',
    video_real_estate_item1_desc: 'مونتاج احترافي للتصوير الجوي للعقارات باستخدام طائرات بدون طيار مع تأثيرات بصرية متقدمة، انتقالات سلسة، وتصميم يبرز جمال العقار من زوايا مختلفة',
    video_real_estate_item2: 'محتوى العروض العقارية',
    video_real_estate_item2_desc: 'مونتاج احترافي لمحتوى عروض العقارات مع تأثيرات بصرية جذابة، تصميم متقدم يبرز المميزات، وتحرير احترافي يجذب العملاء',
    
    video_category_medical: 'الفيديوهات الطبية',
    video_category_medical_desc: 'مونتاج احترافي للفيديوهات الطبية للأطباء والمستشفيات مع تحرير متخصص وتصميم احترافي',
    video_medical_item1: 'ترويج طبي',
    video_medical_item1_desc: 'مونتاج احترافي لفيديوهات ترويجية للأطباء في مجالات التجميل والجراحة مع شرح احترافي، تأثيرات بصرية متقدمة، وتصميم يبرز الخبرة والثقة',
    
    video_category_cars: 'مونتاج السيارات',
    video_category_cars_desc: 'مونتاج احترافي لفيديوهات السيارات مع تأثيرات بصرية جذابة وتصميم ديناميكي',
    video_cars_item1: 'مونتاج سيارات',
    video_cars_item1_desc: 'مونتاج احترافي لفيديوهات السيارات مع تأثيرات ديناميكية متقدمة، انتقالات سلسة، وتصميم يبرز تفاصيل السيارة وجمالها',
    
    video_category_animation: 'أنيميشن احترافي',
    video_category_animation_desc: 'أنيميشن احترافي ثلاثي الأبعاد مع تصميمات مبتكرة وعرض دقيق للفيديو بالشكل الأصلي',
    video_animation_item1: 'أنيميشن احترافي 1',
    video_animation_item1_desc: 'أنيميشن احترافي ثلاثي الأبعاد مصمم بطريقة مبتكرة مع عرض دقيق للفيديو بالشكل الأصلي',
    video_animation_item2: 'أنيميشن احترافي 2',
    video_animation_item2_desc: 'أنيميشن احترافي ثلاثي الأبعاد مصمم بطريقة مبتكرة مع عرض دقيق للفيديو بالشكل الأصلي',
    video_animation_item3: 'أنيميشن احترافي 3',
    video_animation_item3_desc: 'أنيميشن احترافي ثلاثي الأبعاد مصمم بطريقة مبتكرة مع عرض دقيق للفيديو بالشكل الأصلي',
    video_animation_item4: 'أنيميشن احترافي 4',
    video_animation_item4_desc: 'أنيميشن احترافي ثلاثي الأبعاد مصمم بطريقة مبتكرة مع عرض دقيق للفيديو بالشكل الأصلي',
    
    // Privacy Policy
    privacy_title: 'سياسة الخصوصية',
    privacy_last_updated: 'آخر تحديث: يناير 2026',
    privacy_intro_title: 'مقدمة',
    privacy_intro_text: 'في الرمز، نحن ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام خدماتنا.',
    privacy_collect_title: 'المعلومات التي نجمعها',
    privacy_collect_text: 'نجمع المعلومات التالية لتقديم خدمات أفضل:',
    privacy_collect_item1: 'الاسم وعنوان البريد الإلكتروني ورقم الهاتف',
    privacy_collect_item2: 'معلومات المشروع والتفاصيل المطلوبة',
    privacy_collect_item3: 'معلومات الدفع (يتم التعامل معها بأمان)',
    privacy_collect_item4: 'معلومات الاستخدام والتفاعل مع الموقع',
    privacy_use_title: 'كيف نستخدم المعلومات',
    privacy_use_text: 'نستخدم المعلومات المجمعة للأغراض التالية:',
    privacy_use_item1: 'تقديم وتنفيذ الخدمات المطلوبة',
    privacy_use_item2: 'التواصل معك بخصوص مشروعك',
    privacy_use_item3: 'تحسين خدماتنا وتجربة المستخدم',
    privacy_use_item4: 'إرسال التحديثات والعروض الخاصة (بموافقتك)',
    privacy_protection_title: 'حماية البيانات',
    privacy_protection_text: 'نستخدم تقنيات أمنية متقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف. جميع البيانات مشفرة ويتم نقلها بأمان.',
    privacy_rights_title: 'حقوقك',
    privacy_rights_text: 'لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:',
    privacy_rights_item1: 'الحق في الوصول إلى معلوماتك الشخصية',
    privacy_rights_item2: 'الحق في تصحيح أو تحديث معلوماتك',
    privacy_rights_item3: 'الحق في حذف معلوماتك الشخصية',
    privacy_rights_item4: 'الحق في الاعتراض على معالجة معلوماتك',
    privacy_cookies_title: 'ملفات تعريف الارتباط',
    privacy_cookies_text: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح، لكن قد يؤثر ذلك على وظائف الموقع.',
    privacy_contact_title: 'تواصل معنا',
    privacy_contact_text: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا:',
    
    // Terms of Service
    terms_title: 'شروط الخدمة',
    terms_last_updated: 'آخر تحديث: يناير 2026',
    terms_intro_title: 'مقدمة',
    terms_intro_text: 'باستخدام خدمات الرمز، أنت توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا.',
    terms_services_title: 'الخدمات المقدمة',
    terms_services_text: 'نقدم خدمات إبداعية تشمل:',
    terms_services_item1: 'التصميم الجرافيكي والهويات البصرية',
    terms_services_item2: 'مونتاج الفيديو وما بعد الإنتاج',
    terms_services_item3: 'الأنيميشن والموشن جرافيك',
    terms_services_item4: 'خدمات إبداعية أخرى حسب الطلب',
    terms_payment_title: 'شروط الدفع',
    terms_payment_text: 'يتم الدفع وفقاً للشروط التالية:',
    terms_payment_item1: 'مطلوب دفعة مقدمة قبل بدء المشروع',
    terms_payment_item2: 'يتم دفع المبلغ المتبقي عند اكتمال المشروع',
    terms_payment_item3: 'جميع الأسعار نهائية بعد الموافقة على العرض',
    terms_timeline_title: 'الجدول الزمني للمشروع',
    terms_timeline_text: 'نلتزم بالجدول الزمني المتفق عليه في العقد. قد يتأخر التسليم في حالات القوة القاهرة أو عند طلب مراجعات إضافية بعد الموافقة على التصاميم الأولية.',
    terms_revisions_title: 'المراجعات',
    terms_revisions_text: 'نضمن عدداً معيناً من المراجعات ضمن العقد. قد تتطلب المراجعات الإضافية رسوم إضافية. يجب تقديم طلبات المراجعة خلال فترة زمنية محددة بعد التسليم.',
    terms_ip_title: 'الملكية الفكرية',
    terms_ip_text: 'بعد اكتمال الدفع الكامل، تنتقل جميع حقوق الملكية الفكرية للعمل المكتمل إلى العميل. يحتفظ الرمز بالحق في استخدام العمل في المحفظة لأغراض العرض والتسويق.',
    terms_cancellation_title: 'الإلغاء',
    terms_cancellation_text: 'يمكن إلغاء المشروع من أي من الطرفين. في حالة الإلغاء، يحق للرمز الاحتفاظ بالدفعة المقدمة مقابل العمل المكتمل حتى تاريخ الإلغاء. لا يمكن استرداد الدفعة المقدمة بعد بدء العمل.',
    terms_liability_title: 'تحديد المسؤولية',
    terms_liability_text: 'لسنا مسؤولين عن أي أضرار غير مباشرة أو عرضية قد تنتج عن استخدام خدماتنا. نضمن جودة العمل المتفق عليه في العقد.',
    terms_contact_title: 'تواصل معنا',
    terms_contact_text: 'إذا كان لديك أي أسئلة حول شروط الخدمة، يرجى التواصل معنا:',
  },
  en: {
    // Navigation
    nav_home: 'Home',
    nav_services: 'Services',
    nav_portfolio: 'Portfolio',
    nav_process: 'Process',
    nav_faq: 'FAQ',
    nav_contact: 'Contact Us',
    
    // Hero
    hero_title: 'Creative Agency',
    hero_subtitle: 'Design, Video Editing & Animation',
    hero_description: 'We transform your ideas into amazing digital reality',
    hero_button_portfolio: 'View Portfolio',
    hero_button_contact: 'Contact Us',
    
    // Services
    services_title: 'Our Services',
    services_subtitle: 'Comprehensive creative solutions to transform your vision into amazing digital reality',
    service_design: 'Design',
    service_design_desc: 'Creative graphic design that meets your needs - logos, visual identities, prints, and professional designs.',
    service_video: 'Video Editing',
    service_video_desc: 'Professional video editing with advanced visual effects, audio addition, and high-quality editing.',
    service_animation: 'Animation',
    service_animation_desc: '2D and 3D animation, motion graphics, and professional board animation.',
    
    // Portfolio
    portfolio_title: 'Our Work',
    portfolio_subtitle: 'A curated selection of our creative projects across various fields',
    portfolio_cta: 'Click on any card to view our work',
    
    // Process
    process_title: 'How We Work',
    process_subtitle: 'An organized and clear workflow to ensure the best results',
    process_step1: 'Consultation & Planning',
    process_step1_sub: 'Planning Phase',
    process_step1_desc: 'We listen to your ideas and understand your needs to create a clear and detailed action plan',
    process_step2: 'Design & Development',
    process_step2_sub: 'Creative Phase',
    process_step2_desc: 'We start converting ideas into real designs and projects with high quality',
    process_step3: 'Review & Revision',
    process_step3_sub: 'Improvement Phase',
    process_step3_desc: 'We listen to your feedback and make necessary adjustments until we achieve the perfect result',
    process_step4: 'Delivery & Support',
    process_step4_sub: 'Completion Phase',
    process_step4_desc: 'We deliver the final project with continuous technical support to ensure your complete satisfaction',
    
    // FAQ
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Answers to the most common questions about our services',
    faq_q1: 'What services do you offer?',
    faq_a1: 'We offer graphic design, video editing, and animation & motion graphics services.',
    faq_q2: 'How long does it take to complete a project?',
    faq_a2: 'The duration varies depending on the type and size of the project. Simple projects may take a week, while large projects may require several weeks. We determine the timeline after discussing the project details.',
    faq_q3: 'What are your service prices?',
    faq_a3: 'Prices vary depending on the project type and complexity. We provide customized quotes after discussing your needs. Contact us for a suitable quote.',
    faq_q4: 'Do you offer revision services after delivery?',
    faq_a4: 'Yes, we guarantee a certain number of revisions within the contract. We also provide technical support after delivery to ensure your complete satisfaction.',
    faq_q5: 'How can I contact you?',
    faq_a5: 'You can contact us via email, phone, or through the contact form on the website. We respond to all inquiries within 24 hours.',
    
    // Achievements
    achievements_title: 'Our Achievements',
    achievements_subtitle: 'Numbers that reflect a journey of creativity, excellence, and commitment to transforming ideas into amazing digital reality',
    achievements_projects: 'Completed Projects',
    achievements_projects_desc: 'Diverse projects across various fields, each project tells a story of success and creativity',
    achievements_clients: 'Happy Clients',
    achievements_clients_desc: 'Satisfied clients with our services, mutual trust and long-term partnerships',
    achievements_years: 'Years of Experience',
    achievements_years_desc: 'Years of continuous development and innovation in the world of design and digital content',
    
    // Testimonials
    testimonials_title: 'Client Testimonials',
    testimonials_subtitle: 'What our clients say about their experience with us - real testimonials from satisfied clients',
    testimonial1_name: 'Ahmed Mohamed',
    testimonial1_position: 'Al Ain Marketing Manager',
    testimonial1_comment: 'I\'ve worked with the EL RAMZ team on several projects, and the results always exceed expectations. Professionalism in work, commitment to deadlines, and the ability to transform our complex ideas into strong and impactful visual content. I highly recommend working with them.',
    testimonial2_name: 'Mitha bint Sultan',
    testimonial2_position: 'Marketing Director',
    testimonial2_company: 'Emirates Development Company',
    testimonial2_comment: 'Honestly, my experience with EL RAMZ agency for video editing has been a successful journey from day one, and to this day our work continues without interruption. My work required expertise and careful follow-up, and they understand all the details and follow up continuously without me having to remind them. I like that they quickly grasp the idea and deliver organized and clear work to me, and every time they prove that my choice of them was right. God willing, we will continue together because the comfort in dealing and the quality of work is something that cannot be compensated.',
    testimonial3_name: 'Khaled Abdullah',
    testimonial3_position: 'Projects Manager',
    testimonial3_company: 'Major Real Estate Group',
    testimonial3_comment: 'Honestly, my experience with the company was professional and clear from day one, and since then we\'ve been continuing to work together. My work in real estate needs follow-up and speed in execution, and they honestly deliver... they respond quickly, follow up on every detail, and make many things easier for me that I thought would take time and effort. Every time they deliver proper and professional work, and that\'s what made me continue with them until now. Honestly, people you can trust.',
    testimonial4_name: 'Rakan bin Mohammed bin Abdullah',
    testimonial4_position: 'Digital Content Developer',
    testimonial4_comment: 'My experience with EL RAMZ agency was excellent from day one. My work depends on complex video editing and 3D techniques, and they always execute it with high precision and deliver it on time. The manager is very cooperative and understands any modification quickly, and the team follows up on every step accurately. Honestly, their professional approach and quality of work made me continue with them and I don\'t hesitate to request any new project.',
    testimonial5_name: 'Saud bin Nasser bin Fahd',
    testimonial5_position: 'Production Coordinator / Video Editing Assistant',
    testimonial5_comment: 'My experience with EL RAMZ agency for video editing from the first day was comfortable and clear, and since then our work has continued without interruption. The projects I work on require expertise and careful follow-up, and EL RAMZ honestly never fall short... they understand the work, respond quickly, and follow up with me step by step. Every time they give me clean and refined work, and that\'s what made me continue with them. Honestly, their work makes me proud, and we will continue together, God willing.',
    
    // Footer
    footer_brand: 'Al-Ramz',
    footer_description: 'A creative agency specialized in design, video editing, and animation. We transform your ideas into amazing digital reality with high quality and unlimited creativity.',
    footer_quick_links: 'Quick Links',
    footer_contact: 'Contact Us',
    footer_rights: '© 2026 Al-Ramz - Design Agency. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    
    // Privacy Policy
    privacy_title: 'Privacy Policy',
    privacy_last_updated: 'Last Updated: January 2026',
    privacy_intro_title: 'Introduction',
    privacy_intro_text: 'At EL RAMZ, we are committed to protecting your privacy. This privacy policy explains how we collect, use, and protect your personal information when using our services.',
    privacy_collect_title: 'Information We Collect',
    privacy_collect_text: 'We collect the following information to provide better services:',
    privacy_collect_item1: 'Name, email address, and phone number',
    privacy_collect_item2: 'Project information and required details',
    privacy_collect_item3: 'Payment information (handled securely)',
    privacy_collect_item4: 'Usage and interaction information with the website',
    privacy_use_title: 'How We Use Information',
    privacy_use_text: 'We use the collected information for the following purposes:',
    privacy_use_item1: 'Providing and executing requested services',
    privacy_use_item2: 'Communicating with you regarding your project',
    privacy_use_item3: 'Improving our services and user experience',
    privacy_use_item4: 'Sending updates and special offers (with your consent)',
    privacy_protection_title: 'Data Protection',
    privacy_protection_text: 'We use advanced security technologies to protect your personal information from unauthorized access, alteration, or disclosure. All data is encrypted and transmitted securely.',
    privacy_rights_title: 'Your Rights',
    privacy_rights_text: 'You have the following rights regarding your personal information:',
    privacy_rights_item1: 'Right to access your personal information',
    privacy_rights_item2: 'Right to correct or update your information',
    privacy_rights_item3: 'Right to delete your personal information',
    privacy_rights_item4: 'Right to object to processing your information',
    privacy_cookies_title: 'Cookies',
    privacy_cookies_text: 'We use cookies to improve your experience on our website. You can disable cookies from your browser settings, but this may affect website functionality.',
    privacy_contact_title: 'Contact Us',
    privacy_contact_text: 'If you have any questions about the privacy policy, please contact us:',
    
    // Terms of Service
    terms_title: 'Terms of Service',
    terms_last_updated: 'Last Updated: January 2026',
    terms_intro_title: 'Introduction',
    terms_intro_text: 'By using EL RAMZ services, you agree to comply with these terms and conditions. Please read these terms carefully before using our services.',
    terms_services_title: 'Services Provided',
    terms_services_text: 'We provide creative services including:',
    terms_services_item1: 'Graphic design and visual identities',
    terms_services_item2: 'Video editing and post-production',
    terms_services_item3: 'Animation and motion graphics',
    terms_services_item4: 'Other creative services as requested',
    terms_payment_title: 'Payment Terms',
    terms_payment_text: 'Payment is made according to the following terms:',
    terms_payment_item1: 'An advance payment is required before starting the project',
    terms_payment_item2: 'The remaining amount is paid upon project completion',
    terms_payment_item3: 'All prices are final after approving the quote',
    terms_timeline_title: 'Project Timeline',
    terms_timeline_text: 'We commit to the timeline agreed upon in the contract. Delivery may be delayed in cases of force majeure or when requesting additional revisions after approving initial designs.',
    terms_revisions_title: 'Revisions',
    terms_revisions_text: 'We guarantee a certain number of revisions within the contract. Additional revisions may require extra fees. Revision requests must be submitted within a specified time period after delivery.',
    terms_ip_title: 'Intellectual Property',
    terms_ip_text: 'After full payment completion, all intellectual property rights of the completed work transfer to the client. EL RAMZ retains the right to use the work in the portfolio for display and marketing purposes.',
    terms_cancellation_title: 'Cancellation',
    terms_cancellation_text: 'The project can be cancelled by either party. In case of cancellation, EL RAMZ has the right to retain the advance payment for work completed until the cancellation date. The advance payment cannot be refunded after work has begun.',
    terms_liability_title: 'Limitation of Liability',
    terms_liability_text: 'We are not liable for any indirect or incidental damages that may result from using our services. We guarantee the quality of work agreed upon in the contract.',
    terms_contact_title: 'Contact Us',
    terms_contact_text: 'If you have any questions about the terms of service, please contact us:',
    
    // Portfolio
    portfolio_item1_title: 'Complete Visual Identity',
    portfolio_item1_role: 'Graphic Design',
    portfolio_item1_company: 'Logo + Visual Identity',
    portfolio_item2_title: 'Professional Video Editing',
    portfolio_item2_role: 'Video Editing',
    portfolio_item2_company: 'Video + Effects',
    portfolio_item3_title: 'Professional Animation',
    portfolio_item3_role: 'Motion Graphics',
    portfolio_item3_company: 'Board Animation',
    portfolio_item4_title: 'Dynamu™',
    portfolio_item4_role: 'Complete Visual Identity',
    portfolio_item4_company: 'Mobile App - Car Spare Parts',
    portfolio_item4_description: 'Dynamu™ is an Egypt-based mobile application that specializes in selling original car spare parts. Launched with the vision of bringing trust, speed, and convenience to the automotive market, Dynamu aims to simplify the process of ordering spare parts for Class A & B customers. In 2025, the founders reached out to me to build the brand from the ground up — from strategy and naming to a complete visual identity system.',
    portfolio_item5_title: 'Khana Bakery',
    portfolio_item5_role: 'Complete Visual Identity',
    portfolio_item5_company: 'Bakery & Pastries',
    portfolio_item5_description: 'Complete visual identity for a bakery specialized in traditional baked goods and authentic pastries.',
    portfolio_item6_title: 'WHQ.CO',
    portfolio_item6_role: 'Complete Visual Identity',
    portfolio_item6_company: 'Wahq Contracting Company',
    portfolio_item6_description: 'Complete visual identity for WHQ Contracting Company - professional logo design and comprehensive visual identity system that reflects the company\'s strength and confidence in the contracting field.',
    portfolio_item7_title: 'Shagra for Shemagh',
    portfolio_item7_role: 'Complete Visual Identity',
    portfolio_item7_company: 'Shemagh & Traditional Clothing',
    portfolio_item7_description: 'Complete visual identity for Shagra for Shemagh brand - professional logo design that reflects authenticity and elegance in the world of shemagh and traditional clothing. The shemagh is an essential piece of authentic Arab heritage, and the visual identity was designed to highlight the product\'s quality and authenticity while maintaining a modern touch.',
    portfolio_item8_title: 'ARFAJ | OUTDOOR SPACE DESIGN STUDIO',
    portfolio_item8_role: 'Complete Visual Identity',
    portfolio_item8_company: 'Outdoor Space Design Studio',
    portfolio_item8_description: 'Complete visual identity for ARFAJ Outdoor Space Design Studio - professional logo design and comprehensive visual identity system that reflects creativity and excellence in outdoor space design.',
    
    // Contact
    contact_title: 'Contact Us',
    contact_subtitle: 'We are here to help you. Tell us about your project and we will contact you as soon as possible',
    contact_email: 'Email',
    contact_phone: 'Phone',
    contact_location: 'Location',
    contact_location_value: 'Egypt',
    contact_form_name: 'Name',
    contact_form_email: 'Email',
    contact_form_phone: 'Phone Number',
    contact_form_service: 'Required Service',
    contact_form_message: 'Message',
    contact_form_name_placeholder: 'Enter your full name',
    contact_form_email_placeholder: 'example@email.com',
    contact_form_phone_placeholder: '05xxxxxxxx',
    contact_form_service_placeholder: 'Select a service',
    contact_form_message_placeholder: 'Tell us about your project...',
    contact_form_service_design: 'Graphic Design',
    contact_form_service_video: 'Video Editing',
    contact_form_service_animation: 'Animation & Motion Graphics',
    contact_form_service_other: 'Other',
    contact_form_submit: 'Send Message',
    contact_form_submitting: 'Sending...',
    contact_form_success: 'Your message has been sent successfully! We will contact you soon.',
    contact_form_error: 'An error occurred while sending the message. Please try again.',
    contact_validation_name_min: 'Name must be at least 2 characters',
    contact_validation_name_max: 'Name is too long',
    contact_validation_email: 'Invalid email address',
    contact_validation_phone_min: 'Invalid phone number',
    contact_validation_phone_max: 'Phone number is too long',
    contact_validation_service: 'Please select a service',
    contact_validation_message_min: 'Message must be at least 10 characters',
    contact_validation_message_max: 'Message is too long',
    contact_validation_error_send: 'Failed to send message',
    
    // Visual Identity Page
    visual_identity_title: 'Visual Identity',
    visual_identity_subtitle: 'A comprehensive collection of visual identity and graphic design works',
    
    // Video Editing Page
    video_editing_title: 'Professional Video Editing',
    video_editing_subtitle: 'Specialized video editing services across various fields with professional visual effects',
    video_editing_cta_title: 'Ready to Start Your Project?',
    video_editing_cta_desc: 'Contact us today and get a customized quote for your project',
    video_editing_cta_button: 'Contact Us',
    
    // Video Categories
    video_category_sports: 'Sports Videos',
    video_category_sports_desc: 'Professional editing for sports videos with dynamic effects and advanced editing',
    video_sports_item1: 'Exercises',
    video_sports_item1_desc: 'Professional exercise videos with explanations and movement techniques',
    video_sports_item2: 'Ads',
    video_sports_item2_desc: 'Personal promotion ads for gyms and trainers with attractive effects and professional editing',
    
    video_category_real_estate: 'Real Estate Videos',
    video_category_real_estate_desc: 'Professional real estate presentations with attractive visual effects for property showcases',
    video_real_estate_item1: 'Drone',
    video_real_estate_item1_desc: 'Professional aerial photography for real estate using drones with advanced editing',
    video_real_estate_item2: 'Content Real Estate Offers',
    video_real_estate_item2_desc: 'Professional content for real estate offers with attractive visual effects and refined editing',
    
    video_category_medical: 'Medical Videos',
    video_category_medical_desc: 'Professional medical videos for doctors and hospitals with specialized editing',
    video_medical_item1: 'Medical Promotion',
    video_medical_item1_desc: 'Promotional videos for doctors in cosmetic and surgical fields with professional explanations and refined editing',
    
    video_category_cars: 'Car Video Editing',
    video_category_cars_desc: 'Professional editing for car videos with attractive visual effects',
    video_cars_item1: 'Car Video Editing',
    video_cars_item1_desc: 'Professional editing for car videos with dynamic effects and advanced editing',
    
    video_category_animation: 'Professional Animation',
    video_category_animation_desc: 'Professional 3D animation with innovative designs and accurate video display preserving original shape',
    video_animation_item1: 'Professional Animation 1',
    video_animation_item1_desc: 'Professional 3D animation designed innovatively with accurate video display preserving original shape',
    video_animation_item2: 'Professional Animation 2',
    video_animation_item2_desc: 'Professional 3D animation designed innovatively with accurate video display preserving original shape',
    video_animation_item3: 'Professional Animation 3',
    video_animation_item3_desc: 'Professional 3D animation designed innovatively with accurate video display preserving original shape',
    video_animation_item4: 'Professional Animation 4',
    video_animation_item4_desc: 'Professional 3D animation designed innovatively with accurate video display preserving original shape',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar')

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
      document.documentElement.lang = savedLanguage
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'
    } else {
      // Default to Arabic
      document.documentElement.lang = 'ar'
      document.documentElement.dir = 'rtl'
    }
  }, [])

  useEffect(() => {
    // Update HTML attributes when language changes
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    document.documentElement.lang = newLanguage
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

