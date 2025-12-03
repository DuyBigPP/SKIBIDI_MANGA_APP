import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen } from 'lucide-react-native';

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
    <View className="absolute top-0 left-0 right-0 z-20 bg-black/90">
      <View className="p-4 flex-row items-center">
        <TouchableOpacity 
          onPress={onBack} 
          className="bg-white/10 rounded-xl p-2 mr-3"
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-1 flex-row items-center bg-white/5 rounded-xl px-3 py-2" 
          onPress={onToggleDropdown}
          activeOpacity={0.7}
        >
          <View className="flex-1">
            <Text className="text-white font-bold" numberOfLines={1}>
              {mangaTitle}
            </Text>
            <Text className="text-gray-400 text-sm font-medium">
              Chapter {chapterNumber}
              {chapterTitle && `: ${chapterTitle}`}
            </Text>
          </View>
          {showDropdown ? (
            <ChevronUp size={20} color="#A855F7" strokeWidth={2.5} />
          ) : (
            <ChevronDown size={20} color="#A855F7" strokeWidth={2.5} />
          )}
        </TouchableOpacity>
        
        <View className="bg-primary/20 rounded-xl px-3 py-2 ml-3">
          <Text className="text-primary text-sm font-bold">
            {chapterNumber}/{totalChapters}
          </Text>
        </View>
      </View>

      {/* Chapter Dropdown */}
      {showDropdown && (
        <ScrollView
          className="bg-black/98 max-h-80 border-t border-white/10"
          showsVerticalScrollIndicator={true}
        >
          {chapters.map((ch) => {
            const isActive = ch.id === currentChapterId;
            return (
              <TouchableOpacity
                key={ch.id}
                onPress={() => onSelectChapter(ch.slug)}
                className={`p-4 border-b border-white/5 flex-row items-center ${
                  isActive ? 'bg-primary/15' : ''
                }`}
                activeOpacity={0.7}
              >
                <View className={`rounded-lg w-10 h-10 items-center justify-center mr-3 ${
                  isActive ? 'bg-primary' : 'bg-white/10'
                }`}>
                  <BookOpen size={16} color={isActive ? '#FFFFFF' : '#A855F7'} strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text
                    className={`text-sm font-bold ${
                      isActive ? 'text-primary' : 'text-white'
                    }`}
                  >
                    Chapter {ch.chapterNumber}
                    {ch.title && `: ${ch.title}`}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-0.5 font-medium">
                    {new Date(ch.publishedAt).toLocaleDateString('vi-VN')}
                  </Text>
                </View>
                {isActive && (
                  <View className="bg-primary rounded-full px-2 py-0.5">
                    <Text className="text-white text-xs font-bold">Đang đọc</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
