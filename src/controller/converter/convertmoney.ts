import { readFile } from "../../helpers";
const CC = require("currency-converter-lt");
import format from "format-number";
import { EmbedMessage } from "../../embeds";

export const convertMoney = async function (
  from: string,
  to: string,
  value: number,
  msg: any
): Promise<void> {
  let data = await readFile("currency.json");
  const a: string | undefined = Object.keys(data).find((e) => e === from);
  const b: string | undefined = Object.keys(data).find((e) => e === to);
  if (!a || !b) return msg.reply(`Format currency tidak sesuai`);

  let currencyConverter: any = new CC({ from, to, amount: value });
  const cValue: any = await currencyConverter.convert();

  const result: any = format({ prefix: `${to} ` })(cValue, {
    noSeparator: false,
  });

  const embedData: any = EmbedMessage.cvtEmbed(from, to, value, result);

  msg.reply({
    embeds: [embedData],
  });
};
