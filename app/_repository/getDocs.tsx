import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  Query,
} from "firebase/firestore";
import { db } from "@/firebase";

const q = query(collection(db, "cities"), where("capital", "==", true));

export const getDocuments = async <T,>(query: Query<DocumentData>) => {
  try {
    const querySnapshot = await getDocs(query);
    const data: T[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id } as T);
    });
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return null;
  }
};
