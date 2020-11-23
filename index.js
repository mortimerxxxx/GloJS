// eslint-disable-next-line strict
"use strict";

const animationArena = document.querySelector(".animation-arena"),
  ball = document.querySelector(".ball"),
  start = document.querySelector(".start"),
  pause = document.querySelector(".pause"),
  reset = document.querySelector(".reset"),
  $HEIGHT = ball.getBoundingClientRect().height,
  $WIDTH = ball.getBoundingClientRect().width,
  $RADIUS = 100;

let startWidth = ball.getBoundingClientRect().width,
  startHeight = ball.getBoundingClientRect().height,
  startBorderRadius = 100,
  bigBang,
  manipulator;

const getPlus = () => {
  startWidth += 5;
  startHeight += 5;
  startBorderRadius -= 5;
};

const getMinus = () => {
  startWidth -= 5;
  startHeight -= 5;
  startBorderRadius += 5;
};

// eslint-disable-next-line arrow-parens
document.querySelector(".control-panel").addEventListener("click", (event) => {
  const target = event.target;

  if (!target.matches("button")) {
    return;
  }

  console.log(target);
  if (target === start) {
    start.disabled = true;
    const animation = () => {
      bigBang = requestAnimationFrame(animation);
      if (startHeight === $HEIGHT) {
        manipulator = getPlus;
        console.log(startHeight, animationArena.getBoundingClientRect().height);
      }
      if (startHeight === animationArena.getBoundingClientRect().height) {
        manipulator = getMinus;
      }
      manipulator();

      ball.style.width = `${startWidth}px`;
      ball.style.height = `${startHeight}px`;
      ball.style.borderRadius = `${startBorderRadius}%`;
      console.log(startWidth);
      console.log(startHeight);
    };
    animation();
  }

  if (target === pause) {
    start.disabled = false;
    cancelAnimationFrame(bigBang);
  }

  if (target === reset) {
    start.disabled = false;
    cancelAnimationFrame(bigBang);
    ball.style.width = `${$HEIGHT}px`;
    ball.style.height = `${$WIDTH}px`;
    ball.style.borderRadius = `${$RADIUS}%`;
    startWidth = $HEIGHT;
    startHeight = $WIDTH;
    startBorderRadius = $RADIUS;
  }
});
