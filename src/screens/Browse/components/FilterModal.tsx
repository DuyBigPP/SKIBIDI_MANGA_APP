import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { X, Check, RefreshCw, Pause, Flame, Sparkles, Type, FileText, Theater } from 'lucide-react-native';
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
      <View className="flex-1 justify-end bg-black/60">
        <View className="bg-background rounded-t-3xl max-h-[85%] border-t border-border/30">
          {/* Modal Header */}
          <View className="flex-row items-center justify-between p-5 border-b border-border/30">
            <Text className="text-xl font-black text-foreground">Bộ lọc</Text>
            <TouchableOpacity 
              onPress={onClose}
              className="bg-muted rounded-xl p-2"
              activeOpacity={0.7}
            >
              <X size={22} color="#FAFAFA" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-5">
            {/* Sort Section */}
            <View className="mb-6">
              <Text className="text-base font-black text-foreground mb-4">Sắp xếp</Text>
              {sortOptions.map((option) => {
                const IconComponent = option.iconComponent;
                const isActive = sortBy === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSortSelect(option.value)}
                    className={`flex-row items-center justify-between p-4 rounded-2xl mb-2.5 ${
                      isActive ? 'bg-primary' : 'bg-surface border border-border/30'
                    }`}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center">
                      <View className={`rounded-xl p-2 ${isActive ? 'bg-white/20' : 'bg-primary/20'}`}>
                        <IconComponent size={20} color={isActive ? '#FAFAFA' : '#A855F7'} strokeWidth={2} />
                      </View>
                      <Text
                        className={`font-bold ml-3 ${
                          isActive ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {isActive && (
                      <Check size={20} color="#FAFAFA" strokeWidth={2.5} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Status Section */}
            <View className="mb-6">
              <Text className="text-base font-black text-foreground mb-4">Trạng thái</Text>
              <TouchableOpacity
                onPress={() => handleStatusSelect(null)}
                className={`flex-row items-center justify-between p-4 rounded-2xl mb-2.5 ${
                  !selectedStatus ? 'bg-primary' : 'bg-surface border border-border/30'
                }`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View className={`rounded-xl p-2 ${!selectedStatus ? 'bg-white/20' : 'bg-primary/20'}`}>
                    <FileText size={20} color={!selectedStatus ? '#FAFAFA' : '#A855F7'} strokeWidth={2} />
                  </View>
                  <Text
                    className={`font-bold ml-3 ${
                      !selectedStatus ? 'text-primary-foreground' : 'text-foreground'
                    }`}
                  >
                    Tất cả
                  </Text>
                </View>
                {!selectedStatus && <Check size={20} color="#FAFAFA" strokeWidth={2.5} />}
              </TouchableOpacity>
              {statusOptions.map((option) => {
                const IconComponent = option.iconComponent;
                const isActive = selectedStatus === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleStatusSelect(option.value)}
                    className={`flex-row items-center justify-between p-4 rounded-2xl mb-2.5 ${
                      isActive ? 'bg-primary' : 'bg-surface border border-border/30'
                    }`}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center">
                      <View className={`rounded-xl p-2 ${isActive ? 'bg-white/20' : 'bg-primary/20'}`}>
                        <IconComponent size={20} color={isActive ? '#FAFAFA' : '#A855F7'} strokeWidth={2} />
                      </View>
                      <Text
                        className={`font-bold ml-3 ${
                          isActive ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {isActive && (
                      <Check size={20} color="#FAFAFA" strokeWidth={2.5} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Genre Section */}
            <View className="mb-6">
              <Text className="text-base font-black text-foreground mb-4">Thể loại</Text>
              {genresLoading ? (
                <View className="py-8 items-center">
                  <ActivityIndicator color="#A855F7" />
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => handleGenreSelect(null)}
                    className={`flex-row items-center justify-between p-4 rounded-2xl mb-3 ${
                      !selectedGenre ? 'bg-primary' : 'bg-surface border border-border/30'
                    }`}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center">
                      <View className={`rounded-xl p-2 ${!selectedGenre ? 'bg-white/20' : 'bg-primary/20'}`}>
                        <Theater size={20} color={!selectedGenre ? '#FAFAFA' : '#A855F7'} strokeWidth={2} />
                      </View>
                      <Text
                        className={`font-bold ml-3 ${
                          !selectedGenre ? 'text-primary-foreground' : 'text-foreground'
                        }`}
                      >
                        Tất cả thể loại
                      </Text>
                    </View>
                    {!selectedGenre && <Check size={20} color="#FAFAFA" strokeWidth={2.5} />}
                  </TouchableOpacity>
                  <ScrollView className="max-h-64">
                    <View className="flex-row flex-wrap">
                      {genres.map((genre) => {
                        const isActive = selectedGenre === genre.slug;
                        return (
                          <TouchableOpacity
                            key={genre.id}
                            onPress={() => handleGenreSelect(genre.slug)}
                            className={`rounded-xl px-4 py-2.5 mr-2 mb-2.5 ${
                              isActive
                                ? 'bg-primary'
                                : 'bg-surface border border-border/30'
                            }`}
                            activeOpacity={0.7}
                          >
                            <Text
                              className={`text-sm font-bold ${
                                isActive ? 'text-primary-foreground' : 'text-foreground'
                              }`}
                            >
                              {genre.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </>
              )}
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View className="p-5 border-t border-border/30 flex-row">
            <TouchableOpacity
              onPress={() => {
                onClearFilters();
                onClose();
              }}
              className="flex-1 bg-surface border border-border/30 rounded-2xl p-4 mr-3"
              activeOpacity={0.7}
            >
              <Text className="text-foreground font-bold text-center">Xóa bộ lọc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-primary rounded-2xl p-4"
              activeOpacity={0.8}
              style={{
                shadowColor: '#A855F7',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text className="text-primary-foreground font-black text-center">Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
