import { Tabs } from "expo-router";
import { Folder, Image } from "lucide-react-native";
export default function GalleryImageLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ headerShown: false,tabBarIcon: ({ color }) => <Folder color={color}/>,title: 'List' }} />
            <Tabs.Screen name="ImageDetail" options={{ headerShown: false,tabBarIcon: ({ color }) => <Image color={color}/>,title: 'Reader'  }} />
        </Tabs>
    )
}