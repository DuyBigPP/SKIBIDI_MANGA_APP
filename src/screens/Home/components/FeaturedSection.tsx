import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Manga } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';
import { Star, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FeaturedSectionProps {
  manga: Manga;
  onPress: (slug: string) => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ manga, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={() => onPress(manga.slug)} 
      className="mb-8"
      activeOpacity={0.9}
    >
      <View className="rounded-3xl overflow-hidden" style={{ height: 220 }}>
        <SafeImage
          uri={manga.thumbnail}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          showLoadingIndicator={false}
        />
        
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(10, 10, 15, 0.6)', 'rgba(10, 10, 15, 0.95)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '80%',
          }}
        />

        {/* Featured Badge */}
        <View className="absolute top-4 left-4 flex-row items-center">
          <View className="bg-primary rounded-full px-3 py-1.5 flex-row items-center">
            <Star size={12} color="#FAFAFA" fill="#FAFAFA" />
            <Text className="text-white text-xs font-bold ml-1">Đề xuất</Text>
          </View>
        </View>

        {/* Content */}
        <View className="absolute bottom-0 left-0 right-0 p-5">
          <Text className="text-white text-xl font-bold mb-2" numberOfLines={2}>
            {manga.title}
          </Text>
          
          <View className="flex-row items-center">
            <View className="bg-white/10 backdrop-blur rounded-full px-3 py-1.5 flex-row items-center mr-2">
              <BookOpen size={12} color="#A1A1AA" />
              <Text className="text-zinc-300 text-xs ml-1.5">
                {manga.totalChapters} chương
              </Text>
            </View>
            
            {manga.genres.slice(0, 2).map((genre) => (
              <View key={genre.id} className="bg-primary/20 rounded-full px-3 py-1.5 mr-2">
                <Text className="text-primary text-xs font-medium">
                  {genre.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
