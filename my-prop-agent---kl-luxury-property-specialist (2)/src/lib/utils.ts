import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatImageUrl(url: string | undefined): string {
  if (!url) return '';
  
  // If it's a google drive URL (many variants like drive.google.com, docs.google.com, etc)
  if (
    url.includes('drive.google.com') || 
    url.includes('docs.google.com') || 
    url.includes('googleusercontent.com')
  ) {
    const idMatch = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
    if (idMatch && idMatch[1]) {
      // Use lh3.googleusercontent.com/d/{id} which bypasses the preview page/cookie check 
      // and directly streams the image for image tags seamlessly.
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
  }
  
  return url;
}

