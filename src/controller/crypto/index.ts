import { createFile, readFile } from "../../helpers";
import { constants } from "../../common/constant";
import { liveCrypto } from "../../services";
import { EmbedMessage } from "../../embeds";

export const changeCurr = async function (msg: any): Promise<void> {
  const content = msg.content.split(" ")[1];

  if (!content.match("IDR") && !content.match("USD"))
    return msg.reply("***The available currency are [IDR, USD]***");

  const data = await readFile(constants.FILE_CRYPTO_LIST);
  data.currency = content;
  await createFile(constants.FILE_CRYPTO_LIST, data);
  return msg.reply(`Success set crypto list currency to ***${content}***`);
};

export const changeLimit = async function (msg: any): Promise<void> {
  const content = msg.content.split(" ")[1];

  if (!isNaN(content))
    msg.reply("***The valid number to list the crypto list are [3 - 100]***");

  if (content > 100 || content < 3)
    msg.reply("***The valid number to list the crypto list are [3 - 100]***");

  const data = await readFile(constants.FILE_CRYPTO_LIST);
  data.limit = Number(content);
  await createFile(constants.FILE_CRYPTO_LIST, data);
  msg.reply(`Success set crypto list limit to ***${content}***`);
};

export const getList = async function (channel: any): Promise<void> {
  const response = await liveCrypto();
  if (response.error) return console.log("Fetching Crypto Data Error [v]");
  let index = 1;
  await channel.bulkDelete(100, true);
  response.data.forEach(async (crypto: any) => {
    const embedData = await EmbedMessage.createEmbedCryptoList(crypto, index++);
    channel.send({ embeds: [embedData] });
  });
};
