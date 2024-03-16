import { PostDoc } from "@/app/repository";
import { Collection } from "@/app/entity/tenant";
import { Tenant } from "@/app/entity";
import { GenerateRandomId, GetLatLngFromAddress } from "@/app/util";
import { Cities } from "@/app/consts/cities";
import { FormValues } from "@/app/view/testform";

export const PostTenant = async (data: FormValues) => {
  const document_id = GenerateRandomId();

  // TODO: cityIDの取得関数を実装する
  const cityID = Cities[0].id;
  const prefectureID = null;

  const mockImageList = ["mock"];

  // const imageURLList: string[] = Array.from(data.images).map((image) => {
  //   return URL.createObjectURL(image);
  // });

  const latlng = await GetLatLngFromAddress(data.address);
  if (!latlng) {
    console.error("Failed to get latitude and longitude");
    return;
  }

  const tenant: Tenant = {
    area: data.area,
    city_id: cityID,
    description: data.description,
    images: mockImageList,
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
};
