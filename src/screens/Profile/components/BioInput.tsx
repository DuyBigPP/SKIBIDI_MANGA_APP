import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface BioInputProps {
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
}

export const BioInput: React.FC<BioInputProps> = ({ value, onChange, disabled }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-muted-foreground mb-2">Giới thiệu</Text>
      <View className="bg-card border border-border rounded-xl px-4 py-3">
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Viết vài dòng về bạn..."
          placeholderTextColor="#64748B"
          className="text-foreground min-h-[100px]"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!disabled}
        />
      </View>
      <Text className="text-xs text-muted-foreground mt-1">{value.length}/500 ký tự</Text>
    </View>
  );
};
