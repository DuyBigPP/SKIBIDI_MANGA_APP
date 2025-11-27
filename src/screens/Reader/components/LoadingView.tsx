import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export const LoadingView: React.FC = () => {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <ActivityIndicator size="large" color="#8B5CF6" />
      <Text className="text-white mt-4">Đang tải chương...</Text>
    </View>
  );
};
