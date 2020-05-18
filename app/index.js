import document from "document";

import * as battery from "./simple/battery";
import * as simpleActivity from "./simple/activity";
import * as simpleClock from "./simple/clock";
import * as simpleHRM from "./simple/hrm";

let btnBR = document.getElementById("btn-br");
let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");
let textHrm = document.getElementById("textHrm");
let iconHrm = document.getElementById("iconHrm");
let imageHrm = iconHrm.getElementById("icon");
let statsCycle = document.getElementById("stats-cycle");
let statsCycleItems = statsCycle.getElementsByClassName("cycle-item");

/* --------- CLOCK ---------- */
function clockCallback(data) {
  txtTime.text = data.time;
  txtDate.text = data.date;
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

/* -------- Button Primary -------- */
btnBR.onactivate = function(evt) {
    console.log("Bottom right pressed");
}
