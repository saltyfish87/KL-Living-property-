import { db } from './firebase';
import { doc, setDoc, increment, serverTimestamp, collection, getDocs, orderBy, query as fsQuery, deleteDoc } from 'firebase/firestore';

export interface TrackedQuery {
  id?: string;
  query: string;
  count: number;
  lastSearched: any; // Firestore timestamp or string
}

/**
 * Tracks a user search query securely in Firestore with an offline/localStorage fallback.
 */
export const trackSearchQuery = async (queryText: string): Promise<void> => {
  const trimmed = queryText.trim().toLowerCase();
  
  // Only track queries of at least 2 characters to filter out noise
  if (!trimmed || trimmed.length < 2) return;

  try {
    const docRef = doc(db, 'search_queries', trimmed);
    
    // Increment the counter and update lastSearched timestamp atomically
    await setDoc(docRef, {
      query: trimmed,
      count: increment(1),
      lastSearched: serverTimestamp()
    }, { merge: true });
    
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const isOffline = errorMsg.includes('the client is offline') || 
                      errorMsg.includes('offline') || 
                      errorMsg.includes('Could not reach Cloud Firestore') ||
                      errorMsg.includes('Failed to get document');
    if (isOffline) {
      console.warn("Could not log search query to Firestore (offline fallback enabled):", errorMsg);
    } else {
      console.error("Error logging search query to Firestore:", error);
    }
    
    // Fallback: Store tracking updates in local storage
    try {
      const localLogs: Record<string, { query: string; count: number; lastSearched: string }> = 
        JSON.parse(localStorage.getItem('tracked_queries') || '{}');
      
      const existing = localLogs[trimmed] || { query: trimmed, count: 0, lastSearched: '' };
      localLogs[trimmed] = {
        query: trimmed,
        count: existing.count + 1,
        lastSearched: new Date().toISOString()
      };
      
      localStorage.setItem('tracked_queries', JSON.stringify(localLogs));
    } catch (localErr) {
      console.error("Error writing to localStorage fallback:", localErr);
    }
  }
};

/**
 * Fetches all tracked queries from Firestore.
 * Automatically merges any queries tracked in localStorage fallback.
 */
export const fetchTrackedQueries = async (): Promise<TrackedQuery[]> => {
  let queries: TrackedQuery[] = [];

  try {
    const q = fsQuery(collection(db, 'search_queries'), orderBy('count', 'desc'));
    const snapshot = await getDocs(q);
    
    queries = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        query: data.query || doc.id,
        count: data.count || 0,
        lastSearched: data.lastSearched
      } as TrackedQuery;
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const isOffline = errorMsg.includes('the client is offline') || 
                      errorMsg.includes('offline') || 
                      errorMsg.includes('Could not reach Cloud Firestore') ||
                      errorMsg.includes('Failed to get document');
    if (isOffline) {
      console.warn("Could not fetch search queries from Firestore (falling back to local storage):", errorMsg);
    } else {
      console.error("Error fetching search queries from Firestore:", error);
    }
  }

  // Merge items from localStorage if any
  try {
    const localLogs: Record<string, { query: string; count: number; lastSearched: string }> = 
      JSON.parse(localStorage.getItem('tracked_queries') || '{}');
    
    const localList = Object.values(localLogs);
    if (localList.length > 0) {
      const dbQueryMap = new Map<string, TrackedQuery>(
        queries.map(q => [q.query, q])
      );

      localList.forEach(localItem => {
        const existing = dbQueryMap.get(localItem.query);
        if (existing) {
          // If Firestore succeeded or we're online, we can add counts
          existing.count += localItem.count;
        } else {
          queries.push({
            id: localItem.query,
            query: localItem.query,
            count: localItem.count,
            lastSearched: localItem.lastSearched
          });
        }
      });

      // Sort by search volume
      queries.sort((a, b) => b.count - a.count);
    }
  } catch (localErr) {
    console.error("Error reading localStorage queries:", localErr);
  }

  return queries;
};

/**
 * Clears or deletes a tracked query from Firestore.
 */
export const deleteTrackedQuery = async (queryId: string): Promise<void> => {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, 'search_queries', queryId));
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const isOffline = errorMsg.includes('the client is offline') || 
                      errorMsg.includes('offline') || 
                      errorMsg.includes('Could not reach Cloud Firestore') ||
                      errorMsg.includes('Failed to get document');
    if (isOffline) {
      console.warn("Could not delete tracking query from Firestore (offline environment):", errorMsg);
    } else {
      console.error("Error deleting tracking query from Firestore:", error);
    }
  }

  // Also remove from local fallback logs
  try {
    const localLogs: Record<string, any> = JSON.parse(localStorage.getItem('tracked_queries') || '{}');
    if (localLogs[queryId]) {
      delete localLogs[queryId];
      localStorage.setItem('tracked_queries', JSON.stringify(localLogs));
    }
  } catch (localErr) {
    console.error("Error removing from localStorage fallback:", localErr);
  }
};
