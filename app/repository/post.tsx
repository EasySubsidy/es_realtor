import { db, doc, setDoc } from "@/firebase";
import { Collection } from "@/app/entity/tenant";

// Firebase Realtime Databaseにドキュメントを保存する
export const PostDoc = async <T extends { [x: string]: any }>(
  collection: Collection,
  document_id: string,
  docData: T
) => {
  const docRef = doc(db, collection, document_id);
  try {
    await setDoc(docRef, docData);
    console.log("successfully sent data to firestore");
  } catch (error) {
    console.error("post to firestore was failed", error);
  }
};
