/**
 * Manga Detail Screen
 */

import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { MangaDetail } from '../../types/api.types';
import { mangaService, bookmarkService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useReading } from '../../contexts/ReadingContext';
import { LoadingView, NotFoundView } from '../../components';
import {
  MangaDetailHeader,
  CoverImage,
  TitleSection,
  StatsCard,
  ContinueReadingButton,
  AuthorsSection,
  GenresSection,
  DescriptionSection,
  ChaptersList,
} from './components';

interface MangaDetailScreenProps {
  slug: string;
  onChapterPress: (chapterSlug: string) => void;
  onAuthorPress?: (slug: string, name: string) => void;
  onGenrePress?: (slug: string, name: string) => void;
  onBack: () => void;
}

export const MangaDetailScreen: React.FC<MangaDetailScreenProps> = ({
  slug,
  onChapterPress,
  onAuthorPress,
  onGenrePress,
  onBack,
}) => {
  const { isAuthenticated } = useAuth();
  const { getReading, loading: continueReadingLoading } = useReading();
  const [manga, setManga] = useState<MangaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const continueReading = getReading(slug);

  useEffect(() => {
    loadMangaDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, isAuthenticated]);

  const loadMangaDetail = async () => {
    try {
      setLoading(true);
      const response = await mangaService.getBySlug(slug);
      
      if (response.success && response.data) {
        setManga(response.data);
        
        // Check bookmark status if authenticated
        if (isAuthenticated) {
          checkBookmark(response.data.id);
        }
      }
    } catch (error: any) {
      Alert.alert('Lỗi', 'Không thể tải thông tin manga');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkBookmark = async (mangaId: string) => {
    try {
      const response = await bookmarkService.check(mangaId);
      if (response.success) {
        setIsBookmarked(response.data.isBookmarked);
      }
    } catch (error) {
      console.error('Failed to check bookmark:', error);
    }
  };

  const handleToggleBookmark = async () => {
    if (!isAuthenticated) {
      Alert.alert('Thông báo', 'Bạn cần đăng nhập để sử dụng tính năng này');
      return;
    }

    if (!manga) return;

    setBookmarkLoading(true);
    try {
      const response = await bookmarkService.toggle(manga.id);
      if (response.success) {
        setIsBookmarked(response.data.isBookmarked);
        Alert.alert(
          'Thành công',
          response.data.action === 'added'
            ? 'Đã thêm vào yêu thích'
            : 'Đã xóa khỏi yêu thích'
        );
      }
    } catch (error: any) {
      Alert.alert('Lỗi', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (loading) {
    return <LoadingView />;
  }

  if (!manga) {
    return <NotFoundView message="Không tìm thấy manga" onBack={onBack} />;
  }

  return (
    <View className="flex-1 bg-background">
      <MangaDetailHeader title={manga.title} onBack={onBack} />

      <ScrollView className="flex-1">
        <CoverImage uri={manga.coverImage || manga.thumbnail} />

        <View className="px-4">
          <TitleSection
            title={manga.title}
            status={manga.status}
            isBookmarked={isBookmarked}
            bookmarkLoading={bookmarkLoading}
            onBookmarkPress={handleToggleBookmark}
          />

          <StatsCard totalChapters={manga.totalChapters} totalViews={manga.totalViews} />

          {isAuthenticated && (
            <ContinueReadingButton
              continueReading={continueReading}
              loading={continueReadingLoading}
              onPress={onChapterPress}
            />
          )}

          <AuthorsSection authors={manga.authors} onAuthorPress={onAuthorPress} />

          <GenresSection genres={manga.genres} onGenrePress={onGenrePress} />

          <DescriptionSection description={manga.description} />

          <ChaptersList
            chapters={manga.chapters}
            totalChapters={manga.totalChapters}
            onChapterPress={onChapterPress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

