import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ReaderHeaderProps {
  mangaTitle: string;
  chapterNumber: number;
  chapterTitle: string | null;
  currentChapterIndex: number;
  totalChapters: number;
  showDropdown: boolean;
  chapters: any[];
  currentChapterId: string | number;
  onBack: () => void;
  onToggleDropdown: () => void;
  onSelectChapter: (slug: string) => void;
}

export const ReaderHeader: React.FC<ReaderHeaderProps> = ({
  mangaTitle,
  chapterNumber,
  chapterTitle,
  currentChapterIndex,
  totalChapters,
  showDropdown,
  chapters,
  currentChapterId,
  onBack,
  onToggleDropdown,
  onSelectChapter,
}) => {
  return (
    <View className="absolute top-0 left-0 right-0 z-20 bg-black/80">
      <View className="p-4 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center" onPress={onToggleDropdown}>
          <View className="flex-1">
            <Text className="text-white font-bold" numberOfLines={1}>
              {mangaTitle}
            </Text>
            <Text className="text-gray-400 text-sm">
              Chapter {chapterNumber}
              {chapterTitle && `: ${chapterTitle}`}
            </Text>
          </View>
          <Feather
            name={showDropdown ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Text className="text-white text-sm ml-3">
          {totalChapters - currentChapterIndex} / {totalChapters}
        </Text>
      </View>

      {/* Chapter Dropdown */}
      {showDropdown && (
        <ScrollView
          className="bg-black/95 max-h-80 border-t border-gray-700"
          showsVerticalScrollIndicator={true}
        >
          {chapters.map((ch) => (
            <TouchableOpacity
              key={ch.id}
              onPress={() => onSelectChapter(ch.slug)}
              className={`p-4 border-b border-gray-800 ${
                ch.id === currentChapterId ? 'bg-primary/20' : ''
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  ch.id === currentChapterId ? 'text-primary' : 'text-white'
                }`}
              >
                Chapter {ch.chapterNumber}
                {ch.title && `: ${ch.title}`}
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                {new Date(ch.publishedAt).toLocaleDateString('vi-VN')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
