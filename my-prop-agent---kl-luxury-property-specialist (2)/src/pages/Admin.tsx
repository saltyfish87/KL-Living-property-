import React, { useState, useEffect, useRef, useMemo } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { PROJECTS, BLOG_POSTS, AREAS } from '../data';
import { Project, BlogPost, Area, ContactInquiry } from '../types';
import { fetchTrackedQueries, deleteTrackedQuery, TrackedQuery } from '../lib/tracker';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Layout, 
  BookOpen, 
  LogOut, 
  CheckCircle2,
  AlertCircle,
  Database,
  Image as ImageIcon,
  ArrowLeft,
  Sparkles,
  Loader2,
  Search,
  MapPin,
  Building,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = 'shyanyeews@gmail.com';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errorMsg = error instanceof Error ? error.message : String(error);
  const isOffline = errorMsg.includes('the client is offline') || 
                    errorMsg.includes('offline') || 
                    errorMsg.includes('Could not reach Cloud Firestore') ||
                    errorMsg.includes('Failed to get document');
                    
  const errInfo = {
    error: errorMsg,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  if (isOffline) {
    console.warn('Firestore Error (Operating in offline fallback): ', JSON.stringify(errInfo));
  } else {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  }
  return errInfo.error;
}

const convertDriveUrl = (url: string): string => {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const idMatch = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
    if (idMatch && idMatch[1]) {
      // Using thumbnail URL as it's more reliable for direct display in many environments
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1600`;
    }
  }
  return url;
};

const ListInput = React.memo(({ label, items, onChange }: { label: string, items: string[], onChange: (newItems: string[]) => void }) => {
  const handleItemChange = (idx: number, value: string) => {
    const newItems = [...items];
    newItems[idx] = convertDriveUrl(value);
    onChange(newItems);
  };

  const addItem = () => onChange([...(items || []), '']);
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">{label}</label>
      <div className="space-y-2">
        {items?.map((item, idx) => (
          <div key={`item-${idx}`} className="flex gap-2">
            <input 
              className="muji-input flex-grow py-2 text-sm"
              value={item}
              placeholder="Enter value"
              onChange={e => handleItemChange(idx, e.target.value)}
            />
            <button 
              type="button"
              onClick={() => removeItem(idx)}
              className="p-2 text-red-400 hover:bg-red-50 rounded-sm"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button 
          type="button"
          onClick={addItem}
          className="text-[10px] font-bold uppercase tracking-widest text-muji-oak flex items-center gap-1 hover:underline"
        >
          <Plus size={12} /> Add Item
        </button>
      </div>
    </div>
  );
});

const LayoutsListInput = React.memo(({ layouts, onChange, onSave }: { layouts: any[], onChange: (newLayouts: any[]) => void, onSave: () => void }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Unit Layouts (Structured Details)</label>
      <button 
        type="button" 
        onClick={onSave}
        className="text-[10px] font-bold uppercase tracking-widest text-muji-oak flex items-center gap-2 hover:bg-muji-beige p-2 transition-all rounded-sm"
      >
        <Save size={12} /> Save Layouts to DB
      </button>
    </div>
    <div className="space-y-6">
      {layouts?.map((layout, idx) => {
        const layoutId = layout.id || `layout-${idx}`;
        return (
          <div key={layoutId} className="p-6 border border-muji-border bg-white rounded-sm relative group shadow-sm">
            <button 
              type="button"
              onClick={() => onChange(layouts.filter((_, i) => i !== idx))}
              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white shadow-md hover:bg-muji-text rounded-full z-10"
            >
              <Trash2 size={12} />
            </button>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input 
                  placeholder="Layout Name (e.g. Type A)" 
                  className="muji-input w-full py-2 text-xs font-semibold" 
                  value={layout.name} 
                  onChange={e => {
                    const next = [...layouts];
                    next[idx] = { ...next[idx], name: e.target.value };
                    onChange(next);
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    placeholder="Size (e.g. 800 sqft)" 
                    className="muji-input w-full py-2 text-xs" 
                    value={layout.size} 
                    onChange={e => {
                      const next = [...layouts];
                      next[idx] = { ...next[idx], size: e.target.value };
                      onChange(next);
                    }}
                  />
                  <input 
                    placeholder="Rooms (e.g. 3 Bed)" 
                    className="muji-input w-full py-2 text-xs" 
                    value={layout.rooms} 
                    onChange={e => {
                      const next = [...layouts];
                      next[idx] = { ...next[idx], rooms: e.target.value };
                      onChange(next);
                    }}
                  />
                </div>
                <div className="relative">
                  <textarea 
                    placeholder="Short description..." 
                    className="muji-input w-full h-24 py-3 text-[10px] resize-none" 
                    value={layout.description} 
                    onChange={e => {
                      const next = [...layouts];
                      next[idx] = { ...next[idx], description: e.target.value };
                      onChange(next);
                    }}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <input 
                  placeholder="Layout Image URL (Google Drive compatible)" 
                  className="muji-input w-full py-2 text-[10px]" 
                  value={layout.imageUrl} 
                  onChange={e => {
                    const val = convertDriveUrl(e.target.value);
                    const next = [...layouts];
                    next[idx] = { ...next[idx], imageUrl: val };
                    onChange(next);
                  }}
                />
                <div className="aspect-video relative rounded-sm overflow-hidden border border-muji-border bg-muji-beige flex items-center justify-center p-2">
                  {layout.imageUrl ? (
                    <img src={layout.imageUrl} className="max-w-full max-h-full object-contain" alt="Preview" />
                  ) : (
                    <span className="text-[8px] uppercase tracking-widest text-muji-sand">Image Preview</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button 
        type="button"
        onClick={() => onChange([...(layouts || []), { id: Date.now().toString(), name: '', size: '', rooms: '', description: '', imageUrl: '' }])}
        className="w-full py-4 border-2 border-dashed border-muji-sand/30 text-muji-text-muted hover:border-muji-oak hover:text-muji-oak transition-all text-xs font-bold uppercase tracking-widest rounded-sm bg-muji-beige/10"
      >
        <Plus size={14} className="inline mr-2" /> Add New Layout
      </button>
    </div>
  </div>
));

const AmenitiesListInput = React.memo(({ items, onChange }: { items: any[], onChange: (newItems: any[]) => void }) => {
  const handleItemChange = (idx: number, field: string, value: string) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: value };
    onChange(next);
  };

  const addItem = () => onChange([...(items || []), { id: Date.now().toString(), name: '', distance: '' }]);
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Nearby Amenities (Name & Distance)</label>
      <div className="space-y-3">
        {items?.map((item, idx) => {
          const itemId = item.id || `amenity-${idx}`;
          return (
            <div key={itemId} className="flex gap-4 p-4 border border-muji-border bg-muji-beige/10 rounded-sm group relative">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  placeholder="Amenity Name (e.g. Pavilion Bukit Jalil)" 
                  className="muji-input w-full py-2 text-xs" 
                  value={item.name} 
                  onChange={e => handleItemChange(idx, 'name', e.target.value)}
                />
                <input 
                  placeholder="Distance (e.g. 500m / 5 mins)" 
                  className="muji-input w-full py-2 text-xs" 
                  value={item.distance} 
                  onChange={e => handleItemChange(idx, 'distance', e.target.value)}
                />
              </div>
              <button 
                type="button"
                onClick={() => removeItem(idx)}
                className="p-2 text-red-400 hover:bg-red-50 rounded-sm self-start"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
        <button 
          type="button"
          onClick={addItem}
          className="text-[10px] font-bold uppercase tracking-widest text-muji-oak flex items-center gap-1 hover:underline"
        >
          <Plus size={12} /> Add Amenity
        </button>
      </div>
    </div>
  );
});

const GalleryItemsListInput = React.memo(({ items, onChange, onAutoDescribe, isExtracting }: { items: any[], onChange: (newItems: any[]) => void, onAutoDescribe: (url: string, index: number, field: 'gallery' | 'layouts') => void, isExtracting: Record<string, boolean> }) => {
  const handleItemChange = (idx: number, field: string, value: string) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: value };
    onChange(next);
    return next;
  };

  return (
    <div className="space-y-6">
      <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Detailed Gallery (with Descriptions)</label>
      <div className="space-y-4">
        {items?.map((item, idx) => {
          const itemId = item.id || `gallery-${idx}`;
          return (
            <div key={itemId} className="p-4 border border-muji-border bg-white rounded-sm relative group shadow-sm flex gap-4">
              <button 
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== idx))}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white shadow-md hover:bg-muji-text rounded-full z-10"
              >
                <Trash2 size={12} />
              </button>
              
              <div className="w-32 h-32 bg-muji-beige rounded-sm overflow-hidden flex-shrink-0 border border-muji-border">
                {item.url ? (
                  <img src={convertDriveUrl(item.url)} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[8px] uppercase text-muji-sand">No Image</div>
                )}
              </div>

              <div className="flex-grow space-y-3">
                <input 
                  placeholder="Image URL (Google Drive compatible)" 
                  className="muji-input w-full py-2 text-[10px]" 
                  value={item.url} 
                  onChange={e => {
                    const val = convertDriveUrl(e.target.value);
                    const next = handleItemChange(idx, 'url', val);
                    
                    // Auto-describe if empty
                    if (val && !item.description) {
                      onAutoDescribe(val, idx, 'gallery');
                    }
                  }}
                />
                <div className="relative">
                  <textarea 
                    placeholder="Image description or caption..." 
                    className="muji-input w-full h-16 py-2 pr-10 text-[10px] resize-none" 
                    value={item.description} 
                    onChange={e => handleItemChange(idx, 'description', e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => onAutoDescribe(item.url, idx, 'gallery')}
                    disabled={!item.url || isExtracting[`gallery-${idx}`]}
                    className="absolute bottom-2 right-2 p-1.5 text-muji-sand hover:text-muji-oak transition-colors disabled:opacity-30"
                    title="Generate Description with AI"
                  >
                    {isExtracting[`gallery-${idx}`] ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Sparkles size={12} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <button 
          type="button"
          onClick={() => onChange([...(items || []), { id: Date.now().toString(), url: '', description: '' }])}
          className="w-full py-4 border-2 border-dashed border-muji-sand/30 text-muji-text-muted hover:border-muji-oak hover:text-muji-oak transition-all text-xs font-bold uppercase tracking-widest rounded-sm"
        >
          <Plus size={14} className="inline mr-2" /> Add Gallery Photo
        </button>
      </div>
    </div>
  );
});

export const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'areas' | 'queries' | 'inquiries' | 'seo'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [trackedQueries, setTrackedQueries] = useState<TrackedQuery[]>([]);
  const [querySearch, setQuerySearch] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingType, setEditingType] = useState<'project' | 'post' | 'area'>('project');

  // Dynamic SEO Configuration States
  const [seoVerification, setSeoVerification] = useState('');
  const [seoTitleSuffix, setSeoTitleSuffix] = useState(' | Shyan Yee | Premium Real Estate Advisor');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [seoSaveSuccess, setSeoSaveSuccess] = useState(false);
  const [seoSaving, setSeoSaving] = useState(false);

  // Inquiries and Email states
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [inquirySearch, setInquirySearch] = useState('');
  const [web3formsKey, setWeb3formsKey] = useState('');
  const [registeringKey, setRegisteringKey] = useState(false);

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact lead permanently? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, 'contact_inquiries', id));
      await fetchData();
    } catch (err) {
      console.error("Error deleting contact lead:", err);
      alert("Failed to delete lead: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u && u.email === ADMIN_EMAIL) {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const projectsSnap = await getDocs(collection(db, 'projects'));
      const dbProjects = projectsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Project));
      
      // Data Repair Logic: Ensure "The Aldenz" (ID 2), "Queenswoodz" (ID 1) and "Kingswoodz" (ID 4) always have correct technical info
      const repairedDbProjects = dbProjects.map(p => {
        if (p.id === '1' || p.name.toLowerCase().includes('queenswoodz')) {
          const staticQueenswoodz = PROJECTS.find(sp => sp.id === '1');
          if (staticQueenswoodz) {
            return {
              ...staticQueenswoodz,
              // Preserve user assets
              thumbnail: p.thumbnail || staticQueenswoodz.thumbnail,
              gallery: (p.gallery && p.gallery.length > 0) ? p.gallery : staticQueenswoodz.gallery,
              layouts: staticQueenswoodz.layouts.map(sl => {
                const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                return {
                  ...sl,
                  imageUrl: (sl.imageUrl && sl.imageUrl.includes('drive.google.com')) ? sl.imageUrl : (dbLayout?.imageUrl || sl.imageUrl)
                };
              }),
              minPrice: p.minPrice || staticQueenswoodz.minPrice,
              priceRange: p.priceRange || staticQueenswoodz.priceRange
            };
          }
        }
        if (p.id === '2' || p.name.toLowerCase().includes('aldenz')) {
          const staticAldenz = PROJECTS.find(sp => sp.id === '2');
          if (staticAldenz) {
            return {
              ...staticAldenz,
              // Preserve user assets
              thumbnail: p.thumbnail || staticAldenz.thumbnail,
              gallery: (p.gallery && p.gallery.length > 0) ? p.gallery : staticAldenz.gallery,
              layouts: staticAldenz.layouts.map(sl => {
                const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                return {
                  ...sl,
                  imageUrl: (sl.imageUrl && sl.imageUrl.includes('drive.google.com')) ? sl.imageUrl : (dbLayout?.imageUrl || sl.imageUrl)
                };
              }),
              minPrice: p.minPrice || staticAldenz.minPrice,
              priceRange: p.priceRange || staticAldenz.priceRange
            };
          }
        }
        if (p.id === '3' || p.name.toLowerCase().includes('parkside')) {
          const staticParkside = PROJECTS.find(sp => sp.id === '3');
          if (staticParkside) {
            return {
              ...staticParkside,
              // Preserve user assets
              thumbnail: p.thumbnail || staticParkside.thumbnail,
              gallery: (p.gallery && p.gallery.length > 0) ? p.gallery : staticParkside.gallery,
              galleryItems: (p.galleryItems && p.galleryItems.length > 0) ? p.galleryItems : staticParkside.galleryItems,
              mapImageUrl: p.mapImageUrl || staticParkside.mapImageUrl,
              layouts: staticParkside.layouts.map(sl => {
                const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                return {
                  ...sl,
                  imageUrl: (sl.imageUrl && sl.imageUrl.includes('drive.google.com')) ? sl.imageUrl : (dbLayout?.imageUrl || sl.imageUrl)
                };
              }),
              minPrice: p.minPrice || staticParkside.minPrice,
              priceRange: p.priceRange || staticParkside.priceRange
            };
          }
        }
        if (p.id === '4' || p.name.toLowerCase().includes('kingswoodz')) {
          const staticKingswoodz = PROJECTS.find(sp => sp.id === '4');
          if (staticKingswoodz) {
            return {
              ...staticKingswoodz,
              // Preserve user assets
              thumbnail: p.thumbnail || staticKingswoodz.thumbnail,
              gallery: (p.gallery && p.gallery.length > 0) ? p.gallery : staticKingswoodz.gallery,
              layouts: staticKingswoodz.layouts.map(sl => {
                const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                return {
                  ...sl,
                  imageUrl: dbLayout?.imageUrl || sl.imageUrl
                };
              }),
              minPrice: p.minPrice && p.minPrice !== 620000 ? p.minPrice : staticKingswoodz.minPrice,
              priceRange: p.priceRange && p.priceRange !== 'From RM 620,000+' ? p.priceRange : staticKingswoodz.priceRange
            };
          }
        }
        if (p.id === '5' || p.name.toLowerCase().includes('veladaz')) {
          const staticVeladaz = PROJECTS.find(sp => sp.id === '5');
          if (staticVeladaz) {
            return {
              ...staticVeladaz,
              // Preserve user assets
              thumbnail: p.thumbnail || staticVeladaz.thumbnail,
              gallery: (p.gallery && p.gallery.length > 0) ? p.gallery : staticVeladaz.gallery,
              galleryItems: (p.galleryItems && p.galleryItems.length > 0) ? p.galleryItems : staticVeladaz.galleryItems,
              mapImageUrl: p.mapImageUrl || staticVeladaz.mapImageUrl,
              layouts: staticVeladaz.layouts.map(sl => {
                const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                return {
                  ...sl,
                  imageUrl: dbLayout?.imageUrl && !dbLayout.imageUrl.includes('unsplash.com') && !dbLayout.imageUrl.includes('photo-') ? dbLayout.imageUrl : sl.imageUrl
                };
              }),
              minPrice: p.minPrice || staticVeladaz.minPrice,
              priceRange: p.priceRange || staticVeladaz.priceRange
            };
          }
        }
        if (p.id === '6' || p.name.toLowerCase().includes('vividz')) {
          const staticVividz = PROJECTS.find(sp => sp.id === '6');
          if (staticVividz) {
            return {
              ...staticVividz,
              // Preserve user assets
              thumbnail: p.thumbnail || staticVividz.thumbnail,
              gallery: (p.gallery && p.gallery.length > 0) ? p.gallery : staticVividz.gallery,
              galleryItems: (p.galleryItems && p.galleryItems.length > 0) ? p.galleryItems : staticVividz.galleryItems,
              mapImageUrl: p.mapImageUrl || staticVividz.mapImageUrl,
              layouts: staticVividz.layouts.map(sl => {
                const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                return {
                  ...sl,
                  imageUrl: dbLayout?.imageUrl && !dbLayout.imageUrl.includes('unsplash.com') && !dbLayout.imageUrl.includes('photo-') ? dbLayout.imageUrl : sl.imageUrl
                };
              }),
              minPrice: p.minPrice || staticVividz.minPrice,
              priceRange: p.priceRange || staticVividz.priceRange
            };
          }
        }
        return p;
      });

      const dbIds = new Set(repairedDbProjects.map(p => p.id));
      const mergedProjects = [
        ...repairedDbProjects,
        ...PROJECTS.filter(p => !dbIds.has(p.id))
      ];
      setProjects(mergedProjects);

      const postsSnap = await getDocs(collection(db, 'blogPosts'));
      const dbPosts = postsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost));
      setPosts(dbPosts.length > 0 ? dbPosts : BLOG_POSTS);

      const areasSnap = await getDocs(collection(db, 'areas'));
      const dbAreas = areasSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Area));
      
      const dbAreaIds = new Set(dbAreas.map(a => a.id));
      const mergedAreas = [
        ...dbAreas,
        ...AREAS.filter(a => !dbAreaIds.has(a.id))
      ];
      setAreas(mergedAreas);

      // Fetch tracked search queries
      try {
        const queriesList = await fetchTrackedQueries();
        setTrackedQueries(queriesList);
      } catch (qErr) {
        console.error("Failed to fetch tracked search queries:", qErr);
      }

      // Fetch dynamic SEO settings
      try {
        const seoSnap = await getDoc(doc(db, 'settings', 'seo'));
        if (seoSnap.exists()) {
          const seoData = seoSnap.data();
          if (seoData.googleSiteVerification !== undefined) setSeoVerification(seoData.googleSiteVerification);
          if (seoData.metaTitleSuffix !== undefined) setSeoTitleSuffix(seoData.metaTitleSuffix);
          if (seoData.metaDescription !== undefined) setSeoDesc(seoData.metaDescription);
          if (seoData.metaKeywords !== undefined) setSeoKeywords(seoData.metaKeywords);
          if (seoData.web3formsAccessKey !== undefined) setWeb3formsKey(seoData.web3formsAccessKey);
        }
      } catch (seoErr) {
        console.error("Failed to fetch custom SEO configurations:", seoErr);
      }

      // Fetch contact inquiries
      try {
        const inquiriesSnap = await getDocs(collection(db, 'contact_inquiries'));
        const inquiriesList = inquiriesSnap.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.name || '',
            email: d.email || '',
            phone: d.phone || '',
            inquiryType: d.inquiryType || '',
            message: d.message || '',
            createdAt: d.createdAt
          } as ContactInquiry;
        }).sort((a, b) => {
          const t1 = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
          const t2 = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
          return t2 - t1;
        });
        setInquiries(inquiriesList);
      } catch (inqErr) {
        console.error("Failed to fetch contact inquiries leads:", inqErr);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'collections');
    }
  };

  // Memoized Search Analytics calculation
  const analytics = useMemo(() => {
    let totalVolume = 0;
    let uniqueTermsCount = 0;
    let topLocation = 'None';
    let topLocationCount = 0;
    let topType = 'None';
    let topTypeCount = 0;

    trackedQueries.forEach(q => {
      totalVolume += q.count;
      if (q.query.startsWith('area:')) {
        const areaName = q.query.replace('area:', '');
        if (q.count > topLocationCount) {
          topLocationCount = q.count;
          topLocation = areaName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      } else if (q.query.startsWith('type:')) {
        const typeName = q.query.replace('type:', '');
        if (q.count > topTypeCount) {
          topTypeCount = q.count;
          topType = typeName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      } else {
        uniqueTermsCount += 1;
      }
    });

    return {
      totalVolume,
      uniqueTermsCount,
      topLocation,
      topLocationCount,
      topType,
      topTypeCount
    };
  }, [trackedQueries]);

  const handleClearAllQueries = async () => {
    if (window.confirm("Are you sure you want to clear ALL search query tracking insights? This action is irreversible.")) {
      try {
        setLoading(true);
        for (const q of trackedQueries) {
          if (q.id) {
            await deleteTrackedQuery(q.id);
          }
        }
        await fetchData();
      } catch (err) {
        console.error("Error clearing tracked queries:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteQuery = async (id: string) => {
    try {
      await deleteTrackedQuery(id);
      await fetchData();
    } catch (err) {
      console.error("Error deleting query:", err);
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => auth.signOut();

  const handleSyncToFirestore = async () => {
    if (!window.confirm('This will restore all default projects from the code to your database. This fixes missing information and updates price/size ranges for all projects. Continue?')) return;
    
    setLoading(true);
    try {
      // Sync Projects
      for (const p of PROJECTS) {
        await setDoc(doc(db, 'projects', p.id), p, { merge: true });
      }
      // Sync Blog
      for (const b of BLOG_POSTS) {
        await setDoc(doc(db, 'blogPosts', b.id), b, { merge: true });
      }
      // Sync Areas
      for (const a of AREAS) {
        await setDoc(doc(db, 'areas', a.id), a, { merge: true });
      }
      await fetchData();
      alert('Portfolio successfully updated and restored!');
    } catch (err) {
      setError(handleFirestoreError(err, OperationType.WRITE, 'sync'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        if (isEditing && editingItem) {
          e.preventDefault();
          saveProject(undefined, false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, editingItem]);

  const [autoSave, setAutoSave] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoSave && isEditing && editingItem) {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(() => {
        saveProject(undefined, false);
      }, 3000);
    }
    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [editingItem, autoSave]);

  const saveProject = async (e?: React.FormEvent, shouldClose = true) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      if (editingType === 'area') {
        const id = editingItem.id || Date.now().toString();
        await setDoc(doc(db, 'areas', id), { ...editingItem, id }, { merge: true });
      } else if (editingType === 'project') {
        const payload = {
          ...editingItem,
          minPrice: Number(editingItem.minPrice),
          completionYear: Number(editingItem.completionYear),
          totalUnits: Number(editingItem.totalUnits),
        };

        const id = editingItem.id || Date.now().toString();
        await setDoc(doc(db, 'projects', id), { ...payload, id }, { merge: true });
      } else if (editingType === 'post') {
        const id = editingItem.id || Date.now().toString();
        await setDoc(doc(db, 'blogPosts', id), { ...editingItem, id }, { merge: true });
      }
      
      await fetchData();
      if (shouldClose) {
        setIsEditing(false);
        setEditingItem(null);
      }
    } catch (err) {
      setError(handleFirestoreError(err, OperationType.WRITE, editingType + 's'));
    } finally {
      setLoading(false);
    }
  };



  const [isExtracting, setIsExtracting] = useState<Record<string, boolean>>({});

  const autoDescribe = async (url: string, index: number, field: 'gallery' | 'layouts') => {
    if (!url) return;
    const loadingKey = `${field}-${index}`;
    setIsExtracting(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      const res = await fetch("/api/describe-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI description from server");
      }

      const data = await res.json();
      const description = data.description?.trim() || "";
      if (description) {
        if (field === 'gallery') {
          const nextGallery = [...(editingItem.galleryItems || [])];
          nextGallery[index] = { ...nextGallery[index], description };
          setEditingItem({ ...editingItem, galleryItems: nextGallery });
        } else if (field === 'layouts') {
          // AI description for layouts removed as per user request
          return;
        }
      }
    } catch (err) {
      console.error("AI Description Error:", err);
    } finally {
      setIsExtracting(prev => ({ ...prev, [loadingKey]: false }));
    }
  };



  const deleteProject = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      await fetchData();
    } catch (err) {
      setError(handleFirestoreError(err, OperationType.DELETE, `projects/${id}`));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muji-white">
        <div className="w-12 h-12 border-4 border-muji-oak border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muji-white p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-12 muji-card text-center"
        >
          <div className="w-20 h-20 bg-muji-beige rounded-full flex items-center justify-center mx-auto mb-8">
            <Database className="text-muji-oak" size={32} />
          </div>
          <h1 className="text-3xl font-serif text-muji-text mb-4">Content Manager</h1>
          <p className="text-muji-text-muted mb-12 font-light">
            Authorized access only. Please sign in with your Shyan Yee advisor account.
          </p>
          <button 
            onClick={handleLogin}
            className="muji-button-primary w-full flex items-center justify-center gap-4"
          >
            Sign in with Google
          </button>
          <Link to="/" className="inline-block mt-8 text-xs font-bold uppercase tracking-widest text-muji-sand hover:text-muji-oak transition-colors">
            Back to Public Site
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muji-white pt-12 pb-24">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-muji-border pb-8 text-muji-text">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muji-oak">System Management</span>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] text-green-500 font-bold">Authorized</span>
            </div>
            <h1 className="text-4xl font-serif">Welcome, Shyan Yee</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSyncToFirestore}
              className="px-6 py-2 bg-muji-oak text-white text-[10px] font-bold uppercase tracking-widest hover:bg-muji-text transition-colors flex items-center gap-2 shadow-sm"
            >
              <Database size={14} /> Restore / Update Portfolio
            </button>
            <button 
              onClick={handleLogout}
              className="muji-button-secondary py-2 flex items-center gap-2"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-muji-beige/50 p-6 rounded-sm border border-muji-sand/30 mb-12 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="text-muji-oak w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-light text-muji-text-muted leading-relaxed">
              Changes made here are <span className="font-semibold text-muji-text">live immediately</span> on the website. 
              For images, paste any public image URL or a Google Drive link.
            </p>
          </div>
          <div className="flex items-start gap-4 pl-9">
            <AlertCircle className="text-muji-sand w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-light text-muji-text-muted/80 leading-relaxed italic">
              Tip: If Google Drive images don't appear, ensure the file sharing is set to <span className="font-semibold">"Anyone with the link can view"</span> in Google Drive.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-muji-border">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'projects' ? 'text-muji-text' : 'text-muji-text-muted'}`}
          >
            Projects ({projects.length})
            {activeTab === 'projects' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-muji-oak" />}
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'blog' ? 'text-muji-text' : 'text-muji-text-muted'}`}
          >
            Blog Posts ({posts.length})
            {activeTab === 'blog' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-muji-oak" />}
          </button>
          <button 
            onClick={() => setActiveTab('areas')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'areas' ? 'text-muji-text' : 'text-muji-text-muted'}`}
          >
            Areas ({areas.length})
            {activeTab === 'areas' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-muji-oak" />}
          </button>
          <button 
            onClick={() => setActiveTab('queries')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'queries' ? 'text-muji-text' : 'text-muji-text-muted'}`}
          >
            Search Insights ({trackedQueries.length})
            {activeTab === 'queries' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-muji-oak" />}
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'inquiries' ? 'text-muji-text' : 'text-muji-text-muted'}`}
          >
            Contact Leads ({inquiries.length})
            {activeTab === 'inquiries' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-muji-oak" />}
          </button>
          <button 
            onClick={() => setActiveTab('seo')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'seo' ? 'text-muji-text' : 'text-muji-text-muted'}`}
          >
            SEO & Email Settings
            {activeTab === 'seo' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-muji-oak" />}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'projects' ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Property Projects</h2>
              <button 
                onClick={() => {
                        setEditingItem({
                          id: '',
                          name: '',
                          slug: '',
                          area: 'Central Park Damansara',
                          state: 'Selangor',
                          location: 'Damansara Perdana, Petaling Jaya',
                          developer: 'EXSIM Group',
                          minPrice: 0,
                          priceRange: '',
                          thumbnail: '',
                          status: 'New Launch',
                          tagline: '',
                          overview: '',
                          keyFeatures: [],
                          locationAdvantage: [],
                          investmentHighlights: [],
                          nearbyAmenities: [],
                          gallery: [],
                          galleryItems: [],
                          layouts: [],
                          sizeSqft: '',
                          rooms: '',
                          landSize: '',
                          towerCount: '',
                          floorCount: '',
                          maintenanceFee: '',
                          commercialTitle: false,
                          propertyType: 'Serviced Residence',
                          tenure: 'Leasehold',
                          completionYear: 2028,
                          totalUnits: 0,
                          droneViewUrl: '',
                          virtualTourUrl: '',
                          mapImageUrl: ''
                        });
                    setIsEditing(true);
                  }}
                className="muji-button-primary py-2 px-6 flex items-center gap-2 text-xs"
              >
                <Plus size={16} /> Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <div key={project.id} className="bg-white muji-card overflow-hidden flex flex-col group">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-muji-text text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-2">{project.area}</p>
                    <h3 className="text-2xl font-serif mb-4">{project.name}</h3>
                    <p className="text-sm font-light text-muji-text-muted line-clamp-2 mb-6">{project.tagline}</p>
                    <div className="text-lg font-medium text-muji-text mb-8">From RM {project.minPrice.toLocaleString()}</div>
                    
                    <div className="flex gap-4 pt-6 border-t border-muji-border">
                      <button 
                        onClick={() => {
                          setEditingType('project');
                          setEditingItem(project);
                          setIsEditing(true);
                        }}
                        className="flex-grow py-3 border border-muji-border hover:border-muji-oak transition-colors flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-3 border border-muji-border hover:border-red-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'blog' ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Articles & Insights</h2>
              <button 
                onClick={() => {
                  setEditingType('post');
                  setEditingItem({
                    id: '',
                    slug: '',
                    title: '',
                    excerpt: '',
                    content: '',
                    date: new Date().toLocaleDateString(),
                    author: 'Shyan Yee',
                    category: 'Market Trends'
                  });
                  setIsEditing(true);
                }}
                className="muji-button-primary py-2 px-6 flex items-center gap-2 text-xs"
              >
                <Plus size={16} /> New Article
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map(post => (
                <div key={post.id} className="bg-white muji-card p-8 flex flex-col group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muji-oak">{post.category}</span>
                    <span className="text-[10px] text-muji-text-muted">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-serif mb-4 group-hover:text-muji-oak transition-colors">{post.title}</h3>
                  <p className="text-sm font-light text-muji-text-muted line-clamp-2 mb-8">{post.excerpt}</p>
                  <div className="flex gap-4 pt-6 border-t border-muji-border mt-auto">
                    <button 
                      onClick={() => {
                        setEditingType('post');
                        setEditingItem(post);
                        setIsEditing(true);
                      }}
                      className="flex-grow py-3 border border-muji-border hover:border-muji-oak transition-colors flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button 
                      onClick={async () => {
                        if (window.confirm('Delete article?')) {
                          await deleteDoc(doc(db, 'blogPosts', post.id));
                          fetchData();
                        }
                      }}
                      className="p-3 border border-muji-border hover:border-red-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'areas' ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Manage Areas</h2>
              <button 
                onClick={() => {
                  setEditingType('area');
                  setEditingItem({
                    id: '',
                    slug: '',
                    name: '',
                    description: '',
                    whyInvest: [],
                    priceTrend: '',
                    rentalDemand: '',
                    recommendedProjectIds: []
                  });
                  setIsEditing(true);
                }}
                className="muji-button-primary py-2 px-6 flex items-center gap-2 text-xs"
              >
                <Plus size={16} /> Add Area
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {areas.map(area => (
                 <div key={area.id} className="bg-white muji-card p-8 flex flex-col">
                    <h3 className="text-2xl font-serif mb-4">{area.name}</h3>
                    <p className="text-sm font-light text-muji-text-muted line-clamp-3 mb-8">{area.description}</p>
                    <div className="flex gap-4 pt-6 border-t border-muji-border mt-auto">
                      <button 
                        onClick={() => {
                          setEditingType('area');
                          setEditingItem(area);
                          setIsEditing(true);
                        }}
                        className="flex-grow py-3 border border-muji-border hover:border-muji-oak transition-colors flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button 
                        onClick={async () => {
                          if (window.confirm('Delete area?')) {
                            await deleteDoc(doc(db, 'areas', area.id));
                            fetchData();
                          }
                        }}
                        className="p-3 border border-muji-border hover:border-red-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
         ) : activeTab === 'inquiries' ? (
          <div className="bg-white border border-muji-border p-8 md:p-12 text-muji-text">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 text-muji-text font-serif">
              <div>
                <h2 className="text-2xl font-serif">Contact Form Leads & Inquiries</h2>
                <p className="text-sm font-light text-muji-text-muted mt-1 font-sans">
                  View and manage incoming real estate leads and consultant requests submitted via the contact page.
                </p>
              </div>
              <button 
                onClick={fetchData} 
                className="px-6 py-2.5 border border-muji-border text-xs font-bold uppercase tracking-widest hover:border-muji-oak transition-all rounded-sm flex items-center gap-2 text-muji-text bg-white cursor-pointer"
              >
                <Database size={12} /> Sync Leads
              </button>
            </div>

            {/* Filter */}
            <div className="mb-6 flex gap-4 max-w-sm">
              <input
                type="text"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search leads by name, email, brand..."
                className="muji-input flex-1 py-1.5 px-4 text-xs font-mono"
              />
              {inquirySearch && (
                <button 
                  onClick={() => setInquirySearch('')}
                  className="px-4 py-2 border border-muji-border text-xs hover:border-muji-text transition-all text-muji-text cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-light text-muji-text border-collapse">
                <thead>
                  <tr className="border-b border-muji-border text-[10px] uppercase font-bold tracking-widest text-muji-text-muted">
                    <th className="py-4 px-4 font-bold">Date Received</th>
                    <th className="py-4 px-4 font-bold">Inquirer</th>
                    <th className="py-4 px-4 font-bold">Inquiry Type</th>
                    <th className="py-4 px-4 font-bold">Message Details</th>
                    <th className="py-4 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muji-border">
                  {inquiries.filter(liq => {
                    const term = inquirySearch.toLowerCase().trim();
                    if (!term) return true;
                    return liq.name.toLowerCase().includes(term) ||
                           liq.email.toLowerCase().includes(term) ||
                           liq.phone.includes(term) ||
                           liq.inquiryType.toLowerCase().includes(term) ||
                           liq.message.toLowerCase().includes(term);
                  }).map(liq => (
                    <tr key={liq.id} className="hover:bg-muji-white/50 transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap font-mono text-muji-text-muted">
                        {liq.createdAt?.toDate ? liq.createdAt.toDate().toLocaleString() : new Date(liq.createdAt || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-muji-text">{liq.name}</div>
                        <div className="text-[10px] text-muji-text-muted mt-0.5">{liq.email}</div>
                        <div className="text-[10px] font-mono text-muji-sand mt-0.5">{liq.phone}</div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-muji-sand/10 border border-muji-sand/25 text-muji-text font-medium rounded-sm">
                          {liq.inquiryType}
                        </span>
                      </td>
                      <td className="py-4 px-4 max-w-sm">
                        <p className="whitespace-pre-line text-muji-text-muted leading-relaxed" title="Message detail">
                          {liq.message}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => {
                            if (liq.id) handleDeleteInquiry(liq.id);
                          }}
                          className="p-2 border border-muji-border text-muji-text-muted hover:border-red-400 hover:text-red-400 rounded-sm transition-colors cursor-pointer"
                          title="Delete submission"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-muji-text-muted font-light italic text-stone-400">
                        No contact inquiries submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
         ) : activeTab === 'seo' ? (
          <div className="bg-white border border-muji-border p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-serif mb-2">Search Engine Optimization (SEO & AISEO) Settings</h2>
              <p className="text-sm font-light text-muji-text-muted">
                Configure your search presence keywords, Google Site Verification key, description and help layout for traditional search engines, answer engines (AEO/GEO) and AI crawlers to find your portfolio at <a href="https://shyanyee.com" target="_blank" rel="noreferrer" className="underline text-muji-sand font-medium">shyanyee.com</a>.
              </p>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              setSeoSaving(true);
              setSeoSaveSuccess(false);
              try {
                await setDoc(doc(db, 'settings', 'seo'), {
                  googleSiteVerification: seoVerification.trim(),
                  metaTitleSuffix: seoTitleSuffix.trim(),
                  metaDescription: seoDesc.trim(),
                  metaKeywords: seoKeywords.trim(),
                  web3formsAccessKey: "" // Clear out unused Web3Forms key
                });
                setSeoSaveSuccess(true);
                setTimeout(() => setSeoSaveSuccess(false), 4000);
              } catch (err) {
                console.error("Failed to save SEO configuration:", err);
                alert("Error saving: " + (err instanceof Error ? err.message : String(err)));
              } finally {
                setSeoSaving(false);
              }
            }} className="space-y-6 max-w-3xl">

              <div className="bg-emerald-50/50 border border-emerald-200 p-6 space-y-4 rounded-sm">
                <label className="block text-xs font-bold uppercase tracking-widest text-emerald-800">
                  📩 100% Free Email Forwarding Active (No API & No Credit Card)
                </label>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  Your website's contact inquiries are now powered by <strong>FormSubmit.co</strong>, an extremely reliable, lightweight, and 100% free form processing engine. No registration, no API keys, and no credit card are required.
                </p>
                <div className="p-4 bg-white/80 border border-emerald-100 rounded-sm space-y-2 text-xs">
                  <p className="font-semibold text-stone-800">How to activate instant delivery:</p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-stone-600 font-light text-[11px]">
                    <li>Go to your website's <a href="/contact" target="_blank" rel="noreferrer" className="underline font-medium text-emerald-800">Contact Form</a> and send a quick test submission.</li>
                    <li>Open your mailbox (<strong>saltyfish1987@gmail.com</strong>) and locate the one-time confirmation email from FormSubmit.</li>
                    <li>Click the <strong>&quot;Confirm Email Address&quot;</strong> button to authorize the forwarding.</li>
                    <li>That's it! Every future client submission will automatically arrive in your primary inbox instantly.</li>
                  </ol>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muji-text mb-2">
                  Google Site Verification Code
                </label>
                <input 
                  type="text" 
                  value={seoVerification}
                  onChange={(e) => setSeoVerification(e.target.value)}
                  placeholder="e.g. google1234567890abcdef"
                  className="muji-input w-full py-3 px-4 text-sm font-mono"
                />
                <p className="text-xs text-muji-text-muted mt-2 leading-relaxed">
                  Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="underline font-medium text-muji-sand">Google Search Console</a>, add <strong>shyanyee.com</strong> as your property, and choose the <strong>HTML tag (meta name=&quot;google-site-verification&quot;)</strong> verification option. Paste the unique code part here.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muji-text mb-2">
                  Meta Title Suffix
                </label>
                <input 
                  type="text" 
                  value={seoTitleSuffix}
                  onChange={(e) => setSeoTitleSuffix(e.target.value)}
                  placeholder="e.g. | Shyan Yee | Premium Real Estate Advisor"
                  className="muji-input w-full py-3 px-4 text-sm"
                />
                <p className="text-xs text-muji-text-muted mt-2">
                  Appended to pages that do not have their own branded site headers.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muji-text mb-2">
                  Global Meta Description Override
                </label>
                <textarea 
                  rows={3}
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  placeholder="Discover exclusive premium real estate selections in Central Park Damansara, Damansara, Subang Jaya and Bukit Jalil. Registered agent Shyan Yee (REN 46305)."
                  className="muji-input w-full py-3 px-4 text-sm resize-none"
                />
                <p className="text-xs text-muji-text-muted mt-2">
                  Primary summary snippet seen under your link in Search Engine Results Page (SERPs). Keep under 160 characters.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muji-text mb-2">
                  Custom SEO Keywords (Comma Separated)
                </label>
                <textarea 
                  rows={3}
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  placeholder="Shyan Yee, REN 46305, IQI Realty, Bukit Jalil, The Aldenz Damansara, etc."
                  className="muji-input w-full py-3 px-4 text-sm resize-none font-mono"
                />
                <p className="text-xs text-muji-text-muted mt-2">
                  Highly relevant keywords target search phrases. AISEO and GEO crawlers map this list directly to query intents.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-muji-border">
                <button
                  type="submit"
                  disabled={seoSaving}
                  className="muji-button-primary uppercase tracking-widest font-bold text-xs py-3.5 px-8 flex items-center gap-2 cursor-pointer"
                >
                  {seoSaving ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" /> Saving Configuration...
                    </>
                  ) : (
                    <>
                      <Save size={14} /> Update SEO Settings
                    </>
                  )}
                </button>
                {seoSaveSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-600"
                  >
                    <CheckCircle2 size={16} /> Saved to Database & SEO successfully!
                  </motion.div>
                )}
              </div>
            </form>
          </div>
         ) : (
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 text-muji-text">
              <div>
                <h2 className="text-2xl font-serif">Search Insights & Interest Analytics</h2>
                <p className="text-sm font-light text-muji-text-muted mt-1">
                  Analyze real-time search terms, filtered locations, and property type engagements.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={fetchData} 
                  className="px-6 py-2.5 border border-muji-border text-xs font-bold uppercase tracking-widest hover:border-muji-oak transition-all rounded-sm flex items-center gap-2 text-muji-text bg-white cursor-pointer"
                >
                  <Database size={12} /> Sync Insights
                </button>
                <button 
                  onClick={handleClearAllQueries} 
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Trash2 size={12} /> Clear Analytics
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white muji-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muji-text-muted">Total Interactions</span>
                  <BarChart2 className="text-muji-oak w-4 h-4 opacity-75" />
                </div>
                <div>
                  <h3 className="text-4xl font-serif text-muji-text">{analytics.totalVolume}</h3>
                  <p className="text-xs text-muji-text-muted mt-2">Searches & filter adjustments</p>
                </div>
              </div>

              <div className="bg-white muji-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muji-text-muted">Top Area of Interest</span>
                  <MapPin className="text-muji-oak w-4 h-4 opacity-75" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-muji-text truncate">{analytics.topLocation !== 'None' ? analytics.topLocation : 'N/A'}</h3>
                  <p className="text-xs text-muji-text-muted mt-2">
                    {analytics.topLocationCount > 0 ? `${analytics.topLocationCount} interactions` : 'No data recorded yet'}
                  </p>
                </div>
              </div>

              <div className="bg-white muji-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muji-text-muted">Top Property Type</span>
                  <Building className="text-muji-oak w-4 h-4 opacity-75" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-muji-text truncate">{analytics.topType !== 'None' ? analytics.topType : 'N/A'}</h3>
                  <p className="text-xs text-muji-text-muted mt-2">
                    {analytics.topTypeCount > 0 ? `${analytics.topTypeCount} interactions` : 'No data recorded yet'}
                  </p>
                </div>
              </div>

              <div className="bg-white muji-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muji-text-muted">Unique phrases</span>
                  <Search className="text-muji-oak w-4 h-4 opacity-75" />
                </div>
                <div>
                  <h3 className="text-4xl font-serif text-muji-text">{analytics.uniqueTermsCount}</h3>
                  <p className="text-xs text-muji-text-muted mt-2">Distinct custom keywords</p>
                </div>
              </div>
            </div>

            {/* Distributions bar chart panel */}
            <div className="grid lg:grid-cols-2 gap-10 mb-12 text-muji-text">
              <div className="bg-white muji-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-muji-oak w-5 h-5" />
                  <h3 className="text-lg font-serif">Demographic Location Interest</h3>
                </div>
                <div className="space-y-5">
                  {trackedQueries
                    .filter(q => q.query.startsWith('area:'))
                    .slice(0, 5)
                    .map((q, idx) => {
                      const label = q.query.replace('area:', '').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                      const maxVal = Math.max(...trackedQueries.filter(qy => qy.query.startsWith('area:')).map(qy => qy.count), 1);
                      const percentage = (q.count / maxVal) * 100;
                      return (
                        <div key={`area-dist-${idx}`}>
                          <div className="flex justify-between text-xs font-semibold mb-2 text-muji-text">
                            <span>{label}</span>
                            <span>{q.count} user selection{q.count !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="w-full bg-muji-beige h-2 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="bg-muji-sand h-full rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  {trackedQueries.filter(q => q.query.startsWith('area:')).length === 0 && (
                     <p className="text-sm font-light text-muji-text-muted italic py-4">No location filter records cached yet.</p>
                  )}
                </div>
              </div>

              <div className="bg-white muji-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Building className="text-muji-oak w-5 h-5" />
                  <h3 className="text-lg font-serif">Desired Property Type Interest</h3>
                </div>
                <div className="space-y-5">
                  {trackedQueries
                    .filter(q => q.query.startsWith('type:'))
                    .slice(0, 5)
                    .map((q, idx) => {
                      const label = q.query.replace('type:', '').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                      const maxVal = Math.max(...trackedQueries.filter(qy => qy.query.startsWith('type:')).map(qy => qy.count), 1);
                      const percentage = (q.count / maxVal) * 100;
                      return (
                        <div key={`type-dist-${idx}`}>
                          <div className="flex justify-between text-xs font-semibold mb-2 text-muji-text">
                            <span>{label}</span>
                            <span>{q.count} filter tap{q.count !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="w-full bg-muji-beige h-2 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="bg-muji-oak h-full rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  {trackedQueries.filter(q => q.query.startsWith('type:')).length === 0 && (
                     <p className="text-sm font-light text-muji-text-muted italic py-4">No property type filter records cached yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Table of all items */}
            <div className="bg-white muji-card overflow-hidden">
              <div className="p-6 border-b border-muji-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muji-text-muted w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search tracking insights..." 
                    value={querySearch}
                    onChange={e => setQuerySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muji-beige focus:outline-none focus:ring-1 focus:ring-muji-sand text-xs border border-muji-border rounded-sm placeholder:text-stone-400 text-muji-text"
                  />
                </div>
                <span className="text-[10px] font-bold text-muji-text-muted uppercase tracking-wider">
                  Total of {trackedQueries.length} terms logged
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-muji-border bg-muji-beige/50 text-[10px] font-bold uppercase tracking-widest text-muji-text-muted">
                      <th className="py-4 px-6">Source / Type</th>
                      <th className="py-4 px-6 w-full">Tracked Search Phrase</th>
                      <th className="py-4 px-6 text-right">Search Volume</th>
                      <th className="py-4 px-6 text-right">Last Searched Date</th>
                      <th className="py-4 px-6 max-w-[50px]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muji-border text-xs">
                    {trackedQueries
                      .filter(q => q.query.toLowerCase().includes(querySearch.toLowerCase()))
                      .map((q, idx) => {
                        let isArea = q.query.startsWith('area:');
                        let isType = q.query.startsWith('type:');
                        let cleanText = q.query;
                        let badgeColor = "bg-stone-100/80 text-stone-700 dark:bg-stone-800 dark:text-stone-300";
                        let badgeLabel = "Text Search";

                        if (isArea) {
                          cleanText = q.query.replace('area:', '').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                          badgeColor = "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300 border border-orange-200/50";
                          badgeLabel = "Area Filter";
                        } else if (isType) {
                          cleanText = q.query.replace('type:', '').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                          badgeColor = "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200/50";
                          badgeLabel = "Property Type";
                        } else {
                          // Capitalize standard query words
                          cleanText = q.query.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                        }

                        // Last searched string / date formation
                        let lastSearchedStr = "N/A";
                        if (q.lastSearched) {
                          try {
                            const dateObj = q.lastSearched.toDate ? q.lastSearched.toDate() : new Date(q.lastSearched);
                            lastSearchedStr = dateObj.toLocaleString('en-MY', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            });
                          } catch (_) {
                            lastSearchedStr = String(q.lastSearched);
                          }
                        }

                        return (
                          <tr key={q.id || `query-log-${idx}`} className="hover:bg-muji-beige/20 transition-all group">
                            <td className="py-4 px-6 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-sm text-[9px] font-bold uppercase tracking-wider ${badgeColor}`}>
                                {badgeLabel}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-semibold text-muji-text break-all">
                              {cleanText}
                            </td>
                            <td className="py-4 px-6 text-right font-bold text-muji-text text-sm">
                              {q.count}
                            </td>
                            <td className="py-4 px-6 text-right text-muji-text-muted whitespace-nowrap font-light text-[11px]">
                              {lastSearchedStr}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button 
                                onClick={() => q.id && handleDeleteQuery(q.id)}
                                className="p-2 text-muji-text-muted hover:text-red-500 rounded-sm hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                                title="Delete search record"
                              >
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    {trackedQueries.filter(q => q.query.toLowerCase().includes(querySearch.toLowerCase())).length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-muji-text-muted font-light italic text-stone-400">
                          No matching search tracking insights exist.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-muji-text/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto muji-card"
            >
              <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-8 md:px-12 py-6 border-b border-muji-border flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                   <h2 className="text-3xl font-serif">Edit {editingType.charAt(0).toUpperCase() + editingType.slice(1)}</h2>
                   {loading && <Loader2 size={24} className="animate-spin text-muji-oak" />}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 mr-4 border-r border-muji-border pr-4">
                    <input 
                      type="checkbox" 
                      id="autosave" 
                      checked={autoSave} 
                      onChange={e => setAutoSave(e.target.checked)}
                      className="w-4 h-4 accent-muji-oak cursor-pointer"
                    />
                    <label htmlFor="autosave" className="text-[10px] uppercase font-bold tracking-widest text-muji-text-muted cursor-pointer hover:text-muji-text">
                      Auto-Save
                    </label>
                  </div>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-muji-text-muted hover:text-muji-text">
                    Cancel
                  </button>
                  <button 
                    onClick={(e) => saveProject(e as any)}
                    className="bg-muji-oak text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-muji-text transition-all shadow-lg shadow-muji-oak/20"
                  >
                    <Save size={14} /> Save Changes
                  </button>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <form onSubmit={saveProject} className="space-y-16">
                  {editingType === 'project' ? (
                    <div className="grid lg:grid-cols-2 gap-16">
                  <div className="space-y-12">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-8">Basic Info & Identification</p>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Project Name</label>
                          <input required className="muji-input w-full" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Slug (URL)</label>
                          <input required className="muji-input w-full" value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Min Price (RM)</label>
                            <input type="number" required className="muji-input w-full" value={editingItem.minPrice} onChange={e => setEditingItem({...editingItem, minPrice: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Price Range Text</label>
                            <input className="muji-input w-full" value={editingItem.priceRange} onChange={e => setEditingItem({...editingItem, priceRange: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Developer</label>
                          <input className="muji-input w-full" value={editingItem.developer} onChange={e => setEditingItem({...editingItem, developer: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Property Type</label>
                            <input placeholder="e.g. Serviced Apartment" className="muji-input w-full" value={editingItem.propertyType} onChange={e => setEditingItem({...editingItem, propertyType: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Total Units</label>
                            <input type="number" className="muji-input w-full" value={editingItem.totalUnits} onChange={e => setEditingItem({...editingItem, totalUnits: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Tenure</label>
                            <select className="muji-input w-full" value={editingItem.tenure} onChange={e => setEditingItem({...editingItem, tenure: e.target.value})}>
                              <option value="Leasehold">Leasehold</option>
                              <option value="Freehold">Freehold</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Completion Year</label>
                            <input type="number" className="muji-input w-full" value={editingItem.completionYear} onChange={e => setEditingItem({...editingItem, completionYear: e.target.value})} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-8">Specifications (Ranges)</p>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Size Range (e.g. 800-1200 sqft)</label>
                            <input className="muji-input w-full" value={editingItem.sizeSqft} onChange={e => setEditingItem({...editingItem, sizeSqft: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Rooms Range (e.g. 2-3 Rooms)</label>
                            <input className="muji-input w-full" value={editingItem.rooms} onChange={e => setEditingItem({...editingItem, rooms: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Land Size</label>
                            <input placeholder="e.g. 2.55 acres" className="muji-input w-full" value={editingItem.landSize} onChange={e => setEditingItem({...editingItem, landSize: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Maintenance Fee</label>
                            <input placeholder="e.g. RM0.35 psf" className="muji-input w-full" value={editingItem.maintenanceFee} onChange={e => setEditingItem({...editingItem, maintenanceFee: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Tower Count</label>
                            <input placeholder="e.g. 2 Blocks" className="muji-input w-full" value={editingItem.towerCount} onChange={e => setEditingItem({...editingItem, towerCount: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Floors Count</label>
                            <input placeholder="e.g. 40 Floors" className="muji-input w-full" value={editingItem.floorCount} onChange={e => setEditingItem({...editingItem, floorCount: e.target.value})} />
                          </div>
                        </div>
                        <div className="flex items-center gap-3 py-2">
                          <input 
                            type="checkbox" 
                            id="commercial"
                            className="w-4 h-4 accent-muji-oak"
                            checked={editingItem.commercialTitle}
                            onChange={e => setEditingItem({...editingItem, commercialTitle: e.target.checked})}
                          />
                          <label htmlFor="commercial" className="text-xs font-bold uppercase tracking-widest text-muji-text-muted cursor-pointer">Commercial Title (Serviced Residence)</label>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Area (Detailed)</label>
                            <input className="muji-input w-full" value={editingItem.area} onChange={e => setEditingItem({...editingItem, area: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">State</label>
                            <input placeholder="e.g. Kuala Lumpur" className="muji-input w-full" value={editingItem.state} onChange={e => setEditingItem({...editingItem, state: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Location Label</label>
                            <input className="muji-input w-full" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Status</label>
                            <select 
                              className="muji-input w-full"
                              value={editingItem.status}
                              onChange={e => setEditingItem({...editingItem, status: e.target.value})}
                            >
                              <option>New Launch</option>
                              <option>Pre-Launch</option>
                              <option>Early Bird</option>
                              <option>Under Construction</option>
                              <option>Selling Fast</option>
                              <option>Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-8">Location & Interactive Media</p>
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Location Map Image URL</label>
                          <input 
                            className="muji-input w-full" 
                            placeholder="Map screenshot or diagram URL"
                            value={editingItem.mapImageUrl} 
                            onChange={e => setEditingItem({...editingItem, mapImageUrl: convertDriveUrl(e.target.value)})} 
                          />
                          {editingItem.mapImageUrl && <img src={editingItem.mapImageUrl} className="w-full aspect-video object-contain mt-4 bg-muji-beige rounded-sm border border-muji-border" alt="Map Preview" />}
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Drone View URL (External)</label>
                            <input className="muji-input w-full" value={editingItem.droneViewUrl} onChange={e => setEditingItem({...editingItem, droneViewUrl: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Virtual Tour URL (3D)</label>
                            <input className="muji-input w-full" value={editingItem.virtualTourUrl} onChange={e => setEditingItem({...editingItem, virtualTourUrl: e.target.value})} />
                          </div>
                        </div>

                        <AmenitiesListInput 
                          items={editingItem.nearbyAmenities || []}
                          onChange={(vals) => setEditingItem({...editingItem, nearbyAmenities: vals})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-8">Marketing & Highlights</p>
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Tagline</label>
                          <input className="muji-input w-full" value={editingItem.tagline} onChange={e => setEditingItem({...editingItem, tagline: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Overview</label>
                          <textarea className="muji-input w-full h-32 py-4 text-sm resize-none" value={editingItem.overview} onChange={e => setEditingItem({...editingItem, overview: e.target.value})} />
                        </div>
                        
                        <ListInput 
                          label="Key Features"
                          items={editingItem.keyFeatures}
                          onChange={(vals) => setEditingItem({...editingItem, keyFeatures: vals})}
                        />

                        <div className="grid md:grid-cols-2 gap-8">
                          <ListInput 
                            label="Location Advantages"
                            items={editingItem.locationAdvantage || []}
                            onChange={(vals) => setEditingItem({...editingItem, locationAdvantage: vals})}
                          />
                          <ListInput 
                            label="Investment Highlights"
                            items={editingItem.investmentHighlights || []}
                            onChange={(vals) => setEditingItem({...editingItem, investmentHighlights: vals})}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted flex items-center gap-2">
                            <ImageIcon size={14} /> Main Image URL
                          </label>
                          <input 
                            className="muji-input w-full" 
                            placeholder="Paste URL (Auto-converts Google Drive)"
                            value={editingItem.thumbnail} 
                            onChange={e => setEditingItem({...editingItem, thumbnail: convertDriveUrl(e.target.value)})} 
                          />
                          {editingItem.thumbnail && <img src={editingItem.thumbnail} className="w-full aspect-video object-cover mt-4 rounded-sm border border-muji-border" alt="Preview" />}
                        </div>

                        <ListInput 
                          label="Gallery Images"
                          items={editingItem.gallery || []}
                          onChange={(vals) => setEditingItem({...editingItem, gallery: vals})}
                        />

                        <GalleryItemsListInput 
                          items={editingItem.galleryItems || []}
                          onChange={(vals) => setEditingItem({...editingItem, galleryItems: vals})}
                          onAutoDescribe={autoDescribe}
                          isExtracting={isExtracting}
                        />

                        <LayoutsListInput 
                          layouts={editingItem.layouts || []}
                          onChange={(vals) => setEditingItem({...editingItem, layouts: vals})}
                          onSave={() => saveProject(undefined, false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : editingType === 'area' ? (
                    <div className="max-w-3xl mx-auto space-y-12">
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-8">Area Identity</p>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Area Name</label>
                              <input required className="muji-input w-full" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Slug (URL)</label>
                               <input required className="muji-input w-full" value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} />
                            </div>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Description</label>
                          <textarea className="muji-input w-full h-32 py-4 text-sm resize-none" value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
                       </div>
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Price Trend</label>
                             <input className="muji-input w-full" value={editingItem.priceTrend} onChange={e => setEditingItem({...editingItem, priceTrend: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Rental Demand</label>
                             <input className="muji-input w-full" value={editingItem.rentalDemand} onChange={e => setEditingItem({...editingItem, rentalDemand: e.target.value})} />
                          </div>
                       </div>
                       <ListInput 
                          label="Why Invest"
                          items={editingItem.whyInvest || []}
                          onChange={(vals) => setEditingItem({...editingItem, whyInvest: vals})}
                       />
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Recommended Project IDs (Comma separated)</label>
                          <input 
                            className="muji-input w-full" 
                            value={editingItem.recommendedProjectIds?.join(', ')} 
                            onChange={e => setEditingItem({...editingItem, recommendedProjectIds: e.target.value.split(',').map(s => s.trim())})} 
                          />
                       </div>
                    </div>
                  ) : (
                    <div className="max-w-3xl mx-auto space-y-12">
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muji-oak mb-8">Article Details</p>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Title</label>
                              <input required className="muji-input w-full" value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                               <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Slug</label>
                                  <input required className="muji-input w-full" value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Category</label>
                                  <input className="muji-input w-full" value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})} />
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Excerpt</label>
                               <textarea className="muji-input w-full h-24 py-4 text-sm resize-none" value={editingItem.excerpt} onChange={e => setEditingItem({...editingItem, excerpt: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-bold uppercase tracking-widest text-muji-text-muted">Content (Markdown supported)</label>
                               <textarea className="muji-input w-full h-96 py-4 text-sm resize-none" value={editingItem.content} onChange={e => setEditingItem({...editingItem, content: e.target.value})} />
                            </div>
                          </div>
                       </div>
                    </div>
                  )}

                <div className="pt-12 border-t border-muji-border flex justify-end gap-6">
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-12 py-4 border border-muji-border hover:bg-muji-beige transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="muji-button-primary px-12 py-4 flex items-center gap-3"
                  >
                    <Save size={16} /> Save {editingType}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
