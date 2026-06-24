import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../hooks/useData';
import { SEO } from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Search, Navigation, Compass, ExternalLink } from 'lucide-react';
import L from 'leaflet';
import { useLanguage } from '../components/LanguageContext';

const PROJECT_COORDINATES: Record<string, { lat: number; lng: number }> = {
  '1': { lat: 3.05767617200174, lng: 101.672877856883 }, // Queenswoodz @ Bukit Jalil
  '2': { lat: 3.17375430580668, lng: 101.616371821163 }, // The Aldenz (Damansara)
  '3': { lat: 3.1360, lng: 101.6812 }, // Parkside Residences
  '4': { lat: 3.0587357, lng: 101.672585 }, // Kingswoodz @ Bukit Jalil
  '5': { lat: 3.04673409475637, lng: 101.666182208055 }, // Wellness-oriented Veladaz @ Bukit Jalil
  '6': { lat: 3.04592273332899, lng: 101.666245410469 }, // Vividz Bukit Jalil
  '7-axis': { lat: 1.4632060186301, lng: 103.768963921456 }, // Axis Tower @ Causewayz Square (near Johor CIQ)
  '7-brixton': { lat: 1.4630060186301, lng: 103.769163921456 }, // Brixton Tower @ Causewayz Square
  '7-dover': { lat: 1.4628060186301, lng: 103.769363921456 }, // Dover Tower @ Causewayz Square
  '8': { lat: 3.0570, lng: 101.6835 }, // The Oaka Residences
  '9': { lat: 3.05023171129911, lng: 101.660626821071 }, // Ren Residence (REN)
  '10': { lat: 3.05811691660517, lng: 101.650220854659 }, // Ayanna Resort Residences (Ayanna)
  '11': { lat: 3.0740, lng: 101.6690 }, // Aras Residence
  '12': { lat: 3.0725, lng: 101.6715 }, // The Maple Residence
  '13': { lat: 3.1023, lng: 101.6820 }, // M Aspira
  '14': { lat: 3.0782, lng: 101.6394 }, // Dwi Aurora

  // Slugs mapping to prevent any DB mismatch falling back to wrong default coordinate
  'queenswoodz-bukit-jalil': { lat: 3.05767617200174, lng: 101.672877856883 },
  'aldenz-damansara': { lat: 3.17375430580668, lng: 101.616371821163 },
  'parkside-residence-bangsar': { lat: 3.1360, lng: 101.6812 },
  'kingswoodz-bukit-jalil': { lat: 3.0587357, lng: 101.672585 },
  'veladaz-bukit-jalil': { lat: 3.04673409475637, lng: 101.666182208055 },
  'vividz-bukit-jalil': { lat: 3.04592273332899, lng: 101.666245410469 },
  'causewayz-axis': { lat: 1.4632060186301, lng: 103.768963921456 },
  'causewayz-brixton': { lat: 1.4630060186301, lng: 103.769163921456 },
  'causewayz-dover': { lat: 1.4628060186301, lng: 103.769363921456 },
  'oaka-residence': { lat: 3.0570, lng: 101.6835 },
  'ren-residence': { lat: 3.05023171129911, lng: 101.660626821071 },
  'ayanna-resort-residences': { lat: 3.05811691660517, lng: 101.650220854659 },
  'aras-residence': { lat: 3.0740, lng: 101.6690 },
  'the-maple-residence': { lat: 3.0725, lng: 101.6715 },
  'm-aspira': { lat: 3.1023, lng: 101.6820 },
  'dwi-aurora': { lat: 3.0782, lng: 101.6394 },
};

