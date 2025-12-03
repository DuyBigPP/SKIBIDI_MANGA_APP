import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

type IconName = 'home' | 'compass' | 'layers' | 'user';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabChange }) => {
  const insets = useSafeAreaInsets();
  
  const tabs: { id: string; icon: IconName; label: string }[] = [
    { id: 'home', icon: 'home', label: 'Trang chủ' },
    { id: 'browse', icon: 'compass', label: 'Khám phá' },
    { id: 'library', icon: 'layers', label: 'Thư viện' },
    { id: 'profile', icon: 'user', label: 'Cá nhân' },
  ];

  return (
    <View 
      className="bg-card/95 border-t border-border/50 backdrop-blur-lg pt-2 px-2"
      style={{ paddingBottom: insets.bottom + 4 }}
    >
      <View className="flex-row">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              className="flex-1 items-center justify-center py-2"
              activeOpacity={0.7}
            >
              <View className={`items-center justify-center px-4 py-2 rounded-2xl ${
                isActive ? 'bg-primary/15' : ''
              }`}>
                <Feather
                  name={tab.icon}
                  size={22}
                  color={isActive ? '#A855F7' : '#71717A'}
                />
                <Text
                  className={`text-xs font-medium mt-1 ${
                    isActive ? 'text-primary' : 'text-zinc-500'
                  }`}
                >
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
