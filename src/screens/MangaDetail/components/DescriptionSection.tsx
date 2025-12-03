import React from 'react';
import { View, Text } from 'react-native';
import { FileText } from 'lucide-react-native';

interface DescriptionSectionProps {
  description: string;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-3">
        <FileText size={16} color="#64748B" strokeWidth={2} />
        <Text className="text-sm font-bold text-muted-foreground ml-2">
          Mô tả
        </Text>
      </View>
      <View className="bg-surface rounded-2xl p-4 border border-border/20">
        <Text className="text-foreground leading-6 text-sm">{description || 'Chưa có mô tả'}</Text>
      </View>
    </View>
  );
};
