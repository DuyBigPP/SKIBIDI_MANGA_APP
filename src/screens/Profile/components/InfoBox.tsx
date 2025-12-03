import React from 'react';
import { View, Text } from 'react-native';
import { Info } from 'lucide-react-native';

export const InfoBox: React.FC = () => {
  return (
    <View className="bg-primary/15 border border-primary/30 rounded-2xl p-4 mb-6">
      <View className="flex-row items-start">
        <View className="bg-primary/20 rounded-lg p-1.5">
          <Info size={16} color="#A855F7" strokeWidth={2} />
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-primary font-bold mb-1.5">Lưu ý</Text>
          <Text className="text-primary/80 text-sm leading-5 font-medium">
            • Tên người dùng là bắt buộc{'\n'}• Giới thiệu tối đa 500 ký tự{'\n'}• Nhấn vào ảnh đại diện để thay đổi
          </Text>
        </View>
      </View>
    </View>
  );
};
