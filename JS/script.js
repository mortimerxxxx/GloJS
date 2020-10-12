'use strict';

let money = +prompt('Ваш месячный доход?', 100000);
let income = 'Создание сайтов';
let addExpenses = 'Такси, Бензин, Маски';
let deposit = false;
let mission = +prompt('Ваша цель?',20000000);
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев и Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase()); 
console.log(addExpenses.split(', '));

let budgetDay = (500000 / 30);

console.log(budgetDay);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = (amount1 + amount2);
let monthMission = Math.ceil(mission / budgetMonth);

budgetDay = Math.floor(budgetMonth / 30);

console.log(money);
console.log(addExpenses);
console.log(deposit);
console.log(`Бюджет на месяц ${budgetMonth}`);
console.log(`Цель будет достигнута за: ${monthMission} месяцев`);
console.log(`Бюджет на день: ${budgetDay}`);

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
}else if (1200 > budgetDay > 600) {
    console.log('У вас средний уровень дохода');
}else if (600 > budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}else if(budgetDay < 0) {
    console.log('Что то пошло не так');
}

switch (budgetDay){
    case 0:
        console.log('К сожалению у вас уровень дохода ниже среднего');
        break;
    case 600:
        console.log('У вас средний уровень дохода');
        break;
    case 1200:
        console.log('У вас высокий уровень дохода');
        break;
    default: 
        console.log('Нет такого значения');
}