import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface StatsCardProps {
  readingHistory: number;
  bookmarks: number;
  loading: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({ readingHistory, bookmarks, loading }) => {
  return (
    <View className="flex-row justify-around mb-6 bg-card rounded-xl p-4 border border-border">
      <View className="items-center flex-1">
        {loading ? (
          <ActivityIndicator size="small" color="#8B5CF6" />
        ) : (
          <>
            <Text className="text-2xl font-bold text-foreground">{readingHistory}</Text>
            <Text className="text-muted-foreground text-xs text-center">Đã đọc </Text>
          </>
        )}
      </View>
      <View className="w-px bg-border" />
      <View className="items-center flex-1">
        {loading ? (
          <ActivityIndicator size="small" color="#8B5CF6" />
        ) : (
          <>
            <Text className="text-2xl font-bold text-foreground">{bookmarks}</Text>
            <Text className="text-muted-foreground text-xs text-center">Yêu thích</Text>
          </>
        )}
      </View>
    </View>
  );
};
