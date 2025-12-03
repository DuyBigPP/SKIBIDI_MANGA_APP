import React from 'react';
import { View, Text } from 'react-native';
import { Sparkles } from 'lucide-react-native';

export const HomeHeader: React.FC = () => {
  return (
    <View className="mb-8">
      <View className="flex-row items-center mb-2">
        <View className="bg-primary/20 rounded-xl p-2 mr-3">
          <Sparkles size={24} color="#A855F7" />
        </View>
        <Text className="text-3xl font-black text-foreground tracking-tight">
          SKIBIDI
          <Text className="text-primary">MANGA</Text>
        </Text>
      </View>
      <Text className="text-base text-muted-foreground ml-1">
        Trang truyện lậu mạnh nhất 🐧
      </Text>
    </View>
  );
};
