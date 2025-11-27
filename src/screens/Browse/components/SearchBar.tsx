import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
  hasActiveFilters: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onFilterPress,
  hasActiveFilters,
}) => {
  return (
    <View className="mb-4 flex-row items-center">
      <View className="flex-1 bg-card rounded-xl p-4 flex-row items-center border border-border mr-3">
        <Feather name="search" size={20} color="#94A3B8" />
        <TextInput
          placeholder="Tìm kiếm manga..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
          className="flex-1 text-base text-foreground ml-2"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <Feather name="x" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity
        onPress={onFilterPress}
        className="bg-primary rounded-xl p-4 relative"
      >
        <Feather name="sliders" size={24} color="#F8FAFC" />
        {hasActiveFilters && (
          <View className="absolute -top-1 -right-1 bg-destructive w-3 h-3 rounded-full" />
        )}
      </TouchableOpacity>
    </View>
  );
};
