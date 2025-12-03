import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { X, Trash2 } from 'lucide-react-native';

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
          <View className="bg-primary/20 rounded-xl px-3 py-2 mr-2 mb-2 flex-row items-center border border-primary/30">
            <Text className="text-primary text-xs font-bold mr-2">
              {selectedGenreName}
            </Text>
            <TouchableOpacity onPress={onRemoveGenre} activeOpacity={0.7}>
              <X size={14} color="#A855F7" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        )}
        {selectedStatus && (
          <View className="bg-primary/20 rounded-xl px-3 py-2 mr-2 mb-2 flex-row items-center border border-primary/30">
            <Text className="text-primary text-xs font-bold mr-2">
              {selectedStatusLabel}
            </Text>
            <TouchableOpacity onPress={onRemoveStatus} activeOpacity={0.7}>
              <X size={14} color="#A855F7" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        )}
        {sortBy !== 'updatedAt' && (
          <View className="bg-primary/20 rounded-xl px-3 py-2 mr-2 mb-2 flex-row items-center border border-primary/30">
            <Text className="text-primary text-xs font-bold mr-2">
              {selectedSortLabel}
            </Text>
            <TouchableOpacity onPress={onRemoveSort} activeOpacity={0.7}>
              <X size={14} color="#A855F7" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity 
        onPress={onClearAll} 
        className="mt-2 flex-row items-center"
        activeOpacity={0.7}
      >
        <Trash2 size={12} color="#F43F5E" strokeWidth={2} />
        <Text className="text-rose-500 text-xs font-bold ml-1">Xóa tất cả</Text>
      </TouchableOpacity>
    </View>
  );
};
