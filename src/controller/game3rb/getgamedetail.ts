export const getGameDetail = function (data: any): any {
  const arr = data.split(":");

  const gameDetail: any = {
    title: arr[1].replace("Size", "").trim(),
    size: arr[2].replace("Title", "").trim(),
    genre: arr[4].includes("Developer")
      ? arr[4].replace("Developer", "").trim()
      : arr[4].replace("Release Date", "").trim(),
  };

  if (arr[4].includes("Developer")) {
    (gameDetail.developer = arr[5].replace("Publisher", "").trim()),
      (gameDetail.publisher = arr[6].replace("Release Date", "").trim());
    gameDetail.release_date = arr[7].replace("ALL REVIEWS", "").trim();
    if (arr[9] && arr[9].includes("store.steampowered.com")) {
      gameDetail.steam_url = `https:${arr[9].split(" ")[0]}`;
    }
  } else if (arr[4].includes("Release Date")) {
    if (arr[5].includes("ALL REVIEWS")) {
      gameDetail.release_date = arr[5].replace("ALL REVIEWS", "").trim();
      if (arr[7] && arr[7].includes("store.steampowered.com")) {
        gameDetail.steam_url = `https:${arr[7].split(" ")[0]}`;
      }
    } else {
      const temp = arr[5].split(",");
      gameDetail.release_date = `${temp[0]}, ${temp[1].trim().substring(0, 4)}`;
      if (arr[6] && arr[6].includes("store.steampowered.com")) {
        gameDetail.steam_url = `https:${arr[6].split(" ")[0]}`;
      }
    }
  }

  return gameDetail;
};
