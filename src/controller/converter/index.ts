import { convertMoney } from "./convertmoney";
import { currencyList } from "./currencylist";

export const convert = function (msg: any): void {
  const content = msg.content.split(" ");

  if (content.length == 2) {
    if (content[1] === "list") currencyList(msg);
    else msg.reply("Format command salah!, ex: ***g!cvt USD IDR 10***");
    return;
  }

  if (content.length > 2) {
    const from = content[1];
    const to = content[2];
    const amount = content[3] ? Number(content[3]) : 1;
    if (isNaN(amount))
      return msg.reply(
        "Format command salah!\nFormat: ***g!cvt [FROM] [TO] [AMOUNT]***\ncontoh: ***g!cvt USD IDR 10***"
      );

    convertMoney(from.toUpperCase(), to.toUpperCase(), amount, msg);
    return;
  }
  msg.reply("Format command salah!");
};
