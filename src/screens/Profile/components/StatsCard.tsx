import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { BookOpen, Heart } from 'lucide-react-native';

interface StatsCardProps {
  readingHistory: number;
  bookmarks: number;
  loading: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({ readingHistory, bookmarks, loading }) => {
  return (
    <View className="flex-row justify-around mb-6 bg-surface rounded-2xl p-5 border border-border/30">
      <View className="items-center flex-1">
        {loading ? (
          <ActivityIndicator size="small" color="#A855F7" />
        ) : (
          <>
            <View className="bg-primary/20 rounded-full p-2.5 mb-2">
              <BookOpen size={20} color="#A855F7" strokeWidth={2} />
            </View>
            <Text className="text-2xl font-black text-foreground">{readingHistory}</Text>
            <Text className="text-muted-foreground text-xs font-medium text-center">Đã đọc</Text>
          </>
        )}
      </View>
      
      <View className="w-px bg-border/30 mx-4" />
      
      <View className="items-center flex-1">
        {loading ? (
          <ActivityIndicator size="small" color="#A855F7" />
        ) : (
          <>
            <View className="bg-rose-500/20 rounded-full p-2.5 mb-2">
              <Heart size={20} color="#F43F5E" strokeWidth={2} />
            </View>
            <Text className="text-2xl font-black text-foreground">{bookmarks}</Text>
            <Text className="text-muted-foreground text-xs font-medium text-center">Yêu thích</Text>
          </>
        )}
      </View>
    </View>
  );
};
