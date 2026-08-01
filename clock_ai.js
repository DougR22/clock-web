const digitalTime = document.querySelector("#digitalTime");
const dateLine = document.querySelector("#dateLine");
const clockMarks = document.querySelector("#clockMarks");
const hourHand = document.querySelector("#hourHand");
const minuteHand = document.querySelector("#minuteHand");
const secondHand = document.querySelector("#secondHand");

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  hour12: false
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long"
});

const zoneFormatter = new Intl.DateTimeFormat("en-US", {
  timeZoneName: "short"
});

function getTimeZoneName(date) {
  const parts = zoneFormatter.formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

function getLocalDateText(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function drawClockMarks() {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const fragment = document.createDocumentFragment();

  for (let mark = 0; mark < 60; mark += 1) {
    const isMajor = mark % 5 === 0;
    const line = document.createElementNS(svgNamespace, "line");

    line.setAttribute("x1", "50");
    line.setAttribute("y1", "2.5");
    line.setAttribute("x2", "50");
    line.setAttribute("y2", isMajor ? "10.5" : "5.0");
    line.setAttribute("transform", `rotate(${mark * 6} 50 50)`);
    line.setAttribute("class", isMajor ? "major-mark" : "minor-mark");

    fragment.append(line);
  }

  clockMarks.append(fragment);
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  const secondDegrees = ((seconds + milliseconds / 1000) / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = (((hours % 12) + minutes / 60) / 12) * 360;

  hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;

  const digitalText = timeFormatter.format(now);
  const dateText = getLocalDateText(now);
  const weekday = weekdayFormatter.format(now);
  const zone = getTimeZoneName(now);

  digitalTime.textContent = digitalText;
  digitalTime.dateTime = now.toISOString();
  dateLine.textContent = `${dateText} -- ${weekday} -- ${digitalText} ${zone}`;
  dateLine.dateTime = now.toISOString();

  requestAnimationFrame(updateClock);
}

drawClockMarks();
updateClock();
