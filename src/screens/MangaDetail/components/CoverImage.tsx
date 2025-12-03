import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeImage } from '../../../components/SafeImage';

interface CoverImageProps {
  uri: string;
}

export const CoverImage: React.FC<CoverImageProps> = ({ uri }) => {
  return (
    <View className="relative">
      <SafeImage
        uri={uri}
        className="w-full h-96"
        resizeMode="cover"
        showLoadingIndicator={false}
      />
      {/* Gradient overlay for better text readability */}
      <LinearGradient
        colors={['transparent', 'rgba(15, 15, 35, 0.6)', 'rgba(15, 15, 35, 1)']}
        locations={[0, 0.5, 1]}
        className="absolute bottom-0 left-0 right-0 h-40"
      />
      {/* Subtle vignette effect */}
      <View className="absolute inset-0 bg-black/10" />
    </View>
  );
};
