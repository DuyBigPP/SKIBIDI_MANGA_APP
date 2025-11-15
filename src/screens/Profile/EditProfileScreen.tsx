/**
 * Edit Profile Screen - Edit user profile information
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api';

interface EditProfileScreenProps {
  onBack: () => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack }) => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
  });

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Lỗi', 'Cần cấp quyền truy cập thư viện ảnh');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        console.log('✅ Image selected:', asset.uri);
        // Store URI with marker to indicate new image
        setFormData({ ...formData, avatar: `NEW_IMAGE:${asset.uri}` });
      }
    } catch (error) {
      console.error('Failed to pick image:', error);
      Alert.alert('Lỗi', 'Không thể chọn ảnh');
    }
  };

  const handleSave = async () => {
    if (!formData.username.trim()) {
      Alert.alert('Lỗi', 'Tên người dùng không được để trống');
      return;
    }

    setLoading(true);
    try {
      // Check if user selected a new image
      const isNewImage = formData.avatar?.startsWith('NEW_IMAGE:');
      
      if (isNewImage) {
        // Extract the image URI
        const imageUri = formData.avatar.replace('NEW_IMAGE:', '');
        
        console.log('📤 Uploading image via FormData:', imageUri);
        
        // Create FormData with image file
        const uploadFormData = new FormData();
        uploadFormData.append('username', formData.username.trim());
        if (formData.bio.trim()) {
          uploadFormData.append('bio', formData.bio.trim());
        }
        
        // Append image file
        uploadFormData.append('image', {
          uri: imageUri,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        } as any);
        
        // Send via FormData with multipart
        await authService.updateProfileWithAvatar(uploadFormData);
      } else {
        // No new image, just update text fields or keep existing avatar URL
        console.log('📝 Updating profile without new image');
        await authService.updateProfile({
          username: formData.username.trim(),
          bio: formData.bio.trim() || null,
          avatar: formData.avatar || null,
        });
      }

      // Refresh user data
      await refreshUser();

      Alert.alert('Thành công', 'Đã cập nhật thông tin cá nhân', [
        { text: 'OK', onPress: onBack }
      ]);
    } catch (error: any) {
      console.error('❌ Failed to update profile:', error);
      Alert.alert('Lỗi', error.message || 'Không thể cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-card border-b border-border px-4 py-3 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Feather name="arrow-left" size={24} color="#F8FAFC" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-foreground flex-1">Chỉnh sửa hồ sơ</Text>
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#8B5CF6" />
          ) : (
            <Feather name="check" size={24} color="#8B5CF6" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Avatar Section */}
          <View className="mb-6 items-center">
            <Text className="text-sm font-semibold text-muted-foreground mb-3">
              Ảnh đại diện
            </Text>
            
            {/* Avatar Preview */}
            <TouchableOpacity
              onPress={pickImage}
              disabled={loading}
              className="relative"
            >
              {formData.avatar ? (
                <Image
                  source={{ 
                    uri: formData.avatar.startsWith('NEW_IMAGE:')
                      ? formData.avatar.replace('NEW_IMAGE:', '') // New image preview (local URI)
                      : formData.avatar.startsWith('http')
                        ? formData.avatar // Cloudinary URL
                        : `data:image/jpeg;base64,${formData.avatar}` // Base64 from DB
                  }}
                  className="w-32 h-32 rounded-full"
                  style={{ backgroundColor: '#8B5CF6' }}
                />
              ) : (
                <View className="w-32 h-32 rounded-full bg-primary items-center justify-center">
                  {formData.username ? (
                    <Text className="text-6xl text-white">
                      {formData.username.charAt(0).toUpperCase()}
                    </Text>
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

          {/* Username */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-muted-foreground mb-2">
              Tên người dùng *
            </Text>
            <View className="bg-card border border-border rounded-xl px-4 py-3 flex-row items-center">
              <Feather name="user" size={20} color="#8B5CF6" />
              <TextInput
                value={formData.username}
                onChangeText={(text) => setFormData({ ...formData, username: text })}
                placeholder="Nhập tên người dùng"
                placeholderTextColor="#64748B"
                className="flex-1 ml-3 text-foreground"
                editable={!loading}
              />
            </View>
          </View>

          {/* Bio */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-muted-foreground mb-2">
              Giới thiệu
            </Text>
            <View className="bg-card border border-border rounded-xl px-4 py-3">
              <TextInput
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                placeholder="Viết vài dòng về bạn..."
                placeholderTextColor="#64748B"
                className="text-foreground min-h-[100px]"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!loading}
              />
            </View>
            <Text className="text-xs text-muted-foreground mt-1">
              {formData.bio.length}/500 ký tự
            </Text>
          </View>


          {/* Info Box */}
          <View className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
            <View className="flex-row items-start">
              <Feather name="info" size={20} color="#8B5CF6" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-semibold mb-1">Lưu ý</Text>
                <Text className="text-primary/80 text-sm">
                  • Tên người dùng là bắt buộc{'\n'}
                  • Giới thiệu tối đa 500 ký tự{'\n'}
                  • Nhấn vào ảnh đại diện để thay đổi
                </Text>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={loading}
            className={`rounded-xl p-4 flex-row items-center justify-center ${
              loading ? 'bg-primary/50' : 'bg-primary'
            }`}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color="#F8FAFC" />
                <Text className="text-primary-foreground font-bold text-center text-base ml-2">
                  Đang lưu...
                </Text>
              </>
            ) : (
              <>
                <Feather name="save" size={20} color="#F8FAFC" />
                <Text className="text-primary-foreground font-bold text-center text-base ml-2">
                  Lưu thay đổi
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={onBack}
            disabled={loading}
            className="border border-border rounded-xl p-4 mt-3 flex-row items-center justify-center"
          >
            <Feather name="x" size={20} color="#94A3B8" />
            <Text className="text-muted-foreground font-semibold text-center text-base ml-2">
              Hủy
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

