export type Tenant = {
  area: number;
  city_id: string;
  description: string;
  image: string;
  prefecture_id: string;
  location: Location;
  rent: number;
  subsidy_id: string;
  title: string;
};

type Location = {
  address: string;
  latitude: number;
  longitude: number;
};

export enum Collection {
  TENANT = "tenant",
}
