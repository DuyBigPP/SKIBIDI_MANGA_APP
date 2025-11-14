/**
 * Register Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess?: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onSwitchToLogin,
  onRegisterSuccess,
}) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      await register({ username, email, password });
      Alert.alert('Thành công', 'Đăng ký thành công!');
      onRegisterSuccess?.();
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-8">
          {/* Logo/Title */}
          <View className="items-center mb-8">
            <Text className="text-4xl font-bold text-primary mb-2">📚</Text>
            <Text className="text-3xl font-bold text-foreground">Đăng ký</Text>
            <Text className="text-muted-foreground mt-2">Tạo tài khoản mới</Text>
          </View>

          {/* Register Form */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Tên người dùng</Text>
            <TextInput
              className="bg-card border border-border rounded-xl p-4 text-foreground"
              placeholder="Nhập tên người dùng"
              placeholderTextColor="#94A3B8"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Email</Text>
            <TextInput
              className="bg-card border border-border rounded-xl p-4 text-foreground"
              placeholder="example@email.com"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Mật khẩu</Text>
            <TextInput
              className="bg-card border border-border rounded-xl p-4 text-foreground"
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-semibold text-foreground mb-2">Xác nhận mật khẩu</Text>
            <TextInput
              className="bg-card border border-border rounded-xl p-4 text-foreground"
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className={`bg-primary rounded-xl p-4 items-center mb-4 ${loading ? 'opacity-50' : ''}`}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#F8FAFC" />
            ) : (
              <Text className="text-primary-foreground font-bold text-base">Đăng ký</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-muted-foreground">Đã có tài khoản? </Text>
            <TouchableOpacity onPress={onSwitchToLogin} disabled={loading}>
              <Text className="text-primary font-semibold">Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

