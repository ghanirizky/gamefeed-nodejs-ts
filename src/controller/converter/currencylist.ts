import { configs } from "../../config";

export const currencyList = function (msg: any): void {
  msg.reply({
    files: [`${configs.PATH_FILE}/currency.json`],
  });
};
