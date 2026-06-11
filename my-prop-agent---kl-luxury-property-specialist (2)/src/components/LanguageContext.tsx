import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'zh-CN' | 'zh-TW' | 'en' | 'fr' | 'ar' | 'ja' | 'ko';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

export const languagesList = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية', isRTL: true },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' }
] as const;

const translations: Record<Language, Record<string, string>> = {
  'zh-CN': {
    // Nav & Common
    'nav.home': '首页',
    'nav.projects': '精选楼盘',
    'nav.blog': '房产博客',
    'nav.contact': '联系顾问',
    'nav.consult': '免费咨询',
    'nav.admin': '管理后台',
    'nav.map': '地图找房',
    'nav.verified': 'REN 46305 | IQI 认证房产谈判员',
    // Hero
    'hero.badge': 'SHYAN YEE • 您的专属房产顾问',
    'hero.title': '吉隆坡 & 雪兰莪精选楼盘',
    'hero.subtitle': '找房买房，其实很简单。',
    'hero.desc': '真实数据，客观分析。助您省去繁杂套路，轻松物色心仪名邸。',
    'hero.btn.portfolio': '物色精选楼盘',
    'hero.btn.consult': '免费在线咨询',
    // Profile
    'profile.badge': '认识 SHYAN YEE',
    'profile.title': 'Shyan Yee',
    'profile.desc1': '我是 Shyan Yee，我相信每一次寻房都是一段专属的人生故事。在吉隆坡与雪兰莪房产界深耕多年，我始终坚持“真诚、专业、不强推”的原则，专注于帮您找到真正契合您生活方式与财富规划的梦想家园。',
    'profile.desc2': '无论您是寻觅 Central Park Damansara 的首套刚需房，还是追求 PJ North 具有卓越长期升值空间的优质资产，我都能为您提供专业的数据支持、合规的法律常识以及富有温度的实地考察。欢迎订阅我的 YouTube 频道“Shyan Yee KL Property Insight”，观看最新的实地踩盘视讯。',
    'profile.btn.contact': '立即联系 Shyan Yee',
    // Projects Page & Filters
    'projects.title': '吉隆坡与雪兰莪精选房产项目',
    'projects.desc': '由资深房地产谈判员精心挑选的优质住宅项目。提供灵活的多维度智能筛选。',
    'filter.search.placeholder': '搜索楼盘名称、区域或地标及房产项目...',
    'filter.state': '选择州属',
    'filter.price': '价格预算',
    'filter.type': '物业类型',
    'filter.rooms': '卧室数量',
    'filter.status': '建设阶段',
    'filter.size': '面积大小',
    'filter.tenure': '产权性质',
    'filter.completion': '交房年份',
    'filter.carpark': '车位安排',
    'filter.compare': '对比楼盘',
    'filter.compare.desc': '选择最多 3 个楼盘进行并排对比参数',
    // Calculator
    'calc.title': '房贷智能计算器',
    'calc.price': '房产总价 (RM)',
    'calc.downpayment': '首付款 (RM)',
    'calc.interest': '房贷年利率 (%)',
    'calc.tenure': '还款年限 (年)',
    'calc.result.title': '月供计算结果',
    'calc.result.monthly': '预计月供金额',
    'calc.result.principal': '贷款总额',
    'calc.result.interest': '利息总额',
    'calc.btn': '开始计算财务方案',
    // Contact Form
    'contact.title': '开启您的置业对话',
    'contact.desc': '留下您的联系方式，我将在第一时间为您提供房产分析、贷款评估或安排展示厅无忧预约。',
    'contact.name': '您的姓名',
    'contact.phone': '您的联系电话',
    'contact.email': '您的电子邮件',
    'contact.service': '意向咨询事项',
    'contact.message': '您的留言或特定房产需求',
    'contact.btn.submit': '立即提交咨询单',
    'contact.btn.whatsapp': '直接 WhatsApp 联络 Shyan Yee',
    // Footer
    'footer.disclaimer': '免责声明：本网站所载的一切资料、数据及楼盘资讯主要供作一般参考及投资说明用途。',
    'footer.rights': '版权所有。保留一切权利。',
  },
  'zh-TW': {
    // Nav & Common
    'nav.home': '首頁',
    'nav.projects': '精選樓盤',
    'nav.blog': '房產博客',
    'nav.contact': '聯絡顧問',
    'nav.consult': '免費諮詢',
    'nav.admin': '管理後台',
    'nav.map': '地圖找房',
    'nav.verified': 'REN 46305 | IQI 認證房產談判員',
    // Hero
    'hero.badge': 'SHYAN YEE • 您的專屬房產顧問',
    'hero.title': '吉隆坡 & 雪蘭莪精選樓盤',
    'hero.subtitle': '找房買房，其實很簡單。',
    'hero.desc': '真實數據，客觀分析。助您省去繁雜套路，輕鬆物色心儀名邸。',
    'hero.btn.portfolio': '物色精選樓盤',
    'hero.btn.consult': '免費線上諮詢',
    // Profile
    'profile.badge': '認識 SHYAN YEE',
    'profile.title': 'Shyan Yee',
    'profile.desc1': '我是 Shyan Yee，我相信每一次尋房都是一段專屬的人生故事。在吉隆坡與雪蘭莪房產界深耕多年，我始終堅持“真誠、專業、不強推”的原則，專注於幫您找到真正契合您生活方式與財富規劃的夢想家園。',
    'profile.desc2': '無論您是尋覓 Central Park Damansara 的首套剛需房，還是追求 PJ North 具有卓越長期升值空間的優質資產，我都能為您提供專業的數據支持、合規的法律常識以及富有溫度的實地考察。歡迎訂閱我的 YouTube 頻道“Shyan Yee KL Property Insight”，觀看最新的實地踩盤視訊。',
    'profile.btn.contact': '立即聯絡 Shyan Yee',
    // Projects Page & Filters
    'projects.title': '吉隆坡與雪蘭莪精選房產項目',
    'projects.desc': '由資深房地產談判員精心挑選的優質住宅項目。提供靈活的多維度智能篩選。',
    'filter.search.placeholder': '搜尋樓盤名稱、區域或地標及房產項目...',
    'filter.state': '選擇州屬',
    'filter.price': '價格預算',
    'filter.type': '物業類型',
    'filter.rooms': '臥室數量',
    'filter.status': '建設階段',
    'filter.size': '面積大小',
    'filter.tenure': '產權性質',
    'filter.completion': '交房年份',
    'filter.carpark': '車位安排',
    'filter.compare': '對比樓盤',
    'filter.compare.desc': '選擇最多 3 個樓盤進行並排對比參數',
    // Calculator
    'calc.title': '房貸智能計算器',
    'calc.price': '房產總價 (RM)',
    'calc.downpayment': '頭期款 (RM)',
    'calc.interest': '房貸年利率 (%)',
    'calc.tenure': '還款年限 (年)',
    'calc.result.title': '月供計算結果',
    'calc.result.monthly': '預計月供金額',
    'calc.result.principal': '貸款總額',
    'calc.result.interest': '利息總額',
    'calc.btn': '開始計算財務方案',
    // Contact Form
    'contact.title': '開啟您的置業對話',
    'contact.desc': '留下您的聯絡方式，我將在第一時間為您提供房產分析、貸款評估或安排展示廳無憂預約。',
    'contact.name': '您的姓名',
    'contact.phone': '您的聯絡電話',
    'contact.email': '您的電子郵件',
    'contact.service': '意向諮詢事項',
    'contact.message': '您的留言或特定房產需求',
    'contact.btn.submit': '立即提交諮詢單',
    'contact.btn.whatsapp': '直接 WhatsApp 聯絡 Shyan Yee',
    // Footer
    'footer.disclaimer': '免責聲明：本網站所載的一切資料、數據及樓盤資訊主要供作一般參考及投資說明用途。',
    'footer.rights': '版權所有。保留一切權利。',
  },
  'en': {
    // Nav & Common
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Insights',
    'nav.contact': 'Contact Advisory',
    'nav.consult': 'Consult Now',
    'nav.admin': 'Admin Panel',
    'nav.map': 'Map Search',
    'nav.verified': 'REN 46305 | IQI Certified Advisor',
    // Hero
    'hero.badge': 'SHYAN YEE • YOUR PROPERTY ADVISOR',
    'hero.title': 'KL & Selangor Estates',
    'hero.subtitle': 'Buying, simplified.',
    'hero.desc': 'Objective analyses and handpicked properties. No high-pressure sales pitches.',
    'hero.btn.portfolio': 'Explore Projects',
    'hero.btn.consult': 'Free Consultation',
    // Profile
    'profile.badge': 'MEET SHYAN YEE',
    'profile.title': 'Shyan Yee',
    'profile.desc1': 'Hi, I am Shyan Yee. I believe finding a property is a deeply life-driven journey. With extensive experience in KL/Selangor real estate, I strictly skip high-pressure sales pitches to concentrate solely on matching homes to your budget & lifestyle.',
    'profile.desc2': 'Whether looking for a starter home in Central Park Damansara or safe capital appreciation in PJ North, I supply vetted market analyses and transparent advice. Check out my YouTube Channel "Shyan Yee KL Property Insight" for honest property tours.',
    'profile.btn.contact': 'Connect with Shyan Yee',
    // Projects Page & Filters
    'projects.title': 'Curated Properties in KL & Selangor',
    'projects.desc': 'Meticulously vetted developmental projects selected by a certified advisor. Filter on key metrics.',
    'filter.search.placeholder': 'Search by project name, area, or landmark...',
    'filter.state': 'State',
    'filter.price': 'Price Budget',
    'filter.type': 'Property Type',
    'filter.rooms': 'Bedrooms count',
    'filter.status': 'Construction Phase',
    'filter.size': 'Sizing',
    'filter.tenure': 'Property Tenure',
    'filter.completion': 'Completion Year',
    'filter.carpark': 'Parking Bay',
    'filter.compare': 'Compare Projects',
    'filter.compare.desc': 'Select up to 3 projects to compare details side-by-side',
    // Calculator
    'calc.title': 'Smart Loan Calculator',
    'calc.price': 'Property Price (RM)',
    'calc.downpayment': 'Downpayment (RM)',
    'calc.interest': 'Interest Rate (%)',
    'calc.tenure': 'Tenure Period (Years)',
    'calc.result.title': 'Monthly Repayment Option',
    'calc.result.monthly': 'Estimated Repayment',
    'calc.result.principal': 'Principal Amount',
    'calc.result.interest': 'Total Interest Charges',
    'calc.btn': 'Estimate Payment Scheme',
    // Contact Form
    'contact.title': 'Start Your Real Estate Journey',
    'contact.desc': 'Send your details over, and I will share a direct market analysis, financing guidance, or schedule a priority, no-obligation showroom walk.',
    'contact.name': 'Full Name',
    'contact.phone': 'Mobile Number',
    'contact.email': 'Email Address',
    'contact.service': 'Enquiry Request Type',
    'contact.message': 'Detailed Message or Project interest',
    'contact.btn.submit': 'Request Advisory Call',
    'contact.btn.whatsapp': 'Chat via WhatsApp',
    // Footer
    'footer.disclaimer': 'Disclaimer: All visual renderings, dimensional layouts, and statistics serve purely informational guidance.',
    'footer.rights': 'All rights reserved.',
  },
  'fr': {
    // Nav & Common
    'nav.home': 'Accueil',
    'nav.projects': 'Projets Ensembles',
    'nav.blog': 'Actualités',
    'nav.contact': 'Contact Direct',
    'nav.consult': 'Consultation',
    'nav.admin': 'Admin',
    'nav.map': 'Carte Immobilier',
    'nav.verified': 'REN 46305 | Conseillère IQI Certifiée',
    // Hero
    'hero.badge': 'SHYAN YEE • CONSEILLÈRE EXCLUSIVE',
    'hero.title': 'Propriétés KL & Selangor',
    'hero.subtitle': 'L’immobilier, tout simplement.',
    'hero.desc': 'Analyses objectives et biens sélectionnés. Sans compromis ni forcing de vente.',
    'hero.btn.portfolio': 'Explorer le Portfolio',
    'hero.btn.consult': 'Consultation Gratuite',
    // Profile
    'profile.badge': 'DÉCOUVREZ SHYAN YEE',
    'profile.title': 'Shyan Yee',
    'profile.desc1': 'Bonjour, je m’appelle Shyan Yee. Trouver la maison parfaite est une aventure humaine unique. Spécialiste du marché de Kuala Lumpur, je bannis le forcing de vente commerciale pour prioriser l’adéquation de vos besoins.',
    'profile.desc2': 'Pour votre premier logement ou un placement haut de gamme, je mets à votre disposition des analyses terrain fiables. Suivez ma chaîne YouTube "Shyan Yee KL Property Insight" pour des visites réelles.',
    'profile.btn.contact': 'Prendre contact avec Shyan Yee',
    // Projects Page & Filters
    'projects.title': 'Sélection Haut de Gamme à KL & Selangor',
    'projects.desc': 'Des ensembles résidentiels d’élite sélectionnés par une négociatrice agréée. Filtres avancés disponibles.',
    'filter.search.placeholder': 'Rechercher par projet, quartier, repère...',
    'filter.state': 'État',
    'filter.price': 'Budget Prix',
    'filter.type': 'Type de Bien',
    'filter.rooms': 'Chambres',
    'filter.status': 'Phase de Travaux',
    'filter.size': 'Superficie',
    'filter.tenure': 'Statut Foncier',
    'filter.completion': 'Année de Livraison',
    'filter.carpark': 'Places Parking',
    'filter.compare': 'Comparer les Biens',
    'filter.compare.desc': 'Sélectionnez jusqu’à 3 projets pour comparer leurs spécifications côte à côte',
    // Calculator
    'calc.title': 'Simulateur d’Emprunt Malin',
    'calc.price': 'Prix Total (RM)',
    'calc.downpayment': 'Apport Personnel (RM)',
    'calc.interest': 'Taux d’Intérêt (%)',
    'calc.tenure': 'Durée (Années)',
    'calc.result.title': 'Mensualités Estimées',
    'calc.result.monthly': 'Versement Mensuel',
    'calc.result.principal': 'Capital Emprunté',
    'calc.result.interest': 'Coût Total Crédit',
    'calc.btn': 'Calculer mon Projet Financement',
    // Contact Form
    'contact.title': 'Parler de Votre Projet',
    'contact.desc': 'Précisez votre demande et je vous recontacterai rapidement avec des données fiables pour organiser des visites privilégiées.',
    'contact.name': 'Nom Complet',
    'contact.phone': 'Téléphone',
    'contact.email': 'Adresse E-mail',
    'contact.service': 'Nature d’Intérêt',
    'contact.message': 'Détaillez vos orientations ou préférences',
    'contact.btn.submit': 'Envoyer ma Demande',
    'contact.btn.whatsapp': 'Joindre directement par WhatsApp',
    // Footer
    'footer.disclaimer': 'Avertissement : Les informations, illustrations et superficies affichées sont non contractuelles.',
    'footer.rights': 'Tous droits réservés.',
  },
  'ar': {
    // Nav & Common
    'nav.home': 'الرئيسية',
    'nav.projects': 'المشاريع العقارية',
    'nav.blog': 'الرؤى والمدونة',
    'nav.contact': 'التواصل للاستشارة',
    'nav.consult': 'استشر الآن',
    'nav.admin': 'لوحة الإشراف',
    'nav.map': 'خريطة العقارات',
    'nav.verified': 'REN 46305 | مستشارة عقارية مرخصة',
    // Hero
    'hero.badge': 'شيان يي • مستشارتك العقارية الموثوقة',
    'hero.title': 'عقارات كوالالمبور وسيلانغور',
    'hero.subtitle': 'شراء العقار، أسهل بكثير.',
    'hero.desc': 'خيارات مميزة وبيانات دقيقة بعيداً عن تعقيدات البيع والشراء.',
    'hero.btn.portfolio': 'استكشف المشاريع',
    'hero.btn.consult': 'استشارة مجانية',
    // Profile
    'profile.badge': 'تعرف على شيان يي',
    'profile.title': 'شيان يي',
    'profile.desc1': 'أهلاً بك، أنا شيان يي. أؤمن أن البحث عن المنزل المثالي هو رحلة شخصية متصلة بجودة حياتك. خبرتي الطويلة في كوالالمبور ترتكز على تقديم نصائح موضوعية صادقة وتجاوز أساليب الضغط التسويقي التقليدية.',
    'profile.desc2': 'سواء رغبت في شراء مسكنك الأول بضاحية Central Park Damansara أو تحقيق نمو استثمار ممتاز في PJ North، أزودك بالخرائط التفصيلية والجدول المالي الشامل. تابع قناتي على اليوتيوب لمعاينة العقارات على أرض الواقع.',
    'profile.btn.contact': 'تحدث مع شيان يي مباشرة',
    // Projects Page & Filters
    'projects.title': 'عقارات متميزة في كوالالمبور وسيلانغور',
    'projects.desc': 'مجمعات سكنية فاخرة ومختارة بعناية بالاعتماد على معايير الجودة والحلول المالية السهلة.',
    'filter.search.placeholder': 'ابحث عن اسم المشروع، الحي، أو الشارع...',
    'filter.state': 'الولاية',
    'filter.price': 'ميزانية السعر',
    'filter.type': 'نوع العقار',
    'filter.rooms': 'عدد الغرف',
    'filter.status': 'مرحلة البناء',
    'filter.size': 'المساحة',
    'filter.tenure': 'طبيعة الملكية',
    'filter.completion': 'عام التسليم',
    'filter.carpark': 'مواقف السيارات',
    'filter.compare': 'مقارنة المشاريع',
    'filter.compare.desc': 'اختر ما يصل إلى 3 مشاريع لمقارنة مواصفاتها بدقة جنباً إلى جنب',
    // Calculator
    'calc.title': 'آلة حاسبة التمويل العقاري الذكية',
    'calc.price': 'قيمة العقار الإجمالية (RM)',
    'calc.downpayment': 'الدفعة الأولى (RM)',
    'calc.interest': 'نسبة الفائدة السنوية (%)',
    'calc.tenure': 'فترة السداد (سنوات)',
    'calc.result.title': 'نتائج الدفع الشهري التقديرية',
    'calc.result.monthly': 'القسط الشهري المتوقع',
    'calc.result.principal': 'إجمالي قيمة القرض',
    'calc.result.interest': 'إجمالي الفوائد المترتبة',
    'calc.btn': 'احسب تفاصيل التمويل',
    // Contact Form
    'contact.title': 'ابدأ التخطيط للتملك اليوم',
    'contact.desc': 'أرسل تفاصيل الاتصال وسأتواصل معك مباشرة لمناقشة وضعك المالي وتوفير جداول الحجوزات ونسب الإنجاز.',
    'contact.name': 'الاسم الكامل',
    'contact.phone': 'رقم الهاتف المتنقل',
    'contact.email': 'البريد الإلكتروني',
    'contact.service': 'نوع الاستفسار',
    'contact.message': 'اكتب استفسارك أو العقار المهتم به',
    'contact.btn.submit': 'طلب استشارة هاتفية',
    'contact.btn.whatsapp': 'تواصل عبر واتساب فوراً',
    // Footer
    'footer.disclaimer': 'إخلاء المسؤولية: جميع المخططات البيئية والقياسات التخطيطية للأغراض الإيضاحية فقط.',
    'footer.rights': 'جميع الحقوق محفوظة.',
  },
  'ja': {
    // Nav & Common
    'nav.home': 'ホーム',
    'nav.projects': '厳選物件',
    'nav.blog': 'ブログ',
    'nav.contact': 'お問い合わせ',
    'nav.consult': '無料相談',
    'nav.admin': '管理画面',
    'nav.map': 'マップ検索',
    'nav.verified': 'REN 46305 | IQI 公認アドバイザー',
    // Hero
    'hero.badge': 'SHYAN YEE • 専属不動産アドバイザー',
    'hero.title': 'KL＆セランゴールの厳選不動産',
    'hero.subtitle': '家探しを、もっとシンプルに。',
    'hero.desc': '強引なセールスは一切なし。客観的なデータであなたに最適な優良物件をご紹介。',
    'hero.btn.portfolio': '物件ポートフォリオを見る',
    'hero.btn.consult': '無料オンライン相談',
    // Profile
    'profile.badge': 'SHYAN YEE（シャン・イー）について',
    'profile.title': 'Shyan Yee',
    'profile.desc1': 'こんにちは、Shyan Yee です。新しい家を見つけることは、人生の大切なストーリーを紡ぐことです。クアラルンプール市場での長年の経験を活かし、不要な売り込みを避け、ライフスタイルに寄り添った最適なアドバイスをさせていただきます。',
    'profile.desc2': 'Central Park Damansara の自住用物件から、PJ Northエリアのインカムゲイン投資まで、市場データと法知識をもって親身にお手伝いします。YouTube チャンネル「Shyan Yee KL Property Insight」をフォローして最新現地リポートを体験ください。',
    'profile.btn.contact': 'シャン・イーに連絡する',
    // Projects Page & Filters
    'projects.title': 'クアラルンプール＆セランゴールの極上物件セレクション',
    'projects.desc': '公認アドバイザーが念入りに実査したハイクオリティレジデンス。豊富なフィルターで比較検討できます。',
    'filter.search.placeholder': '物件名、地域、ランドマークから探す...',
    'filter.state': '州',
    'filter.price': '価格予算',
    'filter.type': '物件タイプ',
    'filter.rooms': 'ベッドルーム数',
    'filter.status': '進捗段階',
    'filter.size': '広さ',
    'filter.tenure': '所有権',
    'filter.completion': '引き渡し年',
    'filter.carpark': '駐車台数',
    'filter.compare': '物件を並べて比較',
    'filter.compare.desc': '最大3つの物件を選んで基本スペックを簡単に横並び比較',
    // Calculator
    'calc.title': 'スマート住宅ローンシミュレーター',
    'calc.price': '物件価格 (RM)',
    'calc.downpayment': '頭金 (RM)',
    'calc.interest': '金利 (%)',
    'calc.tenure': '返済期間 (年)',
    'calc.result.title': '毎月のお支払いシミュレーション',
    'calc.result.monthly': 'お見積り月々支払い',
    'calc.result.principal': '融資総額',
    'calc.result.interest': '総金利負担額',
    'calc.btn': '必要経費を含めて試算する',
    // Contact Form
    'contact.title': 'ご相談・お問い合せはこちらから',
    'contact.desc': 'ご連絡先を登録後、個別のマーケット状況、融資適格診断、ショールームのデモ予約のご案内を速やかにお送りいたします。',
    'contact.name': 'お名前',
    'contact.phone': 'お電話番号',
    'contact.email': 'メールアドレス',
    'contact.service': 'お問い合せ目的',
    'contact.message': 'メッセージ・特定ご希望条件など',
    'contact.btn.submit': 'この内容で相談する',
    'contact.btn.whatsapp': 'WhatsAppでチャットを開始',
    // Footer
    'footer.disclaimer': '免責事項：表示されている完成イメージ、地図、面積数値等は参考指標であり確定情報ではありません。',
    'footer.rights': 'All rights reserved.',
  },
  'ko': {
    // Nav & Common
    'nav.home': '홈',
    'nav.projects': '추천 분양',
    'nav.blog': '부동산 칼럼',
    'nav.contact': '상담 문의',
    'nav.consult': '무료 컨설팅',
    'nav.admin': '관리 시스템',
    'nav.map': '지도 검색',
    'nav.verified': 'REN 46305 | IQI 공인 상담 전문가',
    // Hero
    'hero.badge': 'SHYAN YEE • 고객 전담 부동산 파트너',
    'hero.title': '쿠알라룸푸르 & 셀랑고르 분양',
    'hero.subtitle': '간편하고 안전한 내 집 마련.',
    'hero.desc': '투명한 데이터와 꼼꼼한 분석으로 최적의 주거를 맞춤형으로 찾아드립니다.',
    'hero.btn.portfolio': '프리미엄 포트폴리오 보기',
    'hero.btn.consult': '온라인 편한 상담 신청',
    // Profile
    'profile.badge': '공인 컨설턴트 SHYAN YEE 소개',
    'profile.title': 'Shyan Yee',
    'profile.desc1': '안녕하세요, Shyan Yee입니다. 집을 구한다는 것은 삶의 중요한 새로운 이정표를 만나는 귀한 여정입니다. 고객 한 분 한 분의 만족을 위해 강요 없이, 정직하고 정확한 정보만을 공급해 드립니다.',
    'profile.desc2': '센트럴 파크 다만사라의 내 집 마련부터, 안정적 자산가치를 담은 피제이 노스 투자 상담에 이르기까지 완벽하게 지원해 드립니다. YouTube 채널 "Shyan Yee KL Property Insight"에서 실시간 리얼 답사 영상을 만나보세요.',
    'profile.btn.contact': '성실 자문 신청하기',
    // Projects Page & Filters
    'projects.title': '쿠알라룸푸르 & 셀랑고르 명품 분양 라인업',
    'projects.desc': '공인 자격 취득 전문가가 세심하게 검증한 개발사 프로젝트입니다. 조건에 따라 간편하게 필터링할 수 있습니다.',
    'filter.search.placeholder': '프로젝트 이름, 지역 또는 주요 랜드마크 검색...',
    'filter.state': '분양 지역',
    'filter.price': '희망 가격대',
    'filter.type': '주거 형태',
    'filter.rooms': '침실 개수',
    'filter.status': '시공 현황',
    'filter.size': '면적',
    'filter.tenure': '소유 영속형태',
    'filter.completion': '입주 예정 연도',
    'filter.carpark': '주차 구획수',
    'filter.compare': '선택 단지 비교하기',
    'filter.compare.desc': '최대 3개 단지를 지정하여 상세 제원을 한눈에 편안히 대조비교',
    // Calculator
    'calc.title': '스마트 대출이자 계산기',
    'calc.price': '분양가액 (RM)',
    'calc.downpayment': '초기 인수자금 (RM)',
    'calc.interest': '고정 연이율 (%)',
    'calc.tenure': '상환기간 (수년)',
    'calc.result.title': '상환 예정액 산출내역',
    'calc.result.monthly': '예상 월 원리금상환액',
    'calc.result.principal': '총 융자 지원 원금',
    'calc.result.interest': '상환 완료 시 누적 총이자액',
    'calc.btn': '재정 솔루션 빠른 모의 계산',
    // Contact Form
    'contact.title': '나만의 맞춤 컨시어지 상담',
    'contact.desc': '안내 받으실 기본 성함과 연락처를 남겨 주시면, 즉시 희망 주거 타운의 실소요 분석 및 모델하우스 원스톱 우선 예약을 예약 지원해 드립니다.',
    'contact.name': '성함',
    'contact.phone': '연락처',
    'contact.email': '이메일 주소',
    'contact.service': '문의 세부 구분',
    'contact.message': '상세한 문의 사항 및 특정 요건',
    'contact.btn.submit': '상담 신청 카드 송부',
    'contact.btn.whatsapp': '실시간 카카오/왓츠앱 맞춤 채팅',
    // Footer
    'footer.disclaimer': '면책 조항: 안내 드리는 조감 이미지, 입지 척도는 일반 설명 용도이며 법적 약정 효력을 동반하지 않습니다.',
    'footer.rights': 'All rights reserved.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kl-living-lang');
    if (saved && Object.keys(translations).includes(saved)) {
      return saved as Language;
    }
    return 'zh-CN'; // Default is Simplified Chinese per user's preference
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kl-living-lang', lang);
  };

  const t = (key: string): string => {
    const translationSet = translations[language] || translations['zh-CN'];
    return translationSet[key] || translations['zh-CN'][key] || key;
  };

  const currentLangObj = languagesList.find(l => l.code === language);
  const isRTL = currentLangObj && 'isRTL' in currentLangObj ? !!currentLangObj.isRTL : false;

  useEffect(() => {
    // Add RTL class support if needed
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
