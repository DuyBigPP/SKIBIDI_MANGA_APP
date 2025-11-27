/**
 * Reader Screen - Chapter reading interface
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Chapter } from '../../types/api.types';
import { chapterService, readingHistoryService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useReading } from '../../contexts/ReadingContext';
import { LoadingView, NotFoundView } from '../../components';
import {
  ReaderHeader,
  ImageList,
  EndOfChapter,
  BottomNavigation,
  ScrollToTopButton,
} from './components';

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
    return <LoadingView message="Đang tải chương..." backgroundColor="black" />;
  }

  if (!chapter) {
    return <NotFoundView message="Không tìm thấy chương" onBack={handleBack} />;
  }

  return (
    <View className="flex-1 bg-black">
      <ReaderHeader
        mangaTitle={chapter.manga.title}
        chapterNumber={chapter.chapterNumber}
        chapterTitle={chapter.title}
        currentChapterIndex={getCurrentChapterIndex()}
        totalChapters={allChapters.length}
        showDropdown={showChapterDropdown}
        chapters={allChapters}
        currentChapterId={chapter.id}
        onBack={handleBack}
        onToggleDropdown={() => setShowChapterDropdown(!showChapterDropdown)}
        onSelectChapter={goToChapter}
      />

      {/* Images ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        contentContainerStyle={{ paddingTop: 70 }}
      >
        <ImageList
          images={chapter.images}
          imageDimensions={imageDimensions}
          onImageLoad={(index, width, height) => {
            setImageDimensions((prev) => ({
              ...prev,
              [index]: { width, height },
            }));
          }}
        />
        <EndOfChapter />
      </ScrollView>

      <BottomNavigation
        currentPage={currentPage}
        totalPages={chapter.totalImages}
        hasPrevious={hasPreviousChapter()}
        hasNext={hasNextChapter()}
        onPrevious={goToPreviousChapter}
        onNext={goToNextChapter}
      />

      <ScrollToTopButton visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
};

