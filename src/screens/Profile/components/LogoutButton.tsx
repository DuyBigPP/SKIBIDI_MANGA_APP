import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-destructive/20 rounded-xl p-4 mb-8 border border-destructive/30 flex-row items-center justify-center"
    >
      <Feather name="log-out" size={20} color="#EF4444" />
      <Text className="text-destructive font-bold text-center text-base ml-2">Đăng xuất</Text>
    </TouchableOpacity>
  );
};
