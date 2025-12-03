import React from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { User, Camera } from 'lucide-react-native';

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
    <View className="mb-8 items-center">
      <Text className="text-sm font-bold text-muted-foreground mb-4">Ảnh đại diện</Text>

      {/* Avatar Preview */}
      <TouchableOpacity 
        onPress={onPickImage} 
        disabled={loading} 
        className="relative"
        activeOpacity={0.8}
      >
        {/* Gradient ring */}
        <View 
          className="w-36 h-36 rounded-full items-center justify-center"
          style={{
            borderWidth: 3,
            borderColor: '#A855F7',
          }}
        >
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
              style={{ backgroundColor: '#A855F7' }}
            />
          ) : (
            <View className="w-32 h-32 rounded-full bg-primary items-center justify-center">
              {username ? (
                <Text className="text-5xl text-white font-black">{username.charAt(0).toUpperCase()}</Text>
              ) : (
                <User size={48} color="#FAFAFA" strokeWidth={2} />
              )}
            </View>
          )}
        </View>

        {/* Upload/Camera Icon */}
        <View 
          className="absolute bottom-0 right-0 bg-primary rounded-2xl p-2.5 border-4 border-background"
          style={{
            shadowColor: '#A855F7',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FAFAFA" />
          ) : (
            <Camera size={20} color="#FAFAFA" strokeWidth={2} />
          )}
        </View>
      </TouchableOpacity>

      <Text className="text-xs text-muted-foreground mt-3 text-center font-medium">
        Nhấn để chọn ảnh từ thư viện
      </Text>
    </View>
  );
};
