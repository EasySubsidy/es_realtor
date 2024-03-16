import { GetFileURL, PostDoc } from "@/app/repository";
import { Collection } from "@/app/entity/tenant";
import { Tenant } from "@/app/entity";
import { GenerateRandomId, GetLatLngFromAddress } from "@/app/util";
import { Cities } from "@/app/consts/cities";
import { FormValues } from "@/app/view/form";
import { UploadFile } from "@/app/repository";

export const PostTenant = async (data: FormValues) => {
  const document_id = GenerateRandomId();

  // TODO: cityIDの取得関数を実装する
  const cityID = Cities[0].id;
  const prefectureID = null;

  const latlng = await GetLatLngFromAddress(data.address);
  if (!latlng) {
    console.error("Failed to get latitude and longitude");
    return;
  }

  // 画像URLリストを初期化
  var imageURLList: string[] = [];

  // すべての画像アップロードのPromiseを保持する配列を作成
  const uploadPromises = data.images.map((image) =>
    uploadFileAndGetURL("tenant_images", image)
  );

  try {
    const urls = await Promise.all(uploadPromises);
    imageURLList = urls;

    console.log("imageURLList", imageURLList);
    const tenant: Tenant = {
      area: data.area,
      city_id: cityID,
      description: data.description,
      images: imageURLList,
      prefecture_id: prefectureID,
      location: {
        address: data.address,
        latitude: latlng.lat,
        longitude: latlng.lng,
      },
      rent: data.rent,
      title: data.title,
    };

    PostDoc<Tenant>(Collection.TENANT, document_id, tenant);
  } catch (error) {
    console.error("upload file was failed", error);
    return;
  }
};

const uploadFileAndGetURL = async (folderName: string, image: File) => {
  const path = `${folderName}/${image.name}`;
  await UploadFile(path, image);

  const url = await GetFileURL(path);
  return url;
};
