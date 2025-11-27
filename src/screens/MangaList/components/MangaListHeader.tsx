import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface MangaListHeaderProps {
  type: 'author' | 'genre';
  name: string;
  onBack: () => void;
}

export const MangaListHeader: React.FC<MangaListHeaderProps> = ({ type, name, onBack }) => {
  return (
    <View className="bg-card border-b border-border p-4 flex-row items-center">
      <TouchableOpacity onPress={onBack} className="mr-3">
        <Feather name="arrow-left" size={24} color="#E2E8F0" />
      </TouchableOpacity>
      <View className="flex-1">
        <Text className="text-sm text-muted-foreground">
          {type === 'author' ? 'Tác giả' : 'Thể loại'}
        </Text>
        <Text className="text-lg font-bold text-foreground" numberOfLines={1}>
          {name}
        </Text>
      </View>
    </View>
  );
};
