/**
 * Root Navigator - Main navigation controller
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreen } from '../screens/Auth/AuthScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { BrowseScreen } from '../screens/Browse/BrowseScreen';
import { LibraryScreen } from '../screens/Library/LibraryScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { EditProfileScreen } from '../screens/Profile/EditProfileScreen';
import { MangaDetailScreen } from '../screens/MangaDetail/MangaDetailScreen';
import { ReaderScreen } from '../screens/Reader/ReaderScreen';
import { BottomTabBar } from '../components/BottomTabBar';
import { useAuth } from '../contexts/AuthContext';

type Screen =
  | 'auth'
  | 'home'
  | 'browse'
  | 'library'
  | 'profile'
  | 'editProfile'
  | 'mangaDetail'
  | 'reader';

type NavigationState = {
  screen: Screen;
  params?: any;
};

export const RootNavigator: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    screen: 'home',
  });
  const [navigationHistory, setNavigationHistory] = useState<NavigationState[]>([]);

  const navigate = (screen: Screen, params?: any) => {
    setNavigationHistory((prev) => [...prev, navigationState]);
    setNavigationState({ screen, params });
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const previous = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((prev) => prev.slice(0, -1));
      setNavigationState(previous);
    }
  };

  const navigateToTab = (tab: 'home' | 'browse' | 'library' | 'profile') => {
    setNavigationHistory([]);
    setNavigationState({ screen: tab });
  };

  if (authLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <View className="flex-1 items-center justify-center">
          {/* You can add a splash screen or loading indicator here */}
        </View>
      </SafeAreaView>
    );
  }

  // Full screen screens (no tab bar)
  if (navigationState.screen === 'auth') {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
        <AuthScreen
          onAuthSuccess={() => setNavigationState({ screen: 'home' })}
        />
      </SafeAreaView>
    );
  }

  if (navigationState.screen === 'editProfile') {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
        <EditProfileScreen
          onBack={goBack}
        />
      </SafeAreaView>
    );
  }

  if (navigationState.screen === 'mangaDetail') {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
        <MangaDetailScreen
          slug={navigationState.params?.slug}
          onChapterPress={(chapterSlug) => navigate('reader', { chapterSlug })}
          onBack={goBack}
        />
      </SafeAreaView>
    );
  }

  if (navigationState.screen === 'reader') {
    return (
      <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom']}>
        <ReaderScreen
          chapterSlug={navigationState.params?.chapterSlug}
          onBack={goBack}
        />
      </SafeAreaView>
    );
  }

  // Tab screens (with tab bar)
  const renderScreen = () => {
    switch (navigationState.screen) {
      case 'home':
        return (
          <HomeScreen
            onMangaPress={(slug) => navigate('mangaDetail', { slug })}
          />
        );
      case 'browse':
        return (
          <BrowseScreen
            onMangaPress={(slug) => navigate('mangaDetail', { slug })}
          />
        );
      case 'library':
        return (
          <LibraryScreen
            onMangaPress={(slug) => navigate('mangaDetail', { slug })}
            onChapterPress={(chapterSlug) => navigate('reader', { chapterSlug })}
            onLoginPress={() => navigate('auth')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onLoginPress={() => navigate('auth')}
            onEditPress={() => navigate('editProfile')}
          />
        );
      default:
        return (
          <HomeScreen
            onMangaPress={(slug) => navigate('mangaDetail', { slug })}
          />
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1">
        {renderScreen()}
      </View>
      <BottomTabBar
        activeTab={navigationState.screen as any}
        onTabChange={(tab) => navigateToTab(tab as any)}
      />
    </SafeAreaView>
  );
};

