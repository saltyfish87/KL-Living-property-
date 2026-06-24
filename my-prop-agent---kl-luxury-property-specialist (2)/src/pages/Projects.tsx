import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../hooks/useData';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Building, Ruler, Calendar, Bed, ArrowRight, SlidersHorizontal, Scale } from 'lucide-react';
import { cn } from '../lib/utils';
import { trackSearchQuery } from '../lib/tracker';
import { useLanguage } from '../components/LanguageContext';

export const Projects: React.FC = () => {
  const { projects } = useData();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Load selection array from localStorage on mount (synced with Compare.tsx)
  const [compareIds, setCompareIds] = useState<(string | null)[]>(() => {
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

  const handleToggleCompare = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const newCompareIds = [...compareIds];
    const index = newCompareIds.indexOf(projectId);

    if (index !== -1) {
      // Already selected -> Remove it
      newCompareIds[index] = null;
    } else {
      // Not selected -> Find first empty slot, or overwrite slot index 0 if full
      const emptyIdx = newCompareIds.indexOf(null);
      if (emptyIdx !== -1) {
        newCompareIds[emptyIdx] = projectId;
      } else {
        newCompareIds[0] = projectId;
      }
    }

    setCompareIds(newCompareIds);
    localStorage.setItem('property_compare_ids', JSON.stringify(newCompareIds));

    // Instant smooth navigation to Compare project area
    navigate('/compare');
  };
  
  // States for filters
  const [stateFilter, setStateFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roomsFilter, setRoomsFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [tenureFilter, setTenureFilter] = useState('All');
  const [completionFilter, setCompletionFilter] = useState('All');
  const [carParkFilter, setCarParkFilter] = useState('All');

  // Load filters from URL on init
  useEffect(() => {
    const budget = searchParams.get('budget');
    const view = searchParams.get('view');
    
    if (budget) {
      if (budget === '500000') setPriceFilter('<RM500k');
      else if (budget === '800000') setPriceFilter('RM500k-RM800k');
      else if (budget === 'Above') setPriceFilter('>RM800k');
    }
  }, [searchParams]);

  // Debounced search query tracking
  useEffect(() => {
    if (!search || search.trim().length < 2) return;

    const handler = setTimeout(() => {
      // Log the text search query
      trackSearchQuery(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  // Track filter selection: State / Area of interest
  useEffect(() => {
    if (stateFilter && stateFilter !== 'All') {
      trackSearchQuery(`area:${stateFilter}`);
    }
  }, [stateFilter]);

  // Track filter selection: Property types of interest
  useEffect(() => {
    if (typeFilter && typeFilter !== 'All') {
      trackSearchQuery(`type:${typeFilter}`);
    }
  }, [typeFilter]);

  const filteredProjects = useMemo(() => {
    const view = searchParams.get('view');
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            p.area.toLowerCase().includes(search.toLowerCase());
      
      const matchesState = stateFilter === 'All' || p.state === stateFilter;
      const matchesType = typeFilter === 'All' || p.propertyType === typeFilter;
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      
      let matchesRooms = true;
      if (roomsFilter !== 'All') {
        const pRooms = typeof p.rooms === 'string' ? parseInt(p.rooms) : p.rooms;
        matchesRooms = pRooms >= parseInt(roomsFilter);
      }
      
      let matchesPrice = true;
      if (priceFilter === '<RM500k') matchesPrice = p.minPrice < 500000;
      else if (priceFilter === 'RM500k-RM800k') matchesPrice = p.minPrice >= 500000 && p.minPrice <= 800000;
      else if (priceFilter === '>RM800k') matchesPrice = p.minPrice > 800000;

      const matchesView = !view || (view === 'drone' ? !!p.droneViewUrl : view === 'showroom' ? !!p.virtualTourUrl : true);

      let matchesSize = true;
      if (sizeFilter !== 'All') {
        const numbers = String(p.sizeSqft).replace(/,/g, '').match(/\d+/g)?.map(Number) || [];
        if (numbers.length > 0) {
          const minSize = Math.min(...numbers);
          const maxSize = Math.max(...numbers);
          if (sizeFilter === '<800') {
            matchesSize = minSize < 800;
          } else if (sizeFilter === '800-1200') {
            matchesSize = (minSize >= 800 && minSize <= 1200) || (maxSize >= 800 && maxSize <= 1200) || (minSize <= 800 && maxSize >= 1200);
          } else if (sizeFilter === '>1200') {
            matchesSize = maxSize > 1200;
          }
        }
      }

      const matchesTenure = tenureFilter === 'All' || p.tenure === tenureFilter;

      let matchesCompletion = true;
      if (completionFilter !== 'All') {
        if (completionFilter === 'Completed') matchesCompletion = p.status === 'Completed' || p.completionYear <= 2026;
        else if (completionFilter === '<2027') matchesCompletion = p.completionYear < 2027;
        else if (completionFilter === '2027-2028') matchesCompletion = p.completionYear === 2027 || p.completionYear === 2028;
        else if (completionFilter === '2029+') matchesCompletion = p.completionYear >= 2029;
      }

      let matchesCarPark = true;
      if (carParkFilter !== 'All') {
        let estimatedCarParks = 2; // Default Standard in Malaysia is 2 car parks
        if (p.layouts) {
          p.layouts.forEach(l => {
             const descriptionLower = (l.description || '').toLowerCase();
             if (descriptionLower.includes('3 carpark') || descriptionLower.includes('3 complimentary') || descriptionLower.includes('3 slots') || descriptionLower.includes('3 bays')) {
                estimatedCarParks = Math.max(estimatedCarParks, 3);
             } else if (descriptionLower.includes('1 carpark') || descriptionLower.includes('1 slot') || descriptionLower.includes('single carpark') || descriptionLower.includes('1 bay')) {
                estimatedCarParks = Math.min(estimatedCarParks, 1);
             }
          });
        }
        if (p.keyFeatures) {
          p.keyFeatures.forEach(f => {
             const featureLower = f.toLowerCase();
             if (featureLower.includes('3 carpark') || featureLower.includes('3 slots') || featureLower.includes('3 car park') || featureLower.includes('3 bay')) {
                estimatedCarParks = Math.max(estimatedCarParks, 3);
             } else if (featureLower.includes('2 to 3 side-by-side carpark') || featureLower.includes('2 carpark') || featureLower.includes('2 bay')) {
                estimatedCarParks = Math.max(estimatedCarParks, 2);
             }
          });
        }
        
        if (carParkFilter === '1') matchesCarPark = estimatedCarParks === 1;
        else if (carParkFilter === '2') matchesCarPark = estimatedCarParks === 2;
        else if (carParkFilter === '3+') matchesCarPark = estimatedCarParks >= 3;
      }

      return matchesSearch && matchesState && matchesType && matchesStatus && matchesRooms && matchesPrice && matchesView && matchesSize && matchesTenure && matchesCompletion && matchesCarPark;
    });
  }, [projects, search, stateFilter, typeFilter, priceFilter, statusFilter, roomsFilter, sizeFilter, tenureFilter, completionFilter, carParkFilter, searchParams]);

  const malaysianStates = ['All', 'Selangor', 'WP Kuala Lumpur', 'Johor', 'Penang'];
  const propertyTypes = ['All', 'Serviced Residence', 'Condo', 'Luxury Suite', 'Terrace House', 'Semi-D', 'Bungalow'];
  const priceRanges = ['All', '<RM500k', 'RM500k-RM800k', '>RM800k'];
  const projectStages = ['All', 'New Launch', 'Under Construction', 'Completed'];
  const rooms = ['All', '1', '2', '3', '4'];

  const resetFilters = () => {
    setSearch('');
    setStateFilter('All');
    setTypeFilter('All');
    setPriceFilter('All');
    setStatusFilter('All');
    setRoomsFilter('All');
    setSizeFilter('All');
    setTenureFilter('All');
    setCompletionFilter('All');
    setCarParkFilter('All');
  };

  const isFiltered = search || stateFilter !== 'All' || typeFilter !== 'All' || priceFilter !== 'All' || statusFilter !== 'All' || roomsFilter !== 'All' || sizeFilter !== 'All' || tenureFilter !== 'All' || completionFilter !== 'All' || carParkFilter !== 'All' || searchParams.get('view');

  return (
    <div className="pt-20 bg-muji-white min-h-screen font-sans selection:bg-muji-sand selection:text-white">
      <SEO 
        title="Find Your Home | Malaysia Property List"
        description="Browse our hand-picked selection of residential properties in Kuala Lumpur and Selangor. Simple filtering for your convenience."
      />

      {/* Clean Header */}
      <section className="bg-muji-white pt-24 pb-16 px-6">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl font-sans font-extrabold text-muji-text mb-8">
              {t('projects.title')}
            </h1>
            <p className="text-muji-text-muted text-lg font-normal mb-8 max-w-xl">
              {t('projects.desc')}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-5 py-3 border border-muji-oak text-muji-oak hover:bg-muji-oak hover:text-white transition-all text-xs font-black uppercase tracking-wider rounded shadow-sm"
              >
                <MapPin size={14} className="animate-bounce" />
                {language === 'en' ? 'Open Interactive Map' : '开启互动地图定位'}
              </Link>
            </div>
            
            <div className="relative group max-w-2xl bg-white rounded-lg border border-muji-border overflow-hidden focus-within:border-muji-text transition-all">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muji-text-muted w-5 h-5" />
              <input 
                type="text" 
                placeholder={t('filter.search.placeholder')} 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-transparent text-sm font-normal placeholder:text-muji-text-muted outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Simple Filter Bar */}
      <section className="bg-white border-y border-muji-border sticky top-20 z-30 py-4 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <div className="flex flex-col min-w-[120px]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">State</label>
                <select 
                  value={stateFilter} 
                  onChange={(e) => setStateFilter(e.target.value)} 
                  className="bg-white text-xs font-bold focus:ring-1 focus:ring-muji-sand focus:border-muji-sand outline-none cursor-pointer text-muji-text px-3 py-2 rounded-sm border border-muji-border hover:border-muji-sand transition-all"
                >
                  {malaysianStates.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col min-w-[120px]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">Price</label>
                <select 
                  value={priceFilter} 
                  onChange={(e) => setPriceFilter(e.target.value)} 
                  className="bg-white text-xs font-bold focus:ring-1 focus:ring-muji-sand focus:border-muji-sand outline-none cursor-pointer text-muji-text px-3 py-2 rounded-sm border border-muji-border hover:border-muji-sand transition-all"
                >
                  {priceRanges.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex flex-col min-w-[120px]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">Type</label>
                <select 
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)} 
                  className="bg-white text-xs font-bold focus:ring-1 focus:ring-muji-sand focus:border-muji-sand outline-none cursor-pointer text-muji-text px-3 py-2 rounded-sm border border-muji-border hover:border-muji-sand transition-all"
                >
                  {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="hidden md:flex flex-col min-w-[120px]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">Rooms</label>
                <select 
                  value={roomsFilter} 
                  onChange={(e) => setRoomsFilter(e.target.value)} 
                  className="bg-white text-xs font-bold focus:ring-1 focus:ring-muji-sand focus:border-muji-sand outline-none cursor-pointer text-muji-text px-3 py-2 rounded-sm border border-muji-border hover:border-muji-sand transition-all"
                >
                  {rooms.map(r => <option key={r} value={r}>{r === 'All' ? r : `${r}+ Bed`}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-xs font-semibold text-muji-text hover:text-muji-oak transition-colors"
              >
                <SlidersHorizontal size={14} /> More Filters
              </button>
              {isFiltered && (
                <button onClick={resetFilters} className="text-[10px] font-extrabold text-muji-text uppercase border-b-2 border-muji-text hover:text-muji-oak hover:border-muji-oak transition-all cursor-pointer">
                  Reset
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-6 pt-6 border-t border-muji-border"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-4">
                  {/* Status */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">Status</p>
                    <div className="flex flex-wrap gap-2">
                      {projectStages.map(s => (
                        <button 
                          key={s} onClick={() => setStatusFilter(s)}
                          className={cn("px-4 py-2 rounded-sm text-[10px] font-extrabold tracking-wider transition-all border cursor-pointer", statusFilter === s ? "bg-muji-sand border-muji-sand text-white shadow-md scale-[1.04]" : "bg-white border-stone-300 text-stone-700 hover:bg-muji-white hover:text-muji-sand hover:border-muji-sand")}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size (sqft) */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">Size (sqft)</p>
                    <div className="flex flex-wrap gap-2">
                      {['All', '<800', '800-1200', '>1200'].map(s => (
                        <button 
                          key={s} onClick={() => setSizeFilter(s)}
                          className={cn("px-4 py-2 rounded-sm text-[10px] font-extrabold tracking-wider transition-all border cursor-pointer", sizeFilter === s ? "bg-muji-sand border-muji-sand text-white shadow-md scale-[1.04]" : "bg-white border-stone-300 text-stone-700 hover:bg-muji-white hover:text-muji-sand hover:border-muji-sand")}
                        >
                          {s === 'All' ? 'All' : s === '<800' ? '< 800' : s === '800-1200' ? '800 - 1200' : '> 1200'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tenure */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">Tenure</p>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Freehold', 'Leasehold'].map(s => (
                        <button 
                          key={s} onClick={() => setTenureFilter(s)}
                          className={cn("px-4 py-2 rounded-sm text-[10px] font-extrabold tracking-wider transition-all border cursor-pointer", tenureFilter === s ? "bg-muji-sand border-muji-sand text-white shadow-md scale-[1.04]" : "bg-white border-stone-300 text-stone-700 hover:bg-muji-white hover:text-muji-sand hover:border-muji-sand")}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Completion Year */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">Completion</p>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Completed', '<2027', '2027-2028', '2029+'].map(s => (
                        <button 
                          key={s} onClick={() => setCompletionFilter(s)}
                          className={cn("px-4 py-2 rounded-sm text-[10px] font-extrabold tracking-wider transition-all border cursor-pointer", completionFilter === s ? "bg-muji-sand border-muji-sand text-white shadow-md scale-[1.04]" : "bg-white border-stone-300 text-stone-700 hover:bg-muji-white hover:text-muji-sand hover:border-muji-sand")}
                        >
                          {s === 'All' ? 'All' : s === 'Completed' ? 'Completed' : s === '<2027' ? 'Under 2027' : s === '2027-2028' ? '2027-2028' : '2029+'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Car Parks */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muji-text mb-1">Car Parks</p>
                    <div className="flex flex-wrap gap-2">
                      {['All', '1', '2', '3+'].map(s => (
                        <button 
                          key={s} onClick={() => setCarParkFilter(s)}
                          className={cn("px-4 py-2 rounded-sm text-[10px] font-extrabold tracking-wider transition-all border cursor-pointer", carParkFilter === s ? "bg-muji-sand border-muji-sand text-white shadow-md scale-[1.04]" : "bg-white border-stone-300 text-stone-700 hover:bg-muji-white hover:text-muji-sand hover:border-muji-sand")}
                        >
                          {s === 'All' ? 'All' : s === '1' ? '1 Bay' : s === '2' ? '2 Bays' : '3+ Bays'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Grid List */}
      <section className="section-padding bg-muji-white">
        <div className="container-custom">
          {searchParams.get('view') && (
            <div className="mb-8 px-6 py-4 bg-muji-beige rounded-sm border border-muji-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <span className="text-xs font-semibold uppercase tracking-wider text-muji-oak">Filtering by: {searchParams.get('view')?.toUpperCase()} VIEW</span>
              </div>
              <Link to="/projects" className="text-xs font-bold uppercase text-muji-text-muted hover:text-muji-text decoration-muji-sand underline">Clear View Filter</Link>
            </div>
          )}

          <p className="mb-10 text-xs text-muji-text-muted font-medium uppercase tracking-wide">
            Showing {filteredProjects.length} Result{filteredProjects.length !== 1 ? 's' : ''}
          </p>

          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Link to={`/projects/${project.area.toLowerCase().replace(/\s+/g, '-')}--property/${project.slug}`}>
                    <div className="aspect-square overflow-hidden mb-6 rounded-sm muji-card group-hover:shadow-xl transition-shadow duration-500 relative">
                      <img 
                        src={project.thumbnail} 
                        alt={project.name} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating Absolute Compare Button */}
                      <button
                        onClick={(e) => handleToggleCompare(e, project.id)}
                        title="Add to side-by-side comparison"
                        className={cn(
                          "absolute top-4 right-4 z-10 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center border transition-all cursor-pointer shadow-md shadow-black/30 hover:scale-110",
                          compareIds.includes(project.id)
                            ? "bg-muji-sand text-white border-muji-sand font-bold"
                            : "bg-neutral-950/90 hover:bg-neutral-950 text-white border-white/20 hover:border-white/40"
                        )}
                      >
                        <Scale size={15} className="scale-110" />
                      </button>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                         <span className="text-muji-oak text-[10px] font-bold uppercase">{project.developer}</span>
                         <span className="w-1 h-1 bg-muji-sand rounded-full" />
                         <span className="text-muji-text-muted text-[10px] uppercase font-medium">{project.area}</span>
                      </div>
                      <h3 className="text-3xl font-sans font-extrabold text-muji-text mb-6 group-hover:text-muji-oak transition-all">
                        {project.name}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 py-6 border-y border-muji-border mb-6">
                         <div className="flex items-center gap-3 text-muji-text-muted">
                            <Ruler size={14} className="opacity-80" />
                            <span className="text-[11px] font-normal">{project.sizeSqft} sqft</span>
                         </div>
                         <div className="flex items-center gap-3 text-muji-text-muted">
                            <Bed size={14} className="opacity-80" />
                            <span className="text-[11px] font-normal">{project.rooms} Bed</span>
                         </div>
                         <div className="flex items-center gap-3 text-muji-text-muted">
                            <Calendar size={14} className="opacity-80" />
                            <span className="text-[11px] font-normal">Ready {project.completionYear}</span>
                         </div>
                         <div className="flex items-center gap-3 text-muji-text-muted">
                            <Building size={14} className="opacity-80" />
                            <span className="text-[11px] font-normal truncate">{project.propertyType}</span>
                         </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-muji-text-muted text-[10px] uppercase mb-1">Starting from</p>
                          <p className="text-2xl text-muji-text font-serif">RM { project.minPrice.toLocaleString() }</p>
                        </div>
                        <div className="text-muji-oak flex items-center gap-2 text-xs font-semibold uppercase group-hover:translate-x-2 transition-transform">
                          Details <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-muji-beige rounded-lg border border-muji-border">
              <X className="w-10 h-10 text-muji-sand mx-auto mb-6" />
              <p className="text-muji-text-muted font-normal mb-8">We couldn't find any projects matching your search.</p>
              <button 
                onClick={resetFilters}
                className="muji-button-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
