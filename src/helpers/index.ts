import { configs } from "../config";
import fs from "fs";
let Parser = require("rss-parser");

export const readFile = async function (file_name: String): Promise<any> {
  let rawdata = await fs.readFileSync(`${configs.PATH_FILE}/${file_name}`);
  return JSON.parse(rawdata.toString());
};

export const createFile = async function (
  file_name: string,
  data: any
): Promise<any> {
  await fs.writeFile(
    `${configs.PATH_FILE}/${file_name}`,
    JSON.stringify(data),
    (err) => {
      if (err) return false;
      return true;
    }
  );
};

export const parseRssToJson = async function (url: string): Promise<any> {
  let parser = new Parser();
  try {
    const feed = await parser.parseURL(url);
    return feed
  } catch (error) {
    console.log("Parse RSS [Error]:", error)
    return []
  }
};
