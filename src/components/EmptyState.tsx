import React from 'react';
import { View, Text } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ComponentType<any>;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon: IconComponent = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <View className="bg-surface rounded-3xl p-6 mb-5 border border-border/20">
        <IconComponent size={56} color="#64748B" strokeWidth={1.5} />
      </View>
      <Text className="text-xl font-black text-foreground text-center mb-2">
        {title}
      </Text>
      {description && (
        <Text className="text-base text-muted-foreground text-center mb-6 font-medium">
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button title={actionLabel} onPress={onAction} />
      )}
    </View>
  );
};
