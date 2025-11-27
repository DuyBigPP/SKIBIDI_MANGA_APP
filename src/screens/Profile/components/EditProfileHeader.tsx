import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface EditProfileHeaderProps {
  onBack: () => void;
  onSave: () => void;
  loading: boolean;
}

export const EditProfileHeader: React.FC<EditProfileHeaderProps> = ({ onBack, onSave, loading }) => {
  return (
    <View className="bg-card border-b border-border px-4 py-3 flex-row items-center">
      <TouchableOpacity onPress={onBack} className="mr-3">
        <Feather name="arrow-left" size={24} color="#F8FAFC" />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-foreground flex-1">Chỉnh sửa hồ sơ</Text>
      <TouchableOpacity onPress={onSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#8B5CF6" />
        ) : (
          <Feather name="check" size={24} color="#8B5CF6" />
        )}
      </TouchableOpacity>
    </View>
  );
};
