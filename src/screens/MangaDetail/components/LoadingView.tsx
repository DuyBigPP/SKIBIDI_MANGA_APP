import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingViewProps {
  loading?: boolean;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ loading = true }) => {
  if (!loading) return null;
  
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <ActivityIndicator size="large" color="#8B5CF6" />
      <Text className="text-muted-foreground mt-4">Đang tải...</Text>
    </View>
  );
};
