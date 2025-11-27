import React from 'react';
import { Text } from 'react-native';

interface StatsBarProps {
  count: number;
  hasMore: boolean;
}

export const StatsBar: React.FC<StatsBarProps> = ({ count, hasMore }) => {
  return (
    <Text className="text-base text-muted-foreground mb-4">
      {count} manga {hasMore ? '(đang tải thêm...)' : ''}
    </Text>
  );
};
