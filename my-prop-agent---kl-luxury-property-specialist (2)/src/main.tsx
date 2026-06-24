import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './lib/firebase';

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firestore connection test: Success");
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const isOffline = errorMsg.includes('the client is offline') || 
                      errorMsg.includes('offline') || 
                      errorMsg.includes('Could not reach Cloud Firestore') ||
                      errorMsg.includes('Failed to get document');
    
    if (isOffline) {
      console.warn("Firestore backend is offline or unreachable - Operating gracefully in offline/local-fallback mode.");
    } else {
      console.error("Firestore connection test failed:", error);
    }
  }
}

testConnection();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
