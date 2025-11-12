import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingProps {
  text?: string;
  size?: 'small' | 'large';
}

export const Loading = ({ text, size = 'large' }: LoadingProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={size} color="#2563EB" />
      {text && (
        <Text className="text-gray-600 text-base mt-4">
          {text}
        </Text>
      )}
    </View>
  );
};
