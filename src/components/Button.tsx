import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  fullWidth?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
}: ButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary active:bg-primary/90';
      case 'secondary':
        return 'bg-secondary active:bg-secondary/90';
      case 'outline':
        return 'bg-transparent border-2 border-primary';
      case 'danger':
        return 'bg-destructive active:bg-destructive/90';
      default:
        return 'bg-primary';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2';
      case 'md':
        return 'px-6 py-3';
      case 'lg':
        return 'px-8 py-4';
      default:
        return 'px-6 py-3';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return 'text-primary';
      case 'primary':
        return 'text-primary-foreground';
      case 'secondary':
        return 'text-secondary-foreground';
      case 'danger':
        return 'text-destructive-foreground';
      default:
        return 'text-primary-foreground';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-xl ${getSizeClasses()} ${getVariantClasses()} ${
        fullWidth ? 'w-full' : ''
      } ${disabled ? 'opacity-50' : ''} flex-row items-center justify-center`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#2563EB' : '#FFFFFF'} />
      ) : (
        <View className="flex-row items-center">
          {icon && <Text className="mr-2 text-lg">{icon}</Text>}
          <Text className={`${getTextColor()} ${getTextSize()} font-semibold`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
