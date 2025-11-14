import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeImage } from './SafeImage';

interface MangaCardProps {
  title: string;
  coverImage?: string;
  author?: string;
  chapter?: string;
  rating?: number;
  onPress?: () => void;
}

export const MangaCard = ({
  title,
  coverImage,
  author,
  chapter,
  rating,
  onPress,
}: MangaCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="mb-4">
      {/* Cover Image */}
      <View className="bg-gray-200 rounded-xl h-56 mb-2 overflow-hidden">
        {coverImage ? (
          <SafeImage 
            uri={coverImage}
            className="w-full h-full" 
            resizeMode="cover"
            showLoadingIndicator={false}
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Text className="text-4xl">📖</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View>
        <Text className="font-bold text-gray-900 text-base mb-1" numberOfLines={2}>
          {title}
        </Text>
        
        {author && (
          <Text className="text-gray-600 text-sm mb-1" numberOfLines={1}>
            {author}
          </Text>
        )}

        <View className="flex-row items-center">
          {rating && (
            <Text className="text-yellow-500 text-sm mr-2">
              ⭐ {rating.toFixed(1)}
            </Text>
          )}
          {chapter && (
            <Text className="text-gray-600 text-sm">
              {chapter}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
