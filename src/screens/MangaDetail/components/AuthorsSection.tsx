import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';
import { Author } from '../../../types/api.types';

interface AuthorsSectionProps {
  authors: Author[];
  onAuthorPress?: (slug: string, name: string) => void;
}

export const AuthorsSection: React.FC<AuthorsSectionProps> = ({ authors, onAuthorPress }) => {
  if (authors.length === 0) return null;

  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-3">
        <User size={16} color="#64748B" strokeWidth={2} />
        <Text className="text-sm font-bold text-muted-foreground ml-2">
          Tác giả
        </Text>
      </View>
      <View className="flex-row flex-wrap">
        {authors.map((author) => (
          <TouchableOpacity
            key={author.id}
            onPress={() => onAuthorPress?.(author.slug, author.name)}
            className="bg-surface rounded-xl px-4 py-2 mr-2 mb-2 border border-border/30 active:bg-muted"
            activeOpacity={0.7}
          >
            <Text className="text-foreground text-sm font-medium">{author.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
