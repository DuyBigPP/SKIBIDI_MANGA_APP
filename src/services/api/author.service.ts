/**
 * Author Service - Author API calls
 */

import { apiClient } from './apiClient';
import { Author, Manga, ApiResponse } from '../../types/api.types';
import {
  GET_ALL_AUTHORS,
  GET_AUTHOR_DETAIL_BY_SLUG,
  GET_ALL_MANGA_BY_AUTHOR_SLUG,
  BASE_URL,
} from '../../endpoint/endpoint';

export const authorService = {
  /**
   * Get all authors
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<Author[]>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const endpoint = GET_ALL_AUTHORS.replace(BASE_URL || '', '') +
      (queryString ? '?' + queryString : '');

    return apiClient.get<ApiResponse<Author[]>>(endpoint);
  },

  /**
   * Get author by slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<Author>> {
    const endpoint = GET_AUTHOR_DETAIL_BY_SLUG
      .replace(BASE_URL || '', '')
      .replace('{slug}', slug);
    return apiClient.get<ApiResponse<Author>>(endpoint);
  },

  /**
   * Get manga by author
   */
  async getMangaByAuthor(
    slug: string,
    params?: {
      page?: number;
      limit?: number;
      sortBy?: 'createdAt' | 'updatedAt' | 'title';
      order?: 'asc' | 'desc';
    }
  ): Promise<{
    success: boolean;
    author: Author;
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
    const endpoint = GET_ALL_MANGA_BY_AUTHOR_SLUG
      .replace(BASE_URL || '', '')
      .replace('{slug}', slug) +
      (queryString ? '?' + queryString : '');

    return apiClient.get(endpoint);
  },
};
