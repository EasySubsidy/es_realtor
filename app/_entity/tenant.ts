export type Tenant = {
  id: string;
  area: number;
  city_id: string;
  description: string;
  images: string[];
  prefecture_id: string | null;
  location: Location;
  station: NearestStation;
  realtor_id: string;
  rent: number;
  title: string;
};

type NearestStation = {
  address: string;
  name: string;
  latitude: number;
  longitude: number;
};

type Location = {
  address: string;
  latitude: number;
  longitude: number;
};

export enum Collection {
  TENANT = "tenant",
  REALTOR = "realtor",
}

export enum TenantField {
  REALTOR_ID = "realtor_id",
  CITY_ID = "city_id",
  PREFECTURE_ID = "prefecture_id",
}
