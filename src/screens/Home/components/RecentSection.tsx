import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Manga } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface RecentSectionProps {
  manga: Manga[];
  loading: boolean;
  onMangaPress: (slug: string) => void;
}

const RecentSkeleton: React.FC = () => (
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
);

const EmptyState: React.FC = () => (
  <View className="bg-card rounded-xl p-6 items-center">
    <Text className="text-muted-foreground text-center">Không có dữ liệu</Text>
  </View>
);

export const RecentSection: React.FC<RecentSectionProps> = ({ 
  manga, 
  loading, 
  onMangaPress 
}) => {
  return (
    <View className="mb-6">
      <Text className="text-xl font-bold text-foreground mb-3">Cập nhật gần đây</Text>

      {loading ? (
        <RecentSkeleton />
      ) : manga.length > 0 ? (
        <>
          {manga.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onMangaPress(item.slug)}
              className="flex-row mb-4 bg-card rounded-xl p-3"
            >
              <SafeImage
                uri={item.thumbnail}
                className="bg-muted rounded-lg w-16 h-20 mr-3"
                resizeMode="cover"
                showLoadingIndicator={false}
              />
              <View className="flex-1">
                <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
                  {item.title}
                </Text>
                {item.latestChapter && (
                  <Text className="text-muted-foreground text-sm mb-1">
                    {item.latestChapter.title}
                  </Text>
                )}
                <Text className="text-muted-foreground/70 text-xs">
                  {new Date(item.lastChapterAt).toLocaleDateString('vi-VN')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <EmptyState />
      )}
    </View>
  );
};
