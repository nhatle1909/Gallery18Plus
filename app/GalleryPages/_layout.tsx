import { Drawer } from 'expo-router/drawer';
import { Navigation } from 'lucide-react-native';
export default function GalleryLayout() {
 
  return (
    <Drawer screenOptions={{ headerShown: false,drawerIcon: ({ color }) => <Navigation color={color}/>, }}>
      <Drawer.Screen name="Image"  options={{ headerShown: true,title: 'Gallery',headerTitle:'' }}/>
      <Drawer.Screen name="Video" options={{ headerShown: true,title: 'Video' }}/>
      <Drawer.Screen name="settings" options={{ headerShown: true,title: 'Settings' }}/>
    </Drawer>
  );
}
