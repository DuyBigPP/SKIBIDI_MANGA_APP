import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ArrowUp } from 'lucide-react-native';

interface ScrollToTopButtonProps {
  visible: boolean;
  onPress: () => void;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ visible, onPress }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute right-4 bottom-28 bg-primary rounded-2xl p-3.5"
      style={{ 
        elevation: 8,
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      }}
      activeOpacity={0.8}
    >
      <ArrowUp size={22} color="#FFFFFF" strokeWidth={2.5} />
    </TouchableOpacity>
  );
};
