import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ReadingHistory } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';

interface HistoryTabProps {
  history: ReadingHistory[];
  onMangaPress: (slug: string) => void;
  onClearHistory: () => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ history, onMangaPress, onClearHistory }) => {
  return (
    <View>
      {history.length > 0 && (
        <TouchableOpacity
          onPress={onClearHistory}
          className="bg-destructive/20 rounded-xl p-3 mb-4 border border-destructive/30 flex-row items-center justify-center"
        >
          <Feather name="trash-2" size={18} color="#EF4444" />
          <Text className="text-destructive font-semibold ml-2">
            Xóa toàn bộ lịch sử
          </Text>
        </TouchableOpacity>
      )}
      {history.length > 0 ? (
        history.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onMangaPress(item.manga.slug)}
            className="flex-row mb-4 bg-card rounded-xl p-3 border border-border"
          >
            <SafeImage
              uri={item.manga.thumbnail}
              className="bg-muted rounded-lg w-16 h-20 mr-3"
              resizeMode="cover"
              showLoadingIndicator={false}
            />
            <View className="flex-1">
              <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
                {item.manga.title}
              </Text>
              <Text className="text-muted-foreground text-sm mb-1">
                Chapter {item.chapter.chapterNumber}
              </Text>
              <Text className="text-muted-foreground/70 text-xs">
                {new Date(item.lastReadAt).toLocaleDateString('vi-VN')}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="py-12 items-center">
          <Text className="text-muted-foreground text-base">
            Chưa có lịch sử đọc
          </Text>
        </View>
      )}
    </View>
  );
};
