export function getYearById(userId: string) {
  const numberUserId = Number(userId);

  if (numberUserId < 8878375) return 2013;
  if (numberUserId < 49893595) return 2014;
  if (numberUserId < 137274142) return 2015;
  if (numberUserId < 301597198) return 2016;
  if (numberUserId < 565862473) return 2017;
  if (numberUserId < 930790529) return 2018;
  if (numberUserId < 1396381363) return 2019;
  if (numberUserId < 1967739386) return 2020;
  if (numberUserId < 2747035586) return 2021;
  if (numberUserId < 3546379282) return 2022;
  if (numberUserId < 4445428505) return 2023;
  if (numberUserId < 5360428505) return 2024;
  if (numberUserId < 8000000000) return 2025;

  return new Date().getFullYear();
}
