import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ReadingHistory } from '../types/api.types';
import { readingHistoryService } from '../services/api';
import { useAuth } from './AuthContext';

interface ReadingContextType {
  readingList: ReadingHistory[];
  loading: boolean;
  refresh: () => Promise<void>;
  getReading: (slug: string) => ReadingHistory | null;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export const ReadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [readingList, setReadingList] = useState<ReadingHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const loadReading = useCallback(async () => {
    if (!isAuthenticated) {
      setReadingList([]);
      return;
    }

    try {
      setLoading(true);
      const response = await readingHistoryService.getContinueReading();
      
      if (response.success && response.data) {
        setReadingList(response.data);
      }
    } catch (error) {
      console.error('Failed to load continue reading:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const refresh = useCallback(async () => {
    await loadReading();
  }, [loadReading]);

  const getReading = useCallback((slug: string): ReadingHistory | null => {
    return readingList.find((history) => history.manga.slug === slug) || null;
  }, [readingList]);

  useEffect(() => {
    if (isAuthenticated) {
      loadReading();
    } else {
      setReadingList([]);
    }
  }, [isAuthenticated, loadReading]);

  return (
    <ReadingContext.Provider
      value={{
        readingList,
        loading,
        refresh,
        getReading,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export const useReading = () => {
  const context = useContext(ReadingContext);
  if (context === undefined) {
    throw new Error('useReading must be used within a ReadingProvider');
  }
  return context;
};
