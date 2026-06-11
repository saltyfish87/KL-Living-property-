import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'realestate';
  schemaData?: object;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "Shyan Yee | Premium Real Estate Advisor & Investment Portfolio Malaysia", 
  description = "Providing a personal and simple approach to finding your dream home and investment in Kuala Lumpur and Selangor. Premium real estate guidance by Shyan Yee (REN 46305) under IQI Realty sdn bhd.",
  image = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
  url = "https://shyanyee.com",
  type = "website",
  schemaData
}) => {
  const [dbVerification, setDbVerification] = useState<string>('');
  const [dbTitleSuffix, setDbTitleSuffix] = useState<string>(' | Shyan Yee | Premium Real Estate Advisor');
  const [dbDesc, setDbDesc] = useState<string>('');
  const [dbKeywords, setDbKeywords] = useState<string>('');

  useEffect(() => {
    const fetchSeoSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'seo');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.googleSiteVerification) setDbVerification(data.googleSiteVerification);
          if (data.metaTitleSuffix) setDbTitleSuffix(data.metaTitleSuffix);
          if (data.metaDescription) setDbDesc(data.metaDescription);
          if (data.metaKeywords) setDbKeywords(data.metaKeywords);
        }
      } catch (error) {
        console.warn("Failed to fetch custom SEO settings, using robust defaults:", error);
      }
    };
    fetchSeoSettings();
  }, []);

  const defaultKeywords = "Shyan Yee, registered REN 46305, IQI Realty, Bukit Jalil property investment, The Aldenz Damansara, Exsim projects Malaysia, Kingswoodz Bukit Jalil, Causewayz Square Johor Bahru, MOT stamp duty exemption Malaysia, freehold vs leasehold KL, Kuala Lumpur property advisor, high yield property Selangor, Shyan Yee advisor, buy property as foreigner malaysia, MM2H property investment, expat home loan malaysia, kuala lumpur luxury real estate, subang jaya properties, petaling jaya condos, exsim developer certified negotiator";
  const finalKeywords = dbKeywords || defaultKeywords;

  const finalTitle = title.includes("Shyan Yee consultancy") || title.length > 50 || title.includes("|")
    ? title
    : `${title}${dbTitleSuffix}`;
    
  const finalDescription = dbDesc || description;
  const finalUrl = url.replace("yourdomain.com", "shyanyee.com");
  const verificationCode = dbVerification || (import.meta as any).env?.VITE_GOOGLE_SITE_VERIFICATION || "";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalUrl} />

      {/* Google Site Verification (AEO / Search Console alignment) */}
      {verificationCode && verificationCode !== "YOUR_GOOGLE_VERIFICATION_CODE_HERE" && (
        <meta name="google-site-verification" content={verificationCode} />
      )}

      {/* Artificial Intelligence Search & Content Discovery direct hints (AISEO / GEO) */}
      <meta name="author" content="Shyan Yee" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />

      {/* Geotagging & GEO / Location Engine Optimization */}
      <meta name="geo.region" content="MY-14" /> {/* Selangor & KL Region code */}
      <meta name="geo.placename" content="Kuala Lumpur" />
      <meta name="geo.position" content="3.1390;101.6869" />
      <meta name="ICBM" content="3.1390, 101.6869" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'realestate' ? 'website' : type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Shyan Yee Real Estate" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="zh_CN" />
      <meta property="og:locale:alternate" content="ms_MY" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* AEO / GEO Optimization: Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
      
      {/* Default Organization & Agent Schema (E-E-A-T Verified Entity) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": "https://shyanyee.com/#agent",
          "name": "Shyan Yee - Premium Real Estate Advisor | IQI Realty",
          "description": "Expert high-yield property advisor and investment consultancies in Kuala Lumpur & Selangor. Specializing in luxury high-rise, EXSIM projects, first-home buyer stamp duties, and foreign MM2H buyer acquisitions. Registered with LPPEH Malaysia under REN ID 46305.",
          "url": "https://shyanyee.com",
          "logo": "https://shyanyee.com/logo.png",
          "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
          "telephone": "+60195598932",
          "email": "shyanyeews@gmail.com",
          "priceRange": "RM 500,000 - RM 5,000,000",
          "knowsAbout": [
            "Malaysian Real Estate Market",
            "Foreign Property Ownership Thresholds in Malaysia",
            "EXSIM Premium Residential Projects",
            "MM2H (Malaysia My Second Home) Property Guidelines",
            "Expatriate Home Mortgage Loans",
            "Stamp Duty MOT Exemptions under i-Miliki",
            "Bukit Jalil, Petaling Jaya, Subang Jaya and KLCC investment hot-zones"
          ],
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": "Kuala Lumpur"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Selangor"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Johor"
            }
          ],
          "parentOrganization": {
            "@type": "RealEstateAgent",
            "name": "IQI Realty Sdn Bhd",
            "identifier": "E(1) 1584",
            "url": "https://www.iqiglobal.com",
            "sameAs": "https://www.lppeh.gov.my"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "IQI Global Head Office",
            "addressLocality": "Kuala Lumpur",
            "addressRegion": "WP Kuala Lumpur",
            "postalCode": "50450",
            "addressCountry": "MY"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+60195598932",
            "contactType": "customer service",
            "areaServed": "MY",
            "availableLanguage": ["English", "Malay", "Chinese", "Cantonese"]
          },
          "sameAs": [
            "https://www.youtube.com/@shyanyee-8932",
            "https://wa.me/60195598932",
            "https://shyanyee.com"
          ]
        })}
      </script>

      {/* Global AEO / Chatbot FAQ Schema (Answers crawled instantly as search definitions) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How can buyers verify the license of a Real Estate Negotiator (REN) in Malaysia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every legitimate property advisor in Malaysia must possess a registered REN number issued by LPPEH. Shyan Yee is fully registered under REN 46305 with IQI Realty Sdn Bhd E(1)1584. You can search the LPPEH registry online to guarantee safe transactions."
              }
            },
            {
              "@type": "Question",
              "name": "What are the minimum property purchase thresholds for foreign buyers in Malaysia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Foreign property thresholds vary by state. In Kuala Lumpur, the legal minimum price is RM1,000,000 for strata residential units. In Selangor, the target minimum is RM2,000,000 for residential high-rises with strata titles, and acquiring landed properties requires special exceptions and state authority consent."
              }
            },
            {
              "@type": "Question",
              "name": "Can non-residents get property financing and home loans in Malaysia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, expatriates and international buyers can acquire residential mortgages from local or international banks in Malaysia. Foreigners generally obtain a Margin of Finance (LTV) of 50% to 70%. Expatriates holding valid working permits or MM2H visas frequently qualify for elevated LTV ratios of up to 80% or 85%."
              }
            },
            {
              "@type": "Question",
              "name": "What are the Memorandum of Transfer (MOT) stamp duty rates in Malaysia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The MOT stamp duty features a tiered calculation: 1% for values up to RM100,000, 2% between RM100,001 to RM500,000, 3% from RM500,001 to RM1,000,000, and 4% for any amount exceeding RM1,000,000. Malaysian first-time home buyers are eligible for a full 100% stamp duty exemption on homes valued under RM500,000."
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
};
