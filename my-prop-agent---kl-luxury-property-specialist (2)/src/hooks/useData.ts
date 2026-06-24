import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { PROJECTS as STATIC_PROJECTS, BLOG_POSTS as STATIC_POSTS } from '../data';
import { Project, BlogPost } from '../types';
import { formatImageUrl } from '../lib/utils';

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
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  const jsonErr = JSON.stringify(errInfo);
  if (isOffline) {
    console.warn('Firestore is operating in offline mode (using local fallback data):', jsonErr);
  } else {
    console.error('Firestore Error: ', jsonErr);
  }
  return jsonErr; // We'll return it to log it better in UI if needed, but the guideline says throw
}

const formatProjectImages = (p: Project): Project => {
  return {
    ...p,
    thumbnail: formatImageUrl(p.thumbnail),
    mapImageUrl: p.mapImageUrl ? formatImageUrl(p.mapImageUrl) : undefined,
    gallery: p.gallery ? p.gallery.map(img => formatImageUrl(img)) : undefined,
    galleryItems: p.galleryItems ? p.galleryItems.map(item => ({
      ...item,
      url: formatImageUrl(item.url)
    })) : undefined,
    layouts: p.layouts ? p.layouts.map(layout => ({
      ...layout,
      imageUrl: formatImageUrl(layout.imageUrl)
    })) : undefined
  };
};

