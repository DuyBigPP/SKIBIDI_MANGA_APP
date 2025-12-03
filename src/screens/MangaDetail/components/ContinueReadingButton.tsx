import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Play, BookOpen } from 'lucide-react-native';
import { ReadingHistory } from '../../../types/api.types';

interface ContinueReadingButtonProps {
  continueReading: ReadingHistory | null;
  loading: boolean;
  onPress: (chapterSlug: string) => void;
}

export const ContinueReadingButton: React.FC<ContinueReadingButtonProps> = ({
  continueReading,
  loading,
  onPress,
}) => {
  if (loading) {
    return (
      <View className="bg-surface rounded-2xl p-4 mb-4 items-center justify-center border border-border/20">
        <ActivityIndicator size="small" color="#A855F7" />
      </View>
    );
  }

  if (!continueReading || continueReading.isCompleted) {
    return null;
  }

  const progress = continueReading.progressPercent || 0;

  return (
    <TouchableOpacity
      onPress={() => onPress(continueReading.chapter.slug)}
      className="bg-primary rounded-2xl p-4 mb-4 flex-row items-center justify-between overflow-hidden relative"
      activeOpacity={0.85}
    >
      {/* Progress bar background */}
      <View 
        className="absolute left-0 top-0 bottom-0 bg-white/10"
        style={{ width: `${progress}%` }}
      />
      
      <View className="flex-row items-center flex-1">
        <View className="bg-white/20 rounded-xl p-2 mr-3">
          <BookOpen size={20} color="#FAFAFA" strokeWidth={2} />
        </View>
        <View className="flex-1">
          <Text className="text-primary-foreground font-black text-base">
            Tiếp tục đọc
          </Text>
          <Text className="text-primary-foreground/90 text-sm font-medium" numberOfLines={1}>
            {continueReading.chapter.title}
          </Text>
          <Text className="text-primary-foreground/70 text-xs mt-0.5 font-medium">
            Trang {continueReading.currentPage}/{continueReading.totalPages} • {progress}%
          </Text>
        </View>
      </View>
      
      <View className="bg-white/25 rounded-full p-3 ml-2">
        <Play size={22} color="#FAFAFA" fill="#FAFAFA" strokeWidth={0} />
      </View>
    </TouchableOpacity>
  );
};
