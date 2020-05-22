import { preferences } from "user-settings";
import * as fs from "fs";

// Add zero in front of numbers < 10
export function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export function timeWithPad(date, removeTimezone) {
  let hours = date.getHours();
  if (removeTimezone) {
    let timezone = date.getTimezoneOffset() * 60000;
    hours = new Date(date.getTime() + timezone).getHours();
  }
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  let mins = zeroPad(date.getMinutes());
  let seconds = zeroPad(date.getSeconds());
  return {hours, mins, seconds};
}

export function loadData(file, defaults) {
  try {
    return fs.readFileSync(file, "cbor");
  } catch (ex) {
    return defaults;
  }
}

export function saveData(file, data) {
  fs.writeFileSync(file, data, "cbor");
}
