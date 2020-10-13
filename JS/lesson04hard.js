'use strict'

function hard(str) {

  str = prompt("Что за дела", "");

  if (isNaN(str) || str === null) {
  }else{
      alert('Передана не строка');
      return;
  }

  str = str.trim();
  
  
  let p;
  p = document.querySelector(".current");
  p.innerHTML = str.length > 30 ? str.slice(0, 30) + '...' : str;
}

hard();