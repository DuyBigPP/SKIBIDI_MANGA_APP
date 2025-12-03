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
        return 'bg-surface border border-border/30 active:bg-muted';
      case 'outline':
        return 'bg-transparent border-2 border-primary';
      case 'danger':
        return 'bg-rose-500 active:bg-rose-600';
      default:
        return 'bg-primary';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2.5';
      case 'md':
        return 'px-6 py-3.5';
      case 'lg':
        return 'px-8 py-4';
      default:
        return 'px-6 py-3.5';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return 'text-primary';
      case 'primary':
        return 'text-primary-foreground';
      case 'secondary':
        return 'text-foreground';
      case 'danger':
        return 'text-white';
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

  const getShadowStyle = () => {
    if (variant === 'primary') {
      return {
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      };
    }
    return {};
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-2xl ${getSizeClasses()} ${getVariantClasses()} ${
        fullWidth ? 'w-full' : ''
      } ${disabled ? 'opacity-50' : ''} flex-row items-center justify-center`}
      style={getShadowStyle()}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#A855F7' : '#FFFFFF'} />
      ) : (
        <View className="flex-row items-center">
          {icon && <Text className="mr-2 text-lg">{icon}</Text>}
          <Text className={`${getTextColor()} ${getTextSize()} font-bold`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
