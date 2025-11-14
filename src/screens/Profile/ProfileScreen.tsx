/**
 * Profile Screen - User profile and settings
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { bookmarkService, readingHistoryService } from '../../services/api';
import { SafeImage } from '../../components/SafeImage';

interface ProfileScreenProps {
  onLoginPress: () => void;
  onEditPress?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLoginPress, onEditPress }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [stats, setStats] = useState({
    bookmarks: 0,
    readingHistory: 0,
    loading: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

  const loadStats = async () => {
    try {
      const [bookmarksResponse, historyResponse] = await Promise.all([
        bookmarkService.getAll({ page: 1, limit: 1 }),
        readingHistoryService.getAll({ page: 1, limit: 1 }),
      ]);

      setStats({
        bookmarks: bookmarksResponse.pagination?.total || 0,
        readingHistory: historyResponse.pagination?.total || 0,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
      setStats({ bookmarks: 0, readingHistory: 0, loading: false });
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('Logging out...');
              await logout();
              console.log('Logout successful');
              // Don't show alert as user will be redirected to login screen
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
            }
          },
        },
      ]
    );
  };


  if (!isAuthenticated) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-8">
        <View className="bg-primary w-24 h-24 rounded-full mb-4 items-center justify-center">
          <Feather name="user" size={48} color="#F8FAFC" />
        </View>
        <Text className="text-xl font-bold text-foreground text-center mb-2">
          Chào mừng đến SKIBIBI MANGA
        </Text>
        <Text className="text-base text-muted-foreground text-center mb-6">
          Đăng nhập để trải nghiệm đầy đủ tính năng
        </Text>
        <TouchableOpacity onPress={onLoginPress} className="bg-primary rounded-xl px-8 py-3">
          <Text className="text-primary-foreground font-semibold">Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        {/* Profile Header */}
        <View className="items-center mb-6 mt-4">
          {/* Avatar */}
          {user?.avatar ? (
            <SafeImage
              uri={user.avatar}
              style={{ 
                width: 96, 
                height: 96, 
                borderRadius: 48,
                marginBottom: 16,
                backgroundColor: '#8B5CF6',
                overflow: 'hidden'
              }}
              resizeMode="cover"
              showLoadingIndicator={false}
              fallbackIcon={false}
            />
          ) : (
            <View className="bg-primary w-24 h-24 rounded-full mb-4 items-center justify-center">
              <Text className="text-5xl text-white">
                {user?.username ? user.username.charAt(0).toUpperCase() : '👤'}
              </Text>
            </View>
          )}

          {/* User Info */}
          <Text className="text-2xl font-bold text-foreground mb-1">
            {user?.username || 'Người dùng'}
          </Text>
          <Text className="text-muted-foreground text-sm mb-1">
            {user?.email}
          </Text>
          
          {/* Edit Button */}
          {onEditPress && (
            <TouchableOpacity 
              onPress={onEditPress}
              className="bg-primary rounded-full px-6 py-2 flex-row items-center mt-3"
            >
              <Feather name="edit-2" size={16} color="#F8FAFC" />
              <Text className="text-primary-foreground font-semibold ml-2">Chỉnh sửa</Text>
            </TouchableOpacity>
          )}
          
          {/* User Role Badge */}
          <View className="bg-primary/20 rounded-full px-3 py-1 mt-2">
            <Text className="text-primary text-xs font-semibold">
              {user?.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên'}
            </Text>
          </View>

          {/* Account Status */}
          {user?.status && (
            <View className={`mt-2 rounded-full px-3 py-1 ${
              user.status === 'ACTIVE' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <Text className={`text-xs font-semibold ${
                user.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'
              }`}>
                {user.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
              </Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mb-6 bg-card rounded-xl p-4 border border-border">
          <View className="items-center flex-1">
            {stats.loading ? (
              <ActivityIndicator size="small" color="#8B5CF6" />
            ) : (
              <>
                <Text className="text-2xl font-bold text-foreground">{stats.readingHistory}</Text>
                <Text className="text-muted-foreground text-xs text-center">Đã đọc</Text>
              </>
            )}
          </View>
          <View className="w-px bg-border" />
          <View className="items-center flex-1">
            {stats.loading ? (
              <ActivityIndicator size="small" color="#8B5CF6" />
            ) : (
              <>
                <Text className="text-2xl font-bold text-foreground">{stats.bookmarks}</Text>
                <Text className="text-muted-foreground text-xs text-center">Yêu thích</Text>
              </>
            )}
          </View>
        </View>

        {/* Account Info */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Thông tin tài khoản</Text>
          
          <View className="bg-card rounded-xl p-4 border border-border mb-3">
            <View className="flex-row items-center mb-2">
              <Feather name="user" size={16} color="#8B5CF6" />
              <Text className="text-muted-foreground text-sm ml-2">Tên người dùng</Text>
            </View>
            <Text className="text-foreground font-semibold">{user?.username}</Text>
          </View>

          <View className="bg-card rounded-xl p-4 border border-border mb-3">
            <View className="flex-row items-center mb-2">
              <Feather name="mail" size={16} color="#8B5CF6" />
              <Text className="text-muted-foreground text-sm ml-2">Email</Text>
            </View>
            <Text className="text-foreground font-semibold">{user?.email}</Text>
          </View>

          {user?.createdAt && (
            <View className="bg-card rounded-xl p-4 border border-border mb-3">
              <View className="flex-row items-center mb-2">
                <Feather name="calendar" size={16} color="#8B5CF6" />
                <Text className="text-muted-foreground text-sm ml-2">Ngày tham gia</Text>
              </View>
              <Text className="text-foreground font-semibold">
                {new Date(user.createdAt).toLocaleDateString('vi-VN')}
              </Text>
            </View>
          )}

          {user?.bio && (
            <View className="bg-card rounded-xl p-4 border border-border">
              <View className="flex-row items-center mb-2">
                <Feather name="info" size={16} color="#8B5CF6" />
                <Text className="text-muted-foreground text-sm ml-2">Giới thiệu</Text>
              </View>
              <Text className="text-foreground">{user.bio}</Text>
            </View>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-destructive/20 rounded-xl p-4 mb-8 border border-destructive/30 flex-row items-center justify-center"
        >
          <Feather name="log-out" size={20} color="#EF4444" />
          <Text className="text-destructive font-bold text-center text-base ml-2">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
