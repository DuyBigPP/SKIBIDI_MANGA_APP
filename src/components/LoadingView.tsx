import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingViewProps {
  message?: string;
  backgroundColor?: 'background' | 'black';
}

export const LoadingView: React.FC<LoadingViewProps> = ({ 
  message = 'Đang tải...', 
  backgroundColor = 'background' 
}) => {
  return (
    <View className={`flex-1 bg-${backgroundColor} items-center justify-center`}>
      <ActivityIndicator size="large" color="#8B5CF6" />
      <Text className={`${backgroundColor === 'black' ? 'text-white' : 'text-muted-foreground'} mt-4`}>
        {message}
      </Text>
    </View>
  );
};
