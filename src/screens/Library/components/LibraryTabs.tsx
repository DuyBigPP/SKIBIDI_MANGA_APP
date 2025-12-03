import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BookOpen, Heart, History } from 'lucide-react-native';

type TabType = 'reading' | 'bookmarks' | 'history';

interface LibraryTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'reading' as TabType, label: 'Đang đọc', icon: BookOpen },
  { id: 'bookmarks' as TabType, label: 'Yêu thích', icon: Heart },
  { id: 'history' as TabType, label: 'Lịch sử', icon: History },
];

export const LibraryTabs: React.FC<LibraryTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View className="flex-row mb-6 bg-muted rounded-2xl p-1.5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            className={`flex-1 py-3 rounded-xl flex-row items-center justify-center ${
              isActive ? 'bg-primary' : ''
            }`}
            activeOpacity={0.7}
          >
            <Icon 
              size={16} 
              color={isActive ? '#FAFAFA' : '#71717A'} 
              fill={isActive && tab.id === 'bookmarks' ? '#FAFAFA' : 'transparent'}
            />
            <Text
              className={`ml-1.5 font-semibold text-sm ${
                isActive ? 'text-white' : 'text-muted-foreground'
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
