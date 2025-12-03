import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeImage } from '../../../components/SafeImage';
import { Manga } from '../../../types/api.types';

interface MangaGridProps {
  manga: Manga[];
  onMangaPress: (slug: string) => void;
}

export const MangaGrid: React.FC<MangaGridProps> = ({ manga, onMangaPress }) => {
  if (manga.length === 0) {
    return (
      <View className="py-12 items-center">
        <Text className="text-muted-foreground text-base">Không có manga nào</Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap justify-between">
      {manga.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onMangaPress(item.slug)}
          className="w-[48%] mb-4"
        >
          <SafeImage
            uri={item.thumbnail}
            className="w-full h-[224px] rounded-xl mb-2 bg-muted"
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
  );
};
