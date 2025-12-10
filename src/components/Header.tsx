import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  variant?: 'default' | 'large';
}

export const Header = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  variant = 'default',
}: HeaderProps) => {
  return (
    <View className="px-4 py-3 bg-surface border-b border-border/30">
      <View className="flex-row items-center justify-between">
        {/* Left Icon */}
        {leftIcon ? (
          <TouchableOpacity 
            onPress={onLeftPress} 
            className="w-10 h-10 items-center justify-center bg-muted rounded-xl"
            activeOpacity={0.7}
          >
            <Text className="text-2xl">{leftIcon}</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}

        {/* Title */}
        <View className="flex-1 items-center">
          <Text
            className={`font-black text-foreground ${
              variant === 'large' ? 'text-xl' : 'text-lg'
            }`}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-muted-foreground mt-1 font-medium">{subtitle}</Text>
          )}
        </View>

        {/* Right Icons */}
        {rightIcon ? (
          <TouchableOpacity 
            onPress={onRightPress} 
            className="w-10 h-10 items-center justify-center bg-muted rounded-xl"
            activeOpacity={0.7}
          >
            <Text className="text-2xl">{rightIcon}</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
      </View>
    </View>
  );
};
