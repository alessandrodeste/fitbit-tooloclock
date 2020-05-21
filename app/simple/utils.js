import { preferences } from "user-settings";

// Add zero in front of numbers < 10
export function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export function timeWithPad(date) {
  let hours = date.getHours();
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
