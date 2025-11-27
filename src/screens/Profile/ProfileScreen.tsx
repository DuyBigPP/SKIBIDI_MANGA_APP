/**
 * Profile Screen - User profile and settings
 */

import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { bookmarkService, readingHistoryService } from '../../services/api';
import { UnauthenticatedView } from '../../components';
import {
  ProfileHeader,
  StatsCard,
  AccountInfo,
  LogoutButton,
} from './components';

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
      <UnauthenticatedView
        icon="user"
        title="Chào mừng đến SKIBIBI MANGA"
        description="Đăng nhập để trải nghiệm đầy đủ tính năng"
        buttonText="Đăng nhập"
        onLoginPress={onLoginPress}
      />
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <ProfileHeader user={user!} onEditPress={onEditPress} />
        <StatsCard
          readingHistory={stats.readingHistory}
          bookmarks={stats.bookmarks}
          loading={stats.loading}
        />
        <AccountInfo user={user!} />
        <LogoutButton onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};
