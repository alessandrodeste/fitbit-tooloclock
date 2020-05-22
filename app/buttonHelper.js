
import { vibration } from "haptics";
import * as util from "./simple/utils";
import * as simpleClock from "./simple/clock";
import { me } from "appbit";

export const BUTTON_MODE = {
  LOG_TIME: 'LOG_TIME', 
  CHRON: 'CHRON'
};

export function initButton(name, buttonRef, buttonTextRef, mode) {
  const fileName = name + '.json';
  let btnPressTime = undefined;
  let intervalID = null;
  let startX = null;
  let startY = null;
  let executeActionOnce = false;
  let chronStartTime = null;
  let chronRunning = false;
  let chronTimeAcc = 0;
  let tachymeterMod = false;
  let settachymeterModOnce = false;
  let value = '';

  const setValue = function(val) {
    buttonTextRef.text = val;
    value = buttonTextRef.text; // to store the crop value
  }

  const oldOnunload = typeof me.onunload === "function" ? me.onunload : () => {};
  me.onunload = () => {
    oldOnunload();
    util.saveData(fileName, {
      value, 
      chronStartTime: !chronStartTime ? null : chronStartTime.getTime(), 
      chronTimeAcc
    });
  }

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
    if (mode === BUTTON_MODE.CHRON && !settachymeterModOnce && (startY - evt.screenY) < -20) {
      tachymeterMod = !tachymeterMod;
      settachymeterModOnce = true;
      chronUpdate();
    } else if (Math.abs(startY - evt.screenY) > 30 ||  Math.abs(startX - evt.screenX) > 30) {
      stopInterval();
    }
  }

  const buttonAction = function(mode) {
    switch (mode) {
      case BUTTON_MODE.LOG_TIME: 
        let {hours, mins} = util.timeWithPad(simpleClock.lastTime);
        setValue(`${hours}:${mins}`);
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
        setValue('--');
        break;
      case BUTTON_MODE.CHRON: 
        chronReset();
        break;
    }
  }

  const chronStart = function() {
    chronStartTime = simpleClock.lastTime;
    chronRunUpdate();
  }

  const chronPause = function() {
    chronTimeAcc = chronTimeAcc + (simpleClock.lastTime - chronStartTime);
    chronStartTime = null;
    clearInterval(chronRunning);
    chronRunning = null;
    chronUpdate();
  }

  const chronReset = function() {
    chronStartTime = null;
    chronTimeAcc = 0;
    clearInterval(chronRunning);
    chronRunning = null;
    setValue('--:--:--');
  }

  const chronRunUpdate = function() {
    chronRunning = setInterval(chronUpdate, 100);
  }

  const chronUpdate = function() {
    const diff = !chronStartTime ? chronTimeAcc : chronTimeAcc + (simpleClock.lastTime - chronStartTime);
    const diffDate = new Date(diff);
    if (tachymeterMod && diffDate.getTime()) {
      const times = 3600 / (diffDate.getTime() / 1000);
      const timeRounded = times > 20 ? Math.floor(times) : Math.round(times * 100) / 100;
      setValue(timeRounded);
    } else {
      const { hours, mins, seconds } = util.timeWithPad(diffDate, true);
      setValue(`${hours}:${mins}:${seconds}`);
    }
  }

  const onLoad = function() {
    const previousValues = util.loadData(fileName, {value: null, chronStartTime: null, chronTimeAcc: null})
    if (previousValues && previousValues.value) {
      setValue(previousValues.value);
      if (mode === BUTTON_MODE.CHRON) {
        chronStartTime = previousValues.chronStartTime ? new Date(previousValues.chronStartTime) : null;
        chronTimeAcc = previousValues.chronTimeAcc;
        if (previousValues.chronStartTime) {
          chronRunUpdate();
        }
      }
    }
  }
  onLoad();
}
