import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
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
      <View className="bg-card rounded-xl p-4 mb-4 items-center justify-center">
        <ActivityIndicator size="small" color="#8B5CF6" />
      </View>
    );
  }

  if (!continueReading || continueReading.isCompleted) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(continueReading.chapter.slug)}
      className="bg-primary rounded-xl px-4 p-2 mb-2 flex-row items-center justify-between"
    >
      <View className="flex-1">
        <Text className="text-primary-foreground font-bold text-base">
          Tiếp tục đọc
        </Text>
        <Text className="text-primary-foreground/80 text-sm">
          {continueReading.chapter.title}
        </Text>
        <Text className="text-primary-foreground/60 text-xs mt-1">
          Trang {continueReading.currentPage}/{continueReading.totalPages} • {continueReading.progressPercent}%
        </Text>
      </View>
      <View className="bg-primary-foreground/20 rounded-full p-2">
        <Feather name="play-circle" size={24} color="#F8FAFC" />
      </View>
    </TouchableOpacity>
  );
};
