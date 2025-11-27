import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ReadingHistory } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface ReadingTabProps {
  readingList: ReadingHistory[];
  onChapterPress: (chapterSlug: string) => void;
}

export const ReadingTab: React.FC<ReadingTabProps> = ({ readingList, onChapterPress }) => {
  if (readingList.length === 0) {
    return (
      <View className="py-12 items-center">
        <Text className="text-muted-foreground text-base">
          Chưa có manga đang đọc
        </Text>
      </View>
    );
  }

  return (
    <View>
      {readingList.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onChapterPress(item.chapter.slug)}
          className="flex-row mb-4 bg-card rounded-xl p-3 border border-border"
        >
          <SafeImage
            uri={item.manga.thumbnail}
            className="bg-muted rounded-lg w-20 h-28 mr-3"
            resizeMode="cover"
            showLoadingIndicator={false}
          />
          <View className="flex-1">
            <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
              {item.manga.title}
            </Text>
            <Text className="text-muted-foreground text-sm mb-2">
              Chapter {item.chapter.chapterNumber}
              {item.chapter.title && `: ${item.chapter.title}`}
            </Text>

            {/* Progress Bar */}
            <View className="bg-muted rounded-full h-2 mb-2">
              <View
                className="bg-primary rounded-full h-2"
                style={{ width: `${item.progressPercent}%` }}
              />
            </View>

            <Text className="text-muted-foreground/70 text-xs">
              Đã đọc {item.progressPercent}% • {new Date(item.lastReadAt).toLocaleDateString('vi-VN')}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
