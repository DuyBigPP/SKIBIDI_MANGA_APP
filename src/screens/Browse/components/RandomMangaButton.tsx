import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Shuffle, Sparkles } from 'lucide-react-native';

interface RandomMangaButtonProps {
  onPress: () => void;
  loading: boolean;
}

export const RandomMangaButton: React.FC<RandomMangaButtonProps> = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className="mb-5 bg-primary-dark rounded-2xl p-4 flex-row items-center border border-primary/30"
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FAFAFA" />
      ) : (
        <>
          <View className="bg-white/20 rounded-xl p-2 mr-3">
            <Shuffle size={20} color="#FAFAFA" />
          </View>
          <View className="flex-1">
            <Text className="text-white/70 text-xs">Không biết đọc gì?</Text>
            <Text className="text-white font-bold text-base">Thử manga ngẫu nhiên</Text>
          </View>
          <Sparkles size={20} color="#FAFAFA" />
        </>
      )}
    </TouchableOpacity>
  );
};
