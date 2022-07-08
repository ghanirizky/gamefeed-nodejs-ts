import path from "path";
const rootPath: string = path.resolve(__dirname, "../..");

export const configs = {
  DISCORD_BOT_TOKEN: process.env.BOT_TOKEN,
  PATH_FILE: `${rootPath}/${process.env.PATH_FILE}`,
  PREFIX: process.env.PREFIX,
  BITLY_TOKEN: process.env.BITLY_TOKEN,
  LIVECOIN_KEY: process.env.LIVECOIN_KEY,
  QR_FILE_NAME : 'qr.png'
};
