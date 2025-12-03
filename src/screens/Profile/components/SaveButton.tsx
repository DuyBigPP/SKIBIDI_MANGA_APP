import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Save } from 'lucide-react-native';

interface SaveButtonProps {
  onPress: () => void;
  loading: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`rounded-2xl p-4 flex-row items-center justify-center shadow-lg shadow-primary/30 ${
        loading ? 'bg-primary/50' : 'bg-primary'
      }`}
      activeOpacity={0.8}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color="#FAFAFA" />
          <Text className="text-primary-foreground font-black text-center text-base ml-2">
            Đang lưu...
          </Text>
        </>
      ) : (
        <>
          <View className="bg-white/20 rounded-lg p-1.5">
            <Save size={18} color="#FAFAFA" strokeWidth={2.5} />
          </View>
          <Text className="text-primary-foreground font-black text-center text-base ml-2">
            Lưu thay đổi
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
