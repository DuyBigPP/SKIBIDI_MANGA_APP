import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface UnauthenticatedViewProps {
  icon?: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  buttonText?: string;
  onLoginPress: () => void;
}

export const UnauthenticatedView: React.FC<UnauthenticatedViewProps> = ({ 
  icon = 'user',
  title,
  description,
  buttonText = 'Đăng nhập',
  onLoginPress 
}) => {
  return (
    <View className="flex-1 bg-background items-center justify-center p-8">
      <View className="bg-primary w-24 h-24 rounded-full mb-4 items-center justify-center">
        <Feather name={icon} size={48} color="#F8FAFC" />
      </View>
      <Text className="text-xl font-bold text-foreground text-center mb-2">
        {title}
      </Text>
      <Text className="text-base text-muted-foreground text-center mb-6">
        {description}
      </Text>
      <TouchableOpacity onPress={onLoginPress} className="bg-primary rounded-xl px-8 py-3">
        <Text className="text-primary-foreground font-semibold">{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};
