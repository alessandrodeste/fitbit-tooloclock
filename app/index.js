import document from "document";

import * as battery from "./simple/battery";
import * as simpleActivity from "./simple/activity";
import * as simpleClock from "./simple/clock";
import * as simpleHRM from "./simple/hrm";
import * as buttonHelper from "./buttonHelper";

let buttonBottomRight = document.getElementById("btn-br");
let buttonBottomLeft = document.getElementById("btn-bl");
let buttonBottomCentre = document.getElementById("btn-bc");
let buttonTextBottomCentre = buttonBottomCentre.getElementById("text");
let buttonTextBottomRight = document.getElementById("btn-br-text");
let buttonTextBottomLeft = document.getElementById("btn-bl-text");
let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");
let textHrm = document.getElementById("textHrm");
let iconHrm = document.getElementById("iconHrm");
let imageHrm = iconHrm.getElementById("icon");
let statsCycle = document.getElementById("stats-cycle");
let statsCycleItems = statsCycle.getElementsByClassName("cycle-item");

let lastClockTime = '--';
let lastClockTimeSeconds = undefined;

/* --------- CLOCK ---------- */
function clockCallback(data) {
  txtTime.text = data.time;
  txtDate.text = data.date;

  // Global variables
  lastClockTime = data.time;
  lastClockTimeSeconds = data.seconds;
}
simpleClock.initialize("minutes", "mediumDate", clockCallback);

/* ------- ACTIVITY --------- */
function activityCallback(data) {
  statsCycleItems.forEach((item, index) => {
    let img = item.firstChild;
    let txt = img.nextSibling;
    txt.text = data[Object.keys(data)[index]].pretty;
    // Reposition the activity icon to the left of the variable length text
    img.x = txt.getBBox().x - txt.parent.getBBox().x - img.width - 7;
  });
}
simpleActivity.initialize("seconds", activityCallback);

/* -------- Battery ------------- */
battery.initialize();

/* -------- HRM ------------- */
function hrmCallback(data) {
  textHrm.text = `${data.bpm}`;
  if (data.zone === "out-of-range") {
    imageHrm.href = "images/heart_open.png";
  } else {
    imageHrm.href = "images/heart_solid.png";
  }
  if (data.bpm !== "--") {
    iconHrm.animate("highlight");
  }
}
simpleHRM.initialize(hrmCallback);

buttonHelper.initButton(
  'buttonBottomRight',
  buttonBottomRight, 
  buttonTextBottomRight,
  buttonHelper.BUTTON_MODE.LOG_TIME
);

buttonHelper.initButton(
  'buttonBottomLeft',
  buttonBottomLeft, 
  buttonTextBottomLeft,
  buttonHelper.BUTTON_MODE.LOG_TIME
);

buttonHelper.initButton(
  'buttonBottomCentre',
  buttonBottomCentre, 
  buttonTextBottomCentre,
  buttonHelper.BUTTON_MODE.CHRON
);
