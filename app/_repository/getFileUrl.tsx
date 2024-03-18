import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "@/firebase";

// Firebase Storageにファイルをアップロードする
export const GetFileURL = async (filePath: string): Promise<string> => {
  const fileRef = ref(storage, filePath);
  const url = await getDownloadURL(fileRef)
    .then((url) => {
      console.log("successfully get file url", url);
      return url;
    })
    .catch((error) => {
      console.error("get file url was failed", error);
      return "";
    });

  return url;
};
