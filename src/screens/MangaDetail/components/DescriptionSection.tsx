import React from 'react';
import { View, Text } from 'react-native';

interface DescriptionSectionProps {
  description: string;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-muted-foreground mb-2">
        Mô tả
      </Text>
      <Text className="text-foreground leading-6">{description}</Text>
    </View>
  );
};
