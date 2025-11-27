import React from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AvatarSectionProps {
  avatar: string;
  username: string;
  loading: boolean;
  onPickImage: () => void;
}

export const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatar,
  username,
  loading,
  onPickImage,
}) => {
  return (
    <View className="mb-6 items-center">
      <Text className="text-sm font-semibold text-muted-foreground mb-3">Ảnh đại diện</Text>

      {/* Avatar Preview */}
      <TouchableOpacity onPress={onPickImage} disabled={loading} className="relative">
        {avatar ? (
          <Image
            source={{
              uri: avatar.startsWith('NEW_IMAGE:')
                ? avatar.replace('NEW_IMAGE:', '') // New image preview (local URI)
                : avatar.startsWith('http')
                ? avatar // Cloudinary URL
                : `data:image/jpeg;base64,${avatar}`, // Base64 from DB
            }}
            className="w-32 h-32 rounded-full"
            style={{ backgroundColor: '#8B5CF6' }}
          />
        ) : (
          <View className="w-32 h-32 rounded-full bg-primary items-center justify-center">
            {username ? (
              <Text className="text-6xl text-white">{username.charAt(0).toUpperCase()}</Text>
            ) : (
              <Feather name="user" size={56} color="#F8FAFC" />
            )}
          </View>
        )}

        {/* Upload/Camera Icon */}
        <View className="absolute bottom-0 right-0 bg-primary rounded-full p-2 border-2 border-background">
          {loading ? (
            <ActivityIndicator size="small" color="#F8FAFC" />
          ) : (
            <Feather name="camera" size={20} color="#F8FAFC" />
          )}
        </View>
      </TouchableOpacity>

      <Text className="text-xs text-muted-foreground mt-2 text-center">
        Nhấn để chọn ảnh từ thư viện
      </Text>
    </View>
  );
};
