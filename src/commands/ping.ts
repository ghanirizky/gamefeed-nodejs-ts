const { SlashCommandBuilder } = require("@discordjs/builders");

export default {
  ...new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot status")
};

