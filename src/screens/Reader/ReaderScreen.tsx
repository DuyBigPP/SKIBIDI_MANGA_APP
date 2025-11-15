/**
 * Reader Screen - Chapter reading interface
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Chapter } from '../../types/api.types';
import { chapterService, readingHistoryService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Feather } from '@expo/vector-icons';
import { SafeImage } from '../../components/SafeImage';

interface ReaderScreenProps {
  chapterSlug: string;
  onBack: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ReaderScreen: React.FC<ReaderScreenProps> = ({
  chapterSlug,
  onBack,
}) => {
  const { isAuthenticated } = useAuth();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentPageRef = useRef(1);
  const savedPageRef = useRef<number | null>(null);
  const hasScrolledToSavedPage = useRef(false);

  useEffect(() => {
    loadChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterSlug]);

  // Update ref when page changes
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  // unmount => save
  useEffect(() => {
    return () => {
      if (chapter && isAuthenticated && currentPageRef.current > 0) {
        saveProgress();
        Alert.alert('saved', currentPageRef.current.toString());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, isAuthenticated]);

  const loadChapter = async () => {
    try {
      setLoading(true);
      hasScrolledToSavedPage.current = false;
      savedPageRef.current = null;
      const response = await chapterService.getBySlug(chapterSlug);
      
      if (response.success && response.data) {
        setChapter(response.data);

        if (isAuthenticated) {
          await loadSavedProgress(response.data);
        }
      }
    } catch (error: any) {
      Alert.alert('Lỗi', 'Không thể tải chương');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedProgress = async (chapterData: Chapter) => {
    try {
      const response = await readingHistoryService.getProgress(chapterData.manga.id);
      
      if (response.success && response.data?.lastRead?.chapterId === chapterData.id) {
        const savedPage = response.data.lastRead.currentPage;
        savedPageRef.current = savedPage;
        setCurrentPage(savedPage);
        currentPageRef.current = savedPage;
      }
    } catch (error) {
      console.error('Failed to load saved progress:', error);
    }
  };

  const handleContentSizeChange = () => {
    // content ready
    if (savedPageRef.current && !hasScrolledToSavedPage.current && chapter) {
      const imageHeight = SCREEN_HEIGHT;
      const scrollY = (savedPageRef.current) * imageHeight;
      
      // layout already done, no setTimeout
      scrollViewRef.current?.scrollTo({
          y: scrollY,
          animated: true,
      });
      hasScrolledToSavedPage.current = true;
    }
  };

  const saveProgress = async () => {
    if (!chapter || !isAuthenticated) return;

    try {
      await readingHistoryService.saveProgress(chapter.id, {
        currentPage: currentPageRef.current,
        totalPages: chapter.totalImages,
        isCompleted: currentPageRef.current === chapter.totalImages,
      });
      // Alert.alert('success', chapter.id.toString() + ' ' + currentPage.toString());
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;

    // Calculate current page based on scroll position
    if (chapter) {
      const imageHeight = contentHeight / chapter.images.length;
      const page = Math.floor(scrollY / imageHeight) + 1;
      setCurrentPage(Math.max(1, Math.min(page, chapter.totalImages)));
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text className="text-white mt-4">Đang tải chương...</Text>
      </View>
    );
  }

  if (!chapter) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-4">
        <Text className="text-foreground text-lg mb-4">Không tìm thấy chương</Text>
        <TouchableOpacity onPress={onBack} className="bg-primary rounded-xl px-6 py-3">
          <Text className="text-primary-foreground font-semibold">Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 z-10 bg-black/80 p-4 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-white font-bold" numberOfLines={1}>
            {chapter.manga.title}
          </Text>
          <Text className="text-gray-400 text-sm">
            Chapter {chapter.chapterNumber}
            {chapter.title && `: ${chapter.title}`}
          </Text>
        </View>
        <Text className="text-white text-sm">
          {currentPage}/{chapter.totalImages}
        </Text>
      </View>

      {/* Images ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
      >
        {chapter.images.map((imageUrl, index) => (
          <View key={index} className="w-full">
            <SafeImage
              uri={imageUrl}
              style={{ width: '100%', height: SCREEN_HEIGHT }}
              resizeMode="contain"
              showLoadingIndicator={true}
            />
          </View>
        ))}

        {/* End of Chapter */}
        <View className="bg-card p-8 items-center">
          <Text className="text-foreground text-xl font-bold mb-2">
            Hết chương
          </Text>
          <Text className="text-muted-foreground text-center mb-6">
            Bạn đã đọc xong Chapter {chapter.chapterNumber}
          </Text>
          <TouchableOpacity onPress={onBack} className="bg-primary rounded-xl px-8 py-3">
            <Text className="text-primary-foreground font-semibold">
              Quay lại
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Progress Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
        <View className="bg-muted rounded-full h-1">
          <View
            className="bg-primary rounded-full h-1"
            style={{
              width: `${(currentPage / chapter.totalImages) * 100}%`,
            }}
          />
        </View>
      </View>
    </View>
  );
};

