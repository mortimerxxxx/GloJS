/* eslint-disable arrow-parens */
/* eslint-disable strict */
// eslint-disable-next-line strict
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let $usd, $rub;

  fetch("https://api.exchangeratesapi.io/latest")
    .then((response) => response.json())
    .then((response) => {
      $usd = response.rates.USD;
      $rub = response.rates.RUB;
    });

  const convertFrom = document.querySelector(".convert-from"),
    convertTo = document.querySelector(".convert-to"),
    fromUsd = document.querySelector(".currency-usd-left"),
    fromEur = document.querySelector(".currency-eur-left"),
    fromRub = document.querySelector(".currency-rub-left"),
    toUsd = document.querySelector(".currency-usd-right"),
    toEur = document.querySelector(".currency-eur-right"),
    toRub = document.querySelector(".currency-rub-right"),
    eqText = document.querySelector(".equalization-text"),
    allBtnLeft = document.querySelectorAll(".left-btn"),
    allBtnRight = document.querySelectorAll(".right-btn");

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (
      !target.matches(
        ".convert, .currency-eur-left, .currency-rub-left, .currency-usd-left, .currency-eur-right, .currency-rub-right, .currency-usd-right"
      )
    ) {
      return;
    }

    eqText.textContent = "1 EUR = " + $usd + " USD = " + $rub + " RUB";
    let convertData;

    if (
      target.closest(
        ".currency-eur-left, .currency-rub-left, .currency-usd-left"
      )
    ) {
      console.log(target);
      allBtnLeft.forEach((element) => {
        element.style.background = "rgb(239, 239, 239)";
        element.classList.remove("active-left");
      });
      target.style.background = "rgb(255, 251, 0)";
      target.classList.add("active-left");
    }

    if (
      target.closest(
        ".currency-eur-right, .currency-rub-right, .currency-usd-right"
      )
    ) {
      console.log(target);
      allBtnRight.forEach((element) => {
        element.style.background = "rgb(239, 239, 239)";
        element.classList.remove("active-right");
      });
      target.style.background = "rgb(255, 251, 0)";
      target.classList.add("active-right");
    }

    if (target.closest(".convert")) {
      //!USD
      if (
        fromUsd.classList.contains("active-left") &&
        toUsd.classList.contains("active-right")
      ) {
        convertData = +convertFrom.value;
      }

      if (
        fromUsd.classList.contains("active-left") &&
        toEur.classList.contains("active-right")
      ) {
        convertData = +convertFrom.value / $usd;
      }

      if (
        fromUsd.classList.contains("active-left") &&
        toRub.classList.contains("active-right")
      ) {
        convertData = ($rub / $usd) * Number(convertFrom.value);
      }

      //!EUR
      if (
        fromEur.classList.contains("active-left") &&
        toUsd.classList.contains("active-right")
      ) {
        convertData = Number(convertFrom.value) * $usd;
      }

      if (
        fromEur.classList.contains("active-left") &&
        toEur.classList.contains("active-right")
      ) {
        convertData = Number(convertFrom.value);
      }

      if (
        fromEur.classList.contains("active-left") &&
        toRub.classList.contains("active-right")
      ) {
        convertData = $rub * Number(convertFrom.value);
      }

      //!RUB
      if (
        fromRub.classList.contains("active-left") &&
        toUsd.classList.contains("active-right")
      ) {
        convertData = (Number(convertFrom.value) * $usd) / $rub;
      }

      if (
        fromRub.classList.contains("active-left") &&
        toEur.classList.contains("active-right")
      ) {
        convertData = (1 / $rub) * Number(convertFrom.value);
      }

      if (
        fromRub.classList.contains("active-left") &&
        toRub.classList.contains("active-right")
      ) {
        convertData = Number(convertFrom.value);
      }

      convertTo.value = +convertData.toFixed(4);
    }
  });
});
