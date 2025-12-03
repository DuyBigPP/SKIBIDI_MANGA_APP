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
import { BookOpen, User, Mail, Lock, KeyRound } from 'lucide-react-native';
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
            <View className="bg-primary/20 rounded-3xl p-4 mb-4">
              <BookOpen size={48} color="#A855F7" strokeWidth={2} />
            </View>
            <Text className="text-3xl font-black text-foreground">Đăng ký</Text>
            <Text className="text-muted-foreground mt-2 font-medium">Tạo tài khoản mới</Text>
          </View>

          {/* Register Form */}
          <View className="mb-4">
            <Text className="text-sm font-bold text-foreground mb-2">Tên người dùng</Text>
            <View className="relative">
              <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <User size={18} color="#64748B" strokeWidth={2} />
              </View>
              <TextInput
                className="bg-surface border border-border/30 rounded-2xl p-4 pl-12 text-foreground font-medium"
                placeholder="Nhập tên người dùng"
                placeholderTextColor="#64748B"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!loading}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-foreground mb-2">Email</Text>
            <View className="relative">
              <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Mail size={18} color="#64748B" strokeWidth={2} />
              </View>
              <TextInput
                className="bg-surface border border-border/30 rounded-2xl p-4 pl-12 text-foreground font-medium"
                placeholder="example@email.com"
                placeholderTextColor="#64748B"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-foreground mb-2">Mật khẩu</Text>
            <View className="relative">
              <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Lock size={18} color="#64748B" strokeWidth={2} />
              </View>
              <TextInput
                className="bg-surface border border-border/30 rounded-2xl p-4 pl-12 text-foreground font-medium"
                placeholder="••••••••"
                placeholderTextColor="#64748B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-bold text-foreground mb-2">Xác nhận mật khẩu</Text>
            <View className="relative">
              <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <KeyRound size={18} color="#64748B" strokeWidth={2} />
              </View>
              <TextInput
                className="bg-surface border border-border/30 rounded-2xl p-4 pl-12 text-foreground font-medium"
                placeholder="••••••••"
                placeholderTextColor="#64748B"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className={`bg-primary rounded-2xl p-4 items-center mb-5 shadow-lg shadow-primary/30 ${loading ? 'opacity-50' : ''}`}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FAFAFA" />
            ) : (
              <Text className="text-primary-foreground font-black text-base">Đăng ký</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-muted-foreground font-medium">Đã có tài khoản? </Text>
            <TouchableOpacity onPress={onSwitchToLogin} disabled={loading}>
              <Text className="text-primary font-bold">Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

