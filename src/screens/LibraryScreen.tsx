import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export const LibraryScreen = () => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        {/* Header */}
        <Text className="text-3xl font-bold text-foreground mb-6">
          Thư viện
        </Text>

        {/* Tabs */}
        <View className="flex-row mb-6 bg-muted rounded-xl p-1">
          <TouchableOpacity className="flex-1 bg-primary rounded-lg py-3">
            <Text className="text-center font-semibold text-primary-foreground">
              Đang đọc
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3">
            <Text className="text-center font-semibold text-muted-foreground">
              Yêu thích
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3">
            <Text className="text-center font-semibold text-muted-foreground">
              Lịch sử
            </Text>
          </TouchableOpacity>
        </View>

        {/* Continue Reading */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-3">
            Tiếp tục đọc
          </Text>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-row mb-4 bg-card rounded-xl p-3 border border-border"
            >
              <View className="bg-muted rounded-lg w-20 h-28 mr-3" />
              <View className="flex-1">
                <Text className="font-bold text-foreground text-base mb-1">
                  Manga Title {item}
                </Text>
                <Text className="text-muted-foreground text-sm mb-2">
                  Chapter 45: Cuộc chiến bắt đầu
                </Text>
                
                {/* Progress Bar */}
                <View className="bg-muted rounded-full h-2 mb-2">
                  <View 
                    className="bg-primary rounded-full h-2" 
                    style={{ width: '65%' }} 
                  />
                </View>
                
                <Text className="text-muted-foreground/70 text-xs">
                  Đã đọc 65% • 3 ngày trước
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Favorites */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-bold text-foreground">
              Yêu thích (24)
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-semibold">Sắp xếp</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row flex-wrap justify-between">
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity
                key={item}
                className="w-[48%] mb-4"
              >
                <View className="bg-card rounded-xl h-56 mb-2 border border-border" />
                <Text className="font-bold text-foreground text-sm">
                  Manga {item}
                </Text>
                <Text className="text-muted-foreground text-xs">Chapter 120</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
