import { GetFileURL, PostDoc } from "@/app/_repository";
import { Collection } from "@/app/_entity/tenant";
import { Tenant, Storage } from "@/app/_entity";
import { SignupFormData } from "@/app/(pages)/signup/page";
import { Realtor } from "@/app/_entity/realtor";

export const registerRealtor = async (uid: string, data: SignupFormData) => {
  try {
    const realtor: Realtor = {
      email: data.email,
    };

    PostDoc<Realtor>(Collection.REALTOR, uid, realtor);
  } catch (error) {
    console.error("upload file was failed", error);
    return;
  }
};

// const uploadFileAndGetURL = async (
//   category: string,
//   id: string,
//   image: File
// ) => {
//   const path = `${category}/${id}/${image.name}`;
//   await UploadFile(path, image);

//   const url = await GetFileURL(path);
//   return url;
// };
