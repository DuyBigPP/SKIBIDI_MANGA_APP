import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorMessageProps {
  error: string;
  loading: boolean;
  refreshing: boolean;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  error, 
  loading, 
  refreshing, 
  onRetry 
}) => {
  const isServerBusy = error.includes('Server đang bận');

  return (
    <View className="bg-destructive/20 border border-destructive/30 rounded-xl p-4 mb-6">
      <Text className="text-destructive font-semibold mb-1">
        {isServerBusy ? '⏱️ Server đang bậnn' : '⚠️ Không thể kết nối'}
      </Text>
      <Text className="text-destructive/80 text-sm mb-3">{error}</Text>
      <TouchableOpacity
        onPress={() => {
          // Add delay for rate limit errors
          if (isServerBusy) {
            setTimeout(() => onRetry(), 2000);
          } else {
            onRetry();
          }
        }}
        className="bg-destructive rounded-lg px-4 py-2 self-start"
        disabled={loading || refreshing}
      >
        <Text className="text-white font-semibold">
          {loading || refreshing ? 'Đang tải...' : 'Thử lại'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
