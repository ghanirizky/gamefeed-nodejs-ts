import { readFile, createFile, parseRssToJson } from "../../helpers";

export const getLatestFeed = async function (
  url_feed: string,
  file_name: string
): Promise<any> {
  const rssData = await parseRssToJson(url_feed);
  const feed = rssData.items;
  if (feed) {
    const data = await readFile(file_name);
    if (data.last_date != feed[0].isoDate) {
      let lastIndex = feed.findIndex((e: any) => e.isoDate == data.last_date);
      if (!lastIndex) {
        lastIndex = feed.length - 1;
      }
      const newestFeed = feed.slice(0, lastIndex);
      await createFile(file_name, { last_date: feed[0].isoDate });

      return newestFeed.sort(function (a: any, b: any) {
        return +new Date(a.isoDate) - +new Date(b.isoDate);
      });
    }
    return [];
  }
};
