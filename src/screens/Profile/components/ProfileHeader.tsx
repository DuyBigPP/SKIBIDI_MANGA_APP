import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Edit3, Shield, CheckCircle } from 'lucide-react-native';
import { SafeImage } from '../../../components/SafeImage';
import { User } from '../../../types/api.types';

interface ProfileHeaderProps {
  user: User;
  onEditPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditPress }) => {
  return (
    <View className="items-center mb-8 mt-4">
      {/* Avatar with glow effect */}
      <View className="relative mb-4">
        <View 
          className="absolute inset-0 bg-primary rounded-full opacity-30 blur-xl"
          style={{ transform: [{ scale: 1.2 }] }}
        />
        {user?.avatar ? (
          <SafeImage
            uri={user.avatar}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#A855F7',
              borderWidth: 3,
              borderColor: '#A855F7',
            }}
            resizeMode="cover"
            showLoadingIndicator={false}
            fallbackIcon={false}
          />
        ) : (
          <View className="bg-primary w-[100px] h-[100px] rounded-full items-center justify-center border-[3px] border-primary">
            {user?.username ? (
              <Text className="text-5xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </Text>
            ) : (
              <Text className="text-4xl">👤</Text>
            )}
          </View>
        )}
        
        {/* Status indicator */}
        {user?.status === 'ACTIVE' && (
          <View className="absolute bottom-1 right-1 bg-success rounded-full p-1 border-2 border-background">
            <CheckCircle size={14} color="#FAFAFA" fill="#22C55E" />
          </View>
        )}
      </View>

      {/* User Info */}
      <Text className="text-2xl font-black text-foreground mb-1">
        {user?.username || 'Người dùng'}
      </Text>
      <Text className="text-muted-foreground text-sm mb-3">{user?.email}</Text>

      {/* Role Badge */}
      <View className="flex-row items-center mb-4">
        <View className={`rounded-full px-3 py-1.5 flex-row items-center ${
          user?.role === 'ADMIN' ? 'bg-amber-500/20' : 'bg-primary/15'
        }`}>
          <Shield size={12} color={user?.role === 'ADMIN' ? '#F59E0B' : '#A855F7'} />
          <Text className={`text-xs font-bold ml-1.5 ${
            user?.role === 'ADMIN' ? 'text-amber-500' : 'text-primary'
          }`}>
            {user?.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên'}
          </Text>
        </View>
      </View>

      {/* Edit Button */}
      {onEditPress && (
        <TouchableOpacity
          onPress={onEditPress}
          className="bg-muted border border-border/50 rounded-2xl px-6 py-3 flex-row items-center"
          activeOpacity={0.7}
        >
          <Edit3 size={16} color="#A1A1AA" />
          <Text className="text-muted-foreground font-semibold ml-2">Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
