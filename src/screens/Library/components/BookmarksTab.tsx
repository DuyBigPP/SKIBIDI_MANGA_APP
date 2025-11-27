import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bookmark } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface BookmarksTabProps {
  bookmarks: Bookmark[];
  onMangaPress: (slug: string) => void;
}

export const BookmarksTab: React.FC<BookmarksTabProps> = ({ bookmarks, onMangaPress }) => {
  if (bookmarks.length === 0) {
    return (
      <View className="py-12 items-center">
        <Text className="text-muted-foreground text-base">
          Chưa có manga yêu thích
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap justify-between">
      {bookmarks.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onMangaPress(item.manga.slug)}
          className="w-[48%] mb-4"
        >
          <SafeImage
            uri={item.manga.thumbnail}
            className="bg-card rounded-xl h-56 mb-2 border border-border w-full"
            resizeMode="cover"
            showLoadingIndicator={false}
          />
          <Text className="font-bold text-foreground text-sm" numberOfLines={2}>
            {item.manga.title}
          </Text>
          <Text className="text-muted-foreground text-xs">
            {item.manga.totalChapters} chương
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
