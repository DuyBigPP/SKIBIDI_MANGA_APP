import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

export const EndOfChapter: React.FC = () => {
  return (
    <View className="bg-surface p-8 items-center border-t border-border/20">
      <View className="bg-primary/20 rounded-full p-3 mb-3">
        <CheckCircle size={28} color="#A855F7" strokeWidth={2} />
      </View>
      <Text className="text-muted-foreground text-sm font-medium">
        Kết thúc chương
      </Text>
    </View>
  );
};
