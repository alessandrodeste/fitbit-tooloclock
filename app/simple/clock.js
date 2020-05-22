/*
  A simple clock which renders the current time and date in a digital format.
  Callback should be used to update your UI.
*/
import clock from "clock";

import { days, months, monthsShort } from "./locales/en.js";
import * as util from "./utils";

let dateFormat, clockCallback;
export let lastTime = null;

export function initialize(granularity, dateFormatString, callback) {
  dateFormat = dateFormatString;
  clock.granularity = granularity;
  clockCallback = callback;
  clock.addEventListener("tick", tickHandler);
}

function tickHandler(evt) {
  lastTime = evt.date;
  let {hours, mins, seconds} = util.timeWithPad(evt.date);
  let timeString = `${hours}:${mins}`;

  clockCallback({time: timeString, date: dateToString(evt.date), seconds});
}

function dateToString(date) {
  let dayName = days[date.getDay()];
  let month = util.zeroPad(date.getMonth() + 1);
  let monthName = months[date.getMonth()];
  let monthNameShort = monthsShort[date.getMonth()];
  let dayNumber = util.zeroPad(date.getDate());
  let dateString = date;

  switch(dateFormat) {
    case "shortDate":
      dateString = `${dayNumber} ${monthNameShort}`;
      break;
    case "mediumDate":
      dateString = `${dayName} ${monthNameShort} ${dayNumber}`;
      break;
    case "longDate":
      dateString = `${dayName} ${monthName} ${dayNumber}`;
      break;
  }
  return dateString;
}
