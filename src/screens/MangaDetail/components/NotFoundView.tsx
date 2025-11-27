import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface NotFoundViewProps {
  onBack: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onBack }) => {
  return (
    <View className="flex-1 bg-background items-center justify-center p-4">
      <Text className="text-foreground text-lg mb-4">Không tìm thấy manga</Text>
      <TouchableOpacity onPress={onBack} className="bg-primary rounded-xl px-6 py-3">
        <Text className="text-primary-foreground font-semibold">Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};
