import document       from 'document';
import { battery }    from 'power';
import { display } from "display";

const white = '#FFFFFF';
const orange = '#F39C12';
const red = '#FF214A';

let watchID;

export function initialize() {
    setupEvents();
    start();
}

function update() {
    let iconBattery = document.getElementById("iconBattery");
    let textBattery = document.getElementById("textBattery");

    // const metric = document.getElementById(idSelector);
    // const icon = document.getElementById(`metric${activity.metricNumber}-img`);

    // icon.style.fill   = activity.color ? activity.color : activity.iconFill;
    // metric.style.fill = activity.color ? activity.color : activity.textFill;

    // const idSelector = 'metric' + this.metricNumber;
    // const metric = document.getElementById(idSelector);
    // const icon = document.getElementById(`${idSelector}-img`);

    const level = Math.floor(battery.chargeLevel);
    const colorAndIcon = getColorAndIcon(level, battery.charging);

    iconBattery.href = colorAndIcon.icon;
    textBattery.text = `${level}%`;
    
    iconBattery.style.fill = colorAndIcon.color;
    textBattery.style.fill = colorAndIcon.color;
}

function getColorAndIcon(level = 100, charging = false) {
  if (charging) {
    return {
      color: white,
      icon: 'images/battery-charging.png',
    };
  }

  if (level > 40) {
    return {
      color: white,
      icon: 'images/battery-100.png',
    };
  }

  if (level > 20) {
    return {
      color: orange,
      icon: 'images/battery-50.png',
    };
  }

  return {
    color: red,
    icon: 'images/battery-0.png',
  };
}


function setupEvents() {
    display.addEventListener("change", function() {
        if (display.on) {
            start();
        } else {
            stop();
        }
    });
}

function start() {
    if (!watchID) {
        update();
        watchID = setInterval(update, 1000);
    }
}

function stop() {
    clearInterval(watchID);
    watchID = null;
}