const getDocsWithTimeout = async (queryRef: any, timeoutMs = 1200) => {
  let timeoutId: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('Firestore operation timed out (the client is offline)'));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([getDocs(queryRef), timeoutPromise]);
    clearTimeout(timeoutId);
    return result as any;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const useData = () => {
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS.map(formatProjectImages));
  const [posts, setPosts] = useState<BlogPost[]>(STATIC_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsSnap = await getDocsWithTimeout(collection(db, 'projects'));
        let finalProjects = [...STATIC_PROJECTS];
        
        if (projectsSnap && !projectsSnap.empty) {
          const dbProjects = projectsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Project));
          
          // Data Repair Logic: Ensure "The Aldenz" (ID 2), "Queenswoodz" (ID 1) and "Kingswoodz" (ID 4) always have correct technical info
          const repairedProjects = dbProjects.map(p => {
            if (p.id === '1' || p.name.toLowerCase().includes('queenswoodz')) {
              const staticQueenswoodz = STATIC_PROJECTS.find(sp => sp.id === '1');
              if (staticQueenswoodz) {
                return {
                  ...staticQueenswoodz, // Prioritize complete correct static info
                  // Preserve user custom assets if they exist in DB
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
              const staticAldenz = STATIC_PROJECTS.find(sp => sp.id === '2');
              if (staticAldenz) {
                return {
                  ...staticAldenz, // Prioritize complete correct static info
                  // Preserve user custom assets if they exist in DB
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
              const staticParkside = STATIC_PROJECTS.find(sp => sp.id === '3');
              if (staticParkside) {
                return {
                  ...staticParkside, // Prioritize complete correct static info
                  // Preserve user custom assets if they exist in DB
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
              const staticKingswoodz = STATIC_PROJECTS.find(sp => sp.id === '4');
              if (staticKingswoodz) {
                return {
                  ...staticKingswoodz,
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
              const staticVeladaz = STATIC_PROJECTS.find(sp => sp.id === '5');
              if (staticVeladaz) {
                return {
                  ...staticVeladaz,
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
              const staticVividz = STATIC_PROJECTS.find(sp => sp.id === '6');
              if (staticVividz) {
                return {
                  ...staticVividz,
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
            if (p.id === '10' || p.name.toLowerCase().includes('ayanna')) {
              const staticAyanna = STATIC_PROJECTS.find(sp => sp.id === '10');
              if (staticAyanna) {
                return {
                  ...staticAyanna,
                  thumbnail: p.thumbnail || staticAyanna.thumbnail,
                  gallery: (p.gallery && p.gallery.length > 0) ? p.gallery : staticAyanna.gallery,
                  galleryItems: (p.galleryItems && p.galleryItems.length > 0) ? p.galleryItems : staticAyanna.galleryItems,
                  mapImageUrl: p.mapImageUrl || staticAyanna.mapImageUrl,
                  layouts: staticAyanna.layouts.map(sl => {
                    const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                    return {
                      ...sl,
                      imageUrl: dbLayout?.imageUrl && !dbLayout.imageUrl.includes('unsplash.com') && !dbLayout.imageUrl.includes('photo-') ? dbLayout.imageUrl : sl.imageUrl
                    };
                  }),
                  minPrice: p.minPrice || staticAyanna.minPrice,
                  priceRange: p.priceRange || staticAyanna.priceRange
                };
              }
            }
            if (p.id === '7-axis' || p.name.toLowerCase().includes('axis')) {
              const staticAxis = STATIC_PROJECTS.find(sp => sp.id === '7-axis');
              if (staticAxis) {
                return {
                  ...staticAxis,
                  thumbnail: (p.thumbnail && !p.thumbnail.includes('drive.google.com') && !p.thumbnail.includes('uc?export')) ? p.thumbnail : staticAxis.thumbnail,
                  gallery: (p.gallery && p.gallery.length > 0 && p.gallery.every(img => !img.includes('drive.google.com'))) ? p.gallery : staticAxis.gallery,
                  galleryItems: (p.galleryItems && p.galleryItems.length > 0 && p.galleryItems.every(item => item.url && !item.url.includes('drive.google.com'))) ? p.galleryItems : staticAxis.galleryItems,
                  layouts: staticAxis.layouts.map(sl => {
                    const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                    return {
                      ...sl,
                      imageUrl: (dbLayout?.imageUrl && !dbLayout.imageUrl.includes('drive.google.com')) ? dbLayout.imageUrl : sl.imageUrl
                    };
                  }),
                  minPrice: p.minPrice || staticAxis.minPrice,
                  priceRange: p.priceRange || staticAxis.priceRange
                };
              }
            }
            if (p.id === '7-brixton' || p.name.toLowerCase().includes('brixton')) {
              const staticBrixton = STATIC_PROJECTS.find(sp => sp.id === '7-brixton');
              if (staticBrixton) {
                return {
                  ...staticBrixton,
                  thumbnail: (p.thumbnail && !p.thumbnail.includes('drive.google.com') && !p.thumbnail.includes('uc?export')) ? p.thumbnail : staticBrixton.thumbnail,
                  gallery: (p.gallery && p.gallery.length > 0 && p.gallery.every(img => !img.includes('drive.google.com'))) ? p.gallery : staticBrixton.gallery,
                  galleryItems: (p.galleryItems && p.galleryItems.length > 0 && p.galleryItems.every(item => item.url && !item.url.includes('drive.google.com'))) ? p.galleryItems : staticBrixton.galleryItems,
                  layouts: staticBrixton.layouts.map(sl => {
                    const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                    return {
                      ...sl,
                      imageUrl: (dbLayout?.imageUrl && !dbLayout.imageUrl.includes('drive.google.com')) ? dbLayout.imageUrl : sl.imageUrl
                    };
                  }),
                  minPrice: p.minPrice || staticBrixton.minPrice,
                  priceRange: p.priceRange || staticBrixton.priceRange
                };
              }
            }
            if (p.id === '7-dover' || p.name.toLowerCase().includes('dover')) {
              const staticDover = STATIC_PROJECTS.find(sp => sp.id === '7-dover');
              if (staticDover) {
                return {
                  ...staticDover,
                  thumbnail: (p.thumbnail && !p.thumbnail.includes('drive.google.com') && !p.thumbnail.includes('uc?export')) ? p.thumbnail : staticDover.thumbnail,
                  gallery: (p.gallery && p.gallery.length > 0 && p.gallery.every(img => !img.includes('drive.google.com'))) ? p.gallery : staticDover.gallery,
                  galleryItems: (p.galleryItems && p.galleryItems.length > 0 && p.galleryItems.every(item => item.url && !item.url.includes('drive.google.com'))) ? p.galleryItems : staticDover.galleryItems,
                  layouts: staticDover.layouts.map(sl => {
                    const dbLayout = p.layouts?.find(dl => dl.id === sl.id || dl.name === sl.name);
                    return {
                      ...sl,
                      imageUrl: (dbLayout?.imageUrl && !dbLayout.imageUrl.includes('drive.google.com')) ? dbLayout.imageUrl : sl.imageUrl
                    };
                  }),
                  minPrice: p.minPrice || staticDover.minPrice,
                  priceRange: p.priceRange || staticDover.priceRange
                };
              }
            }
            return p;
          });

          // Merge: Database projects overwrite static ones with same ID, keep others
          const dbIds = new Set(repairedProjects.map(p => p.id));
          finalProjects = [
            ...repairedProjects,
            ...STATIC_PROJECTS.filter(p => !dbIds.has(p.id))
          ];
        }
        setProjects(finalProjects.map(formatProjectImages));

        const postsSnap = await getDocsWithTimeout(collection(db, 'blogPosts'));
        if (postsSnap && !postsSnap.empty) {
          const postsData = postsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost));
          setPosts(postsData);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'dynamic-data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProjectBySlug = (slug: string) => {
    return projects.find(p => p.slug === slug);
  };

  const getPostBySlug = (slug: string) => {
    return posts.find(p => p.slug === slug);
  };

  return { projects, posts, loading, getProjectBySlug, getPostBySlug };
};
