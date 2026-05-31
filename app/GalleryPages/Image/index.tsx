
import GalleryTemplate from '@/components/ui/GalleryPageTemplate';
import { renderGalleryItem } from '@/components/ui/listItem';
import { IMG_URI } from '@/constants/localURI';
import { GalleryModel } from '@/model/MediaModel';
import * as MediaLibrary from 'expo-media-library';
import React, { useState } from 'react';
const PAGE_SIZE = 15;
export default function GalleryImageScreen() {
  const [data, setData] = useState<GalleryModel[]>([]);
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  // useEffect(()=>{
  //   GetGallery(IMG_URI).then((result) => setData(result));
  // },[])
  async function GetGalleries(galleryFolder:string) {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission();
    }
    let allAlbums = await MediaLibrary.getAlbumsAsync();
    setAlbums(allAlbums);
    const result : GalleryModel[] = [];
    for (const album of allAlbums){
      const match = album.title.match(/^(\d{6})_(.*)$/);
      if (match) {
        const id = match[1];
        const title = match[2];
        result.push({
          id: id,
          code: parseInt(id),
          name: match[2],
          path: album.id
        })
      }
    }
    setData(result.sort((a, b) => a.name.localeCompare(b.name)));
  }
  GetGalleries(IMG_URI)
  return (

    <GalleryTemplate<GalleryModel>
      data={data}
      searchFilter={(item, query) => item.name.toLowerCase().includes(query.toLowerCase()) || item.code.toString().includes(query)}
      renderListItem={({ item }) => (
        renderGalleryItem({ item })
      )}/>
    
  );
}
