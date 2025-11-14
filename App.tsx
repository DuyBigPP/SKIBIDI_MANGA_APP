import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';

import './global.css';

export default function App() {
  // const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   // Clear old storage data when database changed
  //   const clearOldData = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('Storage cleared - ready for new database');
  //     } catch (error) {
  //       console.error('Failed to clear storage:', error);
  //     } finally {
  //       setIsReady(true);
  //     }
  //   };

  //   clearOldData();
  // }, []);

  // if (!isReady) {
  //   return null; // Or show a splash screen
  // }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
