'use strict';

let money = +prompt('Ваш месячный доход?', 100000);
let income = 'Создание сайтов';
let addExpenses = 'Такси, Бензин, Маски';
let deposit = false;
let mission = +prompt('Ваша цель?',20000000);
let period = +prompt('За сколько месяцев Вы хотите достигнуть своей цели?', 6);

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

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
// let budgetMonth = (amount1 + amount2);


console.log(addExpenses);



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

// 1 чать
function getExpensesMonth(a, b) {
    const sum = a + b;
    return sum;
}
getExpensesMonth(amount1, amount2);
console.log(getExpensesMonth(amount1, amount2));

// 2 часть
function getAccumulatedMonth(a, b) {
    return a - b;
}
getAccumulatedMonth(money, (amount1, amount2));

// 3 часть
let accumulatedMonth = getAccumulatedMonth(money, (amount1, amount2));

// 4 часть
function getTargetMonth(a, b) {
    return a / b;
}
getTargetMonth(mission, accumulatedMonth);
console.log(getTargetMonth(mission, accumulatedMonth));
// 5 часть - уделена переменная budgetMonth
// 6 часть
budgetDay = Math.floor(accumulatedMonth / 30);
console.log(budgetDay);

// 7 часть
let getStatusIncome = function() {
    if (budgetDay > 1200) {
        return('У вас высокий уровень дохода');
    }else if (1200 > budgetDay > 600) {
        return('У вас средний уровень дохода');
    }else if (600 > budgetDay > 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    }else if(budgetDay < 0) {
        return('Что то пошло не так');
    }
};
getStatusIncome();

console.log(getStatusIncome());