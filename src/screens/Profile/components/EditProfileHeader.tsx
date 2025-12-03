import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';

interface EditProfileHeaderProps {
  onBack: () => void;
  onSave: () => void;
  loading: boolean;
}

export const EditProfileHeader: React.FC<EditProfileHeaderProps> = ({ onBack, onSave, loading }) => {
  return (
    <View className="bg-surface/95 border-b border-border/30 px-4 py-4 flex-row items-center">
      <TouchableOpacity 
        onPress={onBack} 
        className="bg-muted rounded-xl p-2 mr-3"
        activeOpacity={0.7}
      >
        <ArrowLeft size={22} color="#FAFAFA" strokeWidth={2} />
      </TouchableOpacity>
      <Text className="text-xl font-black text-foreground flex-1">Chỉnh sửa hồ sơ</Text>
      <TouchableOpacity 
        onPress={onSave} 
        disabled={loading}
        className="bg-primary rounded-xl p-2"
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FAFAFA" />
        ) : (
          <Check size={22} color="#FAFAFA" strokeWidth={2.5} />
        )}
      </TouchableOpacity>
    </View>
  );
};
