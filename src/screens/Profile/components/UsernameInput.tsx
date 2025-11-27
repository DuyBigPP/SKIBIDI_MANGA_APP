import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface UsernameInputProps {
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({ value, onChange, disabled }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-muted-foreground mb-2">Tên người dùng *</Text>
      <View className="bg-card border border-border rounded-xl px-4 py-3 flex-row items-center">
        <Feather name="user" size={20} color="#8B5CF6" />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Nhập tên người dùng"
          placeholderTextColor="#64748B"
          className="flex-1 ml-3 text-foreground"
          editable={!disabled}
        />
      </View>
    </View>
  );
};
