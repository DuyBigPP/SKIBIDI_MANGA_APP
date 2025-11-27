import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadMoreIndicatorProps {
  loading: boolean;
  hasMore: boolean;
  hasItems: boolean;
}

export const LoadMoreIndicator: React.FC<LoadMoreIndicatorProps> = ({
  loading,
  hasMore,
  hasItems,
}) => {
  if (loading) {
    return (
      <View className="py-4">
        <ActivityIndicator color="#8B5CF6" />
      </View>
    );
  }

  if (!hasMore && hasItems) {
    return (
      <View className="py-4 items-center">
        <Text className="text-muted-foreground text-sm">Đã hiển thị tất cả</Text>
      </View>
    );
  }

  return null;
};
