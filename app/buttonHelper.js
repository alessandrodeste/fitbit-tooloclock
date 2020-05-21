
import { vibration } from "haptics";
import * as util from "./simple/utils";
import * as simpleClock from "./simple/clock";

let btnPressTime = undefined;
let intervalID = null;
let startX = null;
let startY = null;

export const BUTTON_MODE = {
  LOG_TIME: 'LOG_TIME', 
  CHRON: 'CHRON'
};

export function initButton(buttonRef, buttonTextRef, mode) {
  let executeActionOnce = false;
  let chronStartTime = null;
  let chronRunning = false;
  let chronTimeAcc = 0;
  let tachymeterMod = false;
  let settachymeterModOnce = false;

  const stopInterval = function() {
    if (intervalID) {
      clearInterval(intervalID);
      intervalID = null;
    }
  }
  
  const checkButtonPress = function () {
    let now = Date.now();
    let diff = now - btnPressTime;
    if (diff > 1500) {
      buttonReset(mode);
      stopInterval();
      vibration.start("ping");
    } else if (diff > 300 && executeActionOnce == false) {
      buttonAction(mode);
      executeActionOnce = true;
      vibration.start("bump");
    }
  };

  buttonRef.onmousedown = function(evt) {
    btnPressTime = Date.now();

    if (!intervalID) {
      executeActionOnce = false;
      intervalID = setInterval(checkButtonPress, 100);
    }
    startY = evt.screenY;
    startX = evt.screenX;
  }
  
  buttonRef.onmouseup = function(evt) {
    stopInterval();
    settachymeterModOnce = false;
  }

  // if you are swiping stop the button behaviour
  buttonRef.onmousemove = function(evt) {
    if (mode === BUTTON_MODE.CHRON && !settachymeterModOnce && (startY - evt.screenY) < 50) {
      tachymeterMod = !tachymeterMod;
      settachymeterModOnce = true;
    } else if (Math.abs(startY - evt.screenY) > 30 ||  Math.abs(startX - evt.screenX) > 30) {
      stopInterval();
    }
  }
  
  const buttonAction = function(mode) {
    switch (mode) {
      case BUTTON_MODE.LOG_TIME: 
        let {hours, mins} = util.timeWithPad(simpleClock.lastTime);
        buttonTextRef.text = `${hours}:${mins}`;
        break;
      case BUTTON_MODE.CHRON: 
        if (chronRunning) {
          chronPause();
        } else {
          chronStart();
        }
        break;
    }
  }
  
  const buttonReset = function(mode) {
    switch (mode) {
      case BUTTON_MODE.LOG_TIME: 
        buttonTextRef.text = '--';
        break;
      case BUTTON_MODE.CHRON: 
        chronReset();
        break;
    }
  }

  const chronStart = function() {
    chronStartTime = simpleClock.lastTime;
    chronRunning = setInterval(chronUpdate, 100);
  }

  const chronPause = function() {
    clearInterval(chronRunning);
    chronRunning = null;
    chronTimeAcc = chronTimeAcc + (simpleClock.lastTime - chronStartTime);
  }

  const chronReset = function() {
    chronStartTime = null;
    chronTimeAcc = 0;
    clearInterval(chronRunning);
    chronRunning = null;
    buttonTextRef.text = '--:--:--';
  }

  const chronUpdate = function() {
    const diff = new Date(chronTimeAcc + (simpleClock.lastTime - chronStartTime));
    if (tachymeterMod && diff.getTime()) {
      const times = 3600 / (diff.getTime() / 1000);
      const timeRounded = times > 20 ? Math.floor(times) : Math.round(times * 100) / 100;
      buttonTextRef.text = timeRounded;
    } else {
      const {hours, mins, seconds} = util.timeWithPad(diff, true);
      buttonTextRef.text = `${hours}:${mins}:${seconds}`;
    }
  }
}
