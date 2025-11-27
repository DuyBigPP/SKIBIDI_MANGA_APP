/**
 * Browse Screen - Search and filter manga with dropdown filters
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RefreshCw, Check, Pause, X, Flame, Sparkles, Type, FileText, Scroll, Theater, BookOpen } from 'lucide-react-native';
import { Manga, Genre } from '../../types/api.types';
import { mangaService, genreService } from '../../services/api';
import { SafeImage } from '../../components/SafeImage';

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

  const handleGenreSelect = (genreSlug: string | null) => {
    setSelectedGenre(genreSlug);
  };

  const handleStatusSelect = (status: StatusOption) => {
    setSelectedStatus(status);
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

  const statusOptions: { value: StatusOption; label: string; iconComponent: React.ComponentType<any> }[] = [
    { value: 'ONGOING', label: 'Đang ra', iconComponent: RefreshCw },
    { value: 'COMPLETED', label: 'Hoàn thành', iconComponent: Check },
    { value: 'HIATUS', label: 'Tạm ngưng', iconComponent: Pause },
    { value: 'CANCELLED', label: 'Đã hủy', iconComponent: X },
  ];

  const sortOptions: { value: SortOption; label: string; iconComponent: React.ComponentType<any> }[] = [
    { value: 'updatedAt', label: 'Mới cập nhật', iconComponent: Flame },
    { value: 'createdAt', label: 'Mới thêm', iconComponent: Sparkles },
    { value: 'title', label: 'Tên A-Z', iconComponent: Type },
  ];

  const getSelectedGenreName = () => {
    const genre = genres.find(g => g.slug === selectedGenre);
    return genre ? genre.name : 'Tất cả';
  };

  const getSelectedStatusLabel = () => {
    const status = statusOptions.find(s => s.value === selectedStatus);
    return status ? status.label : 'Tất cả';
  };

  const getSelectedSortLabel = () => {
    const sort = sortOptions.find(s => s.value === sortBy);
    return sort ? sort.label : 'Sắp xếp';
  };

  const hasActiveFilters = selectedGenre || selectedStatus || sortBy !== 'updatedAt' || searchQuery;

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
          {/* Header */}
          <Text className="text-3xl font-bold text-foreground mb-6">Tìm kiếm</Text>

          {/* Search Bar with Filter Button */}
          <View className="mb-4 flex-row items-center">
            <View className="flex-1 bg-card rounded-xl p-4 flex-row items-center border border-border mr-3">
              <Feather name="search" size={20} color="#94A3B8" />
              <TextInput
                placeholder="Tìm kiếm manga..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                className="flex-1 text-base text-foreground ml-2"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Feather name="x" size={20} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>
            
            {/* Filter Button */}
            <TouchableOpacity
              onPress={() => setShowFilterModal(true)}
              className="bg-primary rounded-xl p-4 relative"
            >
              <Feather name="sliders" size={24} color="#F8FAFC" />
              {hasActiveFilters && (
                <View className="absolute -top-1 -right-1 bg-destructive w-3 h-3 rounded-full" />
              )}
            </TouchableOpacity>
          </View>

          {/* Random Manga Button */}
          <TouchableOpacity
            onPress={handleRandomManga}
            disabled={randomLoading}
            className="mb-4 bg-primary rounded-xl p-3 flex-row items-center self-start"
          >
            {randomLoading ? (
              <ActivityIndicator size="small" color="#F8FAFC" />
            ) : (
              <>
                <Feather name="shuffle" size={18} color="#F8FAFC" />
                <View className="ml-2">
                  <Text className="text-white text-xs opacity-80">Không biết đọc gì?</Text>
                  <Text className="text-white font-semibold text-sm">Manga ngẫu nhiên</Text>
                </View>
              </>
            )}
          </TouchableOpacity>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <View className="mb-4">
              <View className="flex-row flex-wrap items-center">
                {selectedGenre && (
                  <View className="bg-primary/20 rounded-full px-3 py-1.5 mr-2 mb-2 flex-row items-center">
                    <Text className="text-primary text-xs font-semibold mr-1">
                      {getSelectedGenreName()}
                    </Text>
                    <TouchableOpacity onPress={() => setSelectedGenre(null)}>
                      <Feather name="x" size={12} color="#8B5CF6" />
                    </TouchableOpacity>
                  </View>
                )}
                {selectedStatus && (
                  <View className="bg-primary/20 rounded-full px-3 py-1.5 mr-2 mb-2 flex-row items-center">
                    <Text className="text-primary text-xs font-semibold mr-1">
                      {getSelectedStatusLabel()}
                    </Text>
                    <TouchableOpacity onPress={() => setSelectedStatus(null)}>
                      <Feather name="x" size={12} color="#8B5CF6" />
                    </TouchableOpacity>
                  </View>
                )}
                {sortBy !== 'updatedAt' && (
                  <View className="bg-primary/20 rounded-full px-3 py-1.5 mr-2 mb-2 flex-row items-center">
                    <Text className="text-primary text-xs font-semibold mr-1">
                      {getSelectedSortLabel()}
                    </Text>
                    <TouchableOpacity onPress={() => setSortBy('updatedAt')}>
                      <Feather name="x" size={12} color="#8B5CF6" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={clearFilters} className="mt-2">
                <Text className="text-destructive text-xs font-semibold">Xóa tất cả</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Results */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-foreground mb-4">
              {manga.length > 0 ? `${manga.length} kết quả` : 'Kết quả'}
            </Text>

            {loading ? (
              <View className="py-12">
                <ActivityIndicator size="large" color="#8B5CF6" />
              </View>
            ) : manga.length > 0 ? (
              <>
                <View className="flex-row flex-wrap justify-between">
                  {manga.map((item, index) => (
                    <TouchableOpacity
                      key={`${item.id}-${index}`}
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
                      Đã hiển thị tất cả kết quả
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <View className="py-12 items-center">
                <BookOpen size={64} color="#94A3B8" strokeWidth={1.5} />
                <Text className="text-muted-foreground text-base mt-3">
                  Không tìm thấy manga nào
                </Text>
                {hasActiveFilters && (
                  <TouchableOpacity 
                    onPress={clearFilters}
                    className="mt-4 bg-primary rounded-full px-6 py-2"
                  >
                    <Text className="text-primary-foreground font-semibold">
                      Xóa bộ lọc
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background rounded-t-3xl max-h-[80%]">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-border">
              <Text className="text-xl font-bold text-foreground">Bộ lọc</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Feather name="x" size={24} color="#F8FAFC" />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              {/* Sort Section */}
              <View className="mb-6">
                <Text className="text-base font-bold text-foreground mb-3">Sắp xếp</Text>
                {sortOptions.map((option) => {
                  const IconComponent = option.iconComponent;
                  return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => {
                      setSortBy(option.value);
                      setShowFilterModal(false);
                    }}
                    className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                      sortBy === option.value ? 'bg-primary' : 'bg-card border border-border'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <IconComponent size={24} color={sortBy === option.value ? '#F8FAFC' : '#8B5CF6'} strokeWidth={2} />
                      <Text
                        className={`font-semibold ml-3 ${
                          sortBy === option.value ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {sortBy === option.value && (
                      <Feather name="check" size={20} color="#F8FAFC" />
                    )}
                  </TouchableOpacity>
                );})}
              </View>

              {/* Status Section */}
              <View className="mb-6">
                <Text className="text-base font-bold text-foreground mb-3">Trạng thái</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedStatus(null);
                    setShowFilterModal(false);
                  }}
                  className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                    !selectedStatus ? 'bg-primary' : 'bg-card border border-border'
                  }`}
                >
                  <View className="flex-row items-center">
                    <FileText size={24} color={!selectedStatus ? '#F8FAFC' : '#8B5CF6'} strokeWidth={2} />
                    <Text
                      className={`font-semibold ml-3 ${
                        !selectedStatus ? 'text-primary-foreground' : 'text-foreground'
                      }`}
                    >
                      Tất cả
                    </Text>
                  </View>
                  {!selectedStatus && <Feather name="check" size={20} color="#F8FAFC" />}
                </TouchableOpacity>
                {statusOptions.map((option) => {
                  const IconComponent = option.iconComponent;
                  return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => {
                      handleStatusSelect(option.value);
                      setShowFilterModal(false);
                    }}
                    className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                      selectedStatus === option.value ? 'bg-primary' : 'bg-card border border-border'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <IconComponent size={24} color={selectedStatus === option.value ? '#F8FAFC' : '#8B5CF6'} strokeWidth={2} />
                      <Text
                        className={`font-semibold ml-3 ${
                          selectedStatus === option.value ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {selectedStatus === option.value && (
                      <Feather name="check" size={20} color="#F8FAFC" />
                    )}
                  </TouchableOpacity>
                );})}
              </View>

              {/* Genre Section */}
              <View className="mb-6">
                <Text className="text-base font-bold text-foreground mb-3">Thể loại</Text>
                {genresLoading ? (
                  <ActivityIndicator color="#8B5CF6" />
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedGenre(null);
                        setShowFilterModal(false);
                      }}
                      className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                        !selectedGenre ? 'bg-primary' : 'bg-card border border-border'
                      }`}
                    >
                      <View className="flex-row items-center">
                        <Theater size={24} color={!selectedGenre ? '#F8FAFC' : '#8B5CF6'} strokeWidth={2} />
                        <Text
                          className={`font-semibold ml-3 ${
                            !selectedGenre ? 'text-primary-foreground' : 'text-foreground'
                          }`}
                        >
                          Tất cả
                        </Text>
                      </View>
                      {!selectedGenre && <Feather name="check" size={20} color="#F8FAFC" />}
                    </TouchableOpacity>
                    <ScrollView className="max-h-80">
                      <View className="flex-row flex-wrap">
                        {genres.map((genre) => (
                          <TouchableOpacity
                            key={genre.id}
                            onPress={() => {
                              handleGenreSelect(genre.slug);
                              setShowFilterModal(false);
                            }}
                            className={`rounded-full px-4 py-2 mr-2 mb-2 ${
                              selectedGenre === genre.slug
                                ? 'bg-primary border border-primary'
                                : 'bg-card border border-border'
                            }`}
                          >
                            <Text
                              className={`text-sm font-semibold ${
                                selectedGenre === genre.slug ? 'text-primary-foreground' : 'text-foreground'
                              }`}
                            >
                              {genre.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </>
                )}
              </View>
            </ScrollView>

            {/* Footer Actions */}
            <View className="p-4 border-t border-border flex-row">
              <TouchableOpacity
                onPress={() => {
                  clearFilters();
                  setShowFilterModal(false);
                }}
                className="flex-1 bg-card border border-border rounded-xl p-4 mr-2"
              >
                <Text className="text-foreground font-semibold text-center">Xóa bộ lọc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowFilterModal(false)}
                className="flex-1 bg-primary rounded-xl p-4"
              >
                <Text className="text-primary-foreground font-semibold text-center">Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

