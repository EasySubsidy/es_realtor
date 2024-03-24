import { Collection } from "@/app/_entity";
import { deleteDocument } from "@/app/_repository";

export const deleteTenant = async (documentID: string) => {
  try {
    await deleteDocument(Collection.TENANT, documentID);
  } catch (error) {
    console.error("Failed to delete tenants", error);
    return;
  }
};
