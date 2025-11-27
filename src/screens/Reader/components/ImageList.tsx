import React, { memo, useMemo } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';

interface ImageListProps {
  images: string[];
  imageDimensions: Record<number, { width: number; height: number }>;
  onImageLoad: (index: number, width: number, height: number) => void;
}

const MemoizedImageItem = memo<{
  imageUrl: string;
  index: number;
  screenWidth: number;
  aspectRatio: number;
  onImageLoad: (index: number, width: number, height: number) => void;
}>(({ imageUrl, index, screenWidth, aspectRatio, onImageLoad }) => {
  return (
    <View style={{ width: '100%' }}>
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
});

MemoizedImageItem.displayName = 'MemoizedImageItem';

export const ImageList: React.FC<ImageListProps> = memo(({
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
          <MemoizedImageItem
            key={index}
            imageUrl={imageUrl}
            index={index}
            screenWidth={screenWidth}
            aspectRatio={aspectRatio}
            onImageLoad={onImageLoad}
          />
        );
      })}
    </>
  );
});
