import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export const MainLayout = ({ children, showHeader = true }: MainLayoutProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {children}
      </View>
    </SafeAreaView>
  );
};
