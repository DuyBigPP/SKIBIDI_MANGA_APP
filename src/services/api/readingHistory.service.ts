/**
 * Reading History Service - Reading history API calls
 */

import { apiClient } from './apiClient';
import {
  ReadingHistory,
  ReadingProgress,
  SaveProgressPayload,
  ApiResponse,
  PaginatedResponse,
} from '../../types/api.types';
import {
  GET_READING_HISTORY,
  CLEAR_READING_HISTORY,
  GET_CONTINUE_READING,
  GET_READING_PROGRESS,
  CLEAR_READING_PROGRESS,
  SAVE_READING_PROGRESS_FOR_A_CHAPTER,
  BASE_URL,
} from '../../endpoint/endpoint';

export const readingHistoryService = {
  /**
   * Get all reading history
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    mangaId?: string;
    sortBy?: 'createdAt';
    order?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<ReadingHistory>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.mangaId) queryParams.append('mangaId', params.mangaId);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);

    const queryString = queryParams.toString();
    const endpoint = GET_READING_HISTORY.replace(BASE_URL || '', '') +
      (queryString ? '?' + queryString : '');

    return apiClient.get<PaginatedResponse<ReadingHistory>>(endpoint);
  },

  /**
   * Get continue reading list
   */
  async getContinueReading(): Promise<ApiResponse<ReadingHistory[]>> {
    const endpoint = GET_CONTINUE_READING.replace(BASE_URL || '', '');
    return apiClient.get<ApiResponse<ReadingHistory[]>>(endpoint);
  },

  /**
   * Get reading progress for a manga
   */
  async getProgress(mangaId: string): Promise<ApiResponse<ReadingProgress>> {
    const endpoint = GET_READING_PROGRESS
      .replace(BASE_URL || '', '')
      .replace('{mangaId}', mangaId);
    return apiClient.get<ApiResponse<ReadingProgress>>(endpoint);
  },

  /**
   * Save reading progress for a chapter
   */
  async saveProgress(
    chapterId: string,
    progress: SaveProgressPayload
  ): Promise<ApiResponse<any>> {
    const endpoint = SAVE_READING_PROGRESS_FOR_A_CHAPTER
      .replace(BASE_URL || '', '')
      .replace('{chapterId}', chapterId);
    return apiClient.post<ApiResponse<any>>(endpoint, progress);
  },

  /**
   * Clear all reading history
   */
  async clearAll(): Promise<ApiResponse<{ message: string }>> {
    try {
      const endpoint = CLEAR_READING_HISTORY.replace(BASE_URL || '', '');
      console.log('Clearing history with endpoint:', endpoint);
      const response = await apiClient.delete<ApiResponse<{ message: string }>>(endpoint);
      console.log('Clear history response:', response);
      return response;
    } catch (error) {
      console.error('Clear history error:', error);
      throw error;
    }
  },

  /**
   * Clear reading history for a manga
   */
  async clearManga(mangaId: string): Promise<ApiResponse<{ message: string }>> {
    const endpoint = CLEAR_READING_PROGRESS
      .replace(BASE_URL || '', '')
      .replace('{mangaId}', mangaId);
    return apiClient.delete<ApiResponse<{ message: string }>>(endpoint);
  },
};
