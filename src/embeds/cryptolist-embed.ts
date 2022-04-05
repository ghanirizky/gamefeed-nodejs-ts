import { constants } from "../common/constant";
import { readFile } from "../helpers";

export const createEmbedCryptoList = async function (
  data: any,
  no: number
): Promise<any> {
  const param = await readFile("crypto_list.json");

  const toCurr = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: param.currency,
  });

  const exampleEmbed = {
    color: data.color,
    url: constants.URL_CRYPTO,
    author: {
      name: `${no}. ${data.name} ${data.symbol ? `- ${data.symbol}` : ""}`,
      icon_url: data.png64,
      url: constants.URL_CRYPTO,
    },
    thumbnail: {
      url: data.png64,
    },
    fields: [
      { name: "Rate", value: toCurr.format(data.rate), inline: true },
      { name: "\u200B", value: "\u200B", inline: true },
      {
        name: "All-time High",
        value: toCurr.format(data.allTimeHighUSD),
        inline: true,
      },
      { name: "Volume", value: toCurr.format(data.volume), inline: true },
      { name: "\u200B", value: "\u200B", inline: true },
      { name: "Cap", value: toCurr.format(data.cap), inline: true },
      // { name: "Circulating Suply", value: toCurr.format(data.circulatingSupply), inline: true},
      // { name: "Total Suply", value: toCurr.format(data.totalSupply) , inline: true},
      // { name: "Max Suply", value: toCurr.format(data.maxSupply) , inline: true},
    ],
    timestamp: new Date(),
  };

  return exampleEmbed;
};
