import { AutoGetGalleries, GalleryModel, GetGalleries } from '@/model/GalleryModel';
import { Stack, useRouter } from 'expo-router';
import { ChevronRight, FolderOpen, Search, X } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const PAGE_SIZE = 10;

export default function HomeScreen() {
  const router = useRouter();
  const INITIAL_URI = 'content://com.android.externalstorage.documents/tree/primary%3A210'
  // States
  const [allGalleries, setAllGalleries] = useState<GalleryModel[]>([]);
  const [search, setSearch] = useState('');
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Pass the hardcoded URI directly to your service
      const data = await AutoGetGalleries(INITIAL_URI);
      setAllGalleries(data);
    } catch (error) {
      console.error("Auto-load failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // 1. Logic: Filter + Autocomplete Sort
  // We sort by "Starts With" first so it feels like an autocomplete suggestion
  const filteredData = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return allGalleries;

    return allGalleries
      .filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.code.toString().includes(query)
      )
      .sort((a, b) => {
        // Boost items that START with the query (Autocomplete behavior)
        const aStarts = a.name.toLowerCase().startsWith(query);
        const bStarts = b.name.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });
  }, [search, allGalleries]);

  // 2. Logic: Pagination
  const paginatedData = useMemo(() => {
    return filteredData.slice(0, displayCount);
  }, [filteredData, displayCount]);

  const loadMore = useCallback(() => {
    if (displayCount < filteredData.length) {
      setDisplayCount(prev => prev + PAGE_SIZE);
    }
  }, [displayCount, filteredData.length]);

  const chooseFolder = async () => {
    setIsLoading(true);
    try {
      const data = await GetGalleries();
      setAllGalleries(data);
      setDisplayCount(PAGE_SIZE); // Reset pagination on new folder pick
    } finally {
      setIsLoading(false);
    }
  };

  const renderFolder = ({ item }: { item: GalleryModel }) => (
    <TouchableOpacity
      style={styles.folderCard}
      activeOpacity={0.7}
      onPress={() => router.push({ 
        pathname: '/gallery', 
        params: { 
          folderUri: item.path, // Full path like content://... or file:///...
          title: item.name      // The display name after the "_"
        } 
      })}
    >
      <View style={styles.folderIconBox}>
        <FolderOpen size={22} color="#4F46E5" />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.folderCode}>ID: {item.code}</Text>
        <Text style={styles.folderText} numberOfLines={1}>{item.name}</Text>
      </View>
      
      <ChevronRight size={18} color="#D1D5DB" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Gallery Library', headerShadowVisible: false }} />
      
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <View style={styles.searchWrapper}>
            <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or code..."
              placeholderTextColor="#9CA3AF"
              value={search}
              clearButtonMode="while-editing" // iOS only
              onChangeText={(text) => {
                setSearch(text);
                setDisplayCount(PAGE_SIZE); // Reset pagination on search
              }}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <X size={16} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={chooseFolder}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator size="small" color="#4F46E5" /> : <FolderOpen size={22} color="#4F46E5" />}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.path}
        renderItem={renderFolder}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5} // Trigger earlier for smoother feel
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {search ? `No results for "${search}"` : 'Tap the folder icon to load your library'}
            </Text>
          </View>
        }
        ListFooterComponent={() => 
          displayCount < filteredData.length ? (
            <ActivityIndicator color="#4F46E5" style={styles.loader} />
          ) : <View style={{ height: 20 }} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#111827' },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: { padding: 16 },
  folderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  folderIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: { flex: 1 },
  folderCode: { fontSize: 11, color: '#6366F1', fontWeight: 'bold' },
  folderText: { fontSize: 16, fontWeight: '500', color: '#1F2937' },
  emptyContainer: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: '#9CA3AF', fontSize: 14 },
  loader: { marginVertical: 20 }
});