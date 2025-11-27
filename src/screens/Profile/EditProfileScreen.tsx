/**
 * Edit Profile Screen - Edit user profile information
 */

import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api';
import {
  EditProfileHeader,
  AvatarSection,
  UsernameInput,
  BioInput,
  InfoBox,
  SaveButton,
  CancelButton,
} from './components';

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
        
        console.log('Uploading image via FormData:', imageUri);
        
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
        console.log('Updating profile without new image');
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
      console.error('Failed to update profile:', error);
      Alert.alert('Lỗi', error.message || 'Không thể cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <EditProfileHeader onBack={onBack} onSave={handleSave} loading={loading} />

      <ScrollView className="flex-1">
        <View className="p-4">
          <AvatarSection
            avatar={formData.avatar}
            username={formData.username}
            loading={loading}
            onPickImage={pickImage}
          />
          <UsernameInput
            value={formData.username}
            onChange={(text) => setFormData({ ...formData, username: text })}
            disabled={loading}
          />
          <BioInput
            value={formData.bio}
            onChange={(text) => setFormData({ ...formData, bio: text })}
            disabled={loading}
          />
          <InfoBox />
          <SaveButton onPress={handleSave} loading={loading} />
          <CancelButton onPress={onBack} disabled={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

