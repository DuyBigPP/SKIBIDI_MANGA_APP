/**
 * Manga Detail Screen
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MangaDetail, ChapterSummary } from '../../types/api.types';
import { mangaService, bookmarkService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useReading } from '../../contexts/ReadingContext';
import { Feather } from '@expo/vector-icons';
import { Heart } from 'lucide-react-native';
import { SafeImage } from '../../components/SafeImage';

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
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text className="text-muted-foreground mt-4">Đang tải...</Text>
      </View>
    );
  }

  if (!manga) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-4">
        <Text className="text-foreground text-lg mb-4">Không tìm thấy manga</Text>
        <TouchableOpacity onPress={onBack} className="bg-primary rounded-xl px-6 py-3">
          <Text className="text-primary-foreground font-semibold">Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const statusColors = {
    ONGOING: 'bg-green-500',
    COMPLETED: 'bg-blue-500',
    HIATUS: 'bg-yellow-500',
    CANCELLED: 'bg-red-500',
  };

  const statusText = {
    ONGOING: 'Đang tiến hành',
    COMPLETED: 'Hoàn thành',
    HIATUS: 'Tạm ngưng',
    CANCELLED: 'Đã hủy',
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-card border-b border-border p-4 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Feather name="arrow-left" size={24} color="#E2E8F0" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground flex-1" numberOfLines={1}>
          {manga.title}
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Cover Image */}
        <View className="relative">
          <SafeImage
            uri={manga.coverImage || manga.thumbnail}
            className="w-full h-96"
            resizeMode="cover"
            showLoadingIndicator={false}
          />
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-32" />
        </View>

        <View className="px-4">
          {/* Title & Status */}
          <View className="flex-row items-start justify-between mb-4 -mt-8 relative z-10">
            <View className="flex-1 mr-4">
              <Text className="text-2xl font-bold text-foreground mb-2">
                {manga.title}
              </Text>
              <View className={`${statusColors[manga.status]} rounded-full px-3 py-1 self-start`}>
                <Text className="text-white text-xs font-semibold">
                  {statusText[manga.status]}
                </Text>
              </View>
            </View>

            {/* Bookmark Button */}
            <TouchableOpacity
              onPress={handleToggleBookmark}
              disabled={bookmarkLoading}
              className={`rounded-full p-3 ${isBookmarked ? 'bg-red-500' : 'bg-primary'}`}
            >
              {bookmarkLoading ? (
                <ActivityIndicator size="small" color="#F8FAFC" />
              ) : (
                <Heart size={24} color="#F8FAFC" fill={isBookmarked ? '#F8FAFC' : 'transparent'} strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View className="flex-row items-center bg-card rounded-xl p-4 mb-4">
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-foreground">
                {manga.totalChapters}
              </Text>
              <Text className="text-muted-foreground text-xs">Chương</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-lg font-bold text-foreground">
                {manga.totalViews}
              </Text>
              <Text className="text-muted-foreground text-xs">Lượt xem</Text>
            </View>
          </View>

          {/* Continue Reading */}
          {isAuthenticated && continueReading && !continueReadingLoading && (
            <TouchableOpacity
              onPress={() => onChapterPress(continueReading.chapter.slug)}
              className="bg-primary rounded-xl px-4 p-2 mb-2 flex-row items-center justify-between"
            >
              <View className="flex-1">
                <Text className="text-primary-foreground font-bold text-base">
                  Tiếp tục đọc
                </Text>
                <Text className="text-primary-foreground/80 text-sm">
                  {continueReading.chapter.title}
                </Text>
                <Text className="text-primary-foreground/60 text-xs mt-1">
                  Trang {continueReading.currentPage}/{continueReading.totalPages} • {continueReading.progressPercent}%
                </Text>
              </View>
              <View className="bg-primary-foreground/20 rounded-full p-2">
                <Feather name="play-circle" size={24} color="#F8FAFC" />
              </View>
            </TouchableOpacity>
          )}

          {continueReadingLoading && (
            <View className="bg-card rounded-xl p-4 mb-4 items-center justify-center">
              <ActivityIndicator size="small" color="#8B5CF6" />
            </View>
          )}

          {/* Authors */}
          {manga.authors.length > 0 && (
            <View className="mb-4">
              <Text className="text-sm font-semibold text-muted-foreground mb-2">
                Tác giả
              </Text>
              <View className="flex-row flex-wrap">
                {manga.authors.map((author) => (
                  <TouchableOpacity
                    key={author.id}
                    onPress={() => onAuthorPress?.(author.slug, author.name)}
                    className="bg-card rounded-full px-3 py-1 mr-2 mb-2 border border-border"
                  >
                    <Text className="text-foreground text-sm">{author.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Genres */}
          {manga.genres.length > 0 && (
            <View className="mb-4">
              <Text className="text-sm font-semibold text-muted-foreground mb-2">
                Thể loại
              </Text>
              <View className="flex-row flex-wrap">
                {manga.genres.map((genre) => (
                  <TouchableOpacity
                    key={genre.id}
                    onPress={() => onGenrePress?.(genre.slug, genre.name)}
                    className="bg-primary/20 border border-primary/30 rounded-full px-3 py-1 mr-2 mb-2"
                  >
                    <Text className="text-primary text-sm">{genre.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-muted-foreground mb-2">
              Mô tả
            </Text>
            <Text className="text-foreground leading-6">{manga.description}</Text>
          </View>

          {/* Chapters List */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-foreground">
                Danh sách chương ({manga.totalChapters})
              </Text>
            </View>

            {manga.chapters && manga.chapters.length > 0 ? (
              manga.chapters.map((chapter: ChapterSummary) => (
                <TouchableOpacity
                  key={chapter.id}
                  onPress={() => onChapterPress(chapter.slug)}
                  className="bg-card rounded-xl p-4 mb-2 flex-row items-center justify-between"
                >
                  <View className="flex-1">
                    <Text className="text-foreground font-semibold mb-1">
                      {/* tempfix */}
                      {/* Chapter {chapter.chapterNumber} */}
                      {/* {chapter.title && `: ${chapter.title}`} */}
                      {chapter.title}
                    </Text>
                    <Text className="text-muted-foreground text-xs">
                      {new Date(chapter.publishedAt).toLocaleDateString('vi-VN')}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#94A3B8" />
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-muted-foreground text-center py-8">
                Chưa có chương nào
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

