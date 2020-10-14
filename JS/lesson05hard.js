'use strict';

let arr = ['11', '24', '45', '23', '17', '89', '150'];

arr.forEach((i) => {
  if (i.startsWith('2') || i.startsWith('4')) {
    console.log(i);
  }
});

let array = [];

for (let i = 1; i <= 100; i++) {
  array.push(i);
}

let isPrime = function(num) {
  if (num <= 1) {
    return false;
  }else if (num === 2){
    return true;
  }else {
      for (let i = 2; i < num; i++) {
        if (num % i === 0) {
          return false;
        }
      } return true;
  }
};

let res = array.filter(isPrime);

for(let i = 0; i < res.length; i++){
  console.log(res[i], 'Делители этого числа: 1 и ' + res[i]);
}
