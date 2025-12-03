import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface MangaDetailHeaderProps {
  title: string;
  onBack: () => void;
}

export const MangaDetailHeader: React.FC<MangaDetailHeaderProps> = ({ title, onBack }) => {
  return (
    <View className="bg-surface/95 border-b border-border/30 p-4 flex-row items-center">
      <TouchableOpacity 
        onPress={onBack} 
        className="bg-muted rounded-xl p-2 mr-3"
        activeOpacity={0.7}
      >
        <ArrowLeft size={22} color="#FAFAFA" strokeWidth={2} />
      </TouchableOpacity>
      <Text className="text-lg font-black text-foreground flex-1" numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};
