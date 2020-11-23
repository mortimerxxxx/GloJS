// eslint-disable-next-line strict
"use strict";

const input = document.querySelector('input'),
  p = document.querySelector('p');

const debounce = (fn, ms) => {
  let timeout;
  return function() {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

let onChange = e => {
  p.textContent = e.target.value;
};

onChange = debounce(onChange, 300);

input.addEventListener("input", onChange);

document.querySelector('button').addEventListener('click', () => {
  input.value = "";
  p.textContent = "";
});
