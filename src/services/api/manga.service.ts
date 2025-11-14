/**
 * Manga Service - Manga API calls
 */

import { apiClient } from './apiClient';
import {
  Manga,
  MangaDetail,
  MangaQueryParams,
  ApiResponse,
} from '../../types/api.types';
import {
  GET_ALL_MANGA,
  GET_TRENDING_MANGA,
  GET_RECENTLY_UPDATED_MANGA,
  GET_ONE_RANDOM_MANGA,
  GET_MANGA_BY_SLUG,
  BASE_URL,
} from '../../endpoint/endpoint';

export const mangaService = {
  /**
   * Get all manga with filters
   */
  async getAll(params?: MangaQueryParams): Promise<ApiResponse<Manga[]>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.genres) queryParams.append('genres', params.genres);
    if (params?.author) queryParams.append('author', params.author);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);

    const queryString = queryParams.toString();
    const endpoint = GET_ALL_MANGA.replace(BASE_URL || '', '') + (queryString ? '?' + queryString : '');

    return apiClient.get<ApiResponse<Manga[]>>(endpoint);
  },

  /**
   * Get trending manga
   */
  async getTrending(limit: number = 10): Promise<ApiResponse<Manga[]>> {
    const endpoint = GET_TRENDING_MANGA.replace(BASE_URL || '', '') + `?limit=${limit}`;
    return apiClient.get<ApiResponse<Manga[]>>(endpoint);
  },

  /**
   * Get recently updated manga
   */
  async getRecent(limit: number = 10): Promise<ApiResponse<Manga[]>> {
    const endpoint = GET_RECENTLY_UPDATED_MANGA.replace(BASE_URL || '', '') + `?limit=${limit}`;
    return apiClient.get<ApiResponse<Manga[]>>(endpoint);
  },

  /**
   * Get random manga
   */
  async getRandom(): Promise<ApiResponse<Manga[]>> {
    const endpoint = GET_ONE_RANDOM_MANGA.replace(BASE_URL || '', '');
    return apiClient.get<ApiResponse<Manga[]>>(endpoint);
  },

  /**
   * Get manga by slug (full details with chapters)
   */
  async getBySlug(slug: string): Promise<ApiResponse<MangaDetail>> {
    const endpoint = GET_MANGA_BY_SLUG.replace(BASE_URL || '', '').replace('{slug}', slug);
    return apiClient.get<ApiResponse<MangaDetail>>(endpoint);
  },
};
