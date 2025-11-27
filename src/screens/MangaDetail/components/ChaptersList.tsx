import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ChapterSummary } from '../../../types/api.types';

interface ChaptersListProps {
  chapters: ChapterSummary[];
  totalChapters: number;
  onChapterPress: (chapterSlug: string) => void;
}

export const ChaptersList: React.FC<ChaptersListProps> = ({ 
  chapters, 
  totalChapters, 
  onChapterPress 
}) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-foreground">
          Danh sách chương ({totalChapters})
        </Text>
      </View>

      {chapters && chapters.length > 0 ? (
        chapters.map((chapter) => (
          <TouchableOpacity
            key={chapter.id}
            onPress={() => onChapterPress(chapter.slug)}
            className="bg-card rounded-xl p-4 mb-2 flex-row items-center justify-between"
          >
            <View className="flex-1">
              <Text className="text-foreground font-semibold mb-1">
                {chapter.title}
              </Text>
              <Text className="text-muted-foreground text-xs">
                {new Date(chapter.publishedAt).toLocaleDateString('vi-VN')}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-muted-foreground text-center py-8">
          Chưa có chương nào
        </Text>
      )}
    </View>
  );
};
