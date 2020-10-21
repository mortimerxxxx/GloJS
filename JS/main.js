'use strict';

const booking = document.querySelectorAll('.book');
const books = document.querySelectorAll('.books');

books[0].prepend(booking[2]);
books[0].prepend(booking[5]);
books[0].prepend(booking[3]);
books[0].prepend(booking[4]);
books[0].prepend(booking[0]);
books[0].prepend(booking[1]);

document.body.style.backgroundImage = 'url(./image/adv.jpg)';

const titleBook = document.getElementsByTagName('a')[2];

titleBook.innerHTML = 'Книга 3. this и Прототипы Объектов';

const removeAdv = document.querySelectorAll('.adv');

removeAdv[0].remove();

const ulList = document.getElementsByTagName('li');

ulList[7].after(ulList[9]);
ulList[8].after(ulList[12]);
ulList[9].after(ulList[14]);
ulList[10].after(ulList[12]);
ulList[37].after(ulList[45]);
ulList[45].after(ulList[39]);
ulList[39].after(ulList[40]);
ulList[40].after(ulList[45]);
ulList[41].after(ulList[43]);
ulList[42].after(ulList[44]);


const newElem = document.createElement('li');

newElem.innerHTML = 'Глава 8: За пределами ES6';
ulList[56].append(newElem);

ulList[55].after(ulList[57]);