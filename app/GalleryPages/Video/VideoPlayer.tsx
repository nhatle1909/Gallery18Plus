import { useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

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
      <VideoView
        style={styles.video}
        player={player}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});