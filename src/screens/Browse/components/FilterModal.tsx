import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RefreshCw, Check, Pause, X, Flame, Sparkles, Type, FileText, Theater } from 'lucide-react-native';
import { Genre } from '../../../types/api.types';

type SortOption = 'updatedAt' | 'createdAt' | 'title';
type StatusOption = 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED' | null;

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  sortBy: SortOption;
  selectedStatus: StatusOption;
  selectedGenre: string | null;
  genres: Genre[];
  genresLoading: boolean;
  onSortChange: (sort: SortOption) => void;
  onStatusChange: (status: StatusOption) => void;
  onGenreChange: (genreSlug: string | null) => void;
  onClearFilters: () => void;
}

const sortOptions: { value: SortOption; label: string; iconComponent: React.ComponentType<any> }[] = [
  { value: 'updatedAt', label: 'Mới cập nhật', iconComponent: Flame },
  { value: 'createdAt', label: 'Mới thêm', iconComponent: Sparkles },
  { value: 'title', label: 'Tên A-Z', iconComponent: Type },
];

const statusOptions: { value: StatusOption; label: string; iconComponent: React.ComponentType<any> }[] = [
  { value: 'ONGOING', label: 'Đang ra', iconComponent: RefreshCw },
  { value: 'COMPLETED', label: 'Hoàn thành', iconComponent: Check },
  { value: 'HIATUS', label: 'Tạm ngưng', iconComponent: Pause },
  { value: 'CANCELLED', label: 'Đã hủy', iconComponent: X },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  sortBy,
  selectedStatus,
  selectedGenre,
  genres,
  genresLoading,
  onSortChange,
  onStatusChange,
  onGenreChange,
  onClearFilters,
}) => {
  const handleSortSelect = (sort: SortOption) => {
    onSortChange(sort);
    onClose();
  };

  const handleStatusSelect = (status: StatusOption) => {
    onStatusChange(status);
    onClose();
  };

  const handleGenreSelect = (genreSlug: string | null) => {
    onGenreChange(genreSlug);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-background rounded-t-3xl max-h-[80%]">
          {/* Modal Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <Text className="text-xl font-bold text-foreground">Bộ lọc</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#F8FAFC" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4">
            {/* Sort Section */}
            <View className="mb-6">
              <Text className="text-base font-bold text-foreground mb-3">Sắp xếp</Text>
              {sortOptions.map((option) => {
                const IconComponent = option.iconComponent;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSortSelect(option.value)}
                    className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                      sortBy === option.value ? 'bg-primary' : 'bg-card border border-border'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <IconComponent size={24} color={sortBy === option.value ? '#F8FAFC' : '#8B5CF6'} strokeWidth={2} />
                      <Text
                        className={`font-semibold ml-3 ${
                          sortBy === option.value ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {sortBy === option.value && (
                      <Feather name="check" size={20} color="#F8FAFC" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Status Section */}
            <View className="mb-6">
              <Text className="text-base font-bold text-foreground mb-3">Trạng thái</Text>
              <TouchableOpacity
                onPress={() => handleStatusSelect(null)}
                className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                  !selectedStatus ? 'bg-primary' : 'bg-card border border-border'
                }`}
              >
                <View className="flex-row items-center">
                  <FileText size={24} color={!selectedStatus ? '#F8FAFC' : '#8B5CF6'} strokeWidth={2} />
                  <Text
                    className={`font-semibold ml-3 ${
                      !selectedStatus ? 'text-primary-foreground' : 'text-foreground'
                    }`}
                  >
                    Tất cả
                  </Text>
                </View>
                {!selectedStatus && <Feather name="check" size={20} color="#F8FAFC" />}
              </TouchableOpacity>
              {statusOptions.map((option) => {
                const IconComponent = option.iconComponent;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleStatusSelect(option.value)}
                    className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                      selectedStatus === option.value ? 'bg-primary' : 'bg-card border border-border'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <IconComponent size={24} color={selectedStatus === option.value ? '#F8FAFC' : '#8B5CF6'} strokeWidth={2} />
                      <Text
                        className={`font-semibold ml-3 ${
                          selectedStatus === option.value ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {selectedStatus === option.value && (
                      <Feather name="check" size={20} color="#F8FAFC" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Genre Section */}
            <View className="mb-6">
              <Text className="text-base font-bold text-foreground mb-3">Thể loại</Text>
              {genresLoading ? (
                <ActivityIndicator color="#8B5CF6" />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => handleGenreSelect(null)}
                    className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                      !selectedGenre ? 'bg-primary' : 'bg-card border border-border'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Theater size={24} color={!selectedGenre ? '#F8FAFC' : '#8B5CF6'} strokeWidth={2} />
                      <Text
                        className={`font-semibold ml-3 ${
                          !selectedGenre ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        Tất cả
                      </Text>
                    </View>
                    {!selectedGenre && <Feather name="check" size={20} color="#F8FAFC" />}
                  </TouchableOpacity>
                  <ScrollView className="max-h-80">
                    <View className="flex-row flex-wrap">
                      {genres.map((genre) => (
                        <TouchableOpacity
                          key={genre.id}
                          onPress={() => handleGenreSelect(genre.slug)}
                          className={`rounded-full px-4 py-2 mr-2 mb-2 ${
                            selectedGenre === genre.slug
                              ? 'bg-primary border border-primary'
                              : 'bg-card border border-border'
                          }`}
                        >
                          <Text
                            className={`text-sm font-semibold ${
                              selectedGenre === genre.slug ? 'text-primary-foreground' : 'text-foreground'
                            }`}
                          >
                            {genre.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </>
              )}
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View className="p-4 border-t border-border flex-row">
            <TouchableOpacity
              onPress={() => {
                onClearFilters();
                onClose();
              }}
              className="flex-1 bg-card border border-border rounded-xl p-4 mr-2"
            >
              <Text className="text-foreground font-semibold text-center">Xóa bộ lọc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-primary rounded-xl p-4"
            >
              <Text className="text-primary-foreground font-semibold text-center">Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
