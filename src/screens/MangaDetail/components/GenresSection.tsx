import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Tag } from 'lucide-react-native';
import { Genre } from '../../../types/api.types';

interface GenresSectionProps {
  genres: Genre[];
  onGenrePress?: (slug: string, name: string) => void;
}

export const GenresSection: React.FC<GenresSectionProps> = ({ genres, onGenrePress }) => {
  if (genres.length === 0) return null;

  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-3">
        <Tag size={16} color="#64748B" strokeWidth={2} />
        <Text className="text-sm font-bold text-muted-foreground ml-2">
          Thể loại
        </Text>
      </View>
      <View className="flex-row flex-wrap">
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            onPress={() => onGenrePress?.(genre.slug, genre.name)}
            className="bg-primary/15 border border-primary/30 rounded-xl px-4 py-2 mr-2 mb-2 active:bg-primary/25"
            activeOpacity={0.7}
          >
            <Text className="text-primary text-sm font-semibold">{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
