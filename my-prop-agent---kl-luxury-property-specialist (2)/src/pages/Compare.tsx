import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { X, Plus, ArrowRight, Building, Ruler, Bed, Calendar, Tag, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Compare: React.FC = () => {
  const { projects } = useData();
  const [selectedProjectIds, setSelectedProjectIds] = useState<(string | null)[]>(() => {
    const saved = localStorage.getItem('property_compare_ids');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) {
          return parsed;
        }
      } catch (e) {}
    }
    return [null, null, null];
  });
  const [showSelector, setShowSelector] = useState<number | null>(null);

  const selectedProjects = selectedProjectIds.map(id => id ? projects.find(p => p.id === id) : null);

  const handleSelect = (index: number, projectId: string) => {
    const newIds = [...selectedProjectIds];
    newIds[index] = projectId;
    setSelectedProjectIds(newIds);
    localStorage.setItem('property_compare_ids', JSON.stringify(newIds));
    setShowSelector(null);
  };

  const handleRemove = (index: number) => {
    const newIds = [...selectedProjectIds];
    newIds[index] = null;
    setSelectedProjectIds(newIds);
    localStorage.setItem('property_compare_ids', JSON.stringify(newIds));
  };

  const getSpecValue = (project: Project | null | undefined, key: keyof Project | string) => {
    if (!project) return '-';
    if (key === 'minPrice') return `RM ${project.minPrice.toLocaleString()}`;
    if (key === 'sizeSqft') return `${project.sizeSqft} sqft`;
    if (key === 'rooms') return `${project.rooms} Bed`;
    return (project as any)[key] || '-';
  };

  const specs = [
    { label: 'Developer', key: 'developer' },
    { label: 'Location', key: 'area' },
    { label: 'Starting Price', key: 'minPrice' },
    { label: 'Property Type', key: 'propertyType' },
    { label: 'Size', key: 'sizeSqft' },
    { label: 'Bedrooms', key: 'rooms' },
    { label: 'Completion', key: 'completionYear' },
    { label: 'Status', key: 'status' },
    { label: 'Tenure', key: 'tenure' }
  ];

  return (
    <div className="pt-20 bg-muji-white min-h-screen font-sans selection:bg-muji-sand selection:text-white">
      <SEO 
        title="Compare Projects | Side-by-Side Analysis"
        description="Compare up to three property projects in Kuala Lumpur and Selangor side-by-side to find the best fit for your lifestyle and budget."
      />

      <section className="bg-white pt-24 pb-16 px-6 border-b border-muji-border">
        <div className="container-custom">
          <h1 className="text-4xl md:text-7xl font-sans font-extrabold text-muji-text mb-8">
            Project <span className="text-muji-oak">Comparison</span>
          </h1>
          <p className="text-muji-text-muted text-lg font-normal leading-relaxed max-w-xl">
            Select up to three projects to compare their specifications side-by-side. This helps you make a better, more confident decision for your new home.
          </p>
        </div>
      </section>

      <section className="section-padding bg-muji-beige/30 overflow-hidden">
        <div className="container-custom">
          {/* Mobile Swipe Indicator */}
          <div className="md:hidden mb-6 flex items-center justify-center gap-2 py-3 px-4 bg-white/70 border border-muji-border rounded-sm text-[10px] font-bold uppercase tracking-wider text-muji-oak">
            <span>Swipe horizontally to compare side-by-side</span>
            <span className="animate-pulse">→</span>
          </div>

          <div className="overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="grid grid-cols-3 gap-6 md:gap-8 min-w-[840px] md:min-w-0">
              {selectedProjects.map((project, index) => (
                <div key={index} className="flex flex-col bg-white/40 md:bg-transparent p-4 md:p-0 rounded-sm">
                  <div className="bg-white p-6 muji-card h-[380px] flex flex-col items-center justify-center relative mb-8 border-muji-sand/20">
                    {project ? (
                      <>
                        <button 
                          onClick={() => handleRemove(index)}
                          className="absolute top-4 right-4 text-muji-text-muted hover:text-muji-oak transition-colors p-2 bg-muji-beige/50 rounded-full cursor-pointer z-10"
                        >
                          <X size={16} />
                        </button>
                        <div className="aspect-video w-full mb-6 overflow-hidden rounded-sm">
                          <img 
                            src={project.thumbnail} 
                            alt={project.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h3 className="text-lg font-serif text-muji-text text-center px-4 mb-3">{project.name}</h3>
                        <Link 
                          to={`/projects/${project.area.toLowerCase().replace(/\s+/g, '-')}/${project.slug}`}
                          className="text-[10px] font-bold uppercase tracking-widest text-muji-oak hover:text-muji-text transition-colors flex items-center gap-2"
                        >
                          View Project <ArrowRight size={12} />
                        </Link>
                      </>
                    ) : showSelector === index ? (
                      <div className="w-full h-full flex flex-col p-2 relative z-10">
                        <div className="flex items-center justify-between mb-3 border-b border-muji-border pb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muji-text">Select Project</span>
                          <button 
                            onClick={() => setShowSelector(null)}
                            className="text-muji-text-muted hover:text-muji-text transition-colors p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[280px] custom-scrollbar">
                          {projects.map((p) => {
                            const isAlreadySelected = selectedProjectIds.includes(p.id);
                            return (
                              <button
                                key={p.id}
                                disabled={isAlreadySelected}
                                onClick={() => handleSelect(index, p.id)}
                                className={cn(
                                  "w-full flex items-center gap-3 p-1.5 rounded-lg hover:bg-muji-beige transition-all text-left border border-transparent",
                                  isAlreadySelected ? "opacity-30 cursor-not-allowed" : "hover:border-muji-sand hover:shadow-xs cursor-pointer"
                                )}
                              >
                                <img 
                                  src={p.thumbnail} 
                                  alt={p.name} 
                                  className="w-10 h-10 object-cover rounded-md"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-muji-text truncate leading-tight">{p.name}</h4>
                                  <p className="text-[9px] text-muji-text-muted uppercase tracking-wider">{p.area}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowSelector(index)}
                        className="w-full h-full flex flex-col items-center justify-center gap-4 text-muji-text-muted hover:text-muji-sand transition-colors group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-muji-sand flex items-center justify-center group-hover:scale-110 transition-transform bg-muji-beige/20">
                          <Plus size={20} className="group-hover:text-muji-sand transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-muji-sand">Select Project</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-8 px-4 bg-white/30 md:bg-transparent py-6 md:py-0 rounded-sm border border-muji-border/40 md:border-none">
                    {specs.map((spec) => (
                      <div key={spec.key} className="pb-4 border-b border-muji-border/50">
                        <p className="text-[9px] uppercase font-bold text-muji-sand mb-2 tracking-[0.2em]">{spec.label}</p>
                        <p className={cn(
                          "text-sm font-medium text-muji-text leading-tight",
                          !project && "opacity-10"
                        )}>
                          {getSpecValue(project, spec.key)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Selection Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-2xl font-serif text-muji-text mb-2">Available Projects</h2>
            <p className="text-muji-text-muted text-sm font-normal">Select up to three projects to compare above</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {projects.map(p => {
              const selectedIdx = selectedProjectIds.indexOf(p.id);
              const isSelected = selectedIdx !== -1;
              return (
                <button 
                  key={p.id}
                  onClick={() => {
                    if (isSelected) {
                      handleRemove(selectedIdx);
                    } else {
                      const firstEmpty = selectedProjectIds.indexOf(null);
                      if (firstEmpty !== -1) {
                        handleSelect(firstEmpty, p.id);
                      }
                    }
                  }}
                  className={cn(
                    "group flex flex-col p-3 border transition-all text-left relative",
                    isSelected 
                      ? "bg-muji-sand/5 border-muji-oak shadow-sm" 
                      : "bg-white border-muji-border hover:border-muji-sand"
                  )}
                >
                  <div className="aspect-square w-full mb-3 overflow-hidden rounded-xs grayscale hover:grayscale-0 transition-all duration-500">
                    <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="text-[11px] font-medium text-muji-text truncate leading-tight">{p.name}</h4>
                  <p className="text-[9px] text-muji-text-muted uppercase tracking-wider">{p.area}</p>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-muji-oak text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      #{selectedIdx + 1}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muji-beige">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif mb-8 text-muji-text">Need help deciding?</h2>
          <p className="text-muji-text-muted mb-12 max-w-lg mx-auto">
            I can help you review these specs and share which project might be better for your specific needs.
          </p>
          <Link to="/contact" className="muji-button-primary">
            Ask for My Advice
          </Link>
        </div>
      </section>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
