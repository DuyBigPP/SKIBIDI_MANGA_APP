import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface BottomNavigationProps {
  currentPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-black/80">
      {/* Progress Bar */}
      <View className="px-2 pt-2">
        <View className="bg-muted rounded-full h-1">
          <View
            className="bg-primary rounded-full h-1"
            style={{
              width: `${(currentPage / totalPages) * 100}%`,
            }}
          />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row items-center justify-between p-3">
        <TouchableOpacity
          onPress={onPrevious}
          disabled={!hasPrevious}
          className={`flex-row items-center px-4 py-2 rounded-lg ${
            hasPrevious ? 'bg-primary' : 'bg-gray-700'
          }`}
        >
          <Feather name="chevron-left" size={20} color="#FFFFFF" />
          <Text className="text-white font-semibold ml-1">Trước</Text>
        </TouchableOpacity>

        <Text className="text-gray-400 text-sm">
          {currentPage}/{totalPages}
        </Text>

        <TouchableOpacity
          onPress={onNext}
          disabled={!hasNext}
          className={`flex-row items-center px-4 py-2 rounded-lg ${
            hasNext ? 'bg-primary' : 'bg-gray-700'
          }`}
        >
          <Text className="text-white font-semibold mr-1">Tiếp</Text>
          <Feather name="chevron-right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
