/**
 * SafeImage Component - Image component with CORS/tracking prevention bypass
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Image, ImageProps, View, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { proxyImageUrl } from '../utils/imageProxy';

interface SafeImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
  showLoadingIndicator?: boolean;
  fallbackIcon?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  uri, 
  style, 
  showLoadingIndicator = true,
  fallbackIcon = true,
  ...props 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Reset state when URI changes
  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [uri]);

  // Memoize image source to prevent recreation on every render
  // Handle base64, proxy URLs, or regular URLs
  const imageSource = useMemo(() => {
    // Check if it's base64 data (doesn't start with http/https)
    if (uri && !uri.startsWith('http') && !uri.startsWith('data:')) {
      // Assume it's raw base64 from database
      return {
        uri: `data:image/jpeg;base64,${uri}`,
      };
    }
    
    // Regular URL - use proxy for MangaPark images
    return {
      uri: proxyImageUrl(uri),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    };
  }, [uri]);

  // Memoize callbacks to prevent recreation
  const handleLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback((e: any) => {
    console.log('Image load error:', e.nativeEvent?.error);
    setLoading(false);
    setError(true);
  }, []);

  const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;

  if (error && fallbackIcon) {
    return (
      <View 
        style={[
          flatStyle, 
          { 
            backgroundColor: '#1E293B', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }
        ]}
      >
        <Feather name="image" size={24} color="#64748B" />
      </View>
    );
  }

  return (
    <View style={flatStyle}>
      {loading && showLoadingIndicator && (
        <View 
          style={[
            flatStyle,
            { 
              position: 'absolute', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: '#1E293B',
              zIndex: 1,
            }
          ]}
        >
          <ActivityIndicator size="small" color="#8B5CF6" />
        </View>
      )}
      <Image
        source={imageSource}
        style={flatStyle}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
    </View>
  );
};

