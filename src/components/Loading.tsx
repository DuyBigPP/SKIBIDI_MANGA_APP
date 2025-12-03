import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingProps {
  text?: string;
  size?: 'small' | 'large';
}

export const Loading = ({ text, size = 'large' }: LoadingProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <View className="bg-surface rounded-3xl p-6 border border-border/20 items-center">
        <ActivityIndicator size={size} color="#A855F7" />
        {text && (
          <Text className="text-muted-foreground text-base mt-4 font-medium">
            {text}
          </Text>
        )}
      </View>
    </View>
  );
};
