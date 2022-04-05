import { EmbedMessage } from "../../embeds";
import { prayZone } from "../../services/";

export const prune = function (msg: any, client: any): void {
  const content: number = msg.content.split(" ")[1];
  if (!isNaN(content)) {
    if (content > 100 || content < 0)
      return msg.reply("The valid number to delete message is [1 - 100]");

    const tempChannel = client.channels.cache.get(msg.channelId);
    tempChannel.bulkDelete(content);
    return;
  }
};

export const help = function (msg: any): void {
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
