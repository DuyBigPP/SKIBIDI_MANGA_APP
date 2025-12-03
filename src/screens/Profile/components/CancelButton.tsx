import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { X } from 'lucide-react-native';

interface CancelButtonProps {
  onPress: () => void;
  disabled: boolean;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className="bg-surface border border-border/30 rounded-2xl p-4 mt-3 flex-row items-center justify-center"
      activeOpacity={0.7}
    >
      <View className="bg-muted rounded-lg p-1.5">
        <X size={16} color="#64748B" strokeWidth={2.5} />
      </View>
      <Text className="text-muted-foreground font-bold text-center text-base ml-2">Hủy</Text>
    </TouchableOpacity>
  );
};
