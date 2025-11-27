import React from 'react';
import { View, Image, useWindowDimensions } from 'react-native';

interface ImageListProps {
  images: string[];
  imageDimensions: Record<number, { width: number; height: number }>;
  onImageLoad: (index: number, width: number, height: number) => void;
}

export const ImageList: React.FC<ImageListProps> = ({
  images,
  imageDimensions,
  onImageLoad,
}) => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <>
      {images.map((imageUrl, index) => {
        const imgDim = imageDimensions[index];
        const aspectRatio = imgDim ? imgDim.width / imgDim.height : 0.7;

        return (
          <View key={index} style={{ width: '100%' }}>
            <Image
              source={{ uri: imageUrl }}
              style={{ width: screenWidth, aspectRatio }}
              resizeMode="contain"
              onLoad={(e) => {
                const { width, height } = e.nativeEvent.source;
                onImageLoad(index, width, height);
              }}
            />
          </View>
        );
      })}
    </>
  );
};
