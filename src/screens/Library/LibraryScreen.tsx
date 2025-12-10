/**
 * Library Screen - User's bookmarks and reading history
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Bookmark, ReadingHistory } from '../../types/api.types';
import { bookmarkService, readingHistoryService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useReading } from '../../contexts/ReadingContext';
import { UnauthenticatedView } from '../../components';
import {
  LibraryHeader,
  LibraryTabs,
  ReadingTab,
  BookmarksTab,
  HistoryTab,
} from './components';

interface LibraryScreenProps {
  onMangaPress: (slug: string) => void;
  onChapterPress: (chapterSlug: string) => void;
  onLoginPress: () => void;
}

type TabType = 'reading' | 'bookmarks' | 'history';

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  onMangaPress,
  onChapterPress,
  onLoginPress,
}) => {
  const { isAuthenticated } = useAuth();
  const { readingList, loading: continueReadingLoading, refresh: refreshContinueReading } = useReading();
  const [activeTab, setActiveTab] = useState<TabType>('reading');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [history, setHistory] = useState<ReadingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadedTabs, setLoadedTabs] = useState<Set<TabType>>(new Set());

  useEffect(() => {
    if (isAuthenticated && !loadedTabs.has(activeTab)) {
      loadLibraryData();
    } else if (!isAuthenticated) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, activeTab]);

  const handleClearHistory = () => {
    Alert.alert(
      'Xóa lịch sử đọc truyện',
      'Bạn có chắc muốn xóa toàn bộ lịch sử đọc?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('Clearing reading history...');
              const response = await readingHistoryService.clearAll();
              console.log('Clear history response:', response);
              
              if (response.success) {
                // Clear local data immediately
                setHistory([]);
                setLoadedTabs(new Set());
                await refreshContinueReading();
                
                Alert.alert('Thành công', 'Đã xóa lịch sử đọc');
                
                // Reload data
                if (activeTab === 'history') {
                  loadLibraryData();
                }
              } else {
                Alert.alert('Lỗi', response.message || 'Không thể xóa lịch sử');
              }
            } catch (err: any) {
              console.error('Failed to clear history:', err);
              Alert.alert('Lỗi', err?.message || 'Không thể xóa lịch sử');
            }
          },
        },
      ]
    );
  };

  const loadLibraryData = async () => {
    try {
      setLoading(true);

      if (activeTab === 'reading') {
        setLoading(continueReadingLoading);
      } else if (activeTab === 'bookmarks') {
        const response = await bookmarkService.getAll({ page: 1, limit: 50 });
        if (response.success) {
          setBookmarks(response.data);
        }
      } else if (activeTab === 'history') {
        const response = await readingHistoryService.getAll({ page: 1, limit: 50 });
        if (response.success) {
          setHistory(response.data);
        }
      }
      
      // Mark tab as loaded
      setLoadedTabs(prev => new Set(prev).add(activeTab));
    } catch (error) {
      console.error('Failed to load library data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (activeTab === 'reading') {
      refreshContinueReading().finally(() => setRefreshing(false));
    } else {
      loadLibraryData();
    }
  };

  if (!isAuthenticated) {
    return (
      <UnauthenticatedView
        icon="book"
        title="Đăng nhập để sử dụng thư viện"
        description="Lưu trữ manga yêu thích và lịch sử đọc của bạn"
        buttonText="Đăng nhập ngay"
        onLoginPress={onLoginPress}
      />
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8B5CF6" />}
    >
      <View className="p-4">
        <LibraryHeader />

        <LibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {loading ? (
          <View className="py-12">
            <ActivityIndicator size="large" color="#8B5CF6" />
          </View>
        ) : (
          <>
            {activeTab === 'reading' && (
              <ReadingTab readingList={readingList} onChapterPress={onChapterPress} />
            )}

            {activeTab === 'bookmarks' && (
              <BookmarksTab bookmarks={bookmarks} onMangaPress={onMangaPress} />
            )}

            {activeTab === 'history' && (
              <HistoryTab 
                history={history} 
                onMangaPress={onMangaPress} 
                onClearHistory={handleClearHistory} 
              />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

