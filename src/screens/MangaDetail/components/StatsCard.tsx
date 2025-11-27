import React from 'react';
import { View, Text } from 'react-native';

interface StatsCardProps {
  totalChapters: number;
  totalViews: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ totalChapters, totalViews }) => {
  return (
    <View className="flex-row items-center bg-card rounded-xl p-4 mb-4">
      <View className="items-center flex-1">
        <Text className="text-lg font-bold text-foreground">
          {totalChapters}
        </Text>
        <Text className="text-muted-foreground text-xs">Chương</Text>
      </View>
      <View className="items-center flex-1">
        <Text className="text-lg font-bold text-foreground">
          {totalViews}
        </Text>
        <Text className="text-muted-foreground text-xs">Lượt xem</Text>
      </View>
    </View>
  );
};
