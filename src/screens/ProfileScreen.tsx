import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export const ProfileScreen = () => {
  const menuItems = [
    { icon: '⚙️', title: 'Cài đặt', subtitle: 'Tùy chỉnh ứng dụng' },
    { icon: '🔔', title: 'Thông báo', subtitle: 'Quản lý thông báo' },
    { icon: '📥', title: 'Tải xuống', subtitle: 'Quản lý manga đã tải' },
    { icon: '🌙', title: 'Giao diện', subtitle: 'Sáng / Tối' },
    { icon: '📊', title: 'Thống kê', subtitle: 'Xem thống kê đọc truyện' },
    { icon: '❤️', title: 'Hỗ trợ', subtitle: 'Liên hệ & phản hồi' },
    { icon: '📖', title: 'Về chúng tôi', subtitle: 'Phiên bản 1.0.0' },
  ];

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        {/* Profile Header */}
        <View className="items-center mb-6 mt-4">
          <View className="bg-primary w-24 h-24 rounded-full mb-4 items-center justify-center">
            <Text className="text-primary-foreground text-4xl">👤</Text>
          </View>
          <Text className="text-2xl font-bold text-foreground mb-1">
            Người dùng
          </Text>
          <Text className="text-muted-foreground text-sm">
            user@example.com
          </Text>
          <TouchableOpacity className="mt-4 bg-primary rounded-full px-6 py-2">
            <Text className="text-primary-foreground font-semibold">Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mb-6 bg-card rounded-xl p-4 border border-border">
          <View className="items-center">
            <Text className="text-2xl font-bold text-foreground">156</Text>
            <Text className="text-muted-foreground text-sm">Đã đọc</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-foreground">24</Text>
            <Text className="text-muted-foreground text-sm">Yêu thích</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-foreground">89</Text>
            <Text className="text-muted-foreground text-sm">Đang theo dõi</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mb-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center bg-card rounded-xl p-4 mb-3 border border-border"
            >
              <Text className="text-2xl mr-4">{item.icon}</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground text-base">
                  {item.title}
                </Text>
                <Text className="text-muted-foreground text-sm">
                  {item.subtitle}
                </Text>
              </View>
              <Text className="text-muted-foreground text-xl">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity className="bg-destructive/20 rounded-xl p-4 mb-8 border border-destructive/30">
          <Text className="text-destructive font-bold text-center text-base">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
