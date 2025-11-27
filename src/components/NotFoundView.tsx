import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface NotFoundViewProps {
  message?: string;
  onBack: () => void;
  buttonText?: string;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ 
  message = 'Không tìm thấy nội dung', 
  onBack,
  buttonText = 'Quay lại'
}) => {
  return (
    <View className="flex-1 bg-background items-center justify-center p-4">
      <Text className="text-foreground text-lg mb-4">{message}</Text>
      <TouchableOpacity onPress={onBack} className="bg-primary rounded-xl px-6 py-3">
        <Text className="text-primary-foreground font-semibold">{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};
