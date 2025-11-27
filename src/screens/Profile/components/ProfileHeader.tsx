import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeImage } from '../../../components/SafeImage';
import { User } from '../../../types/api.types';

interface ProfileHeaderProps {
  user: User;
  onEditPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditPress }) => {
  return (
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
            overflow: 'hidden',
          }}
          resizeMode="cover"
          showLoadingIndicator={false}
          fallbackIcon={false}
        />
      ) : (
        <View className="bg-primary w-24 h-24 rounded-full mb-4 items-center justify-center">
          {user?.username ? (
            <Text className="text-5xl text-white">
              {user.username.charAt(0).toUpperCase()}
            </Text>
          ) : (
            <Feather name="user" size={48} color="#F8FAFC" />
          )}
        </View>
      )}

      {/* User Info */}
      <Text className="text-2xl font-bold text-foreground mb-1">
        {user?.username || 'Người dùng'}
      </Text>
      <Text className="text-muted-foreground text-sm mb-1">{user?.email}</Text>

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
        <View
          className={`mt-2 rounded-full px-3 py-1 ${
            user.status === 'ACTIVE' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              user.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {user.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
          </Text>
        </View>
      )}
    </View>
  );
};
