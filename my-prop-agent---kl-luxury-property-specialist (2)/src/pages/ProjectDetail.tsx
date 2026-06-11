import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { 
  MapPin, 
  Check, 
  MessageCircle,
  Info,
  Maximize2,
  Map as MapIcon,
  Layout,
  Image as ImageIcon,
  Calculator,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FolderOpen,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProjectBySlug, loading } = useData();
  const project = getProjectBySlug(slug || '');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muji-white">
        <div className="w-8 h-8 border-2 border-muji-oak border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) return <Navigate to="/projects" />;

  return <ProjectDetailInner project={project} />;
};

interface ProjectDetailInnerProps {
  project: NonNullable<ReturnType<typeof useData>['getProjectBySlug']>;
}

const ProjectDetailInner: React.FC<ProjectDetailInnerProps> = ({ project }) => {
  const { projects } = useData();
  const whatsappNumber = '60195598932';
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in viewing ${project.name}. Could you share more details?`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const otherProjects = React.useMemo(() => {
    return projects.filter(p => p.id !== project.id);
  }, [projects, project.id]);

  const [sliderIndex, setSliderIndex] = React.useState(0);

  React.useEffect(() => {
    if (otherProjects.length === 0) return;
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % otherProjects.length);
    }, 3000); // 3 second sliding interval
    return () => clearInterval(timer);
  }, [otherProjects.length]);

  // Gallery images memo for unifying lightbox index mapping
  const galleryImages = React.useMemo(() => {
    if (project.galleryItems && project.galleryItems.length > 0) {
      return project.galleryItems.map(item => ({
        url: item.url,
        description: item.description || ''
      }));
    }
    const fallback = project.gallery || [project.thumbnail];
    return fallback.map(img => {
      if (typeof img === 'string') {
        return { url: img, description: '' };
      }
      return { url: img.url, description: img.description || '' };
    });
  }, [project]);

  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const [activeStandaloneImage, setActiveStandaloneImage] = React.useState<{ url: string; title: string } | null>(null);
  const [zoomScale, setZoomScale] = React.useState<number>(1);

  // Keyboard navigation for Lightbox full-screen view
  React.useEffect(() => {
    if (lightboxIndex === null && activeStandaloneImage === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setActiveStandaloneImage(null);
        setZoomScale(1);
      } else if (lightboxIndex !== null && e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
        setZoomScale(1);
      } else if (lightboxIndex !== null && e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
        setZoomScale(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeStandaloneImage, galleryImages.length]);

  // Loan Calculation States - initialized with project values
  const [calcPrice, setCalcPrice] = React.useState<number>(project.minPrice);
  const [downpaymentPercent, setDownpaymentPercent] = React.useState<number>(10);
  const [interestRate, setInterestRate] = React.useState<number>(4.15); // Malaysian standard rate
  const [loanTenure, setLoanTenure] = React.useState<number>(30); // standard 30 years

  React.useEffect(() => {
    setCalcPrice(project.minPrice);
  }, [project.id, project.minPrice]);

  const downpaymentAmount = Math.round((calcPrice * downpaymentPercent) / 100);
  const loanAmount = calcPrice - downpaymentAmount;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenure * 12;

  let monthlyInstallment = 0;
  if (monthlyRate > 0) {
    monthlyInstallment = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  } else {
    monthlyInstallment = Math.round(loanAmount / totalMonths);
  }

  const totalRepayment = monthlyInstallment * totalMonths;
  const totalInterest = totalRepayment - loanAmount;

  const loanPercentOfTotal = Math.round((loanAmount / totalRepayment) * 100) || 0;
  const interestPercentOfTotal = Math.round((totalInterest / totalRepayment) * 100) || 0;

  const calcWhatsappMessage = encodeURIComponent(
    `Hi Shyan Yee, I used the loan calculator for ${project.name} on your website. ` +
    `For a property price of RM ${calcPrice.toLocaleString()}, down payment ${downpaymentPercent}% (RM ${downpaymentAmount.toLocaleString()}), ` +
    `interest rate ${interestRate}%, and tenure ${loanTenure} years, my estimated monthly installment is RM ${monthlyInstallment.toLocaleString()}. ` +
    `Can you advise if I qualify for this loan?`
  );
  const calcWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${calcWhatsappMessage}`;

  return (
    <div className="pt-20 bg-muji-white font-sans selection:bg-muji-sand selection:text-white">
      <SEO 
        title={`${project.name} | ${project.developer} Development in ${project.area}`}
        description={`${project.overview} - Exclusive ${project.propertyType} from RM ${project.minPrice.toLocaleString()}. Located in ${project.area}, ${project.developer} group development.`}
        image={project.thumbnail}
        type="realestate"
        schemaData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Product",
              "@id": `https://shyanyee.com/projects/${project.area.toLowerCase().replace(/\s+/g, '-')}/${project.slug}#product`,
              "name": project.name,
              "image": project.thumbnail,
              "description": project.overview,
              "sku": project.slug,
              "brand": {
                "@type": "Brand",
                "name": project.developer || "IQI Realty"
              },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "MYR",
                "lowPrice": project.minPrice,
                "price": project.minPrice,
                "offerCount": project.totalUnits || "100",
                "availability": "https://schema.org/InStock",
                "url": `https://shyanyee.com/projects/${project.area.toLowerCase().replace(/\s+/g, '-')}/${project.slug}`,
                "seller": {
                  "@type": "RealEstateAgent",
                  "name": "Shyan Yee - Premium Real Estate Advisor | IQI Realty",
                  "telephone": "+60195598932",
                  "url": "https://shyanyee.com"
                }
              }
            },
            {
              "@type": "RealEstateAgent",
              "@id": "https://shyanyee.com/#agent",
              "name": "Shyan Yee - Premium Real Estate Advisor | IQI Realty",
              "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
              "telephone": "+60195598932",
              "email": "shyanyeews@gmail.com",
              "priceRange": "RM 500,000 - RM 2,000,000",
              "url": "https://shyanyee.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Level 20, Menara Pavilion, 168 Jalan Raja Chulan, Bukit Bintang",
                "addressLocality": "Kuala Lumpur",
                "postalCode": "55100",
                "addressCountry": "MY"
              },
              "parentOrganization": {
                "@type": "RealEstateAgent",
                "name": "IQI Realty Sdn Bhd",
                "identifier": "E(1) 1584"
              }
            },
            {
              "@type": "RealEstateListing",
              "@id": `https://shyanyee.com/projects/${project.area.toLowerCase().replace(/\s+/g, '-')}/${project.slug}#listing`,
              "name": project.name,
              "description": project.overview,
              "url": `https://shyanyee.com/projects/${project.area.toLowerCase().replace(/\s+/g, '-')}/${project.slug}`,
              "image": project.thumbnail,
              "datePosted": "2024-01-01",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "MYR",
                "price": project.minPrice,
                "availability": "https://schema.org/InStock"
              }
            },
            {
              "@type": "Accommodation",
              "name": project.name,
              "description": project.tagline,
              "numberOfRooms": project.rooms,
              "floorSize": {
                "@type": "QuantitativeValue",
                "value": parseInt(project.sizeSqft.split('-')[0].replace(',','')),
                "unitCode": "FTK"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": project.area,
                "addressCountry": "MY"
              }
            },
            {
               "@type": "BreadcrumbList",
               "itemListElement": [
                 {
                   "@type": "ListItem",
                   "position": 1,
                   "name": "Home",
                   "item": "https://shyanyee.com"
                 },
                 {
                   "@type": "ListItem",
                   "position": 2,
                   "name": "Projects",
                   "item": "https://shyanyee.com/projects"
                 },
                 {
                   "@type": "ListItem",
                   "position": 3,
                   "name": project.area,
                   "item": `https://shyanyee.com/areas/${project.area.toLowerCase().replace(/\s+/g, '-')}`
                 },
                 {
                   "@type": "ListItem",
                   "position": 4,
                   "name": project.name
                 }
               ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": project.keyFeatures.slice(0, 3).map(feature => ({
                "@type": "Question",
                "name": `What is a key feature of ${project.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": feature
                }
              }))
            }
          ]
        }}
      />

      {/* Hero Section */}
      <section className="bg-muji-white border-b border-muji-border">
        <div className="container-custom py-12 md:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="order-2 lg:order-1"
            >
              {/* Tower Switcher for Causewayz Square Towers */}
              {project.slug.startsWith('causewayz-') && (
                <div id="causewayz-tower-tabs" className="mb-10 p-1.5 bg-muji-beige rounded-sm inline-flex flex-wrap gap-1 border border-muji-border/40 select-none">
                  <Link 
                    id="causewayz-axis-tab"
                    to="/projects/johor-bahru/causewayz-axis"
                    className={cn(
                      "px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-xs transition-all",
                      project.slug === 'causewayz-axis' 
                        ? "bg-muji-oak text-white shadow-xs"
                        : "text-muji-text-muted hover:text-neutral-900"
                    )}
                  >
                    Axis (SOHO)
                  </Link>
                  <Link 
                    id="causewayz-brixton-tab"
                    to="/projects/johor-bahru/causewayz-brixton"
                    className={cn(
                      "px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-xs transition-all",
                      project.slug === 'causewayz-brixton' 
                        ? "bg-muji-sand text-white shadow-xs"
                        : "text-muji-text-muted hover:text-neutral-900"
                    )}
                  >
                    Brixton (Wellness)
                  </Link>
                  <Link 
                    id="causewayz-dover-tab"
                    to="/projects/johor-bahru/causewayz-dover"
                    className={cn(
                      "px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-xs transition-all",
                      project.slug === 'causewayz-dover' 
                        ? "bg-[#D45D12] text-white shadow-xs"
                        : "text-muji-text-muted hover:text-neutral-900"
                    )}
                  >
                    Dover (Dual-Key)
                  </Link>
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <span className="bg-muji-beige text-muji-text-muted px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-sm underline underline-offset-4 decoration-muji-sand">
                  {project.status}
                </span>
                <span className="text-muji-oak text-[10px] font-bold uppercase tracking-wider">
                  {project.developer} Development
                </span>
                {(project.overview.toLowerCase().includes('pet-friendly') || project.tagline.toLowerCase().includes('pet') || project.keyFeatures.some(f => f.toLowerCase().includes('pet'))) && (
                  <span className="bg-muji-sand/20 text-muji-oak px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-muji-oak rounded-full" /> Pet-Friendly Living
                  </span>
                )}
              </div>
              
              <h1 className="text-5xl md:text-8xl font-sans font-extrabold text-muji-text leading-tight tracking-title mb-8">
                {project.name}
              </h1>
              
              <p className="text-muji-text-muted text-xl font-normal leading-relaxed mb-12">
                "{project.tagline}"
              </p>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-muji-border">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muji-text-muted mb-2">Price From</p>
                  <p className="text-3xl font-sans font-bold text-muji-text">RM {project.minPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muji-text-muted mb-2">Property Type</p>
                  <p className="text-3xl font-sans font-bold text-muji-text truncate">{project.propertyType}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muji-text-muted mb-2">Size</p>
                  <p className="text-3xl font-serif text-muji-text">{project.sizeSqft} <span className="text-sm font-sans font-normal">sqft</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muji-text-muted mb-2">Bedrooms</p>
                  <p className="text-3xl font-serif text-muji-text">{project.rooms} <span className="text-sm font-sans font-normal">Rooms</span></p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="order-1 lg:order-2 muji-card overflow-hidden"
            >
              <img 
                src={project.thumbnail} 
                alt={project.name} 
                className="w-full aspect-square object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media Shortcuts */}
      <section className="bg-white border-b border-muji-border py-6 sticky top-20 z-20">
         <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-10">
               <a href="#gallery" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muji-text-muted hover:text-muji-oak transition-colors">
                  <ImageIcon size={14} /> Photo Gallery
               </a>
               <a href="#layouts" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muji-text-muted hover:text-muji-oak transition-colors">
                  <Layout size={14} /> Floor Plans
               </a>
               <a href="#location" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muji-text-muted hover:text-muji-oak transition-colors">
                  <MapIcon size={14} /> Location Map
               </a>
               <a href="#amenities" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muji-text-muted hover:text-muji-oak transition-colors">
                  <MapPin size={14} /> Nearby Amenities
               </a>
               <a href="#calculator" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muji-text-muted hover:text-muji-oak transition-colors">
                  <Calculator size={14} /> Loan Calculator
               </a>
               {project.droneViewUrl && (
                  <a href={project.droneViewUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muji-oak hover:text-muji-text transition-colors">
                     <Maximize2 size={14} /> Drone View
                  </a>
               )}
               {project.virtualTourUrl && (
                  <a href={project.virtualTourUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muji-sand hover:text-muji-text transition-colors font-semibold">
                     <Maximize2 size={14} /> VR Virtual Tour
                  </a>
               )}
               {(project.salesKitUrl || project.brochureUrl || project.summaryUrl) && (
                  <a href="#documents" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D45D12] hover:text-muji-text transition-colors font-semibold">
                     <FolderOpen size={14} /> Documents
                  </a>
               )}
            </div>
         </div>
      </section>

      {/* Main Content Area */}
      <section className="section-padding bg-muji-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              {/* About Section */}
              <div className="mb-24">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-8 h-px bg-muji-oak" />
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak">Overview</h2>
                </div>
                <div className="text-muji-text text-xl font-normal leading-relaxed mb-12 font-serif italic">
                  {project.overview}
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="p-10 bg-muji-beige border-l-4 border-muji-oak rounded-sm">
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-3">
                      <Check className="w-5 h-5 text-muji-oak" /> Unique Features
                    </h3>
                    <ul className="space-y-4">
                      {project.keyFeatures.map((f, i) => (
                        <li key={i} className="text-sm text-muji-text-muted font-normal flex items-start gap-3">
                           <span className="w-1.5 h-1.5 bg-muji-oak rounded-full mt-1.5 shrink-0" />
                           {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-10 border border-muji-border bg-white rounded-sm">
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-3">
                       <Info className="w-5 h-5 text-muji-oak" /> Property Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-muji-beige">
                        <span className="text-[10px] uppercase font-semibold text-muji-text-muted tracking-wider">Property Type</span>
                        <span className="text-xs font-semibold">{project.propertyType} {project.commercialTitle && '(Commercial Title)'}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-muji-beige">
                        <span className="text-[10px] uppercase font-semibold text-muji-text-muted tracking-wide">Tenure</span>
                        <span className="text-xs font-semibold">{project.tenure}</span>
                      </div>
                      {project.landSize && (
                        <div className="flex justify-between items-center py-3 border-b border-muji-beige">
                          <span className="text-[10px] uppercase font-semibold text-muji-text-muted tracking-wide">Land Size</span>
                          <span className="text-xs font-semibold">{project.landSize}</span>
                        </div>
                      )}
                      {project.towerCount && (
                        <div className="flex justify-between items-center py-3 border-b border-muji-beige">
                          <span className="text-[10px] uppercase font-semibold text-muji-text-muted tracking-wide">Structure</span>
                          <span className="text-xs font-semibold">{project.towerCount} ({project.floorCount})</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-3 border-b border-muji-beige">
                        <span className="text-[10px] uppercase font-semibold text-muji-text-muted tracking-wide">Completion</span>
                        <span className="text-xs font-semibold">{project.completionYear} (Est)</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-muji-beige">
                        <span className="text-[10px] uppercase font-semibold text-muji-text-muted tracking-wide">Total Units</span>
                        <span className="text-xs font-semibold">{project.totalUnits} Units</span>
                      </div>
                      {project.maintenanceFee && (
                        <div className="flex justify-between items-center py-3">
                          <span className="text-[10px] uppercase font-semibold text-muji-text-muted tracking-wide">Maint. Fee</span>
                          <span className="text-xs font-semibold">{project.maintenanceFee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents & Resources */}
              {(project.salesKitUrl || project.brochureUrl || project.summaryUrl) && (
                <div id="documents" className="mb-24 scroll-mt-32">
                  <div className="flex items-center gap-3 mb-10">
                     <div className="w-8 h-px bg-muji-oak" />
                     <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak">Resources & Documents</h2>
                  </div>
                  <div className="p-8 md:p-10 bg-white border border-muji-border rounded-sm">
                    <p className="text-xs text-muji-text-muted mb-8 leading-relaxed font-sans">
                      Official marketing kits, design documentation, maps, and dynamic files for <strong>{project.name}</strong> can be requested or downloaded directly below.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.salesKitUrl && (
                        <a 
                          href={project.salesKitUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-4 p-5 bg-[#FAF9F6] border border-muji-border rounded-sm hover:border-muji-sand hover:shadow-md transition-all group cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full bg-muji-beige text-muji-sand flex items-center justify-center shrink-0 group-hover:bg-muji-sand group-hover:text-white transition-all">
                            <FolderOpen size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-muji-text tracking-wide group-hover:text-muji-sand transition-colors uppercase">Drive Folder</p>
                            <p className="text-[10px] text-muji-text-muted font-mono tracking-wider">All project files</p>
                          </div>
                        </a>
                      )}
                      {project.brochureUrl && (
                        <a 
                          href={project.brochureUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-4 p-5 bg-[#FAF9F6] border border-muji-border rounded-sm hover:border-muji-sand hover:shadow-md transition-all group cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full bg-muji-beige text-muji-sand flex items-center justify-center shrink-0 group-hover:bg-muji-sand group-hover:text-white transition-all">
                            <ExternalLink size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-muji-text tracking-wide group-hover:text-muji-sand transition-colors uppercase">Sales Brochure</p>
                            <p className="text-[10px] text-muji-text-muted font-mono tracking-wider">Official Sales Kit</p>
                          </div>
                        </a>
                      )}
                      {project.summaryUrl && (
                        <a 
                          href={project.summaryUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-4 p-5 bg-[#FAF9F6] border border-muji-border rounded-sm hover:border-muji-sand hover:shadow-md transition-all group cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full bg-muji-beige text-muji-sand flex items-center justify-center shrink-0 group-hover:bg-muji-sand group-hover:text-white transition-all">
                            <ExternalLink size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-muji-text tracking-wide group-hover:text-muji-sand transition-colors uppercase">Quick Summary</p>
                            <p className="text-[10px] text-muji-text-muted font-mono tracking-wider">Key facts sheet</p>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Photo Gallery */}
              <div id="gallery" className="mb-24 scroll-mt-32">
                <div className="flex items-center gap-3 mb-10">
                   <div className="w-8 h-px bg-muji-oak" />
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak">Photo Gallery</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        setLightboxIndex(i);
                        setZoomScale(1);
                      }}
                      className={cn(
                        "relative overflow-hidden rounded-sm muji-card group cursor-zoom-in aspect-[4/3] md:aspect-[16/10]",
                        i === 0 && "col-span-2 aspect-[16/9] md:aspect-[21/9]"
                      )}
                    >
                      <img 
                        src={item.url} 
                        alt={`Gallery ${i}`} 
                        className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all hover:scale-105 duration-700 select-none" 
                        referrerPolicy="no-referrer"
                      />
                      {/* Premium hover overlay indicator with Maximize2 icon */}
                      <div className="absolute inset-x-0 bottom-0 top-0 bg-neutral-950/35 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-neutral-950/70 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xs backdrop-blur-md flex items-center gap-2 border border-white/10 shadow-xl scale-95 group-hover:scale-100 transition-transform duration-300">
                          <Maximize2 size={11} className="text-muji-sand animate-pulse" /> Inspect Features
                        </div>
                      </div>
                      {item.description && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950/80 to-transparent p-5 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                          <p className="text-white text-xs font-semibold tracking-wide">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Layout Plans */}
              <div id="layouts" className="mb-24 scroll-mt-32">
                <div className="flex items-center gap-3 mb-10">
                   <div className="w-8 h-px bg-muji-oak" />
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak">Available Layouts</h2>
                </div>

                {project.masterPlanImageUrl && (
                  <div className="mb-14 p-6 md:p-10 bg-[#fbfbfa] rounded-sm border border-muji-border shadow-sm group">
                    <div className="grid md:grid-cols-5 gap-10 items-center">
                      <div className="md:col-span-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-3 block">Overall Architecture</span>
                        <h3 className="text-2xl font-serif text-muji-text mb-4">Master Layout Plan</h3>
                        <p className="text-xs text-muji-text-muted leading-relaxed mb-6 font-normal">
                          Explore the comprehensive layout scheme and building positioning. This master plan highlights the integrated design, 5-acre central park connection, facility accessibility, and transit integration.
                        </p>
                        <button
                          onClick={() => {
                            setActiveStandaloneImage({ url: project.masterPlanImageUrl!, title: `${project.name} - Master Layout Plan` });
                            setZoomScale(1);
                          }}
                          className="bg-neutral-900 text-white px-6 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-muji-oak transition-all inline-block"
                        >
                          View Full Master Plan
                        </button>
                      </div>
                      <div 
                        className="md:col-span-3 bg-muji-beige p-4 rounded-sm border border-muji-sand/30 flex items-center justify-center cursor-zoom-in relative select-none group-hover:border-muji-oak/35 transition-colors"
                        title="Click to zoom / inspect master plan"
                        onClick={() => {
                          setActiveStandaloneImage({ url: project.masterPlanImageUrl!, title: `${project.name} - Master Layout Plan` });
                          setZoomScale(1);
                        }}
                      >
                        <img 
                          src={project.masterPlanImageUrl} 
                          alt={`${project.name} Master Layout Plan`} 
                          className="w-full h-auto max-h-[280px] object-contain bg-white p-3 shadow-muji-sand/10 shadow-md group-hover:scale-[1.02] transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-3 right-3 bg-neutral-900/80 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <Maximize2 size={10} /> Zoom Master Plan
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-16">
                  {project.layouts && project.layouts.length > 0 ? (
                    project.layouts.map((layout) => (
                      <div key={layout.id} className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-sm border border-muji-border shadow-sm group">
                        <div className="order-2 md:order-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-4 block">Unit Layout</span>
                          <h3 className="text-3xl font-sans font-bold text-muji-text mb-2">{layout.name}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-muji-text-muted text-xs mb-6">
                            <span className="font-semibold text-muji-text">{layout.size}</span>
                            <span className="w-1 h-1 bg-muji-sand rounded-full" />
                            <span>{layout.rooms}</span>
                            {layout.price && (
                              <>
                                <span className="w-1 h-1 bg-muji-sand rounded-full" />
                                <span className="text-muji-oak font-bold uppercase font-mono">{layout.price}</span>
                              </>
                            )}
                          </div>
                          {layout.description && (
                            <p className="text-xs text-muji-text-muted leading-relaxed mb-6 font-normal max-w-md">
                              {layout.description}
                            </p>
                          )}
                          <a 
                            href={whatsappUrl} 
                            className="bg-muji-white border border-muji-border px-6 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-muji-text hover:text-white transition-all inline-block hover:border-muji-sand"
                          >
                            Check Availability
                          </a>
                        </div>
                        <div 
                          className="order-1 md:order-2 bg-muji-beige p-6 rounded-sm border border-muji-sand/30 flex items-center justify-center cursor-zoom-in relative select-none group-hover:border-muji-oak/35 transition-colors"
                          title="Click to zoom / inspect floor plan"
                          onClick={() => {
                            setActiveStandaloneImage({ url: layout.imageUrl, title: `${layout.name} Floor Plan (${layout.size})` });
                            setZoomScale(1);
                          }}
                        >
                          <img 
                            src={layout.imageUrl} 
                            alt={`${layout.name} Floor Plan`} 
                            className="w-full h-auto max-h-[320px] object-contain bg-white p-4 shadow-muji-sand/10 shadow-lg group-hover:scale-[1.03] transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-3 right-3 bg-neutral-900/80 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <Maximize2 size={10} /> Zoom View
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-muji-beige p-12 text-center rounded-sm border border-muji-border">
                       <p className="text-muji-text-muted font-normal text-sm">Detailed layout plans are available upon request.</p>
                       <a href={whatsappUrl} className="mt-6 inline-block text-muji-oak text-[10px] font-bold uppercase border-b border-muji-oak">Request PDF Brochure</a>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Map */}
              <div id="location" className="mb-24 scroll-mt-32">
                <div className="flex items-center gap-3 mb-10">
                   <div className="w-8 h-px bg-muji-oak" />
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak">Strategic Location</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div 
                    className="lg:col-span-7 rounded-sm overflow-hidden border border-muji-border bg-white flex items-center justify-center cursor-zoom-in relative select-none group hover:border-muji-oak/35 transition-colors shadow-sm"
                    title="Click to zoom / inspect location map"
                    onClick={() => {
                      setActiveStandaloneImage({
                        url: project.mapImageUrl || 'https://picsum.photos/seed/placeholder-map/1200/800',
                        title: `${project.name} Strategic Location Map`
                      });
                      setZoomScale(1);
                    }}
                  >
                    <img 
                      src={project.mapImageUrl || 'https://picsum.photos/seed/placeholder-map/1200/800'} 
                      alt="Location Map" 
                      className="w-full h-auto max-h-[420px] object-contain grayscale-[0.1] brightness-95 transition-all duration-700 group-hover:scale-[1.01]" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 right-4 bg-neutral-900/80 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-sm">
                      <Maximize2 size={10} /> Zoom Map
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex">
                    <div className="bg-white p-6 md:p-10 shadow-sm w-full rounded-sm border border-muji-border flex flex-col justify-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-6">Location Highlights</p>
                      <div className="space-y-5">
                        {project.locationAdvantage.map((adv, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <MapPin className="w-4 h-4 text-muji-sand mt-0.5 shrink-0" />
                            <span className="text-xs font-normal text-muji-text-muted leading-relaxed">{adv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Nearby Amenities */}
              <div id="amenities" className="mb-24 scroll-mt-32">
                <div className="flex items-center gap-3 mb-10">
                   <div className="w-8 h-px bg-muji-oak" />
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak">Nearby Amenities</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.nearbyAmenities && project.nearbyAmenities.length > 0 ? (
                    project.nearbyAmenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-4 p-6 bg-white border border-muji-border rounded-sm hover:border-muji-oak transition-colors group">
                        <div className="w-10 h-10 bg-muji-beige rounded-full flex items-center justify-center text-muji-oak shrink-0 group-hover:bg-muji-oak group-hover:text-white transition-colors">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muji-text tracking-wide">{amenity.name}</p>
                          <p className="text-[10px] text-muji-text-muted font-medium uppercase tracking-widest">{amenity.distance}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muji-text-muted italic">No nearby amenities information available.</p>
                  )}
                </div>
              </div>

              {/* Stateful Loan Calculator */}
              <div id="calculator" className="bg-white p-8 md:p-12 rounded-sm border border-muji-border mb-24 scroll-mt-32">
                <div className="flex items-center gap-3 mb-8">
                  <Calculator className="w-5 h-5 text-muji-oak" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak">Interactive Mortgage Calculator</h2>
                </div>
                
                <p className="text-sm text-muji-text-muted mb-10 leading-relaxed font-sans">
                  Slide or update values to estimate your monthly loan repayments for <strong>{project.name}</strong>. Interest rates typically hover around 3.8% – 4.3% in Malaysia. Maximum loan tenure is 35 years in Malaysia or up to 70 years of age (whichever is earlier).
                </p>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* Left Controls */}
                  <div className="space-y-8">
                    {/* Property Price */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted">Property Price (RM)</label>
                        <span className="text-sm font-bold font-mono text-muji-text">RM {calcPrice.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        min={Math.round(project.minPrice * 0.8)} 
                        max={Math.round(project.minPrice * 2)} 
                        step={10000}
                        value={calcPrice} 
                        onChange={(e) => setCalcPrice(Number(e.target.value))}
                        className="w-full accent-muji-oak cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-muji-text-muted mt-1">
                        <span>Min: RM {Math.round(project.minPrice * 0.8).toLocaleString()}</span>
                        <span>Max: RM {Math.round(project.minPrice * 2).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Downpayment */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted">Down Payment Percent</label>
                        <span className="text-sm font-bold font-mono text-muji-text">{downpaymentPercent}% (RM {downpaymentAmount.toLocaleString()})</span>
                      </div>
                      <input 
                        type="range" 
                        min={0} 
                        max={50} 
                        step={1}
                        value={downpaymentPercent} 
                        onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
                        className="w-full accent-muji-oak cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-muji-text-muted mt-1">
                        <span>0% (Full Loan)</span>
                        <span>50% (Half Cash)</span>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted">Annual Interest Rate</label>
                        <span className="text-sm font-bold font-mono text-muji-text">{interestRate}%</span>
                      </div>
                      <input 
                        type="range" 
                        min={2.5} 
                        max={6.0} 
                        step={0.05}
                        value={interestRate} 
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full accent-muji-oak cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-muji-text-muted mt-1">
                        <span>2.5%</span>
                        <span>6.0%</span>
                      </div>
                    </div>

                    {/* Loan Tenure */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muji-text-muted">Loan Tenure (Years)</label>
                        <span className="text-sm font-bold font-mono text-muji-text">{loanTenure} Years</span>
                      </div>
                      <input 
                        type="range" 
                        min={10} 
                        max={35} 
                        step={1}
                        value={loanTenure} 
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full accent-muji-oak cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-muji-text-muted mt-1">
                        <span>10 Years</span>
                        <span>35 Years</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Results */}
                  <div className="bg-muji-beige/30 p-8 border border-muji-border/40 rounded-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muji-oak mb-4">Estimated Monthly Installment</p>
                    <p className="text-3xl md:text-4xl font-sans font-extrabold text-muji-text mb-6">
                      RM {monthlyInstallment.toLocaleString()} <span className="text-xs font-sans font-normal text-muji-text-muted">/ month</span>
                    </p>

                    <div className="space-y-4 py-6 border-y border-muji-border/50 text-xs text-muji-text mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-muji-text-muted font-normal">Total Repayment Amount</span>
                        <span className="font-mono font-bold">RM {totalRepayment.toLocaleString()}</span>
                      </div>
                    </div>

                    <a 
                      href={calcWhatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-muji-oak text-white text-center hover:bg-muji-text transition-all py-4 px-6 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <MessageCircle size={16} /> Consult Loan Eligibility
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Sticky Inquiry Section */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 bg-white p-10 muji-card shadow-2xl shadow-muji-sand/10">
                <h3 className="text-2xl font-serif text-muji-text mb-6">Personal Consultation</h3>
                <p className="text-muji-text-muted text-sm font-normal mb-6 leading-relaxed">
                  I am Shyan Yee, your dedicated advisor for {project.name}. Let me help you with unit selection and financing options.
                </p>
                <div className="mb-10 p-4 bg-muji-beige/30 border border-muji-border/30 rounded-sm">
                   <p className="text-[10px] uppercase font-bold tracking-widest text-muji-text mb-1">IQI Realty Sdn Bhd</p>
                   <p className="text-[9px] uppercase tracking-wider text-muji-text-muted font-mono">REN 46305 • E(1) 1584</p>
                </div>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                   <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muji-text-muted mb-2">Full Name</label>
                      <input type="text" className="w-full bg-muji-white border border-muji-border p-4 text-sm font-normal focus:border-muji-oak outline-none transition-all" placeholder="Enter your name" />
                   </div>
                   <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muji-text-muted mb-2">WhatsApp Number</label>
                      <input type="tel" className="w-full bg-muji-white border border-muji-border p-4 text-sm font-normal focus:border-muji-oak outline-none transition-all" placeholder="e.g. +60 19 559 8932" />
                   </div>
                   <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muji-text-muted mb-2">Interested Type</label>
                      <select className="w-full bg-muji-white border border-muji-border p-4 text-sm font-normal focus:border-muji-oak outline-none transition-all appearance-none cursor-pointer">
                         <option>I want more info</option>
                         <option>Request for Showroom Viewing</option>
                         <option>Check Monthly Installment</option>
                         <option>Check Loan Eligibility</option>
                      </select>
                   </div>
                   <button className="muji-button-primary w-full py-5 text-xs font-semibold uppercase tracking-widest">
                      Request Details
                   </button>
                </form>
                
                <div className="mt-10 pt-8 border-t border-muji-border text-center">
                   <p className="text-[10px] font-semibold text-muji-text-muted uppercase mb-4 tracking-widest italic">Fast Response via WhatsApp</p>
                   <a href={whatsappUrl} className="flex items-center justify-center gap-3 text-muji-oak hover:text-muji-text transition-colors">
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-sm font-semibold">Start Chatting with Shyan Yee</span>
                   </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sliding Project List at the bottom */}
      {otherProjects.length > 0 && (
        <section className="bg-muji-white border-t border-muji-border py-16 overflow-hidden">
          <div className="container-custom">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muji-sand mb-3">Recommendation list</p>
            <h3 className="text-3xl font-sans font-extrabold text-muji-text mb-8">Other Premium Properties</h3>
            
            <div className="relative overflow-hidden w-full">
              <motion.div 
                animate={{ x: `-${sliderIndex * 312}px` }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="flex gap-8 w-max"
              >
                {otherProjects.concat(otherProjects).map((p, idx) => (
                  <Link 
                    key={`${p.id}-${idx}`}
                    to={`/projects/${p.area.toLowerCase().replace(/\s+/g, '-')}--property/${p.slug}`}
                    className="w-[280px] bg-white border border-muji-border rounded-sm overflow-hidden hover:border-muji-sand transition-all group shrink-0 shadow-sm"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <img 
                        src={p.thumbnail} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold text-white uppercase rounded-xs">
                        {p.status}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-muji-oak mb-1">{p.area}</p>
                      <h4 className="text-sm font-sans font-bold text-muji-text truncate mb-2 group-hover:text-muji-oak transition-colors">{p.name}</h4>
                      <p className="text-xs text-muji-text font-semibold font-mono">From RM {p.minPrice.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {(lightboxIndex !== null || activeStandaloneImage !== null) && (
          (() => {
            const isStandalone = activeStandaloneImage !== null;
            const currentUrl = isStandalone 
              ? activeStandaloneImage!.url 
              : galleryImages[lightboxIndex!].url;
            const currentTitle = isStandalone 
              ? activeStandaloneImage!.title 
              : galleryImages[lightboxIndex!].description || "Property feature inspection";

            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[100] bg-neutral-950/98 backdrop-blur-md flex flex-col justify-between select-none"
                onClick={() => {
                  setLightboxIndex(null);
                  setActiveStandaloneImage(null);
                  setZoomScale(1);
                }}
              >
                {/* Top Bar Controls */}
                <div className="flex items-center justify-between p-4 md:p-6 w-full text-white bg-gradient-to-b from-black/80 to-transparent z-[110]" onClick={(e) => e.stopPropagation()}>
                  <div className="font-sans text-xs md:text-sm text-neutral-300 font-medium">
                    {project.name} &middot; <span className="text-muji-sand font-semibold">
                      {isStandalone ? "Layout & Map View" : `${lightboxIndex! + 1} of ${galleryImages.length}`}
                    </span>
                  </div>
                  
                  {/* Zoom Controls + Close */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-neutral-900/60 border border-white/10 rounded-full px-3 py-1 text-xs text-white">
                      <button
                        onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.5))}
                        disabled={zoomScale <= 0.5}
                        className="p-1 hover:text-muji-sand disabled:opacity-40 transition-colors cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut size={14} />
                      </button>
                      <span className="font-mono text-[10px] w-12 text-center select-none font-bold">
                        {Math.round(zoomScale * 100)}%
                      </span>
                      <button
                        onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 2.5))}
                        disabled={zoomScale >= 2.5}
                        className="p-1 hover:text-muji-sand disabled:opacity-40 transition-colors cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn size={14} />
                      </button>
                    </div>

                    {zoomScale !== 1 && (
                      <button
                        onClick={() => setZoomScale(1)}
                        className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-neutral-900/50 hover:bg-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-300 border border-white/10"
                        title="Reset Zoom to 100%"
                      >
                        Reset
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setLightboxIndex(null);
                        setActiveStandaloneImage(null);
                        setZoomScale(1);
                      }}
                      className="p-2 rounded-full bg-neutral-900/40 hover:bg-neutral-800 text-white transition-all border border-white/10 hover:border-white/20 hover:scale-105 flex items-center justify-center cursor-pointer"
                      title="Close (Esc)"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                {/* Middle Carousel Area */}
                <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  {/* Previous Button (Only for standard lifestyle carousel) */}
                  {!isStandalone && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
                        setZoomScale(1);
                      }}
                      className="absolute left-4 md:left-8 z-[110] p-3 md:p-4 rounded-full bg-neutral-900/60 hover:bg-neutral-800 text-white transition-all border border-white/10 hover:border-white/20 hover:scale-105 flex items-center justify-center cursor-pointer group"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                  )}

                  {/* Next Button (Only for standard lifestyle carousel) */}
                  {!isStandalone && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
                        setZoomScale(1);
                      }}
                      className="absolute right-4 md:right-8 z-[110] p-3 md:p-4 rounded-full bg-neutral-900/60 hover:bg-neutral-800 text-white transition-all border border-white/10 hover:border-white/20 hover:scale-105 flex items-center justify-center cursor-pointer group"
                      aria-label="Next Image"
                    >
                      <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}

                  {/* Main Image View Container with Scroll Pan */}
                  <div className="w-full h-full p-4 md:p-16 flex items-center justify-center overflow-auto scrollbar-thin">
                    <motion.div
                      key={currentUrl}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        scale: zoomScale,
                        y: 0
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "max-w-full max-h-full flex items-center justify-center transition-all duration-300",
                        zoomScale > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
                      )}
                      onClick={() => setZoomScale(prev => (prev > 1.2 ? 1 : 1.75))}
                    >
                      <img
                        src={currentUrl}
                        alt={currentTitle}
                        className="max-w-[85vw] max-h-[70vh] md:max-h-[80vh] object-contain shadow-2xl border border-white/10 select-none pointer-events-none rounded-xs bg-black/10"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Caption Bar */}
                <div className="p-4 md:p-8 w-full bg-gradient-to-t from-black/80 to-transparent text-center z-[110]" onClick={(e) => e.stopPropagation()}>
                  <div className="max-w-2xl mx-auto">
                    <p className="text-white text-sm md:text-base font-medium mb-1 drop-shadow-md">
                      {currentTitle}
                    </p>
                    <p className="text-neutral-400 text-[10px] md:text-xs tracking-widest font-mono select-none">
                      TIP: Click/tap image to toggle 1.75x zoom &bull; Use zoom buttons to fine-tune scaling down to 50%
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
};
