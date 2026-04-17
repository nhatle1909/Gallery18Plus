import { Tabs } from 'expo-router';
import { Folder } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#4F46E5' }}>
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Folders', headerShown: false,tabBarIcon: ({ color }) => <Folder color={color} /> }} 
      />
      {/* <Tabs.Screen 
        name="gallery" 
        options={{ title: 'Gallery', tabBarIcon: ({ color }) => <ImageIcon color={color} /> }} 
      /> */}
    </Tabs>
  );
}