import { constants } from "../common/constant";

export const cvtEmbed = (
  from: string,
  to: string,
  value: string | number,
  result: string
) => {
  return {
    color: "#0099ff",
    title: `Currency Converter`,
    thumbnail: {
      url: constants.LOGO_IMAGE,
    },
    fields: [
      { name: "From", value: from, inline: true },
      {
        name: "To",
        value: to,
        inline: true,
      },
      {
        name: "Value",
        value: String(value),
        inline: true,
      },
      { name: "Result", value: result },
      { name: "List of available currency", value: "g!cvt list" },
    ],
    timestamp: new Date(),
  };
};
