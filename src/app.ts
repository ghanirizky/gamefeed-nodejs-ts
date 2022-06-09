import "dotenv/config";
import { configs } from "./config";
import { Client, Intents } from "discord.js";
import { prune, help, pray } from "./controller/command";
import { shortenLink } from "./controller/bitly";
import { convert } from "./controller/converter";
import { changeCurr, changeLimit, getList } from "./controller/crypto";
import { game3rbFeed } from "./controller/game3rb";
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
import { commandsData } from "./helpers";
import { CommandInteraction } from "discord.js";

const client: any = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// const rest = new REST({ version: "9" }).setToken(configs.DISCORD_BOT_TOKEN);

client.on("ready", async () => {
  console.log(`${client.user.tag} has logged in.`);
  client.user.setActivity("| g!help", { type: "LISTENING" });
  const channelGame3rb = client.channels.cache.get("881639659577425950");
  const channelCrypto = client.channels.cache.get("905782025565388840");
  const channelCrypto2 = client.channels.cache.get("909033029412995112");
  const testGuildId = "908632787874091038"

  setInterval(async () => {
    await game3rbFeed(channelGame3rb);
    await getList(channelCrypto);
    await getList(channelCrypto2);
  }, 600000);

  // await rest.put(Routes.applicationGuildCommands(client.user.id, testGuildId), {
  //   body: commandsData(),
  // });
});

client.on("messageCreate", async (msg: any) => {
  if (msg.content.startsWith("g!climit")) changeLimit(msg);

  if (msg.content.startsWith("g!curr")) changeCurr(msg);

  if (msg.content.startsWith("g!prune")) prune(msg, client);

  if (msg.content.startsWith("g!shorten")) shortenLink(msg);

  if (msg.content.startsWith("g!cvt")) convert(msg);

  if (msg.content.startsWith("g!help")) help(msg);

  if (msg.content.startsWith("g!pray")) pray(msg);
});

// client.on("interactionCreate", async (interaction : CommandInteraction) => {
//   if (!interaction.isCommand()) return;

//   if (interaction.commandName === "ping")
//     await interaction.reply("Bot is ready");

//   if (interaction.commandName === "prune") prune(interaction.options.getNumber('num'), client, true, interaction)
  
// });

client.login(configs.DISCORD_BOT_TOKEN);
