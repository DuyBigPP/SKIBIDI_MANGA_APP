/**
 * Manga List Screen - Display manga by author or genre
 */

import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Manga } from '../../types/api.types';
import { authorService, genreService } from '../../services/api';
import {
  MangaListHeader,
  LoadingView,
  StatsBar,
  MangaGrid,
  LoadMoreIndicator,
} from './components';

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
    return <LoadingView />;
  }

  return (
    <View className="flex-1 bg-background">
      <MangaListHeader type={type} name={name} onBack={onBack} />

      <ScrollView
        className="flex-1"
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
          if (isCloseToBottom && hasMore && !loadingMore) {
            loadMoreManga();
          }
        }}
        scrollEventThrottle={400}
      >
        <View className="p-4">
          <StatsBar count={manga.length} hasMore={hasMore} />
          <MangaGrid manga={manga} onMangaPress={onMangaPress} />
          <LoadMoreIndicator
            loading={loadingMore}
            hasMore={hasMore}
            hasItems={manga.length > 0}
          />
        </View>
      </ScrollView>
    </View>
  );
};
