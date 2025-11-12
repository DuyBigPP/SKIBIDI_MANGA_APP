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
    <View className="px-4 py-3 bg-white border-b border-gray-100">
      <View className="flex-row items-center justify-between">
        {/* Left Icon */}
        {leftIcon ? (
          <TouchableOpacity onPress={onLeftPress} className="w-10 h-10 items-center justify-center">
            <Text className="text-2xl">{leftIcon}</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}

        {/* Title */}
        <View className="flex-1 items-center">
          <Text
            className={`font-bold text-gray-900 ${
              variant === 'large' ? 'text-xl' : 'text-lg'
            }`}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-gray-600 mt-1">{subtitle}</Text>
          )}
        </View>

        {/* Right Icon */}
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} className="w-10 h-10 items-center justify-center">
            <Text className="text-2xl">{rightIcon}</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
      </View>
    </View>
  );
};
