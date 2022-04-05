export const prayTimeEmbed = function ({
  Imsak,
  Fajr,
  Dhuhr,
  Asr,
  Maghrib,
  Isha,
}: any): any {
  return {
    title: "Prayer Time (Jakarta)",
    color: 5814783,
    fields: [
      {
        name: "Imsak",
        value: Imsak,
        inline: true,
      },
      {
        name: "Subuh",
        value: Fajr,
        inline: true,
      },
      {
        name: "Dzuhur",
        value: Dhuhr,
        inline: true,
      },
      {
        name: "Ashar",
        value: Asr,
        inline: true,
      },
      {
        name: "Maghrib",
        value: Maghrib,
        inline: true,
      },
      {
        name: "Isha",
        value: Isha,
        inline: true,
      },
    ],
    timestamp: new Date(),
  };
};
