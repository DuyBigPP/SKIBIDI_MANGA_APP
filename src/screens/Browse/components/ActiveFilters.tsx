import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ActiveFiltersProps {
  selectedGenreName: string;
  selectedStatusLabel: string;
  selectedSortLabel: string;
  selectedGenre: string | null;
  selectedStatus: string | null;
  sortBy: string;
  onRemoveGenre: () => void;
  onRemoveStatus: () => void;
  onRemoveSort: () => void;
  onClearAll: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedGenreName,
  selectedStatusLabel,
  selectedSortLabel,
  selectedGenre,
  selectedStatus,
  sortBy,
  onRemoveGenre,
  onRemoveStatus,
  onRemoveSort,
  onClearAll,
}) => {
  return (
    <View className="mb-4">
      <View className="flex-row flex-wrap items-center">
        {selectedGenre && (
          <View className="bg-primary/20 rounded-full px-3 py-1.5 mr-2 mb-2 flex-row items-center">
            <Text className="text-primary text-xs font-semibold mr-1">
              {selectedGenreName}
            </Text>
            <TouchableOpacity onPress={onRemoveGenre}>
              <Feather name="x" size={12} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        )}
        {selectedStatus && (
          <View className="bg-primary/20 rounded-full px-3 py-1.5 mr-2 mb-2 flex-row items-center">
            <Text className="text-primary text-xs font-semibold mr-1">
              {selectedStatusLabel}
            </Text>
            <TouchableOpacity onPress={onRemoveStatus}>
              <Feather name="x" size={12} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        )}
        {sortBy !== 'updatedAt' && (
          <View className="bg-primary/20 rounded-full px-3 py-1.5 mr-2 mb-2 flex-row items-center">
            <Text className="text-primary text-xs font-semibold mr-1">
              {selectedSortLabel}
            </Text>
            <TouchableOpacity onPress={onRemoveSort}>
              <Feather name="x" size={12} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={onClearAll} className="mt-2">
        <Text className="text-destructive text-xs font-semibold">Xóa tất cả</Text>
      </TouchableOpacity>
    </View>
  );
};
