import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BookOpen, Play } from 'lucide-react-native';
import { ReadingHistory } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface ReadingTabProps {
  readingList: ReadingHistory[];
  onChapterPress: (chapterSlug: string) => void;
}

export const ReadingTab: React.FC<ReadingTabProps> = ({ readingList, onChapterPress }) => {
  if (readingList.length === 0) {
    return (
      <View className="py-16 items-center">
        <View className="bg-surface rounded-3xl p-8 items-center border border-border/20">
          <BookOpen size={56} color="#64748B" strokeWidth={1.5} />
          <Text className="text-muted-foreground text-base mt-4 font-medium text-center">
            Chưa có manga đang đọc
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      {readingList.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onChapterPress(item.chapter.slug)}
          className="flex-row mb-3 bg-surface rounded-2xl p-3.5 border border-border/20"
          activeOpacity={0.7}
        >
          <View className="overflow-hidden rounded-xl">
            <SafeImage
              uri={item.manga.thumbnail}
              className="bg-muted w-20 h-28"
              resizeMode="cover"
              showLoadingIndicator={false}
            />
          </View>
          <View className="flex-1 ml-3">
            <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
              {item.manga.title}
            </Text>
            <View className="bg-primary/15 self-start rounded-lg px-2 py-0.5 mb-2">
              <Text className="text-primary text-xs font-bold">
                Chapter {item.chapter.chapterNumber}
                {/* {item.chapter.title && `: ${item.chapter.title}`} */}
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="bg-muted rounded-full h-2 mb-2 overflow-hidden">
              <View
                className="bg-primary rounded-full h-2"
                style={{ width: `${item.progressPercent}%` }}
              />
            </View>

            <Text className="text-muted-foreground text-xs font-medium">
              Đã đọc {item.progressPercent}% • {new Date(item.lastReadAt).toLocaleDateString('vi-VN')}
            </Text>
          </View>
          
          <View className="justify-center ml-2">
            <View className="bg-primary rounded-xl p-2.5">
              <Play size={18} color="#FAFAFA" fill="#FAFAFA" strokeWidth={0} />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
