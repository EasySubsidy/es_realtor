import { doc, deleteDoc, getFirestore } from "@firebase/firestore";
import { db } from "@/firebase";

// Firebase Realtime Databaseのドキュメントを削除する
export const deleteDocument = async (
  collection: string,
  documentId: string
) => {
  const docRef = doc(db, collection, documentId);
  try {
    await deleteDoc(docRef);
    console.log("successfully sent data to firestore");
  } catch (error) {
    console.error("post to firestore was failed", error);
  }
};
