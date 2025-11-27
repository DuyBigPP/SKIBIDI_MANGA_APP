import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Manga } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface FeaturedSectionProps {
  manga: Manga;
  onPress: (slug: string) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ manga, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(manga.slug)} className="mb-6">
      <View className="bg-card rounded-2xl overflow-hidden">
        <SafeImage
          uri={manga.thumbnail}
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
            <Text className="text-white/80 text-xs bg-card rounded-full px-2 py-1">
              {manga.totalChapters} chương
            </Text>
          </View>
          <View className="bg-black/30 backdrop-blur rounded-xl px-3 py-2 mb-2 self-start">
            <Text className="text-white text-2xl font-bold" numberOfLines={2}>
              {manga.title}
            </Text>
          </View>
          {manga.genres.length > 0 && (
            <View className="flex-row flex-wrap gap-2">
              {manga.genres.slice(0, 3).map((genre) => (
                <View key={genre.id} className="bg-black/20 backdrop-blur rounded-full px-3 py-1">
                  <Text className="text-white text-xs font-medium">
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
