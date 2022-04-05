import { MessageEmbed } from "discord.js";
import { constants } from "../common/constant";

const checkString = function (string: string): string {
  return string ? string : "-";
};

export const game3rbEmbed = function (
  title: string,
  url: string,
  author: string,
  author_url: string,
  description: string,
  categories: string,
  iso_date: string,
  game_detail: any
): any {
  let exampleEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(title)
    .setURL(url)
    .setAuthor(author, constants.PATH_IMAGE, author_url)
    .addFields({ name: "Categories", value: categories })
    .setTimestamp(new Date(iso_date))
    .setImage(constants.PATH_IMAGE);

  if (description.includes("Game Details")) {
    exampleEmbed.addFields(
      { name: "Title", value: checkString(game_detail.title) },
      { name: "Size", value: checkString(game_detail.size) },
      { name: "Genre", value: checkString(game_detail.genre) },
      { name: "Release Date", value: checkString(game_detail.release_date) }
    );
    if (game_detail.developer) {
      exampleEmbed.addFields({
        name: "Developer / Publisher",
        value: `${checkString(game_detail.developer)} / ${checkString(
          game_detail.publisher
        )}`,
      });
    }
    if (game_detail.steam_url) {
      exampleEmbed.addFields({
        name: "Support the Game",
        value: checkString(game_detail.steam_url),
      });
    }
  } else {
    exampleEmbed.setDescription(checkString(description));
  }
  return exampleEmbed;
};
