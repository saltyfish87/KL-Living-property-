import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../hooks/useData';
import { 
  ArrowRight, 
  MapPin, 
  Video, 
  Box, 
  Scale, 
  BookOpen, 
  Search,
  Check,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useLanguage } from '../components/LanguageContext';
import { PropertyFAQ } from '../components/PropertyFAQ';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { projects, posts } = useData();
  const [budget, setBudget] = useState('All');
  const { t } = useLanguage();

  const budgetRanges = [
    { label: 'All Budgets', value: 'All' },
    { label: 'Below RM 500k', value: '500000' },
    { label: 'RM 500k - RM 800k', value: '800000' },
    { label: 'Above RM 800k', value: 'Above' },
  ];

  const handleBudgetSearch = () => {
    navigate(`/projects?budget=${budget}`);
  };

  const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

  return (
    <div className="bg-muji-white min-h-screen font-sans selection:bg-muji-sand selection:text-white">
      <SEO 
        title="Your Personal Real Estate Advisor | Shyan Yee - Portfolio Malaysia"
        description="Providing a personal and simple approach to finding your dream home and investment in Kuala Lumpur and Selangor. Premium real estate guidance by Shyan Yee."
        schemaData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "RealEstateAgent",
              "name": "Shyan Yee - Premium Real Estate Advisor",
              "description": "Expert guidance for premium properties in Central Park Damansara, Damansara, and Kuala Lumpur.",
              "image": "https://picsum.photos/seed/shyan-yee/1200/1200",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kuala Lumpur",
                "addressCountry": "MY"
              },
              "priceRange": "RM 500,000 - RM 5,000,000"
            },
            {
              "@type": "WebSite",
              "name": "Shyan Yee Real Estate",
              "url": "https://shyanyee.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://shyanyee.com/projects?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How can buyers verify the license of a Real Estate Negotiator (REN) to avoid property scams in Malaysia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In Malaysia, all legitimate property advisors must be registered with the Board of Valuers, Appraisers, Estate Agents and Property Managers (LPPEH). You can verify an advisor's license by checking their registered Real Estate Negotiator (REN) ID. For example, Shyan Yee is a fully certified advisor registered under REN 46305 with IQI Realty Sdn Bhd. Sticking to certified negotiators guarantees maximum transparency, ethical conduct, and legal safety throughout your real estate transaction."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why are Bukit Jalil, Subang Jaya, and Petaling Jaya considered high-growth property zones in Selangor/KL?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "These zones command high demand due to seamless transit-oriented developments (Transit-Adjacent Developments / LRT expansion), established tertiary education hubs, robust commercial/retail ecosystems (like Pavilion Bukit Jalil and Sunway Pyramid), and high rental yield potentials. Petaling Jaya and Subang Jaya are mature, high-density residential locales with a strong tenant market of young professionals and students, while Bukit Jalil serves as a modern master-planned technology and leisure enclave, making them prime selections for both capital appreciation and stable yield investments."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the main differences between Freehold and Leasehold properties for buyers in Kuala Lumpur & Selangor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Freehold properties grant perpetual ownership with fewer transfer restrictions, typically holding higher long-term value retention. Leasehold properties in KL/Selangor usually carry a 99-year tenure, meaning buyers may face financing restrictions as the remaining lease drops below 40 years, and require state authority consent for transfers, which can prolong transaction timelines by 3 to 6 months. However, Leasehold properties are often priced 15% to 20% lower than comparable Freehold units in prime urban areas, frequently offering superior lease-associated rental yields."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the latest MOT stamp duty rates and tax exemptions for Malaysian properties?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Memorandum of Transfer (MOT) stamp duty is computed tier-by-tier: 1% for the first RM100,000, 2% for the next RM100,001 to RM500,000, 3% from RM500,001 to RM1,000,000, and 4% for any amount exceeding RM1,000,000. Under Malaysia's ongoing homeownership incentives (such as the i-Miliki initiative), qualified first-time homebuyers receive a complete 100% stamp duty exemption on properties valued under RM500,000 and a partial 75% exemption on properties priced up to RM1,000,000."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is Real Property Gains Tax (RPGT) calculated for property sellers in Malaysia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Governed by the Real Property Gains Tax Act 1976, RPGT is a tax on capital gains from real estate disposal. For individual Malaysian citizens, the RPGT rate is tiered by holding period: 30% if disposed within 3 years, 20% in the 4th year, 15% in the 5th year, and 0% for holding periods of 6 years or more. Malaysian citizens also qualify for a once-in-a-lifetime exemption on private residential properties."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do commercial-titled properties with Serviced Residence status convert to residential utility rates?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Although Serviced Residences are built on commercial land, they are classified under the protective guidelines of the Housing Development Act (HDA) 1966. Owners can submit digital tariff change applications through the portal of Tenaga Nasional Berhad (TNB) and state water companies like Air Selangor. Declaring residential occupancy successfully converts the power billing tariff from commercial category to domestic category, yielding average monthly utility savings of 30% to 50%."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What tax obligations and recurring fees should property owners budget for in Kuala Lumpur and Selangor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Owners must budget for annual Quit Rent (Cukai Tanah) or Parcel Rent, biannual Assessment Rates (Cukai Pintu) levied by local municipal councils (such as DBKL, MBPJ, or MBSJ), monthly maintenance fees and sinking funds for stratified developments, and Sewage/Water tariffs. For leased units, Landlord Income Tax is computed at tiered individual income rates up to 30% for residents, or a flat 30% for non-resident foreign investors on net rental income after deducting allowable expenses like interest on mortgage, repair costs, and fire insurance."
                  }
                }
              ]
            }
          ]
        }}
      />

      {/* Stunning KLCC Banner Hero with premium eager-loaded background and high-performance night city fallback */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center section-padding overflow-hidden select-none bg-neutral-950">
        {/* Background KLCC image optimized with eager loading, aligned right to show towers clearly */}
        <img 
          src="https://lh3.googleusercontent.com/d/1Y0LHC2jEyfqVOlmNRPXZJVSeH4s4S0YC" 
          alt="Kuala Lumpur Skyline and KLCC Twin Towers at Night"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none object-center md:object-[68%_center] animate-fade-in"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1596422846543-75c6fc18a523?auto=format&fit=crop&q=80&w=2000";
          }}
        />

        {/* Soft luxury linear gradient overlay to make text highly legible while celebrating the vibrant city lights */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/45 to-transparent z-20 pointer-events-none hidden md:block" />
        <div className="absolute inset-0 bg-neutral-950/60 z-20 pointer-events-none md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-black/20 z-20 pointer-events-none" />

        <div className="container-custom relative z-30 w-full flex justify-center md:justify-start">
          <div className="max-w-xl pl-0 md:pl-4 relative flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="inline-flex items-center gap-2.5 mb-5 bg-muji-sand px-3 py-1.5 rounded-sm shadow-md border border-white/10 select-none">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] drop-shadow-sm">
                  {t('hero.badge')}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-extrabold leading-tight tracking-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-lg">
                {t('hero.title')}<br />
                <span className="instagram-gradient-text italic font-black">{t('hero.subtitle')}</span>
              </h1>
              <p className="text-white max-w-md text-xs sm:text-sm font-normal leading-relaxed mb-6 font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] bg-neutral-950/35 backdrop-blur-xs p-3.5 sm:p-4 border border-white/10 rounded-lg text-center md:text-left">
                {t('hero.desc')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 w-full sm:w-auto font-bold">
                <Link to="/projects" className="w-full sm:w-auto text-center instagram-gradient-bg text-white hover:opacity-90 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl rounded-xl flex items-center justify-center gap-3 cursor-pointer">
                  {t('hero.btn.portfolio')} <ArrowRight size={14} />
                </Link>
                <Link to="/contact" className="w-full sm:w-auto text-center bg-white text-black hover:bg-neutral-100 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl rounded-xl cursor-pointer">
                  {t('hero.btn.consult')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Budget Search & Quick Tools */}
      <section className="bg-white border-y border-muji-border py-12">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Budget Filter */}
            <div className="w-full lg:w-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-6">Quick Budget Search</p>
              <div className="flex flex-wrap gap-4">
                {budgetRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setBudget(range.value)}
                    className={cn(
                      "px-6 py-3 text-xs font-medium border transition-all rounded-sm cursor-pointer",
                      budget === range.value 
                        ? "bg-muji-sand text-white border-muji-sand font-bold" 
                        : "border-muji-border text-muji-text-muted hover:border-muji-oak"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
                <button 
                  onClick={handleBudgetSearch}
                  className="bg-muji-oak text-white px-8 py-3 rounded-sm text-xs font-bold uppercase hover:bg-muji-sand transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Search <Search size={14} />
                </button>
              </div>
            </div>

            {/* View Tools */}
            <div className="w-full lg:w-auto border-l lg:border-l-0 lg:pl-12 border-muji-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-6">Explore Facilities</p>
              <div className="flex flex-wrap gap-8">
                <Link to="/projects?view=drone" className="group flex items-center gap-3 text-muji-text hover:text-muji-oak transition-colors">
                  <div className="w-10 h-10 rounded-full bg-muji-beige flex items-center justify-center group-hover:bg-muji-sand transition-colors">
                    <Video size={18} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider">Drone View</span>
                </Link>
                <Link to="/projects?view=showroom" className="group flex items-center gap-3 text-muji-text hover:text-muji-oak transition-colors">
                  <div className="w-10 h-10 rounded-full bg-muji-beige flex items-center justify-center group-hover:bg-muji-sand transition-colors">
                    <Box size={18} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider">Showroom</span>
                </Link>
                <Link 
                  to="/compare"
                  className="group flex items-center gap-3 text-muji-text hover:text-muji-oak transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muji-beige flex items-center justify-center group-hover:bg-muji-sand transition-colors">
                    <Scale size={18} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider">Compare Tools</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Profile Section (Shyan Yee) */}
      <section className="bg-muji-beige section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="relative order-2 lg:order-1">
                <div className="absolute -left-12 -top-12 w-64 h-64 bg-muji-sand/20 rounded-full blur-3xl" />
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <img 
                    src="https://lh3.googleusercontent.com/d/1Ye4kWT3sk3ICh8FdDzUWY6hAm1CmUUgH" 
                    alt="Shyan Yee Profile" 
                    className="w-full aspect-[4/5] object-cover rounded-sm border-8 border-neutral-900 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-neutral-950 border-2 border-muji-sand text-white p-8 rounded-sm shadow-2xl hidden md:block">
                    <p className="text-3xl font-sans font-extrabold mb-2 text-white tracking-tight">Shyan Yee</p>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#FFF0E2] bg-muji-sand px-3 py-1 rounded-xs inline-block">
                      REN 46305 | IQI Realty
                    </p>
                  </div>
                </motion.div>
             </div>
             
             <div className="order-1 lg:order-2">
                <span className="text-muji-oak text-[10px] font-bold uppercase tracking-widest block mb-6">{t('profile.badge')}</span>
                <h2 className="text-4xl md:text-6xl font-sans font-extrabold text-muji-text leading-tight mb-8">
                  {t('profile.title')} <br />
                  <span className="text-muji-oak text-3xl md:text-4xl">{t('hero.subtitle')}</span>
                </h2>
                <div className="space-y-6 text-muji-text-muted text-lg font-normal leading-relaxed mb-12">
                   <p>
                     {t('profile.desc1')}
                   </p>
                   <p>
                     {t('profile.desc2')}
                   </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                   <div className="flex items-start gap-4">
                      <Check className="text-muji-oak w-5 h-5 mt-1" />
                      <p className="text-sm font-medium">8+ Years Local Experience</p>
                   </div>
                   <div className="flex items-start gap-4">
                      <Check className="text-muji-oak w-5 h-5 mt-1" />
                      <p className="text-sm font-medium">500+ Homes Handled</p>
                   </div>
                   <div className="flex items-start gap-4">
                      <Check className="text-muji-oak w-5 h-5 mt-1" />
                      <p className="text-sm font-medium">Transparency as Priority</p>
                   </div>
                   <div className="flex items-start gap-4">
                      <Check className="text-muji-oak w-5 h-5 mt-1" />
                      <p className="text-sm font-medium">Post-Purchase Support</p>
                   </div>
                </div>
                
                <a href="https://wa.me/60195598932" className="bg-muji-oak text-white px-8 py-3 rounded-lg hover:opacity-90 hover:scale-[1.01] transition-all duration-300 font-semibold text-xs tracking-wider active:scale-95 inline-flex items-center gap-3">
                  {t('profile.btn.contact')} <ArrowRight size={16} />
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* Simplified Featured Projects */}
      <section className="section-padding bg-muji-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-16 px-2 border-b border-muji-border pb-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-muji-text">Featured Homes</h2>
              <p className="text-muji-text-muted mt-2">Carefully selected developments for you.</p>
            </div>
            <Link to="/projects" className="text-muji-text-muted hover:text-muji-oak transition-colors flex items-center gap-2 text-sm font-medium">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="group relative">
                <Link to={`/projects/${project.area.toLowerCase().replace(/\s+/g, '-')}/${project.slug}`}>
                  <div className="aspect-square overflow-hidden mb-6 rounded-sm muji-card">
                    <img 
                      src={project.thumbnail} 
                      alt={project.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
                
                <div className="px-1">
                  <div className="flex items-center gap-2 text-muji-oak text-[10px] font-semibold uppercase tracking-wide mb-2">
                    <MapPin size={10} /> {project.area}
                  </div>
                  <Link to={`/projects/${project.area.toLowerCase().replace(/\s+/g, '-')}/${project.slug}`}>
                    <h3 className="text-2xl font-serif text-muji-text mb-3 group-hover:text-muji-oak transition-colors">
                      {project.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-4 text-[11px] text-muji-text-muted uppercase tracking-wider font-mono border-b border-muji-border/40 pb-3 mb-2">
                    <span>Size: {project.sizeSqft}</span>
                    <span>•</span>
                    <span>{project.rooms}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm font-semibold text-muji-text">From RM {project.minPrice.toLocaleString()}</p>
                    <span className="text-xs uppercase font-bold text-muji-sand">{project.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <Link to="/compare" className="text-sm font-black uppercase tracking-widest text-muji-oak hover:text-muji-text transition-colors flex items-center justify-center gap-3 group">
                Want to compare these side-by-side? <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* Buyer Guides & Insights */}
      <section className="section-padding bg-muji-beige">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
             <div className="text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-3xl md:text-5xl font-serif text-muji-text mb-4">Buyer Guides</h2>
                <p className="text-muji-text-muted">Personal insights for your property decisions.</p>
             </div>
             <Link to="/blog" className="muji-button-secondary bg-white">
                View All Guides <BookOpen size={14} className="ml-2 inline" />
             </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {posts.slice(0, 3).map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="group flex flex-col h-full">
                <div className="bg-white p-10 muji-card flex-grow group-hover:border-muji-oak transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-4 block">{post.category}</span>
                  <h3 className="text-2xl font-serif text-muji-text mb-6 group-hover:text-muji-oak transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muji-text-muted text-sm font-normal leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-muji-border text-[10px] font-bold uppercase tracking-widest text-muji-sand">
                    {post.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-padding bg-white border-t border-muji-border" id="buyer-faq-section">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 text-muji-oak text-[10px] font-semibold uppercase tracking-wide mb-3">
                <HelpCircle size={12} /> Knowledge Base
             </div>
             <h2 className="text-3xl md:text-5xl font-serif text-muji-text mb-4">Investment & Legal FAQ</h2>
             <p className="text-muji-text-muted">Direct, transparent answers regarding luxury property investment, financing, and legal processes in Malaysia.</p>
          </div>
          
          <PropertyFAQ />
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="section-padding bg-muji-white relative overflow-hidden">
        <div className="container-custom relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-sans text-muji-text font-extrabold leading-tight mb-8">
              Let's find your <br />
              <span className="text-muji-sand">new beginning</span>.
            </h2>
            <p className="text-muji-text-muted mb-12 text-lg font-normal leading-relaxed">
              I am Shyan Yee, available for a friendly chat or a private consultation to discuss your property needs in Malaysia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact" className="bg-muji-oak text-white px-8 py-3 rounded-lg hover:opacity-90 hover:scale-[1.01] transition-all duration-300 font-semibold text-xs tracking-wider active:scale-95 w-full sm:w-auto text-center font-bold">
                Book a Consultation
              </Link>
              <a href="https://wa.me/60195598932" className="muji-button-secondary w-full sm:w-auto flex items-center justify-center gap-3">
                WhatsApp Me
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
