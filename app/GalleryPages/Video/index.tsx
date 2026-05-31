

import GalleryTemplate from '@/components/ui/GalleryPageTemplate';
import { renderVideoItem } from '@/components/ui/listItem';
import { VID_URI } from '@/constants/localURI';
import { VideoModel } from '@/model/MediaModel';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
const PAGE_SIZE = 15;
const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.mov', '.webm', '.avi'];

export default function GalleryVideoScreen() {
  const [data,setData] = useState<VideoModel[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

 async function GetVideos(videoFolder:string) {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission();
    }
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'video',
      first: 1000,
    })
    
    const videos = media.assets.filter((asset) => {
      const startWith = asset.uri.startsWith(videoFolder);
      const extension = asset.filename.split('.').pop()?.toLowerCase();
      return startWith && extension && VIDEO_EXTENSIONS.includes(`.${extension}`);
    });

    const result = videos.map((video) => ({
      id: video.id,
      name: video.filename,
      path: video.uri,
    }));
    return result;
  }

  GetVideos(VID_URI).then((result) => setData(result));
  return (
   <GalleryTemplate<VideoModel> data={data} searchFilter={(item, search) => item.name.toLowerCase().includes(search)} 
   renderListItem={(item) => renderVideoItem(item)} />
  );
}
