import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Heart } from 'lucide-react-native';

type MangaStatus = 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED';

interface TitleSectionProps {
  title: string;
  status: MangaStatus;
  isBookmarked: boolean;
  bookmarkLoading: boolean;
  onBookmarkPress: () => void;
}

const statusColors: Record<MangaStatus, string> = {
  ONGOING: 'bg-green-500',
  COMPLETED: 'bg-blue-500',
  HIATUS: 'bg-yellow-500',
  CANCELLED: 'bg-red-500',
};

const statusText: Record<MangaStatus, string> = {
  ONGOING: 'Đang tiến hành',
  COMPLETED: 'Hoàn thành',
  HIATUS: 'Tạm ngưng',
  CANCELLED: 'Đã hủy',
};

export const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  status,
  isBookmarked,
  bookmarkLoading,
  onBookmarkPress,
}) => {
  return (
    <View className="flex-row items-start justify-between mb-4 -mt-8 relative z-10">
      <View className="flex-1 mr-4">
        <Text className="text-2xl font-bold text-foreground mb-2">
          {title}
        </Text>
        <View className={`${statusColors[status]} rounded-full px-3 py-1 self-start`}>
          <Text className="text-white text-xs font-semibold">
            {statusText[status]}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onBookmarkPress}
        disabled={bookmarkLoading}
        className={`rounded-full p-3 ${isBookmarked ? 'bg-red-500' : 'bg-primary'}`}
      >
        {bookmarkLoading ? (
          <ActivityIndicator size="small" color="#F8FAFC" />
        ) : (
          <Heart size={24} color="#F8FAFC" fill={isBookmarked ? '#F8FAFC' : 'transparent'} strokeWidth={2} />
        )}
      </TouchableOpacity>
    </View>
  );
};
