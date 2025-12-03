import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X, SlidersHorizontal } from 'lucide-react-native';

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
      <View className="flex-1 bg-muted rounded-2xl px-4 py-3.5 flex-row items-center border border-border/30 mr-3">
        <Search size={20} color="#71717A" />
        <TextInput
          placeholder="Tìm kiếm manga..."
          placeholderTextColor="#71717A"
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
          className="flex-1 text-base text-foreground ml-3 py-0"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => onSearchChange('')}
            className="bg-zinc-700 rounded-full p-1"
          >
            <X size={14} color="#A1A1AA" />
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity
        onPress={onFilterPress}
        className="bg-primary rounded-2xl p-3.5 relative"
        activeOpacity={0.8}
      >
        <SlidersHorizontal size={22} color="#FAFAFA" />
        {hasActiveFilters && (
          <View className="absolute -top-1 -right-1 bg-accent w-3.5 h-3.5 rounded-full border-2 border-background" />
        )}
      </TouchableOpacity>
    </View>
  );
};
