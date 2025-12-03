import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LogOut } from 'lucide-react-native';

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-rose-500/15 rounded-2xl p-4 mb-8 border border-rose-500/30 flex-row items-center justify-center"
      activeOpacity={0.7}
    >
      <View className="bg-rose-500/20 rounded-lg p-2 mr-3">
        <LogOut size={18} color="#F43F5E" strokeWidth={2.5} />
      </View>
      <Text className="text-rose-500 font-black text-base">Đăng xuất</Text>
    </TouchableOpacity>
  );
};
