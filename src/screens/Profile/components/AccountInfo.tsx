import React from 'react';
import { View, Text } from 'react-native';
import { User as UserIcon, Mail, Calendar, Info } from 'lucide-react-native';
import { User } from '../../../types/api.types';

interface AccountInfoProps {
  user: User;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => {
  return (
    <View className="mb-6">
      <Text className="text-lg font-black text-foreground mb-4">Thông tin tài khoản</Text>

      <View className="bg-surface rounded-2xl p-4 border border-border/30 mb-3">
        <View className="flex-row items-center mb-2">
          <View className="bg-primary/20 rounded-lg p-1.5">
            <UserIcon size={14} color="#A855F7" strokeWidth={2.5} />
          </View>
          <Text className="text-muted-foreground text-sm font-medium ml-2">Tên người dùng</Text>
        </View>
        <Text className="text-foreground font-bold text-base">{user?.username}</Text>
      </View>

      <View className="bg-surface rounded-2xl p-4 border border-border/30 mb-3">
        <View className="flex-row items-center mb-2">
          <View className="bg-cyan-500/20 rounded-lg p-1.5">
            <Mail size={14} color="#06B6D4" strokeWidth={2.5} />
          </View>
          <Text className="text-muted-foreground text-sm font-medium ml-2">Email</Text>
        </View>
        <Text className="text-foreground font-bold text-base">{user?.email}</Text>
      </View>

      {user?.createdAt && (
        <View className="bg-surface rounded-2xl p-4 border border-border/30 mb-3">
          <View className="flex-row items-center mb-2">
            <View className="bg-emerald-500/20 rounded-lg p-1.5">
              <Calendar size={14} color="#10B981" strokeWidth={2.5} />
            </View>
            <Text className="text-muted-foreground text-sm font-medium ml-2">Ngày tham gia</Text>
          </View>
          <Text className="text-foreground font-bold text-base">
            {new Date(user.createdAt).toLocaleDateString('vi-VN')}
          </Text>
        </View>
      )}

      {user?.bio && (
        <View className="bg-surface rounded-2xl p-4 border border-border/30">
          <View className="flex-row items-center mb-2">
            <View className="bg-amber-500/20 rounded-lg p-1.5">
              <Info size={14} color="#F59E0B" strokeWidth={2.5} />
            </View>
            <Text className="text-muted-foreground text-sm font-medium ml-2">Giới thiệu</Text>
          </View>
          <Text className="text-foreground leading-6">{user.bio}</Text>
        </View>
      )}
    </View>
  );
};
