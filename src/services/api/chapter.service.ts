/**
 * Chapter Service - Chapter API calls
 */

import { apiClient } from './apiClient';
import { Chapter, ChapterSummary, ApiResponse } from '../../types/api.types';
import {
  GET_CHAPTER_BY_SLUG,
  GET_ALL_CHAPTER_FOR_A_MANGA,
  BASE_URL,
} from '../../endpoint/endpoint';

export const chapterService = {
  /**
   * Get chapter by slug (with images)
   */
  async getBySlug(slug: string): Promise<ApiResponse<Chapter>> {
    const endpoint = GET_CHAPTER_BY_SLUG.replace(BASE_URL || '', '').replace('{slug}', slug);
    return apiClient.get<ApiResponse<Chapter>>(endpoint);
  },

  /**
   * Get all chapters for a manga
   */
  async getByMangaId(
    mangaId: string,
    params?: {
      sortBy?: 'chapterNumber';
      order?: 'asc' | 'desc';
    }
  ): Promise<ApiResponse<ChapterSummary[]>> {
    const queryParams = new URLSearchParams();
    
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);

    const queryString = queryParams.toString();
    const endpoint = GET_ALL_CHAPTER_FOR_A_MANGA
      .replace(BASE_URL || '', '')
      .replace('{mangaId}', mangaId) +
      (queryString ? '?' + queryString : '');

    return apiClient.get<ApiResponse<ChapterSummary[]>>(endpoint);
  },
};
