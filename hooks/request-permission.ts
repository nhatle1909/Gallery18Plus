
import * as MediaLibrary from 'expo-media-library';

export const MediaRequestPermission = async () => {
 
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
};