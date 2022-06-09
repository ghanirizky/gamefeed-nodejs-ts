import { EmbedMessage } from "../../embeds";
import { prayZone } from "../../services/";
import { CommandsProps, PruneCommandsProps } from "./types";

export const prune = function (props: PruneCommandsProps): void {
  const { isSlash, msg, interaction, client } = props;
  if (!isSlash) {
    let content: number = msg.content.split(" ")[1];

    if (content > 100 || content < 0)
      return msg.reply("The valid number to delete message is [1 - 100]");
    const tempChannel = client.channels.cache.get(msg.channelId);
    tempChannel.bulkDelete(content, true);
    return;
  } else {
    let content: number = msg;
    if (content > 100 || content < 0)
      return msg.reply("The valid number to delete message is [1 - 100]");

    const tempChannel = client.channels.cache.get(interaction.channelId);
    tempChannel.bulkDelete(content, true);
    interaction.reply({ content: "Message Deleted", ephemeral: true });
    return;
  }
};

export const help = function (props: CommandsProps): void {
  const { isSlash, msg, interaction } = props;

  if (!isSlash) {
    const subCommand = interaction.options.getString("command");
    if (!subCommand)
      return interaction.reply({
        embeds: [EmbedMessage.helpEmbed],
      });

    const commandFind = EmbedMessage.commandList.find(
      (list) => list.key === subCommand
    );

    return interaction.reply({
      embeds: [commandFind?.embed],
    });
  } else {
    const content: string = msg.content.split(" ")[1];
    if (!content)
      return msg.reply({
        embeds: [EmbedMessage.helpEmbed],
      });

    const commandFind = EmbedMessage.commandList.find(
      (list) => list.key === content
    );
    if (!commandFind) return msg.reply("Command not found");
    return msg.reply({
      embeds: [commandFind.embed],
    });
  }
};

export const pray = async function (msg: any): Promise<void> {
  try {
    const response = await prayZone();
    const data = response.data.results.datetime;
    const embedData = EmbedMessage.prayTimeEmbed(data[0].times);
    return msg.reply({
      embeds: [embedData],
    });
  } catch (error) {
    console.log("Pray data error");
  }
};
