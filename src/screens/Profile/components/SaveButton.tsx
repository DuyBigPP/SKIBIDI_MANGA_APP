import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SaveButtonProps {
  onPress: () => void;
  loading: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`rounded-xl p-4 flex-row items-center justify-center ${
        loading ? 'bg-primary/50' : 'bg-primary'
      }`}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color="#F8FAFC" />
          <Text className="text-primary-foreground font-bold text-center text-base ml-2">
            Đang lưu...
          </Text>
        </>
      ) : (
        <>
          <Feather name="save" size={20} color="#F8FAFC" />
          <Text className="text-primary-foreground font-bold text-center text-base ml-2">
            Lưu thay đổi
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
