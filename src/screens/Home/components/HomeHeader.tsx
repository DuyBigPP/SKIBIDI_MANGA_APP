import React from 'react';
import { View, Text } from 'react-native';

export const HomeHeader: React.FC = () => {
  return (
    <View className="mb-6">
      <Text className="text-3xl font-bold text-foreground">SKIBIDIMANGA</Text>
      <Text className="text-base text-muted-foreground mt-2">
        APP MANGA LẬU XỊN NHẤT THẾ GIỚI 🐧
      </Text>
    </View>
  );
};
