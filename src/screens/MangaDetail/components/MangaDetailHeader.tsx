import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface MangaDetailHeaderProps {
  title: string;
  onBack: () => void;
}

export const MangaDetailHeader: React.FC<MangaDetailHeaderProps> = ({ title, onBack }) => {
  return (
    <View className="bg-card border-b border-border p-4 flex-row items-center">
      <TouchableOpacity onPress={onBack} className="mr-3">
        <Feather name="arrow-left" size={24} color="#E2E8F0" />
      </TouchableOpacity>
      <Text className="text-lg font-bold text-foreground flex-1" numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};
