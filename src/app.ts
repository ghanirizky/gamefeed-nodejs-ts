import "dotenv/config";
import { configs } from "./config";
import { Client, Intents } from "discord.js";
import { prune, help } from "./controller/command";
import { shortenLink } from "./controller/bitly";
import { convert } from "./controller/converter";
import { changeCurr, changeLimit, getList } from "./controller/crypto";
import { game3rbFeed } from "./controller/game3rb";

const client: any = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  console.log(`${client.user.tag} has logged in.`);
  client.user.setActivity("| g!help", { type: "LISTENING" });
  const channelGame3rb = client.channels.cache.get("960758737197486140");
  const channelCrypto = client.channels.cache.get("960736175079981096");
  const channelCrypto2 = client.channels.cache.get("960758670881345536");

  setInterval(async () => {
    await game3rbFeed(channelGame3rb);
    await getList(channelCrypto);
    await getList(channelCrypto2);
  }, 600000);
});

client.on("messageCreate", async (msg: any) => {
  if (msg.content.startsWith("g!climit")) changeLimit(msg);

  if (msg.content.startsWith("g!curr")) changeCurr(msg);

  if (msg.content.startsWith("g!prune")) prune(msg, client);

  if (msg.content.startsWith("g!shorten")) shortenLink(msg);

  if (msg.content.startsWith("g!cvt")) convert(msg);

  if (msg.content.startsWith("g!help")) help(msg);
});

client.login(configs.DISCORD_BOT_TOKEN);
