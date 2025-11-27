import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BookOpen } from 'lucide-react-native';

interface UnauthenticatedViewProps {
  onLoginPress: () => void;
}

export const UnauthenticatedView: React.FC<UnauthenticatedViewProps> = ({ onLoginPress }) => {
  return (
    <View className="flex-1 bg-background items-center justify-center p-8">
      <BookOpen size={64} color="#8B5CF6" strokeWidth={1.5} />
      <Text className="text-xl font-bold text-foreground text-center mb-2 mt-4">
        Đăng nhập để sử dụng thư viện
      </Text>
      <Text className="text-base text-muted-foreground text-center mb-6">
        Lưu trữ manga yêu thích và lịch sử đọc của bạn
      </Text>
      <TouchableOpacity onPress={onLoginPress} className="bg-primary rounded-xl px-8 py-3">
        <Text className="text-primary-foreground font-semibold">Đăng nhập ngay</Text>
      </TouchableOpacity>
    </View>
  );
};
