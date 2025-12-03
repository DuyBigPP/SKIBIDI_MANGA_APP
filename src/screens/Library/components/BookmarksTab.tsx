import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Heart, BookOpen } from 'lucide-react-native';
import { Bookmark } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface BookmarksTabProps {
  bookmarks: Bookmark[];
  onMangaPress: (slug: string) => void;
}

export const BookmarksTab: React.FC<BookmarksTabProps> = ({ bookmarks, onMangaPress }) => {
  if (bookmarks.length === 0) {
    return (
      <View className="py-16 items-center">
        <View className="bg-surface rounded-3xl p-8 items-center border border-border/20">
          <Heart size={56} color="#64748B" strokeWidth={1.5} />
          <Text className="text-muted-foreground text-base mt-4 font-medium text-center">
            Chưa có manga yêu thích
          </Text>
        </View>
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
          activeOpacity={0.7}
        >
          <View className="overflow-hidden rounded-2xl border border-border/20">
            <SafeImage
              uri={item.manga.thumbnail}
              className="bg-surface h-56 w-full"
              resizeMode="cover"
              showLoadingIndicator={false}
            />
          </View>
          <Text className="font-bold text-foreground text-sm mt-2" numberOfLines={2}>
            {item.manga.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <View className="bg-primary/20 rounded-lg px-2 py-0.5">
              <Text className="text-primary text-xs font-bold">
                {item.manga.totalChapters} chương
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
