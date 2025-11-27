/**
 * Genre Service - Genre API calls
 */

import { apiClient } from './apiClient';
import { Genre, Manga, ApiResponse } from '../../types/api.types';
import {
  GET_ALL_GENRES,
  GET_GENRE_DETAIL_BY_SLUG,
  GET_ALL_MANGA_OF_A_GENRE,
  BASE_URL,
} from '../../endpoint/endpoint';

export const genreService = {
  /**
   * Get all genres
   */
  async getAll(): Promise<ApiResponse<Genre[]>> {
    const endpoint = GET_ALL_GENRES.replace(BASE_URL || '', '');
    return apiClient.get<ApiResponse<Genre[]>>(endpoint);
  },

  /**
   * Get genre by slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<Genre>> {
    const endpoint = GET_GENRE_DETAIL_BY_SLUG
      .replace(BASE_URL || '', '')
      .replace('{slug}', slug);
    return apiClient.get<ApiResponse<Genre>>(endpoint);
  },

  /**
   * Get manga by genre
   */
  async getMangaByGenre(
    slug: string,
    params?: {
      page?: number;
      limit?: number;
      sortBy?: 'createdAt' | 'updatedAt';
      order?: 'asc' | 'desc';
    }
  ): Promise<{
    success: boolean;
    genre: Genre;
    manga: Manga[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);

    const queryString = queryParams.toString();
    const endpoint = GET_ALL_MANGA_OF_A_GENRE
      .replace(BASE_URL || '', '')
      .replace('{slug}', slug) +
      (queryString ? '?' + queryString : '');

    return apiClient.get(endpoint);
  },
};
