import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Manga } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface TrendingSectionProps {
  manga: Manga[];
  loading: boolean;
  onMangaPress: (slug: string) => void;
}

const TrendingSkeleton: React.FC = () => (
  <View className="flex-row">
    {[1, 2, 3, 4].map((i) => (
      <View key={i} className="mr-4 w-32">
        <View className="bg-card rounded-xl h-48 mb-2" />
        <View className="bg-card rounded h-4 mb-1" />
        <View className="bg-card rounded h-3 w-20" />
      </View>
    ))}
  </View>
);

const EmptyState: React.FC = () => (
  <View className="bg-card rounded-xl p-6 items-center">
    <Text className="text-muted-foreground text-center">Không có dữ liệu</Text>
  </View>
);

export const TrendingSection: React.FC<TrendingSectionProps> = ({ 
  manga, 
  loading, 
  onMangaPress 
}) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-xl font-bold text-foreground">Thịnh hành hôm nay</Text>
      </View>

      {loading ? (
        <TrendingSkeleton />
      ) : manga.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {manga.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onMangaPress(item.slug)}
              className="mr-4 w-32"
            >
              <SafeImage
                uri={item.thumbnail}
                className="bg-card rounded-xl h-48 mb-2 w-full"
                resizeMode="cover"
                showLoadingIndicator={false}
              />
              <Text className="font-semibold text-foreground text-sm" numberOfLines={2}>
                {item.title}
              </Text>
              <Text className="text-muted-foreground text-xs">
                {item.totalChapters} chương
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <EmptyState />
      )}
    </View>
  );
};
