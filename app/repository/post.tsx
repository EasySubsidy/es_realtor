import { doc, setDoc, collection, addDoc } from "firebase/firestore/lite";
import { db } from "@/firebase";
import { Collection, Tenant } from "@/app/entity/tenant";

const docData: Tenant = {
  area: 300,
  city_id: "city_1",
  description: "築20年の物件, 駅から徒歩5分の好立地",
  image: "imagelink",
  prefecture_id: "prefecture_1",
  location: {
    address: "東京都千代田区",
    latitude: 35.682839,
    longitude: 139.759455,
  },
  rent: 200000,
  subsidy_id: "subsidy_1",
  title: "title",
};

// Firebase Realtime Databaseにドキュメントを保存する
export const PostDoc = async <T extends { [x: string]: any }>(
  collection: Collection,
  document_id: string,
  docData: T
) => {
  const tenantRef = doc(db, collection, document_id);
  try {
    await setDoc(tenantRef, docData);
    console.log("データが正常に送信されました");
  } catch (error) {
    console.error("データの送信中にエラーが発生しました:", error);
  }
};
