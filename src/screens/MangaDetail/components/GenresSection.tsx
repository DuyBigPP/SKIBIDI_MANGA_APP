import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Genre } from '../../../types/api.types';

interface GenresSectionProps {
  genres: Genre[];
  onGenrePress?: (slug: string, name: string) => void;
}

export const GenresSection: React.FC<GenresSectionProps> = ({ genres, onGenrePress }) => {
  if (genres.length === 0) return null;

  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-muted-foreground mb-2">
        Thể loại
      </Text>
      <View className="flex-row flex-wrap">
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            onPress={() => onGenrePress?.(genre.slug, genre.name)}
            className="bg-primary/20 border border-primary/30 rounded-full px-3 py-1 mr-2 mb-2"
          >
            <Text className="text-primary text-sm">{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
