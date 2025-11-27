/**
 * Browse Screen - Search and filter manga with dropdown filters
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Manga, Genre } from '../../types/api.types';
import { mangaService, genreService } from '../../services/api';
import {
  BrowseHeader,
  SearchBar,
  RandomMangaButton,
  ActiveFilters,
  MangaGrid,
  FilterModal,
} from './components';

interface BrowseScreenProps {
  onMangaPress: (slug: string) => void;
}

type SortOption = 'updatedAt' | 'createdAt' | 'title';
type StatusOption = 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED' | null;

export const BrowseScreen: React.FC<BrowseScreenProps> = ({ onMangaPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [manga, setManga] = useState<Manga[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<StatusOption>(null);
  const [sortBy, setSortBy] = useState<SortOption>('updatedAt');
  const [loading, setLoading] = useState(false);
  const [genresLoading, setGenresLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [randomLoading, setRandomLoading] = useState(false);
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isInitialMount = useRef(true);

  useEffect(() => {
    loadGenres();
    loadManga(true);
    isInitialMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) return;
    
    // Reset and reload when filters change
    setPage(1);
    setHasMore(true);
    setManga([]); // Clear existing manga to prevent duplicates
    loadManga(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre, selectedStatus, sortBy]);

  // Debounced search
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) return;
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      setManga([]); // Clear existing manga to prevent duplicates
      loadManga(true);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const loadGenres = async () => {
    try {
      const response = await genreService.getAll();
      if (response.success) {
        setGenres(response.data);
      }
    } catch (error) {
      console.error('Failed to load genres:', error);
    } finally {
      setGenresLoading(false);
    }
  };

  const loadManga = async (reset: boolean = false) => {
    try {
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const currentPage = reset ? 1 : page;

      // If a genre is selected and no other filters, use the genre-specific endpoint
      // Genre endpoint doesn't support search/status filter
      if (selectedGenre && !searchQuery && !selectedStatus) {
        const response = await genreService.getMangaByGenre(selectedGenre, {
          page: currentPage,
          limit: 20,
          sortBy: 'createdAt',
          order: 'desc',
        });

        if (response.success) {
          if (reset) {
            setManga(response.manga);
          } else {
            setManga(prev => [...prev, ...response.manga]);
          }
          
          // Check if there's more data based on pagination
          setHasMore(currentPage < response.pagination.pages);
        }
      } else {
        // Use the general manga endpoint for search, status, or combined filters
        const response = await mangaService.getAll({
          page: currentPage,
          limit: 20,
          search: searchQuery || undefined,
          genres: selectedGenre || undefined,
          status: selectedStatus || undefined,
          sortBy,
          order: 'desc',
        });

        if (response.success) {
          if (reset) {
            setManga(response.data);
          } else {
            setManga(prev => [...prev, ...response.data]);
          }
          
          // Check if there's more data
          setHasMore(response.data.length === 20);
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
      setPage(prev => prev + 1);
      loadManga(false);
    }
  };

  const clearFilters = useCallback(() => {
    setSelectedGenre(null);
    setSelectedStatus(null);
    setSortBy('updatedAt');
    setSearchQuery('');
  }, []);

  const handleRandomManga = async () => {
    try {
      setRandomLoading(true);
      const response = await mangaService.getRandom();
      if (response.success && response.data && response.data.length > 0) {
        const randomManga = response.data[0];
        onMangaPress(randomManga.slug);
      }
    } catch (error) {
      console.error('Failed to get random manga:', error);
      Alert.alert('Lỗi', 'Không thể lấy manga ngẫu nhiên');
    } finally {
      setRandomLoading(false);
    }
  };

  const statusLabels: Record<string, string> = {
    'ONGOING': 'Đang ra',
    'COMPLETED': 'Hoàn thành',
    'HIATUS': 'Tạm ngưng',
    'CANCELLED': 'Đã hủy',
  };

  const sortLabels: Record<string, string> = {
    'updatedAt': 'Mới cập nhật',
    'createdAt': 'Mới thêm',
    'title': 'Tên A-Z',
  };

  const getSelectedGenreName = () => {
    const genre = genres.find(g => g.slug === selectedGenre);
    return genre ? genre.name : 'Tất cả';
  };

  const getSelectedStatusLabel = () => {
    return selectedStatus ? statusLabels[selectedStatus] : 'Tất cả';
  };

  const getSelectedSortLabel = () => {
    return sortLabels[sortBy] || 'Sắp xếp';
  };

  const hasActiveFilters = !!(selectedGenre || selectedStatus || sortBy !== 'updatedAt' || searchQuery);

  return (
    <>
      <ScrollView 
        className="flex-1 bg-background"
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
          <BrowseHeader />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterPress={() => setShowFilterModal(true)}
            hasActiveFilters={hasActiveFilters}
          />

          <RandomMangaButton onPress={handleRandomManga} loading={randomLoading} />

          {hasActiveFilters && (
            <ActiveFilters
              selectedGenreName={getSelectedGenreName()}
              selectedStatusLabel={getSelectedStatusLabel()}
              selectedSortLabel={getSelectedSortLabel()}
              selectedGenre={selectedGenre}
              selectedStatus={selectedStatus}
              sortBy={sortBy}
              onRemoveGenre={() => setSelectedGenre(null)}
              onRemoveStatus={() => setSelectedStatus(null)}
              onRemoveSort={() => setSortBy('updatedAt')}
              onClearAll={clearFilters}
            />
          )}

          <MangaGrid
            manga={manga}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            hasActiveFilters={hasActiveFilters}
            onMangaPress={onMangaPress}
            onClearFilters={clearFilters}
          />
        </View>
      </ScrollView>

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        sortBy={sortBy}
        selectedStatus={selectedStatus}
        selectedGenre={selectedGenre}
        genres={genres}
        genresLoading={genresLoading}
        onSortChange={setSortBy}
        onStatusChange={setSelectedStatus}
        onGenreChange={setSelectedGenre}
        onClearFilters={clearFilters}
      />
    </>
  );
};

