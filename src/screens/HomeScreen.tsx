import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground">
            Khám phá Manga
          </Text>
          <Text className="text-base text-muted-foreground mt-2">
            Tìm kiếm những bộ manga yêu thích của bạn
          </Text>
        </View>

        {/* Featured Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-3">
            Nổi bật
          </Text>
          <View className="bg-primary rounded-2xl p-6 h-48">
            <Text className="text-primary-foreground text-2xl font-bold">
              One Piece
            </Text>
            <Text className="text-primary-foreground/90 text-sm mt-2">
              Chương mới nhất: 1098
            </Text>
          </View>
        </View>

        {/* Popular Today */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-bold text-foreground">
              Phổ biến hôm nay
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-semibold">Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity
                key={item}
                className="mr-4 w-32"
              >
                <View className="bg-card rounded-xl h-48 mb-2" />
                <Text className="font-semibold text-foreground text-sm">
                  Manga {item}
                </Text>
                <Text className="text-muted-foreground text-xs">Chapter 100</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Updates */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-3">
            Cập nhật gần đây
          </Text>
          
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-row mb-4 bg-card rounded-xl p-3"
            >
              <View className="bg-muted rounded-lg w-16 h-20 mr-3" />
              <View className="flex-1">
                <Text className="font-bold text-foreground text-base mb-1">
                  Manga Title {item}
                </Text>
                <Text className="text-muted-foreground text-sm mb-1">
                  Chapter 150
                </Text>
                <Text className="text-muted-foreground/70 text-xs">2 giờ trước</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
