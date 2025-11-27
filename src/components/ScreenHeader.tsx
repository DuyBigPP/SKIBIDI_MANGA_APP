import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ 
  title, 
  subtitle,
  onBack, 
  rightAction 
}) => {
  return (
    <View className="bg-card border-b border-border p-4 flex-row items-center">
      {onBack && (
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Feather name="arrow-left" size={24} color="#E2E8F0" />
        </TouchableOpacity>
      )}
      <View className="flex-1">
        {subtitle && (
          <Text className="text-sm text-muted-foreground">{subtitle}</Text>
        )}
        <Text className="text-lg font-bold text-foreground" numberOfLines={1}>
          {title}
        </Text>
      </View>
      {rightAction && rightAction}
    </View>
  );
};
