/**
 * Auth Service - Authentication API calls
 */

import { apiClient } from './apiClient';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  ApiResponse,
} from '../../types/api.types';
import {
  REGISTER_NEW_USER,
  LOGIN_USER,
  LOGOUT_USER,
  USER_PROFILE,
  UPDATE_USER_PROFILE,
} from '../../endpoint/endpoint';

export const authService = {
  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      REGISTER_NEW_USER.replace(process.env.EXPO_PUBLIC_API_URL || '', ''),
      credentials
    );
    
    // Save token to client
    if (response.accessToken) {
      apiClient.setToken(response.accessToken);
    }
    
    return response;
  },

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      LOGIN_USER.replace(process.env.EXPO_PUBLIC_API_URL || '', ''),
      credentials
    );
    
    // Save token to client
    if (response.accessToken) {
      apiClient.setToken(response.accessToken);
    }
    
    return response;
  },

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        LOGOUT_USER.replace(process.env.EXPO_PUBLIC_API_URL || '', ''),
        {} // Send empty object as body
      );
      
      // Clear token from client
      apiClient.setToken(null);
      
      return response;
    } catch (error) {
      // Even if API fails, clear token locally
      apiClient.setToken(null);
      throw error;
    }
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>(
      USER_PROFILE.replace(process.env.EXPO_PUBLIC_API_URL || '', '')
    );
  },

  /**
   * Update user profile
   */
  async updateProfile(data: {
    username?: string;
    avatar?: string | null;
    bio?: string | null;
  }): Promise<ApiResponse<User>> {
    console.log('🚀 Updating profile with:', {
      username: data.username,
      bio: data.bio,
      hasAvatar: !!data.avatar,
      avatarLength: data.avatar?.length || 0,
      avatarIsBase64: data.avatar && !data.avatar.startsWith('http'),
      avatarIsURL: data.avatar && data.avatar.startsWith('http'),
    });
    
    const response = await apiClient.put<ApiResponse<User>>(
      UPDATE_USER_PROFILE.replace(process.env.EXPO_PUBLIC_API_URL || '', ''),
      data
    );
    
    console.log('✅ Profile update response:', {
      success: response.success,
      username: response.data?.username,
      bio: response.data?.bio,
      avatarIsURL: response.data?.avatar?.startsWith('http'),
      avatarIsBase64: response.data?.avatar && !response.data.avatar.startsWith('http'),
      avatarPreview: response.data?.avatar?.substring(0, 100),
    });
    
    return response;
  },

  /**
   * Update user profile with file upload (uses PUT with FormData for Cloudinary upload)
   */
  async updateProfileWithAvatar(formData: FormData): Promise<ApiResponse<User>> {
    return apiClient.putFormData<ApiResponse<User>>(
      UPDATE_USER_PROFILE.replace(process.env.EXPO_PUBLIC_API_URL || '', ''),
      formData
    );
  },

  /**
   * Set token manually (for loading from storage)
   */
  setToken(token: string | null) {
    apiClient.setToken(token);
  },
};
