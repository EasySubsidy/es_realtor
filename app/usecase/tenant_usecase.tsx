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

  const mockTenant: Tenant = {
    area: 300,
    city_id: "city_1",
    description: "築20年の物件, 駅から徒歩5分の好立地",
    images: ["imagelink"],
    prefecture_id: "prefecture_1",
    location: {
      address: "東京都千代田区",
      latitude: 35.682839,
      longitude: 139.759455,
    },
    rent: 200000,
    title: "title",
  };

  PostDoc<Tenant>(Collection.TENANT, document_id, mockTenant);
};
