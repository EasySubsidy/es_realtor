import { GetFileURL, PostDoc } from "@/app/_repository";
import { Collection } from "@/app/_entity/tenant";
import { Tenant, Storage } from "@/app/_entity";
import { GenerateRandomId, GetLatLngFromAddress } from "@/app/_util";
import { cities, prefectures } from "@/app/_consts";
import { RegisterTenantFormValues } from "@/app/(pages)/dashboard/register/RegisterForm";
import { UploadFile } from "@/app/_repository";

/**
 * テナント情報を登録するusecase
 * @param data
 * @param realtorID
 * @returns
 */
export const PostTenant = async (
  data: RegisterTenantFormValues,
  realtorID: string
) => {
  const document_id = GenerateRandomId();
  const tenant_images_id = GenerateRandomId();

  // TODO: cityID, PrefectureIDの取得関数を実装する
  const cityID = cities[0].id;
  const prefectureID = prefectures[0].id;

  const tenantlatlng = await GetLatLngFromAddress(data.address);
  if (!tenantlatlng) {
    console.error("Failed to get tenant latitude and longitude");
    return;
  }

  const nearestStationlatlng = await GetLatLngFromAddress(
    data.nearest_station_address
  );
  if (!nearestStationlatlng) {
    console.error("Failed to get nearest station latitude and longitude");
    return;
  }

  // 画像URLリストを初期化
  var imageURLList: string[] = [];

  // すべての画像アップロードのPromiseを保持する配列を作成
  const uploadPromises = data.images.map((image) =>
    uploadFileAndGetURL(Storage.TENANT, tenant_images_id, image)
  );

  try {
    const urls = await Promise.all(uploadPromises);
    imageURLList = urls;

    const tenant: Partial<Tenant> = {
      area: data.area,
      city_id: cityID,
      description: data.description,
      images: imageURLList,
      location: {
        address: data.address,
        latitude: tenantlatlng.lat,
        longitude: tenantlatlng.lng,
      },
      prefecture_id: prefectureID,
      realtor_id: realtorID,
      rent: data.rent,
      station: {
        address: data.nearest_station_address,
        name: data.nearest_station,
        latitude: nearestStationlatlng.lat,
        longitude: nearestStationlatlng.lng,
      },
      title: data.title,
    };

    PostDoc<Partial<Tenant>>(Collection.TENANT, document_id, tenant);
  } catch (error) {
    console.error("upload file was failed", error);
    return;
  }
};

const uploadFileAndGetURL = async (
  category: string,
  id: string,
  image: File
) => {
  const path = `${category}/${id}/${image.name}`;
  await UploadFile(path, image);

  const url = await GetFileURL(path);
  return url;
};
