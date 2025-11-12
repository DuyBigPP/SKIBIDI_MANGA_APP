import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export const BrowseScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const genres = [
    'Hành động', 'Phiêu lưu', 'Hài hước', 'Lãng mạn',
    'Kinh dị', 'Huyền bí', 'Shounen', 'Seinen',
    'Shoujo', 'Isekai', 'Slice of Life', 'Drama'
  ];

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        {/* Header */}
        <Text className="text-3xl font-bold text-foreground mb-6">
          Tìm kiếm
        </Text>

        {/* Search Bar */}
        <View className="mb-6">
          <View className="bg-card rounded-xl p-4 flex-row items-center border border-border">
            <Text className="text-muted-foreground mr-2">🔍</Text>
            <TextInput
              placeholder="Tìm kiếm manga..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-base text-foreground"
            />
          </View>
        </View>

        {/* Genres */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-3">
            Thể loại
          </Text>
          <View className="flex-row flex-wrap">
            {genres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                className="bg-primary/20 rounded-full px-4 py-2 mr-2 mb-2 border border-primary/30"
              >
                <Text className="text-primary font-semibold">
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Filters */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-3">
            Sắp xếp theo
          </Text>
          <View className="flex-row">
            <TouchableOpacity className="bg-primary rounded-xl px-6 py-3 mr-3">
              <Text className="text-primary-foreground font-semibold">Phổ biến</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-secondary rounded-xl px-6 py-3 mr-3">
              <Text className="text-secondary-foreground font-semibold">Mới nhất</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-muted rounded-xl px-6 py-3">
              <Text className="text-muted-foreground font-semibold">Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results Grid */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-3">
            Kết quả
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <TouchableOpacity
                key={item}
                className="w-[48%] mb-4"
              >
                <View className="bg-card rounded-xl h-56 mb-2 border border-border" />
                <Text className="font-bold text-foreground text-sm">
                  Manga Title {item}
                </Text>
                <Text className="text-muted-foreground text-xs">
                  ⭐ 4.5 • 150 chapters
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
