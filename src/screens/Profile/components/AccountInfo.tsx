import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { User } from '../../../types/api.types';

interface AccountInfoProps {
  user: User;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => {
  return (
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
  );
};
