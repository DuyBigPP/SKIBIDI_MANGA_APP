/**
 * Library Screen - User's bookmarks and reading history
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BookOpen } from 'lucide-react-native';
import { Bookmark, ReadingHistory } from '../../types/api.types';
import { bookmarkService, readingHistoryService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useReading } from '../../contexts/ReadingContext';
import { SafeImage } from '../../components/SafeImage';

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
      'Xóa lịch sử',
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
      <View className="flex-1 bg-background items-center justify-center p-8">
        <BookOpen size={64} color="#8B5CF6" strokeWidth={1.5} />
        <Text className="text-xl font-bold text-foreground text-center mb-2 mt-4">
          Đăng nhập để sử dụng thư viện
        </Text>
        <Text className="text-base text-muted-foreground text-center mb-6">
          Lưu trữ manga yêu thích và lịch sử đọc của bạn
        </Text>
        <TouchableOpacity onPress={onLoginPress} className="bg-primary rounded-xl px-8 py-3">
          <Text className="text-primary-foreground font-semibold">Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8B5CF6" />}
    >
      <View className="p-4">
        {/* Header */}
        <Text className="text-3xl font-bold text-foreground mb-6">Thư viện</Text>

        {/* Tabs */}
        <View className="flex-row mb-6 bg-muted rounded-xl p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('reading')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'reading' ? 'bg-primary' : ''
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === 'reading' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Đang đọc
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('bookmarks')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'bookmarks' ? 'bg-primary' : ''
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === 'bookmarks' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Yêu thích
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'history' ? 'bg-primary' : ''
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === 'history' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Lịch sử
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {loading ? (
          <View className="py-12">
            <ActivityIndicator size="large" color="#8B5CF6" />
          </View>
        ) : (
          <>
            {/* Continue Reading */}
            {activeTab === 'reading' && (
              <View>
                {readingList.length > 0 ? (
                  readingList.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => onChapterPress(item.chapter.slug)}
                      className="flex-row mb-4 bg-card rounded-xl p-3 border border-border"
                    >
                      <SafeImage
                        uri={item.manga.thumbnail}
                        className="bg-muted rounded-lg w-20 h-28 mr-3"
                        resizeMode="cover"
                        showLoadingIndicator={false}
                      />
                      <View className="flex-1">
                        <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
                          {item.manga.title}
                        </Text>
                        <Text className="text-muted-foreground text-sm mb-2">
                          Chapter {item.chapter.chapterNumber}
                          {item.chapter.title && `: ${item.chapter.title}`}
                        </Text>

                        {/* Progress Bar */}
                        <View className="bg-muted rounded-full h-2 mb-2">
                          <View
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${item.progressPercent}%` }}
                          />
                        </View>

                        <Text className="text-muted-foreground/70 text-xs">
                          Đã đọc {item.progressPercent}% • {new Date(item.lastReadAt).toLocaleDateString('vi-VN')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View className="py-12 items-center">
                    <Text className="text-muted-foreground text-base">
                      Chưa có manga đang đọc
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Bookmarks */}
            {activeTab === 'bookmarks' && (
              <View>
                {bookmarks.length > 0 ? (
                  <View className="flex-row flex-wrap justify-between">
                    {bookmarks.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => onMangaPress(item.manga.slug)}
                        className="w-[48%] mb-4"
                      >
                        <SafeImage
                          uri={item.manga.thumbnail}
                          className="bg-card rounded-xl h-56 mb-2 border border-border w-full"
                          resizeMode="cover"
                          showLoadingIndicator={false}
                        />
                        <Text className="font-bold text-foreground text-sm" numberOfLines={2}>
                          {item.manga.title}
                        </Text>
                        <Text className="text-muted-foreground text-xs">
                          {item.manga.totalChapters} chương
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View className="py-12 items-center">
                    <Text className="text-muted-foreground text-base">
                      Chưa có manga yêu thích
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* History */}
            {activeTab === 'history' && (
              <View>
                {history.length > 0 && (
                  <TouchableOpacity
                    onPress={handleClearHistory}
                    className="bg-destructive/20 rounded-xl p-3 mb-4 border border-destructive/30 flex-row items-center justify-center"
                  >
                    <Feather name="trash-2" size={18} color="#EF4444" />
                    <Text className="text-destructive font-semibold ml-2">
                      Xóa toàn bộ lịch sử
                    </Text>
                  </TouchableOpacity>
                )}
                {history.length > 0 ? (
                  history.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => onMangaPress(item.manga.slug)}
                      className="flex-row mb-4 bg-card rounded-xl p-3 border border-border"
                    >
                      <SafeImage
                        uri={item.manga.thumbnail}
                        className="bg-muted rounded-lg w-16 h-20 mr-3"
                        resizeMode="cover"
                        showLoadingIndicator={false}
                      />
                      <View className="flex-1">
                        <Text className="font-bold text-foreground text-base mb-1" numberOfLines={2}>
                          {item.manga.title}
                        </Text>
                        <Text className="text-muted-foreground text-sm mb-1">
                          Chapter {item.chapter.chapterNumber}
                        </Text>
                        <Text className="text-muted-foreground/70 text-xs">
                          {new Date(item.lastReadAt).toLocaleDateString('vi-VN')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View className="py-12 items-center">
                    <Text className="text-muted-foreground text-base">
                      Chưa có lịch sử đọc
                    </Text>
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

