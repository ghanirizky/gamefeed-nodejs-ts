const { SlashCommandBuilder } = require("@discordjs/builders");

export default {
  ...new SlashCommandBuilder()
    .setName("prune")
    .setDescription("Delete message in channel")
    .addNumberOption((option: any) => option.setName('num').setDescription('Enter a number [1-100]').setRequired(true))
};
