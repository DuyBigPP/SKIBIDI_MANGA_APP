/**
 * API Response Types - Based on actual API responses
 */

// Base API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Author Types
export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    mangas: number;
  };
}

// Genre Types
export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    mangas: number;
  };
}

// Manga Types
export interface Manga {
  id: string;
  mangaId: string | null;
  title: string;
  slug: string;
  alternativeTitles: string[];
  description: string;
  thumbnail: string;
  coverImage: string | null;
  status: 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED';
  approvalStatus: string;
  releaseYear: number | null;
  totalChapters: number;
  totalViews: number;
  totalBookmarks: number;
  averageRating: number;
  totalRatings: number;
  uploaderId: string | null;
  createdAt: string;
  updatedAt: string;
  lastChapterAt: string;
  authors: Author[];
  genres: Genre[];
  _count?: {
    chapters: number;
    bookmarks: number;
    comments?: number;
    ratings?: number;
  };
  latestChapter?: {
    chapterNumber: number;
    title: string;
    publishedAt: string;
  };
}

// Manga Detail (includes chapters)
export interface MangaDetail extends Manga {
  chapters: ChapterSummary[];
}

// Chapter Types
export interface ChapterSummary {
  id: string;
  chapterNumber: number;
  title: string;
  slug: string;
  totalImages: number;
  totalViews: number;
  publishedAt: string;
  createdAt?: string;
}

export interface Chapter {
  id: string;
  chapterId: string | null;
  mangaId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  images: string[];
  totalImages: number;
  status: string;
  totalViews: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  manga: {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  avatar?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string | null;
}

// Auth Types
export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// Bookmark Types
export interface Bookmark {
  id: string;
  userId: string;
  mangaId: string;
  createdAt: string;
  updatedAt: string;
  manga: Manga;
}

export interface BookmarkCheckResponse {
  isBookmarked: boolean;
  bookmarkId?: string;
}

// Reading History Types
export interface ReadingHistory {
  id: string;
  userId: string;
  mangaId: string;
  chapterId: string;
  currentPage: number;
  totalPages: number;
  progressPercent: number;
  isCompleted: boolean;
  lastReadAt: string;
  createdAt: string;
  manga: Manga;
  chapter: ChapterSummary;
}

export interface ReadingProgress {
  lastRead: {
    id: string;
    userId: string;
    mangaId: string;
    chapterId: string;
    currentPage: number;
    totalPages: number;
    progressPercent: number;
    isCompleted: boolean;
    lastReadAt: string;
    createdAt: string;
    chapter: ChapterSummary;
  };
  totalChapters: number;
  readChapters: number;
  progressPercent: number;
  allHistory: Array<{
    id: string;
    userId: string;
    mangaId: string;
    chapterId: string;
    currentPage: number;
    totalPages: number;
    progressPercent: number;
    isCompleted: boolean;
    lastReadAt: string;
    createdAt: string;
    chapter: ChapterSummary;
  }>;
}

export interface SaveProgressPayload {
  currentPage: number;
  totalPages: number;
  isCompleted: boolean;
}

// Query Params
export interface MangaQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED';
  genres?: string; // slug
  author?: string; // slug
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  order?: 'asc' | 'desc';
}

