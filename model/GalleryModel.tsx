import * as FileSystem from "expo-file-system/legacy";
const { StorageAccessFramework } = FileSystem;
export interface GalleryModel {
  code: number;
  name: string;
  path: string;
  theme : GalleryContentModel
}

export interface GalleryContentModel {
  id: number;
  name: string;
  path: string;
}


export const GetGalleries = async (): Promise<GalleryModel[]> => {
    try {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    
        if (!permissions.granted) {
          console.log("Permission denied");
          return [];
        }
    
        const folderUri = permissions.directoryUri;
        console.log(permissions.directoryUri)
        const uris = await StorageAccessFramework.readDirectoryAsync(folderUri);
     
        const galleryList: GalleryModel[] = uris
          .map((uri) => {
            // 1. Extract the raw folder name from the URI
            const decodedUri = decodeURIComponent(uri);
            const parts = decodedUri.split('/');
            // Get the last segment (handling trailing slashes)
            const rawName = parts.pop() || parts.pop() || "";
    
            // 2. Parse "123456_FolderName"
            // Regex: Matches 6 digits, an underscore, then everything else
            const match = rawName.match(/^(\d{6})_(.*)$/);
    
            if (match) {
              return {
                code: parseInt(match[1], 10),
                name: match[2],
                path: uri, // The original URI is used for future file operations
              };
            }
    
            return null; // Ignore folders that don't match the "123456_name" pattern
          })
          .filter((item): item is GalleryModel => item !== null);
          return galleryList.sort((a, b) => 
            a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
          );
      } catch (error) {
        console.error("Error parsing folders:", error);
        return [];
      }
  };
  export const AutoGetGalleries = async (path:string): Promise<GalleryModel[]> => {
    try {
       
        const uris = await StorageAccessFramework.readDirectoryAsync(path);
     
        const galleryList: GalleryModel[] = uris
          .map( (uri) => {
            // 1. Extract the raw folder name from the URI
            const decodedUri = decodeURIComponent(uri);
            const parts = decodedUri.split('/');
            // Get the last segment (handling trailing slashes)
            const rawName = parts.pop() || parts.pop() || "";
            const Imgs =  GetGalleryContent(uri);
            // 2. Parse "123456_FolderName"
            // Regex: Matches 6 digits, an underscore, then everything else
            const match = rawName.match(/^(\d{6})_(.*)$/);
    
            if (match) {
              return {
                code: parseInt(match[1], 10),
                name: match[2],
                path: uri,
                theme: Imgs[0] // The original URI is used for future file operations
              };
            }
    
            return null; // Ignore folders that don't match the "123456_name" pattern
          })
          .filter((item): item is GalleryModel => item !== null);
          return galleryList.sort((a, b) => 
            a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
          );
      } catch (error) {
        console.error("Error parsing folders:", error);
        return [];
      }
  };
/**
 * Returns all images inside a specific gallery folder
 */export const GetGalleryContent = async (folderPath: string): Promise<GalleryContentModel[]> => {
  try {
    const decodedPath = decodeURIComponent(folderPath);
    let finalUri = decodedPath;

    if (decodedPath.includes(':')) {
      const lastColonIndex = decodedPath.lastIndexOf(':');
      const base = decodedPath.substring(0, lastColonIndex);
      const folderName = decodedPath.substring(lastColonIndex + 1);
      finalUri = `${base}:${folderName.replace(/\//g, '%2F')}`;
    }

    const uris = await StorageAccessFramework.readDirectoryAsync(finalUri);
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic'];

    const content = uris
      .filter((uri) => {
        const lowerUri = uri.toLowerCase();
        return imageExtensions.some(ext => lowerUri.endsWith(ext));
      })
      .map((uri, index) => ({
        id: index,
        name: decodeURIComponent(uri.split('/').pop() || `img_${index}`),
        path: uri,
      }));

    // SORT BY NAME BEFORE RETURNING
    return content.sort((a, b) => 
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );

  } catch (error) {
    console.error(error);
    return [];
  }
};