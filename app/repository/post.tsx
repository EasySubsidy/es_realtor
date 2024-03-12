import { db, doc, setDoc, addDoc } from "@/firebase";
import { collection } from "firebase/firestore";
import { Collection, Tenant } from "@/app/entity/tenant";

const docData: Tenant = {
  area: 3000,
  city_id: "city_1",
  description: "築20年の物件, 駅から徒歩5分の好立地",
  images: ["imagelink"],
  location: {
    address: "東京都千代田区",
    latitude: 35.682839,
    longitude: 139.759455,
  },
  prefecture_id: "prefecture_1",
  rent: 200000,
  title: "title",
};

// Firebase Realtime Databaseにドキュメントを保存する
export const PostDoc = async <T extends { [x: string]: any }>(
  collection: Collection,
  document_id: string,
  docData: T
) => {
  const tenantRef = doc(db, "tenant", document_id);
  try {
    await setDoc(tenantRef, docData);
    console.log("データが正常に送信されました");
  } catch (error) {
    console.error("データの送信中にエラーが発生しました:", error);
  }
};

// PostDoc(Collection.TENANT, "aiueo", docData);

export const PostTest = async () => {
  console.log("PostTest");
  const collectionRef = collection(db, "tenant");
  console.log("PostTest2");
  try {
    await addDoc(collectionRef, docData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((e) => console.error(e));
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error writing document: ", e);
  }
};
