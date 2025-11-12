import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

type IconName = 'home' | 'search' | 'book-open' | 'user';

export const BottomTabBar = ({ activeTab, onTabChange }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  
  const tabs: { id: string; icon: IconName; label: string }[] = [
    { id: 'home', icon: 'home', label: 'Trang chủ' },
    { id: 'browse', icon: 'search', label: 'Tìm kiếm' },
    { id: 'library', icon: 'book-open', label: 'Thư viện' },
    { id: 'profile', icon: 'user', label: 'Cá nhân' },
  ];

  return (
    <View 
      className="flex-row bg-card border-t border-border pt-2 px-2"
      style={{ paddingBottom: insets.bottom + 8 }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            className={`flex-1 items-center justify-center py-2 rounded-xl ${
              isActive ? 'bg-primary/20' : ''
            }`}
          >
            <Feather
              name={tab.icon}
              size={24}
              color={isActive ? '#8B5CF6' : '#94A3B8'}
            />
            <Text
              className={`text-xs font-semibold mt-1 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
