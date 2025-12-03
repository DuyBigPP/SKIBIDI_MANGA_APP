import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

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
  const progress = (currentPage / totalPages) * 100;
  
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-black/90">
      {/* Progress Bar */}
      <View className="px-4 pt-3">
        <View className="bg-white/10 rounded-full h-1.5 overflow-hidden">
          <View
            className="bg-primary rounded-full h-1.5"
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity
          onPress={onPrevious}
          disabled={!hasPrevious}
          className={`flex-row items-center px-5 py-2.5 rounded-xl ${
            hasPrevious ? 'bg-primary' : 'bg-white/10'
          }`}
          activeOpacity={0.7}
        >
          <ChevronLeft 
            size={20} 
            color={hasPrevious ? '#FFFFFF' : '#64748B'} 
            strokeWidth={2.5} 
          />
          <Text className={`font-bold ml-1 ${hasPrevious ? 'text-white' : 'text-gray-500'}`}>
            Trước
          </Text>
        </TouchableOpacity>

        <View className="bg-white/10 rounded-xl px-4 py-2">
          <Text className="text-white text-sm font-bold">
            <Text className="text-primary">{currentPage}</Text>
            <Text className="text-gray-500"> / {totalPages}</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={onNext}
          disabled={!hasNext}
          className={`flex-row items-center px-5 py-2.5 rounded-xl ${
            hasNext ? 'bg-primary' : 'bg-white/10'
          }`}
          activeOpacity={0.7}
        >
          <Text className={`font-bold mr-1 ${hasNext ? 'text-white' : 'text-gray-500'}`}>
            Tiếp
          </Text>
          <ChevronRight 
            size={20} 
            color={hasNext ? '#FFFFFF' : '#64748B'} 
            strokeWidth={2.5} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
