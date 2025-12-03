import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { FileText } from 'lucide-react-native';

interface BioInputProps {
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
}

export const BioInput: React.FC<BioInputProps> = ({ value, onChange, disabled }) => {
  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-2">
        <FileText size={14} color="#64748B" strokeWidth={2} />
        <Text className="text-sm font-bold text-foreground ml-1.5">Giới thiệu</Text>
      </View>
      <View className="bg-surface border border-border/30 rounded-2xl px-4 py-3.5">
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Viết vài dòng về bạn..."
          placeholderTextColor="#64748B"
          className="text-foreground min-h-[100px] font-medium"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!disabled}
        />
      </View>
      <View className="flex-row justify-end mt-1.5">
        <View className="bg-muted rounded-lg px-2 py-0.5">
          <Text className="text-xs text-muted-foreground font-medium">{value.length}/500</Text>
        </View>
      </View>
    </View>
  );
};
