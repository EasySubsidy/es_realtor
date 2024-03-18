import axios from "axios";

export const GetAddress = async (postalCode: string) => {
  try {
    const response = await axios.get(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode.replace(
        /-/g,
        ""
      )}`
    );
    if (response.data.results) {
      return (
        response.data.results[0].address1 +
        response.data.results[0].address2 +
        response.data.results[0].address3
      );
    }
  } catch (error) {
    console.error("住所の取得に失敗しました", error);
    return "郵便番号が正しくありません。";
  }
};
