import React from 'react';
import { View, Text } from 'react-native';
import { Compass } from 'lucide-react-native';

export const BrowseHeader: React.FC = () => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <View className="bg-secondary/20 rounded-xl p-2 mr-3">
          <Compass size={24} color="#6366F1" />
        </View>
        <Text className="text-3xl font-black text-foreground tracking-tight">
          Khám phá
        </Text>
      </View>
      <Text className="text-muted-foreground ml-1">
        Tìm kiếm và khám phá manga yêu thích
      </Text>
    </View>
  );
};
