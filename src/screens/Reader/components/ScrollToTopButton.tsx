import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ScrollToTopButtonProps {
  visible: boolean;
  onPress: () => void;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ visible, onPress }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute right-4 bottom-24 bg-primary rounded-full p-3 shadow-lg"
      style={{ elevation: 5 }}
    >
      <Feather name="arrow-up" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};
