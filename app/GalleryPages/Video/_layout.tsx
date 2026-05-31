import { Tabs } from "expo-router";
import { Folder, Video } from "lucide-react-native";
export default function GalleryImageLayout() {
    return (
    
        <Tabs>
            <Tabs.Screen name="index" options={{ headerShown: false,tabBarIcon: ({ color }) => <Folder color={color}/>, title: 'List' }} />
            <Tabs.Screen name="Video" options={{ headerShown: false,tabBarIcon: ({ color }) => <Video color={color}/>,title: 'Player'  }} />
        </Tabs>
      
    )
}