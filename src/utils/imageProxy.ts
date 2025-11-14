/**
 * Image Proxy Utility - Proxy images through CORS-enabled services
 */

import { BASE_URL } from '../endpoint/endpoint';

// Toggle proxy usage
const USE_PROXY = false; // Temporarily disable all proxies
const USE_BACKEND_PROXY = false; // Set to true when backend is ready

/**
 * Proxy image URL through backend or CORS proxy
 */
export const proxyImageUrl = (url: string): string => {
  if (!url) return url;

  // Temporarily disable proxy to see which images load directly
  if (!USE_PROXY) {
    return url;
  }

  // If image is from MangaPark or other restricted domains, proxy it
  if (
    url.includes('mangapark.org') ||
    url.includes('mangapark.com') ||
    url.includes('mangapark.net')
  ) {
    if (USE_BACKEND_PROXY) {
      // Use backend proxy (recommended - better performance and no rate limits)
      return `${BASE_URL}/api/proxy-image?url=${encodeURIComponent(url)}`;
    } else {
      // Fallback to public CORS proxy
      return `https://corsproxy.io/?${encodeURIComponent(url)}`;
    }
  }

  // For other URLs (like Cloudinary), return as-is
  return url;
};

/**
 * Check if URL needs proxying
 */
export const needsProxy = (url: string): boolean => {
  if (!url) return false;
  
  return (
    url.includes('mangapark.org') ||
    url.includes('mangapark.com') ||
    url.includes('mangapark.net')
  );
};

