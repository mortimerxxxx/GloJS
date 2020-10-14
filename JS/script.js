'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money;
let income = 'Создание сайтов';
let addExpenses = 'Такси, Бензин, Маски';
let deposit = false;
let mission = +prompt('Ваша цель?',20000000);
let period = +prompt('За сколько месяцев Вы хотите достигнуть своей цели?', 6);

let start = function() {
// задание 1
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};

start();

let showTypeOf = function(data) {
    console.log(typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(', '));

let budgetDay = (500000 / 30);

console.log(budgetDay);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

console.log(addExpenses);

let expenses = [];

console.log(addExpenses.toLowerCase().split(','));

let getExpensesMonth = function() {
let sum = 0;

    for (let i = 0; i < 2; i++) {
        
        expenses[i] = prompt('Введите обязательную статью расходов?');

        do {
            sum = prompt('Во сколько это обойдется?');
        }
        while (!isNumber(sum));
        // sum += +prompt('Во сколько это обойдется?');
    }

    console.log(expenses);
    return sum; 
};

let expensesAmount = getExpensesMonth();

console.log(expensesAmount);

let getAccumulatedMonth = function(a, b) {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {

    return mission / accumulatedMonth;
};
let getTargetMonthIncome = function() {
    if (getTargetMonth() < 0) {
        return('Цель не будет достигнута');
    } else {
        return('Цель будет достигнута');
    }
};

console.log(getTargetMonthIncome());

budgetDay = Math.floor(accumulatedMonth / 30);
console.log(budgetDay);

let getStatusIncome = function() {
    if (budgetDay > 1200) {
        return('У вас высокий уровень дохода');
    }else if (budgetDay < 1200 && budgetDay > 600) {
        return('У вас средний уровень дохода');
    }else if (budgetDay < 600 && budgetDay > 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    }else if(budgetDay < 0) {
        return('Что то пошло не так');
    }
};

console.log(getStatusIncome());