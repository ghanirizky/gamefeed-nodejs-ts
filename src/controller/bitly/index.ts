import { bitly } from "../../services";

export const shortenLink = async function (msg: any): Promise<void> {
  const content = msg.content.split(" ")[1];
  try {
    const response = await bitly(content);
    if (response.error) msg.reply(`Invalid Link`);
    else msg.reply(`Shorten Link: ***${response.data.link}***`);
  } catch (error) {
    console.log(error);
  }
};
