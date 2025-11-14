/**
 * Bookmark Service - Bookmark API calls
 */

import { apiClient } from './apiClient';
import {
  Bookmark,
  BookmarkCheckResponse,
  ApiResponse,
  PaginatedResponse,
} from '../../types/api.types';
import {
  GET_ALL_BOOKMARKED_MANGA,
  CHECK_IF_MANGA_IS_BOOKMARKED,
  TOGGLE_BOOKMARK_FOR_A_MANGA,
  BASE_URL,
} from '../../endpoint/endpoint';

export const bookmarkService = {
  /**
   * Get all bookmarked manga
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'updatedAt';
    order?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<Bookmark>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);

    const queryString = queryParams.toString();
    const endpoint = GET_ALL_BOOKMARKED_MANGA.replace(BASE_URL || '', '') +
      (queryString ? '?' + queryString : '');

    return apiClient.get<PaginatedResponse<Bookmark>>(endpoint);
  },

  /**
   * Check if manga is bookmarked
   */
  async check(mangaId: string): Promise<ApiResponse<BookmarkCheckResponse>> {
    const endpoint = CHECK_IF_MANGA_IS_BOOKMARKED
      .replace(BASE_URL || '', '')
      .replace('{mangaId}', mangaId);
    return apiClient.get<ApiResponse<BookmarkCheckResponse>>(endpoint);
  },

  /**
   * Toggle bookmark for a manga (add/remove)
   */
  async toggle(mangaId: string): Promise<ApiResponse<{
    action: 'added' | 'removed';
    isBookmarked: boolean;
  }>> {
    const endpoint = TOGGLE_BOOKMARK_FOR_A_MANGA
      .replace(BASE_URL || '', '')
      .replace('{mangaId}', mangaId);
    return apiClient.post<ApiResponse<{
      action: 'added' | 'removed';
      isBookmarked: boolean;
    }>>(endpoint);
  },
};
