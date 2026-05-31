import { ThemeProvider } from '@/context/ThemeContext';
import { ConfigCenterProvider } from '@/hooks/useStoredState';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ConfigCenterProvider>
    <ThemeProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name='GalleryPages' options={{ headerShown: false }}/>
    </Stack>
    </ThemeProvider>
    </ConfigCenterProvider>
  );
}