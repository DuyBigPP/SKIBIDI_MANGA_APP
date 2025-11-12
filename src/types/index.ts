// Types cho app manga
export interface Manga {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  description: string;
  genres: string[];
  rating: number;
  chapters: number;
  status: 'ongoing' | 'completed' | 'hiatus';
}

export interface Chapter {
  id: string;
  mangaId: string;
  chapterNumber: number;
  title: string;
  releaseDate: string;
  pages: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
  readingHistory: ReadingHistory[];
}

export interface ReadingHistory {
  mangaId: string;
  chapterId: string;
  lastPage: number;
  timestamp: string;
}

// Navigation types
export type RootStackParamList = {
  MainTabs: undefined;
  MangaDetail: { mangaId: string };
  Reader: { mangaId: string; chapterId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Browse: undefined;
  Library: undefined;
  Profile: undefined;
};
