/**
 * Home Screen - Main home page with trending, recent manga
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Manga } from '../../types/api.types';
import { mangaService } from '../../services/api';
import { SafeImage } from '../../components/SafeImage';

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
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground">SKIBIDIMANGA</Text>
          <Text className="text-base text-muted-foreground mt-2">
            APP MANGA LẬU XỊN NHẤT THẾ GIỚI 🐧
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-destructive/20 border border-destructive/30 rounded-xl p-4 mb-6">
            <Text className="text-destructive font-semibold mb-1">
              {error.includes('Server đang bận') ? '⏱️ Server đang bận' : '⚠️ Không thể kết nối'}
            </Text>
            <Text className="text-destructive/80 text-sm mb-3">{error}</Text>
            <TouchableOpacity
              onPress={() => {
                // Add delay for rate limit errors
                if (error.includes('Server đang bận')) {
                  setTimeout(() => loadHomeData(), 2000);
                } else {
                  loadHomeData();
                }
              }}
              className="bg-destructive rounded-lg px-4 py-2 self-start"
              disabled={loading || refreshing}
            >
              <Text className="text-white font-semibold">
                {loading || refreshing ? 'Đang tải...' : 'Thử lại'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Featured Section */}
        {featured && (
          <TouchableOpacity
            onPress={() => onMangaPress(featured.slug)}
            className="mb-6"
          >
            <View className="bg-card rounded-2xl overflow-hidden">
              <SafeImage
                uri={featured.thumbnail}
                className="w-full h-48"
                resizeMode="cover"
                showLoadingIndicator={false}
              />
              <View className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <View className="absolute bottom-0 left-0 right-0 p-6">
                <View className="flex-row items-center mb-2">
                  <View className="bg-primary rounded-full px-3 py-1 mr-2">
                    <Text className="text-primary-foreground text-xs font-semibold">Nổi bật</Text>
                  </View>
                  <Text className="text-white/80 text-xs">
                    {featured.totalChapters} chương
                  </Text>
                </View>
                <Text className="text-white text-2xl font-bold mb-2" numberOfLines={2}>
                  {featured.title}
                </Text>
                {featured.genres.length > 0 && (
                  <Text className="text-white/70 text-sm">
                    {featured.genres.slice(0, 3).map(g => g.name).join(' • ')}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Trending Today */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-bold text-foreground">Thịnh hành hôm nay</Text>
            {/* <TouchableOpacity>
              <Text className="text-primary font-semibold">Xem tất cả</Text>
            </TouchableOpacity> */}
          </View>

          {loading ? (
            <View className="flex-row">
              {[1, 2, 3, 4].map((i) => (
                <View key={i} className="mr-4 w-32">
                  <View className="bg-card rounded-xl h-48 mb-2" />
                  <View className="bg-card rounded h-4 mb-1" />
                  <View className="bg-card rounded h-3 w-20" />
                </View>
              ))}
            </View>
          ) : trending.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {trending.map((manga) => (
                <TouchableOpacity
                  key={manga.id}
                  onPress={() => onMangaPress(manga.slug)}
                  className="mr-4 w-32"
                >
                  <SafeImage
                    uri={manga.thumbnail}
                    className="bg-card rounded-xl h-48 mb-2 w-full"
                    resizeMode="cover"
                    showLoadingIndicator={false}
                  />
                  <Text className="font-semibold text-foreground text-sm" numberOfLines={2}>
                    {manga.title}
                  </Text>
                  <Text className="text-muted-foreground text-xs">
                    {manga.totalChapters} chương
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View className="bg-card rounded-xl p-6 items-center">
              <Text className="text-muted-foreground text-center">
                Không có dữ liệu
              </Text>
            </View>
          )}
        </View>

        {/* Recent Updates */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-3">Cập nhật gần đây</Text>

          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} className="flex-row mb-4 bg-card rounded-xl p-3">
                  <View className="bg-muted rounded-lg w-16 h-20 mr-3" />
                  <View className="flex-1">
                    <View className="bg-muted rounded h-4 mb-2 w-3/4" />
                    <View className="bg-muted rounded h-3 mb-1 w-1/2" />
                    <View className="bg-muted rounded h-3 w-1/3" />
                  </View>
                </View>
              ))}
            </>
          ) : recent.length > 0 ? (
            <>
              {recent.map((manga) => (
                <TouchableOpacity
                  key={manga.id}
                  onPress={() => onMangaPress(manga.slug)}
                  className="flex-row mb-4 bg-card rounded-xl p-3"
                >
                  <SafeImage
                    uri={manga.thumbnail}
                    className="bg-muted rounded-lg w-16 h-20 mr-3"
                    resizeMode="cover"
                    showLoadingIndicator={false}
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
                      {manga.title}
                    </Text>
                    {manga.latestChapter && (
                      <Text className="text-muted-foreground text-sm mb-1">
                        {/* Chapter {manga.latestChapter.chapterNumber} */}
                        {/* {manga.latestChapter.title && `: ${manga.latestChapter.title}`} */}
                        {manga.latestChapter.title}
                      </Text>
                    )}
                    <Text className="text-muted-foreground/70 text-xs">
                      {new Date(manga.lastChapterAt).toLocaleDateString('vi-VN')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <View className="bg-card rounded-xl p-6 items-center">
              <Text className="text-muted-foreground text-center">
                Không có dữ liệu
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

