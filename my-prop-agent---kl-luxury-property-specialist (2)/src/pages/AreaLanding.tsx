import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { AREAS } from '../data';
import { useData } from '../hooks/useData';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Building2, ArrowRight, Star, Heart } from 'lucide-react';

export const AreaLanding: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useData();
  const area = AREAS.find(a => a.slug === slug);

  if (!area) return <Navigate to="/projects" />;

  const recommendedProjects = projects.filter(p => area.recommendedProjectIds.includes(p.id));

  return (
    <div className="pt-20 bg-muji-white min-h-screen font-sans selection:bg-muji-sand selection:text-white">
      <SEO 
        title={`${area.name} | Area Guide & Best Property Insights`}
        description={area.description.substring(0, 160)}
        type="article"
        schemaData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "name": `${area.name} Area Guide`,
              "description": area.description
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shyanyee.com" },
                { "@type": "ListItem", "position": 2, "name": "Areas" },
                { "@type": "ListItem", "position": 3, "name": area.name }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `What is the price trend in ${area.name}?`,
                  "acceptedAnswer": { "@type": "Answer", "text": area.priceTrend }
                },
                {
                  "@type": "Question",
                  "name": `How is the rental demand in ${area.name}?`,
                  "acceptedAnswer": { "@type": "Answer", "text": area.rentalDemand }
                }
              ]
            }
          ]
        }}
      />

      {/* Hero Header */}
      <section className="bg-white pt-24 pb-20 px-6 border-b border-muji-border">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-muji-oak text-[10px] font-bold uppercase tracking-widest mb-6">
              <MapPin size={12} /> Area Guide
            </div>
            <h1 className="text-4xl md:text-7xl font-sans font-extrabold text-muji-text mb-8">
              Living in <span className="text-muji-oak">{area.name}</span>
            </h1>
            <p className="text-muji-text-muted text-xl font-normal leading-relaxed max-w-2xl">
              {area.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muji-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Market Insights Sidebar */}
            <div className="lg:col-span-4 space-y-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muji-oak mb-8">Market Insights</h2>
              
              <div className="p-8 muji-card bg-white">
                <div className="flex items-center gap-3 mb-6 text-muji-oak">
                  <TrendingUp size={16} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Price Trends</h3>
                </div>
                <p className="text-muji-text-muted text-sm font-normal leading-relaxed">{area.priceTrend}</p>
              </div>
              
              <div className="p-8 muji-card bg-muji-beige border-none">
                <div className="flex items-center gap-3 mb-6 text-muji-oak">
                  <Building2 size={16} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Rental Demand</h3>
                </div>
                <p className="text-muji-text-muted text-sm font-normal leading-relaxed">{area.rentalDemand}</p>
              </div>

              <div className="p-10 border border-muji-sand rounded-sm bg-white font-sans font-semibold text-muji-text leading-relaxed">
                "Finding a home in {area.name} is a balance of convenience and future growth. It's one of our most requested areas."
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-24">
              {/* Why Live Here */}
              <div className="p-10 muji-card bg-white">
                <h2 className="text-2xl font-serif text-muji-text mb-12 flex items-center gap-3">
                   <Star className="w-5 h-5 text-muji-sand" /> Why Choose {area.name}?
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                  {area.whyInvest.map((point, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-muji-sand text-xs font-bold mt-1">0{i+1}</div>
                      <p className="text-muji-text-muted text-sm font-normal leading-relaxed tracking-muji">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Projects */}
              {recommendedProjects.length > 0 && (
                <div>
                  <div className="flex items-end justify-between mb-12 border-b border-muji-border pb-6">
                    <h2 className="text-2xl font-sans font-extrabold text-muji-text flex items-center gap-3">
                      <Heart className="w-5 h-5 text-muji-sand" /> Hand-picked Homes
                    </h2>
                    <Link to="/projects" className="text-xs font-semibold text-muji-oak hover:text-muji-text transition-colors flex items-center gap-2">
                       View All <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-10">
                    {recommendedProjects.map((project) => (
                      <Link to={`/projects/${area.name.toLowerCase().replace(/\s+/g, '-')}--property/${project.slug}`} key={project.id} className="group">
                        <div className="aspect-square overflow-hidden rounded-sm muji-card mb-6">
                          <img 
                            src={project.thumbnail} 
                            alt={project.name} 
                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                        <h3 className="text-xl font-sans font-bold text-muji-text mb-2 group-hover:text-muji-oak transition-colors">{project.name}</h3>
                        <p className="text-muji-text-muted text-xs font-normal line-clamp-2 mb-4">{project.tagline}</p>

                        <div className="text-[10px] uppercase font-bold text-muji-oak flex items-center gap-2 group-hover:gap-3 transition-all pt-2">
                           See Home Details <ArrowRight size={12} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Small Call to action for the area */}
              <div className="bg-muji-text p-12 md:p-16 text-center rounded-sm">
                <h3 className="text-3xl font-sans font-extrabold text-muji-white mb-6">Interested in {area.name}?</h3>
                <p className="text-muji-white/70 mb-10 max-w-lg mx-auto font-normal leading-relaxed">
                   I have helped many families and investors find their place here. Let me help you too.
                </p>
                <Link to="/contact" className="muji-button-secondary bg-transparent text-muji-white border-white hover:bg-white hover:text-muji-text inline-block">
                   Get a Personal Consultation
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
