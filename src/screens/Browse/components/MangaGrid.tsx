import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { Manga } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface MangaGridProps {
  manga: Manga[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  hasActiveFilters: boolean;
  onMangaPress: (slug: string) => void;
  onClearFilters: () => void;
}

export const MangaGrid: React.FC<MangaGridProps> = ({
  manga,
  loading,
  loadingMore,
  hasMore,
  hasActiveFilters,
  onMangaPress,
  onClearFilters,
}) => {
  return (
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
              onPress={onClearFilters}
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
  );
};
