import React from 'react';
import { View, Text } from 'react-native';
import { Layers } from 'lucide-react-native';

export const LibraryHeader: React.FC = () => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <View className="bg-primary/20 rounded-xl p-2 mr-3">
          <Layers size={24} color="#A855F7" />
        </View>
        <Text className="text-3xl font-black text-foreground tracking-tight">
          Thư viện
        </Text>
      </View>
      <Text className="text-muted-foreground ml-1">
        Quản lý manga yêu thích và lịch sử đọc
      </Text>
    </View>
  );
};
