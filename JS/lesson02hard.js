'use strict'
/*let num = 266219;
let sum = 1;
while(num > 0) {
  sum *= num % 10;
  num = Math.floor(num/10);
}
console.log(sum);

let sum2 = (sum ** 3);

console.log(sum2);

document.querySelector('.current').innerHTML = sum2.toString().substring(0, 2);*/

let num = 266219;
let num2 = String(266219).split('');
let num3 = (accululator, currentValue) => accululator * currentValue; 
let num4 = num2.reduce(num3);
let num5 = (num4 ** 3).toString();

document.querySelector('.current').innerHTML = num5.substring(0, 2);