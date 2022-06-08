const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

function leftPad(value: number) {
  if (value >= 10) {
    return `${value}`;
  }

  return `0${value}`;
}

export function getFormattedTime(source: Date, delimiter = "-") {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return `${[year, month, day].join(delimiter)}`;
}
