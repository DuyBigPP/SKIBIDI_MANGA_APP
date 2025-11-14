/**
 * Login Screen
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

interface LoginScreenProps {
  onSwitchToRegister: () => void;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSwitchToRegister,
  onLoginSuccess,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      onLoginSuccess?.();
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Đăng nhập thất bại');
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
        <View className="flex-1 justify-center px-6">
          {/* Logo/Title */}
          <View className="items-center mb-12">
            <Text className="text-4xl font-bold text-primary mb-2">📚</Text>
            <Text className="text-3xl font-bold text-foreground">SKIBIBI MANGA</Text>
            <Text className="text-muted-foreground mt-2">Đọc manga mọi lúc mọi nơi</Text>
          </View>

          {/* Login Form */}
          <View className="mb-6">
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

          <View className="mb-6">
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

          {/* Forgot Password */}
          <TouchableOpacity className="mb-6" disabled={loading}>
            <Text className="text-primary text-right">Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className={`bg-primary rounded-xl p-4 items-center mb-4 ${loading ? 'opacity-50' : ''}`}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#F8FAFC" />
            ) : (
              <Text className="text-primary-foreground font-bold text-base">Đăng nhập</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className="text-muted-foreground">Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={onSwitchToRegister} disabled={loading}>
              <Text className="text-primary font-semibold">Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>

          {/* Guest Mode */}
          <View className="mt-8">
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-border" />
              <Text className="mx-4 text-muted-foreground">hoặc</Text>
              <View className="flex-1 h-px bg-border" />
            </View>
            <TouchableOpacity
              className="border border-border rounded-xl p-4 items-center"
              onPress={onLoginSuccess}
              disabled={loading}
            >
              <Text className="text-foreground font-semibold">Tiếp tục với chế độ khách</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

