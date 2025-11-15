/**
 * Reader Screen - Chapter reading interface
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Chapter } from '../../types/api.types';
import { chapterService, readingHistoryService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useReading } from '../../contexts/ReadingContext';
import { Feather } from '@expo/vector-icons';

interface ReaderScreenProps {
  chapterSlug: string;
  onBack: () => void;
}

export const ReaderScreen: React.FC<ReaderScreenProps> = ({
  chapterSlug,
  onBack,
}) => {
  const { isAuthenticated } = useAuth();
  const { refresh: refreshContinueReading } = useReading();
  const { width: screenWidth } = useWindowDimensions();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [allChapters, setAllChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageDimensions, setImageDimensions] = useState<Record<number, { width: number; height: number }>>({});
  const [showChapterDropdown, setShowChapterDropdown] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentPageRef = useRef(1);
  const savedPageRef = useRef<number | null>(null);
  const hasScrolledToSavedPage = useRef(false);
  const isSavingRef = useRef(false);

  const loadChapter = () => {
    loadChapterBySlug(chapterSlug);
  };

  useEffect(() => {
    loadChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterSlug]);

  // Update ref when page changes
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  // unmount => save progress
  useEffect(() => {
    return () => {
      if (chapter && isAuthenticated && currentPageRef.current > 0) {
        saveProgress();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, isAuthenticated]);

  const handleBack = () => {
    if (chapter && isAuthenticated && currentPageRef.current > 0) {
      saveProgress().then(() => {
        refreshContinueReading();
      });
    }
    onBack();
  };

  const loadChapterBySlug = async (slug: string) => {
    try {
      setLoading(true);
      hasScrolledToSavedPage.current = false;
      savedPageRef.current = null;
      setImageDimensions({});
      const response = await chapterService.getBySlug(slug);
      
      if (response.success && response.data) {
        setChapter(response.data);

        // Load all chapters for navigation
        try {
          const chaptersResponse = await chapterService.getByMangaId(response.data.manga.id, {
            sortBy: 'chapterNumber',
            order: 'desc',
          });
          if (chaptersResponse.success) {
            setAllChapters(chaptersResponse.data);
          }
        } catch (error) {
          console.error('Failed to load chapters list:', error);
        }

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

  const handleContentSizeChange = (width: number, height: number) => {
    // content ready - scroll to saved page
    if (savedPageRef.current && !hasScrolledToSavedPage.current && chapter) {
      // Estimate scroll position based on page ratio
      const pageRatio = (savedPageRef.current - 1) / Math.max(1, chapter.totalImages - 1);
      const scrollY = pageRatio * height;
      
      // Scroll with slight delay to ensure images are laid out
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: scrollY,
          animated: false,
        });
      }, 100);
      hasScrolledToSavedPage.current = true;
    }
  };

  const saveProgress = async () => {
    if (!chapter || !isAuthenticated || isSavingRef.current) return;

    try {
      isSavingRef.current = true;
      await readingHistoryService.saveProgress(chapter.id, {
        currentPage: currentPageRef.current,
        totalPages: chapter.totalImages,
        isCompleted: currentPageRef.current === chapter.totalImages,
      });
      // Alert.alert('success', chapter.id.toString() + ' ' + currentPage.toString());
    } catch (error) {
      console.error('Failed to save progress:', error);
    } finally {
      isSavingRef.current = false;
    }
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Show/hide scroll to top button
    setShowScrollTop(scrollY > layoutHeight);

    // Calculate current page based on scroll position (middle of viewport)
    if (chapter) {
      const viewportMiddle = scrollY + (layoutHeight / 2);
      // Simple estimation: assume images are evenly distributed
      const estimatedPage = Math.floor((viewportMiddle / event.nativeEvent.contentSize.height) * chapter.images.length) + 1;
      setCurrentPage(Math.max(1, Math.min(estimatedPage, chapter.totalImages)));
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const getCurrentChapterIndex = () => {
    return allChapters.findIndex(ch => ch.id === chapter?.id);
  };

  const hasNextChapter = () => {
    const currentIndex = getCurrentChapterIndex();
    return currentIndex > 0; // Chapters are sorted desc, so next is lower index
  };

  const hasPreviousChapter = () => {
    const currentIndex = getCurrentChapterIndex();
    return currentIndex >= 0 && currentIndex < allChapters.length - 1;
  };

  const goToNextChapter = async () => {
    const currentIndex = getCurrentChapterIndex();
    if (currentIndex > 0) {
      // Save progress before switching
      if (chapter && isAuthenticated && currentPageRef.current > 0) {
        await saveProgress();
      }
      const nextChapter = allChapters[currentIndex - 1];
      // Reload with new slug
      setChapter(null);
      setLoading(true);
      setCurrentPage(1);
      currentPageRef.current = 1;
      // Trigger loadChapter with new slug by updating the chapterSlug
      loadChapterBySlug(nextChapter.slug);
    }
  };

  const goToPreviousChapter = async () => {
    const currentIndex = getCurrentChapterIndex();
    if (currentIndex < allChapters.length - 1) {
      // Save progress before switching
      if (chapter && isAuthenticated && currentPageRef.current > 0) {
        await saveProgress();
      }
      const prevChapter = allChapters[currentIndex + 1];
      // Reload with new slug
      setChapter(null);
      setLoading(true);
      setCurrentPage(1);
      currentPageRef.current = 1;
      // Trigger loadChapter with new slug by updating the chapterSlug
      loadChapterBySlug(prevChapter.slug);
    }
  };

  const goToChapter = async (targetSlug: string) => {
    setShowChapterDropdown(false);
    // Don't reload if already on this chapter
    if (targetSlug === chapter?.slug) return;
    
    // Save progress before switching
    if (chapter && isAuthenticated && currentPageRef.current > 0) {
      await saveProgress();
    }
    // Reload with new slug
    setChapter(null);
    setLoading(true);
    setCurrentPage(1);
    currentPageRef.current = 1;
    loadChapterBySlug(targetSlug);
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
        <TouchableOpacity onPress={handleBack} className="bg-primary rounded-xl px-6 py-3">
          <Text className="text-primary-foreground font-semibold">Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Header with Chapter Dropdown */}
      <View className="absolute top-0 left-0 right-0 z-20 bg-black/80">
        <View className="p-4 flex-row items-center">
          <TouchableOpacity onPress={handleBack} className="mr-3">
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 flex-row items-center"
            onPress={() => setShowChapterDropdown(!showChapterDropdown)}
          >
            <View className="flex-1">
              <Text className="text-white font-bold" numberOfLines={1}>
                {chapter.manga.title}
              </Text>
              <Text className="text-gray-400 text-sm">
                Chapter {chapter.chapterNumber}
                {chapter.title && `: ${chapter.title}`}
              </Text>
            </View>
            <Feather name={showChapterDropdown ? "chevron-up" : "chevron-down"} size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-sm ml-3">
            {allChapters.length - getCurrentChapterIndex()} / {allChapters.length}
          </Text>
        </View>

        {/* Chapter Dropdown */}
        {showChapterDropdown && (
          <ScrollView 
            className="bg-black/95 max-h-80 border-t border-gray-700"
            showsVerticalScrollIndicator={true}
          >
            {allChapters.map((ch) => (
              <TouchableOpacity
                key={ch.id}
                onPress={() => goToChapter(ch.slug)}
                className={`p-4 border-b border-gray-800 ${
                  ch.id === chapter.id ? 'bg-primary/20' : ''
                }`}
              >
                <Text className={`text-sm font-semibold ${
                  ch.id === chapter.id ? 'text-primary' : 'text-white'
                }`}>
                  Chapter {ch.chapterNumber}
                  {ch.title && `: ${ch.title}`}
                </Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {new Date(ch.publishedAt).toLocaleDateString('vi-VN')}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Images ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        contentContainerStyle={{ paddingTop: 70 }}
      >
        {chapter.images.map((imageUrl, index) => {
          // Get image dimensions if available, otherwise use default aspect ratio
          const imgDim = imageDimensions[index];
          const aspectRatio = imgDim ? imgDim.width / imgDim.height : 0.7;
          
          return (
            <View key={index} style={{ width: '100%' }}>
              <Image
                source={{ uri: imageUrl }}
                style={{ width: screenWidth, aspectRatio }}
                resizeMode="contain"
                onLoad={(e) => {
                  const { width, height } = e.nativeEvent.source;
                  setImageDimensions(prev => ({
                    ...prev,
                    [index]: { width, height }
                  }));
                }}
              />
            </View>
          );
        })}

        {/* End of Chapter */}
        <View className="bg-card p-8 items-center">
          {/* <Text className="text-foreground text-xl font-bold mb-2">
            Hết chương
          </Text> */}
          {/* <Text className="text-muted-foreground text-center mb-6">
            Bạn đã đọc xong Chapter {chapter.chapterNumber}
          </Text> */}
          {/* <TouchableOpacity onPress={handleBack} className="bg-primary rounded-xl px-8 py-3">
            <Text className="text-primary-foreground font-semibold">
              Quay lại
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-black/80">
        {/* Progress Bar */}
        <View className="px-2 pt-2">
          <View className="bg-muted rounded-full h-1">
            <View
              className="bg-primary rounded-full h-1"
              style={{
                width: `${(currentPage / chapter.totalImages) * 100}%`,
              }}
            />
          </View>
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row items-center justify-between p-3">
          <TouchableOpacity
            onPress={goToPreviousChapter}
            disabled={!hasPreviousChapter()}
            className={`flex-row items-center px-4 py-2 rounded-lg ${
              hasPreviousChapter() ? 'bg-primary' : 'bg-gray-700'
            }`}
          >
            <Feather name="chevron-left" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-1">Trước</Text>
          </TouchableOpacity>

          <Text className="text-gray-400 text-sm">
            {currentPage}/{chapter.totalImages}
          </Text>

          <TouchableOpacity
            onPress={goToNextChapter}
            disabled={!hasNextChapter()}
            className={`flex-row items-center px-4 py-2 rounded-lg ${
              hasNextChapter() ? 'bg-primary' : 'bg-gray-700'
            }`}
          >
            <Text className="text-white font-semibold mr-1">Tiếp</Text>
            <Feather name="chevron-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <TouchableOpacity
          onPress={scrollToTop}
          className="absolute right-4 bottom-24 bg-primary rounded-full p-3 shadow-lg"
          style={{ elevation: 5 }}
        >
          <Feather name="arrow-up" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

