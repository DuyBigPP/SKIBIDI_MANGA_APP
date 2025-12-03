import React from 'react';
import { View, Text } from 'react-native';
import { BookOpen, Eye } from 'lucide-react-native';

interface StatsCardProps {
  totalChapters: number;
  totalViews: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ totalChapters, totalViews }) => {
  return (
    <View className="flex-row items-center bg-surface rounded-2xl p-4 mb-4 border border-border/30">
      <View className="items-center flex-1">
        <View className="bg-primary/20 rounded-full p-2 mb-2">
          <BookOpen size={18} color="#A855F7" strokeWidth={2} />
        </View>
        <Text className="text-xl font-black text-foreground">
          {totalChapters}
        </Text>
        <Text className="text-muted-foreground text-xs font-medium">Chương</Text>
      </View>
      
      <View className="w-px h-12 bg-border/30" />
      
      <View className="items-center flex-1">
        <View className="bg-cyan-500/20 rounded-full p-2 mb-2">
          <Eye size={18} color="#06B6D4" strokeWidth={2} />
        </View>
        <Text className="text-xl font-black text-foreground">
          {totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
        </Text>
        <Text className="text-muted-foreground text-xs font-medium">Lượt xem</Text>
      </View>
    </View>
  );
};
