import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CancelButtonProps {
  onPress: () => void;
  disabled: boolean;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className="border border-border rounded-xl p-4 mt-3 flex-row items-center justify-center"
    >
      <Feather name="x" size={20} color="#94A3B8" />
      <Text className="text-muted-foreground font-semibold text-center text-base ml-2">Hủy</Text>
    </TouchableOpacity>
  );
};
