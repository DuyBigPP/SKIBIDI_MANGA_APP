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
import { BookOpen, Mail, Lock, Sparkles, UserCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
          <View className="items-center mb-10">
            <View className="bg-primary/20 rounded-3xl p-5 mb-4">
              <BookOpen size={56} color="#A855F7" strokeWidth={2} />
            </View>
            <View className="flex-row items-center">
              <Sparkles size={20} color="#A855F7" strokeWidth={2} />
              <Text className="text-3xl font-black text-foreground mx-2">SKIBIBI MANGA</Text>
              <Sparkles size={20} color="#A855F7" strokeWidth={2} />
            </View>
            <Text className="text-muted-foreground mt-2 font-medium">Đọc manga mọi lúc mọi nơi</Text>
          </View>

          {/* Login Form */}
          <View className="mb-5">
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

          <View className="mb-5">
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

          {/* Forgot Password */}
          <TouchableOpacity className="mb-6" disabled={loading}>
            <Text className="text-primary text-right font-semibold">Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className={`bg-primary rounded-2xl p-4 items-center mb-5 ${loading ? 'opacity-50' : ''}`}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
            style={{
              shadowColor: '#A855F7',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#FAFAFA" />
            ) : (
              <Text className="text-primary-foreground font-black text-base">Đăng nhập</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className="text-muted-foreground font-medium">Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={onSwitchToRegister} disabled={loading}>
              <Text className="text-primary font-bold">Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>

          {/* Guest Mode */}
          <View className="mt-8">
            <View className="flex-row items-center mb-5">
              <View className="flex-1 h-px bg-border/30" />
              <Text className="mx-4 text-muted-foreground font-medium">hoặc</Text>
              <View className="flex-1 h-px bg-border/30" />
            </View>
            <TouchableOpacity
              className="bg-surface border border-border/30 rounded-2xl p-4 items-center flex-row justify-center"
              onPress={onLoginSuccess}
              disabled={loading}
              activeOpacity={0.7}
            >
              <UserCircle size={20} color="#FAFAFA" strokeWidth={2} />
              <Text className="text-foreground font-bold ml-2">Tiếp tục với chế độ khách</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

