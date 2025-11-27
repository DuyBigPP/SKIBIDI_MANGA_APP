/**
 * Home Screen - Main home page with trending, recent manga
 */

import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Manga } from '../../types/api.types';
import { mangaService } from '../../services/api';
import {
  HomeHeader,
  ErrorMessage,
  FeaturedSection,
  TrendingSection,
  RecentSection,
} from './components';

interface HomeScreenProps {
  onMangaPress: (slug: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onMangaPress }) => {
  const [trending, setTrending] = useState<Manga[]>([]);
  const [recent, setRecent] = useState<Manga[]>([]);
  const [featured, setFeatured] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Only load once when component mounts
    if (!hasLoaded) {
      loadHomeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [trendingResponse, recentResponse, randomResponse] = await Promise.all([
        mangaService.getTrending(10),
        mangaService.getRecent(10),
        mangaService.getRandom(),
      ]);

      if (trendingResponse.success) {
        setTrending(trendingResponse.data || []);
      }

      if (recentResponse.success) {
        setRecent(recentResponse.data || []);
      }

      if (randomResponse.success && randomResponse.data && randomResponse.data.length > 0) {
        setFeatured(randomResponse.data[0]);
      }
      
      setHasLoaded(true);
    } catch (error: any) {
      console.error('Failed to load home data:', error);
      
      // Check if it's a rate limit error
      if (error?.message?.includes('429') || error?.message?.includes('Too Many Requests')) {
        setError('Server đang bận. Vui lòng đợi một chút rồi thử lại.');
      } else {
        setError(error?.message || 'Không thể tải dữ liệu. Vui lòng thử lại sau.');
      }
      
      // Set empty arrays to prevent undefined errors
      setTrending([]);
      setRecent([]);
      setFeatured(null);
      setHasLoaded(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadHomeData();
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8B5CF6" />}
    >
      <View className="p-4">
        <HomeHeader />

        {error && (
          <ErrorMessage
            error={error}
            loading={loading}
            refreshing={refreshing}
            onRetry={loadHomeData}
          />
        )}

        {featured && <FeaturedSection manga={featured} onPress={onMangaPress} />}

        <TrendingSection manga={trending} loading={loading} onMangaPress={onMangaPress} />

        <RecentSection manga={recent} loading={loading} onMangaPress={onMangaPress} />
      </View>
    </ScrollView>
  );
};

