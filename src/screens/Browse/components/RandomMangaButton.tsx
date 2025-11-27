import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface RandomMangaButtonProps {
  onPress: () => void;
  loading: boolean;
}

export const RandomMangaButton: React.FC<RandomMangaButtonProps> = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className="mb-4 bg-primary rounded-xl p-3 flex-row items-center self-start"
    >
      {loading ? (
        <ActivityIndicator size="small" color="#F8FAFC" />
      ) : (
        <>
          <Feather name="shuffle" size={18} color="#F8FAFC" />
          <View className="ml-2">
            <Text className="text-white text-xs opacity-80">Không biết đọc gì?</Text>
            <Text className="text-white font-semibold text-sm">Manga ngẫu nhiên</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
