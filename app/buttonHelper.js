
import { vibration } from "haptics";

let btnPressTime = undefined;
let intervalID = null;
let startX = null;
let startY = null;

export function initButton(buttonRef, callbackSetTime) {
  let setFlag = false;

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
      callbackSetTime(false);
      stopInterval();
      vibration.start("ping");
    } else if (diff > 300 && setFlag == false) {
      callbackSetTime(true);
      setFlag = true;
      vibration.start("bump");
    }
  };

  buttonRef.onmousedown = function(evt) {
    btnPressTime = Date.now();

    if (!intervalID) {
      setFlag = false;
      intervalID = setInterval(checkButtonPress, 100);
    }
    startY = evt.screenY;
    startX = evt.screenX;
  }
  
  buttonRef.onmouseup = function(evt) {
    stopInterval();
  }

  // if you are swiping stop the button behaviour
  buttonRef.onmousemove = function(evt) {
    if (Math.abs(startY - evt.screenY) > 10 ||  Math.abs(startX - evt.screenX) > 10) {
      stopInterval();
    }
  }
}
