"use strict";

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = new Date();

for (let day of week) {
  if (day === week[date.getDay()]) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<br><strong>${day}</strong>`
    );
  } else if (day === "Saturday" || day === "Sunday") {
    document.body.insertAdjacentHTML("beforeend", `<br><i>${day}</i>`);
  } else {
    document.body.insertAdjacentHTML("beforeend", `<br>${day}`);
  }
}
console.log();
