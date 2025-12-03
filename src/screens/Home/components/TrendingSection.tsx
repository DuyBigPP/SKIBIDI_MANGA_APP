import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Manga } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';
import { TrendingUp, BookOpen } from 'lucide-react-native';

interface TrendingSectionProps {
  manga: Manga[];
  loading: boolean;
  onMangaPress: (slug: string) => void;
}

const TrendingSkeleton: React.FC = () => (
  <View className="flex-row">
    {[1, 2, 3, 4].map((i) => (
      <View key={i} className="mr-3 w-36">
        <View className="bg-muted rounded-2xl h-52 mb-3 animate-pulse" />
        <View className="bg-muted rounded-lg h-4 mb-2 w-4/5" />
        <View className="bg-muted rounded-lg h-3 w-1/2" />
      </View>
    ))}
  </View>
);

const EmptyState: React.FC = () => (
  <View className="bg-card rounded-2xl p-8 items-center border border-border/50">
    <BookOpen size={40} color="#71717A" />
    <Text className="text-muted-foreground text-center mt-3">Không có dữ liệu</Text>
  </View>
);

export const TrendingSection: React.FC<TrendingSectionProps> = ({ 
  manga, 
  loading, 
  onMangaPress 
}) => {
  return (
    <View className="mb-8">
      <View className="flex-row items-center mb-4">
        <View className="bg-accent/20 rounded-lg p-1.5 mr-2">
          <TrendingUp size={18} color="#F472B6" />
        </View>
        <Text className="text-xl font-bold text-foreground">Thịnh hành</Text>
      </View>

      {loading ? (
        <TrendingSkeleton />
      ) : manga.length > 0 ? (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
        >
          {manga.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onMangaPress(item.slug)}
              className="mr-3 w-36"
              activeOpacity={0.8}
            >
              <View className="relative">
                <SafeImage
                  uri={item.thumbnail}
                  className="h-[200px] rounded-2xl bg-muted"
                  resizeMode="cover"
                  showLoadingIndicator={false}
                />
                {/* Ranking Badge */}
                {index < 3 && (
                  <View className={`absolute top-2 left-2 rounded-lg px-2 py-1 ${
                    index === 0 ? 'bg-amber-500' : 
                    index === 1 ? 'bg-zinc-400' : 
                    'bg-amber-700'
                  }`}>
                    <Text className="text-white text-xs font-bold">#{index + 1}</Text>
                  </View>
                )}
              </View>
              <Text className="font-semibold text-foreground text-sm mt-2" numberOfLines={2}>
                {item.title}
              </Text>
              <Text className="text-muted-foreground text-xs mt-1">
                {item.totalChapters} chương
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <EmptyState />
      )}
    </View>
  );
};
