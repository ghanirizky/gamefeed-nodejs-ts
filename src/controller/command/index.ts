import { EmbedMessage } from "../../embeds";
import { prayZone } from "../../services/";
import { CommandsProps, PruneCommandsProps } from "./types";
import { constants } from "../../common/constant";
import { configs } from "../../config";
import {MessageEmbed, MessageAttachment} from 'discord.js'
const QRCode = require("qrcode");

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

  if (isSlash) {
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

export const absen = async (msg: any): Promise<void> => {
  const role = msg.guild.roles.cache.find(
    (role: any) => role.id === constants.ROLE_ABSEN_ID
  );
  if (!role) return msg.reply("Role not found!");
  msg.member.roles.add(role);
  return msg.reply("Assigned a new role");
};

export const qr = async (msg: any): Promise<void> => {
  let data: string = msg.content.split(" ")[1];
  if (typeof data != "string") data = JSON.stringify(data);
  QRCode.toFile(
    `${configs.PATH_FILE}/${configs.QR_FILE_NAME}`,
    data,
    {
      width: 300,
      height: 300,
    },
    (err: any) => {
      if (err) throw err;
      const qrFile = new MessageAttachment(`${configs.PATH_FILE}/${configs.QR_FILE_NAME}`)

      return msg.reply({
        files: [qrFile]
      });
    }
  );
};
