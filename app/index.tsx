import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const navigation = useRouter();
  useEffect(()=>{
    setTimeout(() => {
    navigation.push('/GalleryPages/Image');
    }, 1000);
    
  },[]);
  return (
    <View>
    </View>
  )
}