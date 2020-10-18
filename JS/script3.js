'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function(){
        do{
            money = prompt('Ваш месячный доход?');
        }
        while (!isNumber(money));

        return +money;
    };

    let appData = {
        income: {}, //дополнительные доходы
        addIncome: [], //дополнительные доходы
        expenses: {}, //дополнительные расходы
        addExpenses: [], //возможные расходы
        deposit: false,
        mission: 50000,
        period: 3,
        budget: start(),
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        asking: function () {  
            let addExpenses = prompt('Перечислите возможные расходы');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposite = confirm('Есть ли у вас депозит в банке');
            let sum = 0, question;
            for(let i = 0; i < 2; i++){
                question = prompt('Введите обязательную статью расходов');
                do {
                    sum = prompt('Во сколько это обойдется');
                    
                }
                while(isNaN(sum) || sum === '' || sum === null);
                appData.expenses[question] = sum;
            }
        },

        getExpensesMonth: function() {
            let sum = 0;
            for (let key in appData.expenses) {
            sum += +appData.expenses[key];
            }
            return (appData.expensesMonth = sum);
        },

        getBudget: function() {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },

        getTargetMonth: function() {
            return Math.ceil(appData.mission / appData.getExpensesMonth());
        },
        
        getStatusIncome: function(){
            if(appData.budgetDay > 1200){
                return('У вас высокий уровень дохода');
            }else if(appData.budgetDay > 600) {
                return('У вас средний уровень дохода');
            }else if (appData.budgetDay >0){
                return('У вас средний уровень дохода');
            }else{
                return('Что-то пошло не так');
            }
    }
};

    appData.asking();
    
    appData.getBudget();

    if(appData.getTargetMonth() >= 0) {
        console.log('Цель будет достигнута за ' + appData.getTargetMonth() + 'месяца');
    } else {
        console.log('Цель не будет достигнута');
    }

    console.log(appData.getStatusIncome());

    console.log('Наша программа включает в себя данные: ');

    for (let key in appData) {
        console.log(key + ': ' + appData[key]);
    }