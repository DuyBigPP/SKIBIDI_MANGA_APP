import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Author } from '../../../types/api.types';

interface AuthorsSectionProps {
  authors: Author[];
  onAuthorPress?: (slug: string, name: string) => void;
}

export const AuthorsSection: React.FC<AuthorsSectionProps> = ({ authors, onAuthorPress }) => {
  if (authors.length === 0) return null;

  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-muted-foreground mb-2">
        Tác giả
      </Text>
      <View className="flex-row flex-wrap">
        {authors.map((author) => (
          <TouchableOpacity
            key={author.id}
            onPress={() => onAuthorPress?.(author.slug, author.name)}
            className="bg-card rounded-full px-3 py-1 mr-2 mb-2 border border-border"
          >
            <Text className="text-foreground text-sm">{author.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
