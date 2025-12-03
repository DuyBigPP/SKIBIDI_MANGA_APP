import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BookOpen, Search, Trash2 } from 'lucide-react-native';
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
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Search size={18} color="#A855F7" strokeWidth={2} />
          <Text className="text-xl font-black text-foreground ml-2">
            Kết quả
          </Text>
        </View>
        {manga.length > 0 && (
          <View className="bg-primary/20 rounded-xl px-3 py-1">
            <Text className="text-primary text-sm font-bold">{manga.length}</Text>
          </View>
        )}
      </View>

      {loading ? (
        <View className="py-16 items-center">
          <View className="bg-surface rounded-3xl p-6 border border-border/20">
            <ActivityIndicator size="large" color="#A855F7" />
          </View>
        </View>
      ) : manga.length > 0 ? (
        <>
          <View className="flex-row flex-wrap justify-between">
            {manga.map((item, index) => (
              <TouchableOpacity
                key={`${item.id}-${index}`}
                onPress={() => onMangaPress(item.slug)}
                className="w-[48%] mb-4"
                activeOpacity={0.7}
              >
                <View className="overflow-hidden rounded-2xl border border-border/20">
                  <SafeImage
                    uri={item.thumbnail}
                    style={{ 
                      width: '100%', 
                      height: 224, 
                      backgroundColor: '#161633'
                    }}
                    resizeMode="cover"
                    showLoadingIndicator={false}
                  />
                </View>
                <Text className="font-bold text-foreground text-sm mt-2" numberOfLines={2}>
                  {item.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <View className="bg-primary/20 rounded-lg px-2 py-0.5">
                    <Text className="text-primary text-xs font-bold">
                      {item.totalChapters} chương
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {loadingMore && (
            <View className="py-6 items-center">
              <ActivityIndicator color="#A855F7" />
            </View>
          )}
          
          {!hasMore && manga.length > 0 && (
            <View className="py-6 items-center">
              <View className="bg-surface rounded-xl px-4 py-2 border border-border/20">
                <Text className="text-muted-foreground text-sm font-medium">
                  Đã hiển thị tất cả kết quả
                </Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <View className="py-16 items-center">
          <View className="bg-surface rounded-3xl p-8 items-center border border-border/20">
            <BookOpen size={56} color="#64748B" strokeWidth={1.5} />
            <Text className="text-muted-foreground text-base mt-4 font-medium text-center">
              Không tìm thấy manga nào
            </Text>
            {hasActiveFilters && (
              <TouchableOpacity 
                onPress={onClearFilters}
                className="mt-5 bg-primary rounded-xl px-6 py-3 flex-row items-center"
                activeOpacity={0.8}
                style={{
                  shadowColor: '#A855F7',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Trash2 size={16} color="#FAFAFA" strokeWidth={2} />
                <Text className="text-primary-foreground font-bold ml-2">
                  Xóa bộ lọc
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
