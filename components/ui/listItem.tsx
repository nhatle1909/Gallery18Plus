import { ComicModel, GalleryModel, VideoModel } from "@/model/MediaModel";
import { router } from "expo-router";
import { ChevronRight, FolderOpen, Play } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export const renderGalleryItem = ({ item }: { item: GalleryModel }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/GalleryPages/Image/ImageDetail', params: { folderUri: item.path, title: item.name } })}
    >
      <View style={styles.iconBox}>
        <FolderOpen size={22} color="#4F46E5" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemCode}>ID: #{item.code}</Text>
        <Text style={styles.itemText} numberOfLines={1}>{item.name}</Text>
      </View>
      <ChevronRight size={18} color="#D1D5DB" />
    </TouchableOpacity>
  );
  export const renderComicItem = ({ item }: { item: ComicModel }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/GalleryPages/Comic/ComicChapter', params: { folderUri: item.path, title: item.name } })}
    >
      <View style={styles.iconBox}>
        <FolderOpen size={22} color="#4F46E5" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemText} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemCode}>Chapters: #{item.code}</Text>
      </View>
      <ChevronRight size={18} color="#D1D5DB" />
    </TouchableOpacity>
  );

  export const renderVideoItem = ({ item }: { item: VideoModel }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/GalleryPages/Video/VideoPlayer', params: { videoUri: item.path, title: item.name } })}
    >
      <View style={[styles.iconBox, styles.videoIconBox]}>
        <Play size={22} color="#EF4444" fill="#EF4444" />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.itemCode, { color: '#EF4444' }]}>VIDEO</Text>
        <Text style={styles.itemText} numberOfLines={1}>{item.name}</Text>
      </View>
      <ChevronRight size={18} color="#D1D5DB" />
    </TouchableOpacity>
  );
const styles = StyleSheet.create
({
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#F3F4F6' },
    iconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#F5F3FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    textContainer: { flex: 1 },
    videoIconBox: { backgroundColor: '#FEF2F2' },
    itemCode: { fontSize: 11, color: '#6366F1', fontWeight: 'bold' },
    itemText: { fontSize: 16, fontWeight: '500', color: '#1F2937' },
});