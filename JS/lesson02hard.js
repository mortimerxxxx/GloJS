
let num = 266219;
let sum = 1;
while(num > 0) {
  sum *= num % 10;
  num = Math.floor(num/10);
}
console.log(sum);

let sum2 = (sum ** 3);

console.log(sum2);

document.querySelector('.current').innerHTML = sum2.toString().substring(0, 2);