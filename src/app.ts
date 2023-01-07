import "dotenv/config";
import { configs } from "./config";
import { Client, Intents } from "discord.js";
import { prune, help, pray, absen, qr, chatGpt, findImg, translateToIndonesia, tldr } from "./controller/command";
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

const rest = new REST({ version: "9" }).setToken(configs.DISCORD_BOT_TOKEN);

client.on("ready", async () => {
  console.log(`${client.user.tag} has logged in.`);
  client.user.setActivity("| g!help", { type: "LISTENING" });
  const channelGame3rb = client.channels.cache.get("881639659577425950");
  const channelCrypto = client.channels.cache.get("905782025565388840");
  const channelCrypto2 = client.channels.cache.get("909033029412995112");
  const testGuildId = ["908632787874091038", "285891020720308234"];
  // const testGuildId = ["880697006224470016"]; // TEST GUILD

  setInterval(async () => {
    console.log("Refresh [v]"):
//     await getList(channelCrypto);
//     await game3rbFeed(channelGame3rb);
//     await getList(channelCrypto2);
  }, 600000);

  testGuildId.map(async (guildId) => {
    await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
      body: commandsData(),
    });
  });
});

client.on("messageCreate", async (msg: any) => {
  if (msg.content.startsWith("g!climit")) changeLimit(msg);

  if (msg.content.startsWith("g!curr")) changeCurr(msg);

  if (msg.content.startsWith("g!prune"))
    prune({ client: client, isSlash: false, msg: msg });
  
  if (msg.content.startsWith("g!shorten")) shortenLink(msg);

  if (msg.content.startsWith("g!cvt")) convert(msg);

  if (msg.content.startsWith("g!help")) help({ isSlash: false, msg: msg });

  if (msg.content.startsWith("g!pray")) pray(msg);

  if (msg.content.startsWith("g!absen")) absen(msg);

  if (msg.content.startsWith("g!qr")) qr(msg);

  if (msg.content.startsWith("g!ask")) chatGpt(msg);

  if (msg.content.startsWith("g!image")) findImg(msg);

  if (msg.content.startsWith("g!translate")) translateToIndonesia(msg)

  if (msg.content.startsWith("g!tldr")) tldr(msg)

});

client.on("interactionCreate", async (interaction: CommandInteraction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping")
    await interaction.reply({ content: "Bot is ready", ephemeral: true });

  if (interaction.commandName === "prune")
    prune({
      msg: interaction.options.getNumber("num"),
      isSlash: true,
      client: client,
      interaction: interaction,
    });

  if (interaction.commandName === "help")
    help({ isSlash: true, interaction: interaction });
});

client.login(configs.DISCORD_BOT_TOKEN);
