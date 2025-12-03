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

const statusConfig: Record<MangaStatus, { bg: string; text: string; label: string }> = {
  ONGOING: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Đang tiến hành' },
  COMPLETED: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Hoàn thành' },
  HIATUS: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Tạm ngưng' },
  CANCELLED: { bg: 'bg-rose-500/20', text: 'text-rose-400', label: 'Đã hủy' },
};

export const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  status,
  isBookmarked,
  bookmarkLoading,
  onBookmarkPress,
}) => {
  const config = statusConfig[status];
  
  return (
    <View className="flex-row items-start justify-between mb-5 -mt-8 relative z-10 bg-black/40 rounded-2xl p-4 mx-1">
      <View className="flex-1 mr-4">
        <Text className="text-2xl font-black text-foreground mb-3 leading-tight">
          {title}
        </Text>
        <View className={`${config.bg} rounded-full px-3 py-1.5 self-start border border-white/5`}>
          <Text className={`${config.text} text-xs font-bold`}>
            {config.label}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onBookmarkPress}
        disabled={bookmarkLoading}
        className={`rounded-2xl p-3.5 ${isBookmarked ? 'bg-rose-500' : 'bg-muted border border-border/50'}`}
        activeOpacity={0.8}
      >
        {bookmarkLoading ? (
          <ActivityIndicator size="small" color={isBookmarked ? '#FAFAFA' : '#A855F7'} />
        ) : (
          <Heart 
            size={24} 
            color={isBookmarked ? '#FAFAFA' : '#A855F7'} 
            fill={isBookmarked ? '#FAFAFA' : 'transparent'} 
            strokeWidth={2} 
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
