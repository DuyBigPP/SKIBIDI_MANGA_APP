import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, BookOpen, Calendar } from 'lucide-react-native';
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
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <BookOpen size={20} color="#A855F7" strokeWidth={2} />
          <Text className="text-lg font-black text-foreground ml-2">
            Danh sách chương
          </Text>
        </View>
        <View className="bg-primary/20 rounded-full px-3 py-1">
          <Text className="text-primary text-sm font-bold">{totalChapters}</Text>
        </View>
      </View>

      {chapters && chapters.length > 0 ? (
        chapters.map((chapter, index) => (
          <TouchableOpacity
            key={chapter.id}
            onPress={() => onChapterPress(chapter.slug)}
            className="bg-surface rounded-2xl p-4 mb-2.5 flex-row items-center justify-between border border-border/20 active:bg-muted"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="bg-primary/20 rounded-xl w-10 h-10 items-center justify-center mr-3">
                <Text className="text-primary font-black text-sm">
                  {chapter.chapterNumber}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-foreground font-bold mb-1" numberOfLines={1}>
                  {chapter.title}
                </Text>
                <View className="flex-row items-center">
                  <Calendar size={12} color="#64748B" strokeWidth={2} />
                  <Text className="text-muted-foreground text-xs ml-1">
                    {new Date(chapter.publishedAt).toLocaleDateString('vi-VN')}
                  </Text>
                </View>
              </View>
            </View>
            <View className="bg-muted rounded-full p-2">
              <ChevronRight size={18} color="#A855F7" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="bg-surface rounded-2xl p-8 items-center border border-border/20">
          <BookOpen size={40} color="#64748B" strokeWidth={1.5} />
          <Text className="text-muted-foreground text-center mt-3 font-medium">
            Chưa có chương nào
          </Text>
        </View>
      )}
    </View>
  );
};
