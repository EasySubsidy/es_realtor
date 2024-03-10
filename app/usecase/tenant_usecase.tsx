import { PostDoc } from "@/app/repository";
import { Collection } from "@/app/entity/tenant";
import { Tenant } from "@/app/entity";
import { GenerateRandomId } from "@/app/util";

export const PostTenant = (data: any) => {
  const document_id = GenerateRandomId();

  const tenant: Tenant = {
    area: data.area,
    city_id: data.city_id,
    description: data.description,
    image: data.image,
    prefecture_id: data.prefecture_id,
    location: {
      address: data.location.address,
      latitude: data.location.latitude,
      longitude: data.location.longtitue,
    },
    rent: data.rent,
    subsidy_id: data.subsidy_id,
    title: data.title,
  };

  PostDoc(Collection.TENANT, document_id, tenant);
};
