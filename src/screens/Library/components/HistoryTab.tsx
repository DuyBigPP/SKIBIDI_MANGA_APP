import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Trash2, Clock, ChevronRight } from 'lucide-react-native';
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
          className="bg-rose-500/15 rounded-2xl p-4 mb-5 border border-rose-500/30 flex-row items-center justify-center"
          activeOpacity={0.7}
        >
          <Trash2 size={18} color="#F43F5E" strokeWidth={2} />
          <Text className="text-rose-500 font-bold ml-2">
            Xóa toàn bộ lịch sử
          </Text>
        </TouchableOpacity>
      )}
      {history.length > 0 ? (
        history.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onMangaPress(item.manga.slug)}
            className="flex-row mb-3 bg-surface rounded-2xl p-3.5 border border-border/20"
            activeOpacity={0.7}
          >
            <View className="overflow-hidden rounded-xl">
              <SafeImage
                uri={item.manga.thumbnail}
                className="bg-muted w-16 h-20"
                resizeMode="cover"
                showLoadingIndicator={false}
              />
            </View>
            <View className="flex-1 ml-3">
              <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
                {item.manga.title}
              </Text>
              <View className="bg-primary/15 self-start rounded-lg px-2 py-0.5 mb-1.5">
                <Text className="text-primary text-xs font-bold">
                  Chapter {item.chapter.chapterNumber}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Clock size={12} color="#64748B" strokeWidth={2} />
                <Text className="text-muted-foreground text-xs ml-1 font-medium">
                  {new Date(item.lastReadAt).toLocaleDateString('vi-VN')}
                </Text>
              </View>
            </View>
            <View className="justify-center">
              <ChevronRight size={20} color="#64748B" strokeWidth={2} />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="py-16 items-center">
          <View className="bg-surface rounded-3xl p-8 items-center border border-border/20">
            <Clock size={56} color="#64748B" strokeWidth={1.5} />
            <Text className="text-muted-foreground text-base mt-4 font-medium text-center">
              Chưa có lịch sử đọc
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
