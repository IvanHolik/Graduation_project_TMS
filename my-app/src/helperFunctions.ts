import { MS_IN_DAY, MS_IN_MOUNTH, MS_IN_WEEK, MS_IN_YEAR } from "./constants/constants";

export const getPubishedParam = (dateParam: string): string => {
    let ms = 0;
    switch (dateParam) {
      case "day":
        ms = MS_IN_DAY;
        break;
      case "week":
        ms = MS_IN_WEEK;
        break;
      case "mounth":
        ms = MS_IN_MOUNTH;
        break;
      case "year":
        ms = MS_IN_YEAR;
        break;

    }
    const difference = Date.now() - ms;
    const result = new Date(difference);
  // console.log(formatDate(result))
  return formatDate(result)
    // return result;
      // console.log(Date.now() - ms)
  }

  const formatDate = (date: Date) => {
    let day: string | number = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let month: string | number = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
}