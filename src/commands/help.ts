const { SlashCommandBuilder } = require("@discordjs/builders");

export default {
  ...new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of command")
    .addStringOption((option: any) =>
      option
        .setName("command")
        .setDescription("cvt | shorten | prune | pray | qr")
        .addChoice('cvt', 'cvt')
        .addChoice('shorten', 'shorten')
        .addChoice('prune', 'prune')
        .addChoice('pray', 'pray')
        .addChoice('qr', 'qr')
    ),
};
