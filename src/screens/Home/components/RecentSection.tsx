import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Manga } from '../../../types/api.types';
import { SafeImage } from '../../../components/SafeImage';
import { Clock, BookOpen, ChevronRight } from 'lucide-react-native';

interface RecentSectionProps {
  manga: Manga[];
  loading: boolean;
  onMangaPress: (slug: string) => void;
}

const RecentSkeleton: React.FC = () => (
  <>
    {[1, 2, 3, 4].map((i) => (
      <View key={i} className="flex-row mb-3 bg-card rounded-2xl p-3 border border-border/30">
        <View className="bg-muted rounded-xl w-16 h-22 mr-4 animate-pulse" />
        <View className="flex-1 py-1">
          <View className="bg-muted rounded-lg h-4 mb-2 w-3/4" />
          <View className="bg-muted rounded-lg h-3 mb-1.5 w-1/2" />
          <View className="bg-muted rounded-lg h-3 w-1/4" />
        </View>
      </View>
    ))}
  </>
);

const EmptyState: React.FC = () => (
  <View className="bg-card rounded-2xl p-8 items-center border border-border/30">
    <BookOpen size={40} color="#71717A" />
    <Text className="text-muted-foreground text-center mt-3">Không có dữ liệu</Text>
  </View>
);

export const RecentSection: React.FC<RecentSectionProps> = ({ 
  manga, 
  loading, 
  onMangaPress 
}) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4">
        <View className="bg-secondary/20 rounded-lg p-1.5 mr-2">
          <Clock size={18} color="#6366F1" />
        </View>
        <Text className="text-xl font-bold text-foreground">Mới cập nhật</Text>
      </View>

      {loading ? (
        <RecentSkeleton />
      ) : manga.length > 0 ? (
        <>
          {manga.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onMangaPress(item.slug)}
              className="flex-row mb-3 bg-card rounded-2xl p-3 border border-border/30"
              activeOpacity={0.7}
            >
              <SafeImage
                uri={item.thumbnail}
                className="w-[60px] h-[80px] rounded-xl bg-muted"
                resizeMode="cover"
                showLoadingIndicator={false}
              />
              <View className="flex-1 ml-4 justify-center">
                <Text className="font-bold text-foreground text-base mb-1" numberOfLines={1}>
                  {item.title}
                </Text>
                {item.latestChapter && (
                  <View className="flex-row items-center mb-1">
                    <View className="bg-primary/15 rounded-md px-2 py-0.5">
                      <Text className="text-primary text-xs font-medium">
                        {item.latestChapter.title}
                      </Text>
                    </View>
                  </View>
                )}
                <Text className="text-muted-foreground text-xs">
                  {new Date(item.lastChapterAt).toLocaleDateString('vi-VN')}
                </Text>
              </View>
              <View className="justify-center">
                <ChevronRight size={20} color="#71717A" />
              </View>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <EmptyState />
      )}
    </View>
  );
};
