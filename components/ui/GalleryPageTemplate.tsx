


import { useAppTheme } from '@/context/ThemeContext';
import { Search, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const PAGE_SIZE = 15;
interface GalleryTemplateProps<T> {
    data: T[];
    searchFilter: (item: T, query: string) => boolean;
    renderListItem: ({ item }: { item: T }) => React.JSX.Element; // Dynamic renderer prop
  }
export default function GalleryTemplate<T>({
    data,
    searchFilter,
    renderListItem,
  }: GalleryTemplateProps<T>){

  const { colors } = useAppTheme();
  const [search, setSearch] = useState('');
  const [DataDisplayCount, setDataDisplayCount] = useState(PAGE_SIZE);
  
  const filteredData = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return data;
    return data.filter((item) => searchFilter(item, search));
  }, [search, data]);
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.searchRow}>
        <View style={styles.searchWrapper}>
          <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search here...`}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
          <FlatList
            data={filteredData.slice(0, DataDisplayCount) as any[]}        
            keyExtractor={(item) => item.path}
            renderItem={({ item }) => {
                                      return renderListItem({ item: item as T });
                                      }}
            onEndReached={() => {
                                setDataDisplayCount(p => p + PAGE_SIZE);
                                }}
            onEndReachedThreshold={0.5} 
            contentContainerStyle={styles.listContent}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            ListEmptyComponent={<Text style={styles.emptyText}>No items found</Text>}
            ListFooterComponent={() => 
                DataDisplayCount < filteredData.length ? (
                    <ActivityIndicator color="#4F46E5" style={styles.loader} />
                ) : <View style={{ height: 20 }} />
            }/>
  </View>
     
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  tabBar: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4, marginBottom: 15,marginTop:5 },
  tabItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, gap: 8, borderRadius: 10 },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  tabLabel: { fontSize: 14, fontWeight: '600', color: '#9CA3AF' },
  activeTabLabel: { color: '#111827' },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#111827' },
  listContent: { padding: 16 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#9CA3AF' },
  loader: { marginVertical: 20 },
});