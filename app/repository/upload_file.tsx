import { storage, ref, uploadBytes } from "@/firebase";

// Firebase Storageにファイルをアップロードする
export const UploadFile = async (storagePath: string, file: Blob | File) => {
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file)
    .then(() => {
      console.log("successfully upload to storage");
    })
    .catch((error) => {
      console.error("upload to storage was failed", error);
    });
};
