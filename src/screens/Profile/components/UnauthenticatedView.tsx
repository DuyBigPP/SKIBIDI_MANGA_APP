import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface UnauthenticatedViewProps {
  onLoginPress: () => void;
}

export const UnauthenticatedView: React.FC<UnauthenticatedViewProps> = ({ onLoginPress }) => {
  return (
    <View className="flex-1 bg-background items-center justify-center p-8">
      <View className="bg-primary w-24 h-24 rounded-full mb-4 items-center justify-center">
        <Feather name="user" size={48} color="#F8FAFC" />
      </View>
      <Text className="text-xl font-bold text-foreground text-center mb-2">
        Chào mừng đến SKIBIBI MANGA
      </Text>
      <Text className="text-base text-muted-foreground text-center mb-6">
        Đăng nhập để trải nghiệm đầy đủ tính năng
      </Text>
      <TouchableOpacity onPress={onLoginPress} className="bg-primary rounded-xl px-8 py-3">
        <Text className="text-primary-foreground font-semibold">Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};
