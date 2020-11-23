"use strict";

//part1

function changeHourString(x) {
  let datum = x.toLocaleDateString("ru").split(".");
  let timus = x.toLocaleTimeString("ru-RU").split(":");
  let month = "января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря".split(
    ","
  );
  let day = "Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота".split(
    ","
  );
  let h;
  if (timus[0] >= 0 && timus[0] <= 20) {
    if (timus[0] === "01") {
      h = "час";
    } else if (timus[0] === "02" || timus[0] === "03" || timus[0] === "04") {
      h = "часа";
    } else {
      h = "часов";
    }
  } else if (timus[0] > 20 && timus[0] < 100) {
    if (timus[0] % 10 === 1) {
      h = "час";
    } else if (
      timus[0] % 10 === 2 ||
      timus[0] % 10 === 3 ||
      timus[0] % 10 === 4
    ) {
      h = "часа";
    } else {
      h = "часов";
    }
  }

  document.querySelector(".x-block").innerHTML =
    "Сегодня " +
    day[x.getDay()] +
    ", " +
    datum[1] +
    " " +
    month[x.getMonth()] +
    " " +
    datum[2] +
    " года, " +
    timus[0] +
    " " +
    h +
    " " +
    timus[1] +
    " минут " +
    timus[2] +
    " секунд";
}


//part2

function iLoveZero(x) {
  let numbersDateString = x.toLocaleDateString("ru-RU");
  let timeString = x.toLocaleTimeString("ru-RU");
  let date = numbersDateString.split(".");
  let time = timeString.split(":");
  let zeroDate = [];
  let zeroTime = [];
  for (let x of date) {
    if (x.length < 2) {
      zeroDate.push("0" + x);
    } else {
      zeroDate.push(x);
    }
  }

  for (let x of time) {
    if (x.length < 2) {
      zeroTime.push("0" + x);
    } else {
      zeroTime.push(x);
    }
  }

  document.querySelector(".reality").innerHTML =
    zeroDate.join(".") + " - " + zeroTime.join(":");
}

//Creating DOMobjects
let partA = document.createElement("div");
document.body.appendChild(partA);
partA.classList.add("x-block");

let $reality = document.createElement("div");
document.body.appendChild($reality);
$reality.classList.add("reality");



//part3 setInterval f

setInterval(function () {
  let x = new Date();
  changeHourString(x);
  iLoveZero(x);
}, 1000);