export const MapExplorer: React.FC = () => {
  const { projects, loading } = useData();
  const { t, language } = useLanguage();
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'launch' | 'completed'>('all');

  // Inject Leaflet CSS dynamically to prevent styling broken issues
  useEffect(() => {
    const linkId = 'leaflet-styles-cdn';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  // Format and append lat/lng to projects logic
  const mappedProjects = (projects || []).map(p => {
    const coords = PROJECT_COORDINATES[p.id] || 
                   PROJECT_COORDINATES[p.slug] || 
                   PROJECT_COORDINATES[p.id?.toLowerCase()] ||
                   PROJECT_COORDINATES[p.slug?.toLowerCase()] ||
                   Object.entries(PROJECT_COORDINATES).find(([key]) => {
                     const k = key.toLowerCase();
                     return (p.name && p.name.toLowerCase().includes(k)) || 
                            (p.slug && p.slug.toLowerCase().includes(k)) || 
                            (p.id && p.id.toLowerCase().includes(k));
                   })?.[1] || 
                   { lat: 3.0730, lng: 101.6680 };
    return {
      ...p,
      lat: coords.lat,
      lng: coords.lng,
    };
  });

  const filteredProjects = mappedProjects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'launch') {
      return matchesSearch && (p.status === 'New Launch' || p.status === 'Pre-Launch' || p.status === 'Early Bird');
    }
    if (activeTab === 'completed') {
      return matchesSearch && p.status === 'Completed';
    }
    return matchesSearch;
  });

  // Center project card to the screen vertical axis parallel to the map target height
  const scrollToProjectInList = (projectId: string) => {
    const runScroll = () => {
      const listContainer = listContainerRef.current;
      const itemElement = document.getElementById(`project-item-${projectId}`);
      if (listContainer && itemElement) {
        const containerHeight = listContainer.clientHeight;
        const itemHeight = itemElement.clientHeight;
        const itemTop = itemElement.offsetTop;
        
        // Position the card precisely centered to match the centered map pin axis line
        const targetScrollTop = itemTop - (containerHeight / 2) + (itemHeight / 2);
        listContainer.scrollTo({
          top: targetScrollTop >= 0 ? targetScrollTop : 0,
          behavior: 'smooth'
        });
      }
    };

    // Run first scroll immediately for high responsiveness
    setTimeout(runScroll, 50);
    // Run second scroll run after the expanded anim finished to lock horizontal alignments precisely
    setTimeout(runScroll, 280);
  };

  // Init Leaflet Map instance
  useEffect(() => {
    if (!mapContainer.current) return;

    // Remove older index instances
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Set initial center coordinates of Kuala Lumpur / Selangor
    const initialMap = L.map(mapContainer.current, {
      center: [3.0800, 101.6700],
      zoom: 11,
      zoomControl: false // Disable default zoom control
    });

    // Use highly stable and beautiful standard CartoDB Voyager free public tile service (requires no token/key)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(initialMap);

    // Place proper zoom controls
    L.control.zoom({ position: 'topright' }).addTo(initialMap);

    mapInstanceRef.current = initialMap;

    // Watch map container size shifts to automatically eliminate any grey border or timing issues
    const resizeObserver = new ResizeObserver(() => {
      if (initialMap) {
        initialMap.invalidateSize();
      }
    });
    
    if (mapContainer.current) {
      resizeObserver.observe(mapContainer.current);
    }

    // Double assurance timeout invalidate triggers
    const t1 = setTimeout(() => initialMap.invalidateSize(), 150);
    const t2 = setTimeout(() => initialMap.invalidateSize(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      resizeObserver.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when filters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear individual reference markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Push new markers
    filteredProjects.forEach(project => {
      const isSelected = selectedProject?.id === project.id;

      const priceTagStr = project.minPrice >= 1e6 
        ? (project.minPrice / 1e6).toFixed(2) + 'M' 
        : (project.minPrice / 1000).toFixed(0) + 'k';

      // Design custom HTML drop pin with elegant teardrop shape and floating tooltip label
      const customDivIcon = L.divIcon({
        className: 'custom-property-pin-wrapper',
        html: `
          <div class="relative flex flex-col items-center cursor-pointer select-none group">
            <!-- Floating bubble label with name & price -->
            <div class="absolute bottom-10 bg-stone-950 text-white text-[10.5px] font-black px-2.5 py-1.5 rounded-md shadow-xl border border-white/10 transition-all duration-300 pointer-events-none ${isSelected ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}" style="white-space: nowrap; z-index: 500;">
              <span class="text-stone-300 font-sans font-medium mr-1 text-[9.5px]">${project.area}:</span>
               ${project.name} • RM ${priceTagStr}
            </div>
            
            <!-- Sleek teardrop Pin -->
            <div class="relative w-8 h-8 rounded-full ${isSelected ? 'bg-stone-950 ring-4 ring-muji-oak/40 scale-125 z-50' : 'bg-muji-oak hover:bg-stone-950 hover:scale-110 hover:z-30'} flex items-center justify-center shadow-lg transition-all duration-300">
              <!-- Center white ring core -->
              <div class="w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div class="w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-muji-oak animate-ping' : 'bg-stone-800'}"></div>
              </div>
              <!-- Pointy bottom tip -->
              <div class="absolute -bottom-1 w-2.5 h-2.5 ${isSelected ? 'bg-stone-950' : 'bg-muji-oak group-hover:bg-stone-950'} transform rotate-45 transition-colors duration-300 z-[-1]"></div>
            </div>
          </div>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 42]
      });

      const marker = L.marker([project.lat, project.lng], { icon: customDivIcon });

      marker.on('click', () => {
        setSelectedProject(project);
        map.setView([project.lat, project.lng], 14, { animate: true });
        
        // Smooth scroll left-side project list container to the clicked item centered parallel to the pin focus horizontal axis
        scrollToProjectInList(project.id);
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });

  }, [filteredProjects, selectedProject]);

  // Dynamically auto-center map when active search filters match specific regions (e.g. Johor Bahru)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || filteredProjects.length === 0) return;

    const allInJohor = filteredProjects.every(p => p.lat < 2.0);
    const allInKL = filteredProjects.every(p => p.lat > 2.0);

    if (allInJohor) {
      map.setView([1.4635, 103.7670], 13, { animate: true });
    } else if (allInKL && searchQuery) {
      map.setView([filteredProjects[0].lat, filteredProjects[0].lng], 12, { animate: true });
    }
  }, [searchQuery, activeTab]);

  const handleFlyToProject = (project: any) => {
    setSelectedProject(project);
    const map = mapInstanceRef.current;
    if (map) {
      map.setView([project.lat, project.lng], 14, { animate: true });
    }
    
    // Smooth centers the project card focus view in the list viewport
    scrollToProjectInList(project.id);
  };

  const getDetailLink = (p: any) => {
    const areaSlug = p.area.toLowerCase().replace(/\s+/g, '-') + '--property';
    return `/projects/${areaSlug}/${p.slug}`;
  };

  return (
    <div className="pt-20 bg-stone-50 font-sans text-stone-900 h-screen overflow-hidden flex flex-col">
      <SEO 
        title={language === 'en' ? 'Interactive KL & Selangor property map guide' : '吉隆坡 & 雪兰莪互动落点地图指南'}
        description="Browse all residential property investments in Kuala Lumpur and Selangor through an interactive map explorer."
      />

      {/* Map page header */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 shadow-xs z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-stone-400 hover:text-stone-900 transition-colors p-1.5 hover:bg-stone-100 rounded-md">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <Compass className="h-5 w-5 text-muji-sand animate-spin-slow" />
              {language === 'en' ? 'Interactive Free Map Search' : '免费互动地图寻房'}
            </h1>
            <p className="text-xs text-stone-500 font-medium font-sans">
              {language === 'en' ? 'Real-time open georeferencing without limits or login' : '免注册、零延迟，实时在雪隆重点发展区块找到极具潜力房产'}
            </p>
          </div>
        </div>
      </div>

      {/* Map Content Section */}
      <div className="flex-grow flex flex-col md:flex-row product-layout overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-full md:w-[450px] bg-white border-r border-stone-200 shadow-sm flex flex-col h-[400px] md:h-full md:overflow-hidden z-10 flex-shrink-0">
          <div className="p-4 border-b border-stone-100 flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search map properties...' : '搜索定位盘名称/区域...'}
                className="w-full bg-stone-50 pl-10 pr-4 py-3 rounded-md text-xs placeholder:text-stone-400 border border-stone-200 hover:border-stone-300 focus:bg-white focus:ring-1 focus:ring-muji-sand outline-none transition-all font-bold"
              />
            </div>

            <div className="flex gap-2 text-[10px] font-black tracking-widest uppercase">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2 text-center rounded-sm border transition-all ${activeTab === 'all' ? 'bg-muji-text text-white border-muji-text shadow-xs' : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'}`}
              >
                {language === 'en' ? 'All' : '全部'}
              </button>
              <button
                onClick={() => setActiveTab('launch')}
                className={`flex-1 py-2 text-center rounded-sm border transition-all ${activeTab === 'launch' ? 'bg-muji-text text-white border-muji-text shadow-xs' : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'}`}
              >
                {language === 'en' ? 'Launch' : '新开盘'}
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 py-2 text-center rounded-sm border transition-all ${activeTab === 'completed' ? 'bg-muji-text text-white border-muji-text shadow-xs' : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'}`}
              >
                {language === 'en' ? 'Completed' : '现房'}
              </button>
            </div>
          </div>

          <div ref={listContainerRef} className="flex-grow overflow-y-auto divide-y divide-stone-100 bg-stone-50/50 relative">
            {loading ? (
              <div className="p-8 text-center text-xs text-stone-500 font-bold">
                <span className="w-4 h-4 rounded-full border-2 border-stone-400 border-t-transparent animate-spin inline-block mr-2" />
                Loading Database...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="p-12 text-center">
                <MapPin className="h-8 w-8 text-stone-300 mx-auto mb-3" />
                <p className="text-xs text-stone-500 font-bold">
                  {language === 'en' ? 'No projects match parameters.' : '未找到匹配结果'}
                </p>
              </div>
            ) : (
              filteredProjects.map((p) => {
                const isSelected = selectedProject?.id === p.id;
                
                if (isSelected) {
                  return (
                    <motion.div
                      key={p.id}
                      id={`project-item-${p.id}`}
                      initial={{ opacity: 0.9, y: 4 }}
                      animate={{ opacity: 1, y: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => handleFlyToProject(p)}
                      className="p-5 bg-stone-900 text-white select-none relative shadow-xl border-l-4 border-muji-sand flex flex-col gap-3 font-sans transition-all z-10 mx-2 my-3 rounded-md cursor-pointer hover:bg-stone-850"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded border border-stone-800">
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-muji-sand text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded">
                          {p.status}
                        </div>
                      </div>

                      <div className="flex-grow">
                        <span className="text-[8px] font-bold text-stone-400 tracking-widest block uppercase mb-1">{p.developer}</span>
                        <h4 className="text-xs font-black text-white">{p.name}</h4>
                        <p className="text-[10px] text-stone-300 font-bold flex items-center gap-1 mt-1.5 leading-tight">
                          <MapPin size={11} className="text-muji-sand flex-shrink-0" />
                          {p.location}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-800 pt-3 mt-1.5">
                        <div className="min-w-0">
                          <span className="text-[8px] font-semibold text-stone-400 block uppercase tracking-wide">Min Price Guidance</span>
                          <span className="text-[11px] font-black text-muji-sand block">{p.priceRange}</span>
                        </div>
                        <Link
                          to={getDetailLink(p)}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white hover:bg-muji-sand text-stone-950 hover:text-white font-black text-[9px] uppercase tracking-widest py-2 px-3 rounded-sm flex items-center gap-1.5 transition-all shadow-md flex-shrink-0"
                        >
                          {language === 'en' ? 'Landing Page' : '查看详情'}
                          <ExternalLink size={9.5} />
                        </Link>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <div
                    key={p.id}
                    id={`project-item-${p.id}`}
                    onClick={() => handleFlyToProject(p)}
                    className="p-4 transition-all cursor-pointer flex gap-4 hover:bg-stone-50 select-none relative bg-white border-l-4 border-transparent hover:border-stone-200"
                  >
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded object-cover border border-stone-200 shadow-xs flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-black truncate text-stone-900 group-hover:text-muji-sand">{p.name}</h4>
                        <p className="text-[10px] text-stone-400 font-bold truncate flex items-center gap-1 mt-0.5">
                          <MapPin size={10} /> {p.location}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] font-black text-muji-sand">
                          {p.priceRange}
                        </span>
                        <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wide border ${p.status === 'Completed' ? 'bg-stone-50 border-stone-200 text-stone-600' : 'bg-orange-50 border-orange-100 text-orange-700'}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Map Stage container wrapper and selected card overlay */}
        <div className="flex-grow relative h-[400px] md:h-full border-t md:border-t-0 border-stone-200 md:p-4 bg-stone-50">
          <div className="w-full h-full rounded-2xl overflow-hidden border border-stone-200 shadow-md relative z-0 bg-stone-100">
            <div ref={mapContainer} className="absolute inset-0 w-full h-full z-0" id="leaflet-canvas-container" />
          </div>
        </div>

      </div>
    </div>
  );
};
