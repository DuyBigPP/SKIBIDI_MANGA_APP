import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BookOpen } from 'lucide-react-native';
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
    <TouchableOpacity 
      onPress={onPress} 
      className="mb-4"
      activeOpacity={0.7}
    >
      {/* Cover Image */}
      <View className="bg-surface rounded-2xl h-56 mb-3 overflow-hidden border border-border/20">
        {coverImage ? (
          <SafeImage 
            uri={coverImage}
            className="w-full h-full" 
            resizeMode="cover"
            showLoadingIndicator={false}
          />
        ) : (
          <View className="w-full h-full items-center justify-center bg-muted">
            <BookOpen size={48} color="#64748B" strokeWidth={1.5} />
          </View>
        )}
      </View>

      {/* Info */}
      <View>
        <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
          {title}
        </Text>
        
        {author && (
          <Text className="text-muted-foreground text-sm mb-1 font-medium" numberOfLines={1}>
            {author}
          </Text>
        )}

        <View className="flex-row items-center">
          {rating && (
            <View className="flex-row items-center bg-amber-500/20 rounded-lg px-2 py-0.5 mr-2">
              <Text className="text-amber-500 text-xs font-bold">
                ⭐ {rating.toFixed(1)}
              </Text>
            </View>
          )}
          {chapter && (
            <Text className="text-muted-foreground text-sm font-medium">
              {chapter}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
