import axios from "axios";

export const GetLatLngFromAddress = async (
  address: string
): Promise<{ lat: number; lng: number } | null> => {
  const url = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${address}.json`;

  try {
    const response = await axios.get(url);
    const latlng: number[] = response.data[0].geometry.coordinates;
    // console.log(latlng);

    if (latlng) {
      return { lat: latlng[1], lng: latlng[0] };
    } else {
      console.error("Geolonia API error: No data found");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
