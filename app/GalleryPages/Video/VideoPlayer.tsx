import { Ionicons } from '@expo/vector-icons';
import { Tabs, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export default function VideoPlayerScreen() {
  const { videoUri, title } = useLocalSearchParams<{ videoUri: string; title: string }>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isBgPlaybackEnabled, setIsBgPlaybackEnabled] = useState(true);

  const validSourceUri = videoUri || '';

  const player = useVideoPlayer(validSourceUri, (playerInstance) => {
    playerInstance.loop = true;
    
    playerInstance.staysActiveInBackground = true; // Enables Background Audio playback natively
    
    playerInstance.play();
  });




  return (
    <View style={styles.contentContainer}>
      {/* <Stack.Screen options={{ headerShown: !isPlaying,}} /> */}
      <Tabs.Screen options={{headerShown: !isPlaying}}/>
      <View style={styles.videoWrapper}>
        <VideoView
          style={styles.video}
          player={player}
          fullscreenOptions={{ enable: true }}
          allowsPictureInPicture
          
          contentFit="contain"
        />

        {/* ─── CINEMATIC OVERLAY CONTROLS ─── */}
        <View style={styles.controlsOverlay}>
          <TouchableOpacity
            style={styles.playbackButton}
            activeOpacity={0.7}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"} 
              size={32} 
              color="#FFFFFF" 
              style={!isPlaying && { marginLeft: 4 }} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  videoWrapper: {
    width: '100%',
    maxWidth: 400,
    aspectRatio: 16 / 9, 
    borderRadius: 16,
    overflow: 'hidden', 
    backgroundColor: '#000000',
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  playbackButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)', 
  },
});