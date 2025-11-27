import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const InfoBox: React.FC = () => {
  return (
    <View className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
      <View className="flex-row items-start">
        <Feather name="info" size={20} color="#8B5CF6" />
        <View className="flex-1 ml-3">
          <Text className="text-primary font-semibold mb-1">Lưu ý</Text>
          <Text className="text-primary/80 text-sm">
            • Tên người dùng là bắt buộc{'\n'}• Giới thiệu tối đa 500 ký tự{'\n'}• Nhấn vào ảnh đại
            diện để thay đổi
          </Text>
        </View>
      </View>
    </View>
  );
};
