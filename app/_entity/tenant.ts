export type Tenant = {
  area: number;
  city_id: string;
  description: string;
  images: string[];
  prefecture_id: string | null;
  location: Location;
  realtor_id: string;
  rent: number;
  title: string;
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
