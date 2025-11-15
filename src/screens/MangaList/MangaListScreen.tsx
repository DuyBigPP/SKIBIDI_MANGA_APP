/**
 * Manga List Screen - Display manga by author or genre
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Manga } from '../../types/api.types';
import { authorService, genreService } from '../../services/api';
import { SafeImage } from '../../components/SafeImage';

interface MangaListScreenProps {
  type: 'author' | 'genre';
  slug: string;
  name: string;
  onMangaPress: (slug: string) => void;
  onBack: () => void;
}

export const MangaListScreen: React.FC<MangaListScreenProps> = ({
  type,
  slug,
  name,
  onMangaPress,
  onBack,
}) => {
  const [manga, setManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadManga(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadManga = async (reset: boolean = false) => {
    try {
      if (reset) {
        setLoading(true);
        setPage(1);
      } else {
        setLoadingMore(true);
      }

      const currentPage = reset ? 1 : page;

      if (type === 'author') {
        const response = await authorService.getMangaByAuthor(slug, {
          page: currentPage,
          limit: 20,
          sortBy: 'updatedAt',
          order: 'desc',
        });

        if (response.success) {
          if (reset) {
            setManga(response.manga);
          } else {
            setManga(prev => [...prev, ...response.manga]);
          }
          setHasMore(currentPage < response.pagination.pages);
          if (!reset) setPage(currentPage + 1);
        }
      } else {
        const response = await genreService.getMangaByGenre(slug, {
          page: currentPage,
          limit: 20,
          sortBy: 'updatedAt',
          order: 'desc',
        });

        if (response.success) {
          if (reset) {
            setManga(response.manga);
          } else {
            setManga(prev => [...prev, ...response.manga]);
          }
          setHasMore(currentPage < response.pagination.pages);
          if (!reset) setPage(currentPage + 1);
        }
      }
    } catch (error) {
      console.error('Failed to load manga:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreManga = () => {
    if (!loadingMore && hasMore) {
      loadManga(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text className="text-muted-foreground mt-4">Đang tải...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-card border-b border-border p-4 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Feather name="arrow-left" size={24} color="#E2E8F0" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-sm text-muted-foreground">
            {type === 'author' ? 'Tác giả' : 'Thể loại'}
          </Text>
          <Text className="text-lg font-bold text-foreground" numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
          if (isCloseToBottom && hasMore && !loadingMore) {
            loadMoreManga();
          }
        }}
        scrollEventThrottle={400}
      >
        <View className="p-4">
          {/* Stats */}
          <Text className="text-base text-muted-foreground mb-4">
            {manga.length} manga {hasMore ? '(đang tải thêm...)' : ''}
          </Text>

          {/* Manga Grid */}
          {manga.length > 0 ? (
            <>
              <View className="flex-row flex-wrap justify-between">
                {manga.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => onMangaPress(item.slug)}
                    className="w-[48%] mb-4"
                  >
                    <SafeImage
                      uri={item.thumbnail}
                      style={{
                        width: '100%',
                        height: 224,
                        borderRadius: 12,
                        marginBottom: 8,
                        backgroundColor: '#1E293B'
                      }}
                      resizeMode="cover"
                      showLoadingIndicator={false}
                    />
                    <Text className="font-bold text-foreground text-sm" numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text className="text-muted-foreground text-xs mt-1">
                      {item.totalChapters} chương
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Load More Indicator */}
              {loadingMore && (
                <View className="py-4">
                  <ActivityIndicator color="#8B5CF6" />
                </View>
              )}

              {!hasMore && manga.length > 0 && (
                <View className="py-4 items-center">
                  <Text className="text-muted-foreground text-sm">
                    Đã hiển thị tất cả
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View className="py-12 items-center">
              <Text className="text-muted-foreground text-base">
                Không có manga nào
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
