import { Collection, Tenant, TenantField } from "@/app/_entity";
import { getDocuments } from "@/app/_repository";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export const getTenants = async (realtorID: string) => {
  const q = query(
    collection(db, Collection.TENANT),
    where(TenantField.REALTOR_ID, "==", realtorID)
  );

  try {
    const tenants = await getDocuments<Tenant>(q);
    if (!tenants) {
      throw new Error();
    }

    return tenants;
  } catch (error) {
    console.error("Failed to get tenants", error);
    return;
  }
};
