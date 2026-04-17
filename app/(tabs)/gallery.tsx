import { GalleryContentModel, GetGalleryContent } from '@/model/GalleryModel';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = width * 1.5; 

export default function GalleryScreen() {
    const { folderUri, title } = useLocalSearchParams<{ folderUri: string; title: string }>();
    const [images, setImages] = useState<GalleryContentModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [jumpIndex, setJumpIndex] = useState('');
    const [currentIndex, setCurrentIndex] = useState(1); // Track current page
    
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        if (folderUri) {
            setLoading(true);
            GetGalleryContent(folderUri).then((data) => {
                setImages(data);
                setLoading(false);
                setCurrentIndex(1); // Reset counter on folder change
            });
        }
    }, [folderUri]);

    // Handle Scroll to update page counter
    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // Calculate index based on how much of the item is visible (0.5 for mid-point)
        const index = Math.floor(offsetY / ITEM_HEIGHT) + 1;
        if (index !== currentIndex && index > 0 && index <= images.length) {
            setCurrentIndex(index);
        }
    }, [currentIndex, images.length]);

    const handleJump = () => {
        const index = parseInt(jumpIndex, 10) - 1;
        if (index >= 0 && index < images.length) {
            listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0 });
            Keyboard.dismiss();
            setJumpIndex('');
        }
    };

    const renderImage = useCallback(({ item }: { item: GalleryContentModel }) => (
        <View style={styles.imageWrapper}>
            <Image
                source={{ uri: item.path }}
                style={styles.fullImage}
                resizeMode="cover" 
            />
        </View>
    ), []);

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Stack.Screen options={{ headerShown: false }} />

            {!loading && images.length > 0 && (
                <View style={styles.topContainer}>
                    {/* Page Counter Display */}
                    <View style={styles.counterBadge}>
                        <Text style={styles.counterText}>
                            {currentIndex} <Text style={styles.totalText}>/ {images.length}</Text>
                        </Text>
                    </View>

                    {/* Jump Input */}
                    <View style={styles.jumpBar}>
                        <TextInput
                            style={styles.input}
                            placeholder="Jump"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={jumpIndex}
                            onChangeText={setJumpIndex}
                            onSubmitEditing={handleJump}
                        />
                        <TouchableOpacity style={styles.jumpButton} onPress={handleJump}>
                            <Text style={styles.jumpText}>GO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            ) : (
                <FlatList
                    ref={listRef}
                    data={images}
                    keyExtractor={(item) => item.path}
                    renderItem={renderImage}
                    pagingEnabled={false}
                    decelerationRate="normal"
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    
                    // Scrolling Logic
                    onScroll={onScroll}
                    scrollEventThrottle={16} // Update roughly every frame for smoothness
                    
                    getItemLayout={(_, index) => ({
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index,
                    })}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageWrapper: { width: width, height: ITEM_HEIGHT, backgroundColor: '#000' },
    fullImage: { width: '100%', height: '100%' },
    topContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 999,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    counterBadge: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    counterText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    totalText: { color: '#888', fontSize: 12 },
    jumpBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(40, 40, 40, 0.9)',
        borderRadius: 25,
        paddingHorizontal: 12,
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    input: { color: '#fff', width: 45, textAlign: 'center', fontSize: 14 },
    jumpButton: { paddingLeft: 8, borderLeftWidth: 1, borderLeftColor: '#555' },
    jumpText: { color: '#00ffcc', fontWeight: 'bold', fontSize: 12 },
});