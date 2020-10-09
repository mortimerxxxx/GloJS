
const money = 150;
const income = 'Создание сайтов';
const addExpenses = 'Такси, Бензин, Маски';
const deposit = false;
const mission = 20000000;
const period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев и Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase(), addExpenses.split(', '));

let budgetDay = (500000 / 30);

console.log(budgetDay);