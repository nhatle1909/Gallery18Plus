export interface GalleryContentModel {
  id: string;
  name: string;
  path: string;
}
export interface ComicModel{
  id: string;
  name: string;
  chapters:string[],
  
}
export interface GalleryModel {
  id:string;
  code: number;
  name: string;
  path: string;
}

export interface VideoModel {
  id:string;
  name: string;
  path: string;
}

