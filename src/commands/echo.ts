const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("reply with pong");

export default data;
