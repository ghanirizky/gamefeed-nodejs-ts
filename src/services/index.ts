import { configs } from "../config";
import { callAPI } from "../config/api";
import { readFile } from "../helpers";

export const bitly = async function (link: string): Promise<any> {
  const url = "https://api-ssl.bitly.com/v4/shorten";
  const data = JSON.stringify({
    domain: "bit.ly",
    long_url: link,
  });
  const headers = {
    Authorization: `Bearer ${configs.BITLY_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    return await callAPI({
      url,
      method: "POST",
      data,
      headers,
    });
  } catch (error) {
    console.log("Bitly Error: ", error);
  }
};

export const liveCrypto = async function (): Promise<any> {
  const url = "https://api.livecoinwatch.com/coins/list";
  const data = await readFile("crypto_list.json");
  const headers = {
    "x-api-key": "29797eeb-8b90-4ca0-9752-5c06e78aaf0d",
    "Content-Type": "application/json",
  };

  try {
    return await callAPI({
      url,
      method: "POST",
      data,
      headers,
    });
  } catch (error) {
    console.log("Crypto List Error: ", error);
  }
  
};

export const prayZone = async function (): Promise<any> {
  const url = "https://api.pray.zone/v2/times/today.json?city=jakarta";

  try {
    return await callAPI({
      url,
      method: "GET",
    });
  } catch (error) {
    console.log("Pray Zone: ", error);
  }
};
