import React from 'react';
import { View } from 'react-native';
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
      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-32" />
    </View>
  );
};
