import document from "document";

import * as battery from "./simple/battery";
import * as simpleActivity from "./simple/activity";
import * as simpleClock from "./simple/clock";
import * as simpleHRM from "./simple/hrm";
import { vibration } from "haptics";

let btnBR = document.getElementById("btn-br");
let btnBL = document.getElementById("btn-bl");
let btnBC = document.getElementById("btn-bc");
let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");
let textHrm = document.getElementById("textHrm");
let iconHrm = document.getElementById("iconHrm");
let imageHrm = iconHrm.getElementById("icon");
let statsCycle = document.getElementById("stats-cycle");
let statsCycleItems = statsCycle.getElementsByClassName("cycle-item");
let buttonBC = btnBC.getElementById("text");
let buttonBR = document.getElementById("btn-br-text");
let buttonBL = document.getElementById("btn-bl-text");

let lastClockTime = '--';
let lastClockTimeSeconds = undefined;
let today = undefined;

function newDayReset(date) {
  today = date;
  buttonBR.text = '--';
  buttonBL.text = '--';
}

/* --------- CLOCK ---------- */
function clockCallback(data) {
  txtTime.text = data.time;
  txtDate.text = data.date;

  // Global variables
  lastClockTime = data.time;
  lastClockTimeSeconds = data.seconds;
  
  // if it's a new day
  if (today != data.date) {
    newDayReset(data.date)
  }
}
simpleClock.initialize("minutes", "longDate", clockCallback);

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

/* -------- HRM ------------- */
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

/* -------- Button Bottom Right -------- */
let btnBRPressTime = undefined;
btnBR.onmousedown = function(evt) {
  btnBRPressTime = Date.now();
}
btnBR.onmouseup = function(evt) {
  let now = Date.now();
  let diff = now - btnBRPressTime;
  if (diff > 2000) {
    buttonBR.text = '--';
    vibration.start("ping");
  } else if (diff > 500) {
    buttonBR.text = lastClockTime;
    vibration.start("bump");
  }
}

/* -------- Button Bottom Left -------- */
let btnBLPressTime = undefined;
btnBL.onmousedown = function(evt) {
  btnBLPressTime = Date.now();
}
btnBL.onmouseup = function(evt) {
  let now = Date.now();
  let diff = now - btnBLPressTime;
  if (diff > 2000) {
    buttonBL.text = '--';
    vibration.start("ping");
  } else if (diff > 500) {
    buttonBL.text = lastClockTime;
    vibration.start("bump");
  }
}

/* -------- Button Bottom Centre -------- */
let btnBCPressTime = undefined;
btnBC.onmousedown = function(evt) {
  btnBCPressTime = Date.now();
}
btnBC.onmouseup = function(evt) {
  let now = Date.now();
  let diff = now - btnBCPressTime;
  if (diff > 2000) {
    buttonBC.text = '--:--:--';
    vibration.start("ping");
  } else {
    buttonBC.text = lastClockTime + ':' + lastClockTimeSeconds;
    vibration.start("bump");
  }
}
