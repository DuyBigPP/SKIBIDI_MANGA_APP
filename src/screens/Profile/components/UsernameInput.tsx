import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { User } from 'lucide-react-native';

interface UsernameInputProps {
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({ value, onChange, disabled }) => {
  return (
    <View className="mb-5">
      <Text className="text-sm font-bold text-foreground mb-2">Tên người dùng *</Text>
      <View className="bg-surface border border-border/30 rounded-2xl px-4 py-3.5 flex-row items-center">
        <View className="bg-primary/20 rounded-lg p-1.5">
          <User size={16} color="#A855F7" strokeWidth={2.5} />
        </View>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Nhập tên người dùng"
          placeholderTextColor="#64748B"
          className="flex-1 ml-3 text-foreground font-medium"
          editable={!disabled}
        />
      </View>
    </View>
  );
};
