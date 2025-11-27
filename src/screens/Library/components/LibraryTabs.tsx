import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type TabType = 'reading' | 'bookmarks' | 'history';

interface LibraryTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const LibraryTabs: React.FC<LibraryTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View className="flex-row mb-6 bg-muted rounded-xl p-1">
      <TouchableOpacity
        onPress={() => onTabChange('reading')}
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
        onPress={() => onTabChange('bookmarks')}
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
        onPress={() => onTabChange('history')}
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
  );
};
