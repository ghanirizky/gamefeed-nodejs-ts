import { getGameDetail } from "./getgamedetail";
import { getLatestFeed } from "./getlatestfeed";
import { EmbedMessage } from "../../embeds";
import { constants } from "../../common/constant";

export const game3rbFeed = async function (channel: any): Promise<void> {
  const data = await getLatestFeed(
    constants.URL_FEED_GAME3RB,
    constants.FILE_GAME3RB
  );
  console.log(`Checking [${constants.URL_FEED_GAME3RB}] feed... [v]`);
  console.log("New Feed: ", data.length);
  if (data.length) {
    for (const item of data) {
      const gameDetail = getGameDetail(item.content);
      const embedData = EmbedMessage.game3rbEmbed(
        item.title,
        item.link,
        "Game3rb",
        "https://www.game3rb.com",
        item.content,
        item.categories.join(","),
        item.isoDate,
        gameDetail
      );
      channel.send({ embeds: [embedData] });
    }
  } else {
    console.log(`There's no new feed... [${constants.URL_FEED_GAME3RB}] [v]`);
  }
};
