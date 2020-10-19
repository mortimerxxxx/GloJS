'use strict';

let money,
    start = function(){
        do{
            money = prompt('Ваш месячный доход?', 50000);
        }
        while (isNaN(parseFloat(money)) || money === '' || money === null);
    };

    start();

    let appData = {
        budget: money,
        budgetDay: 0,
        budgetMonth: 0,
        income: {}, //дополнительные доходы
        addIncome: [], //дополнительные доходы
        expenses: {}, //дополнительные расходы
        addExpenses: [], //возможные расходы
        expensesMonth: 0,
        deposit: false,
        percentDeposite: 0,
        moneyDeposite: 0,
        mission: 50000,
        period: 3,
        asking: function () {  

            if(confirm('Есть у вас дополнительный источник заработка?')){
                let itemIncome; 
                do {
                    itemIncome = prompt('Какой у вас дополнительный заработок', 'таксую');
                } while(!isNaN(itemIncome));
                let cashIncome;
                do {
                    cashIncome =  prompt('Сколько в месяц зарабатываете на этом?', 2000);
                }while (isNaN(parseFloat(cashIncome)));
                appData.income[itemIncome] = cashIncome;
            }

            let addExpenses = prompt('Перечислите возможные расходы через запятую', 'кошки, собаки, рыбки');
            appData.addExpenses = addExpenses.toLowerCase().split(", ");
            appData.deposit = confirm('Есть ли у вас депозит в банке');
            
            for(let i = 0; i < 2; i++){

                let itemExpenses; 
                do {
                    itemExpenses = prompt('Введите обязательную статью расходов');
                } while(!isNaN(itemExpenses));
                
                let cashExpenses;
                do {
                    cashExpenses = prompt('Во сколько это обойдется');
                }
                while(isNaN(parseFloat(cashExpenses)) || cashExpenses === '' || cashExpenses === null);

                appData.expenses[itemExpenses] = cashExpenses;
            }
        },

        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }
        },

        getBudget: function() {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },

        getTargetMonth: function() {
            return appData.mission / appData.budgetMonth;
        },
        
        getStatusIncome: function(){
            if(appData.budgetDay > 1200){
                return ('У вас высокий уровень дохода');
            }else if(appData.budgetDay > 600) {
                return ('У вас средний уровень дохода');
            }else if (appData.budgetDay > 0){
                return ('У вас низкий уровень дохода');
            }else{
                return ('Что-то пошло не так');
            }
        },

        getInfoDeposite: function(){
            if(appData.deposit){
                do {
                    appData.percentDeposite = prompt('Какой годовой проуент?', '10');
                } while (isNaN(parseFloat(appData.percentDeposite)));
                do {
                    appData.moneyDeposite = prompt('Какая сумма заложена?', 10000);
                } while (isNaN(parseFloat(appData.percentDeposite)));
                
            }
        }, 

        calcSaveMoney: function(){
            return appData.budgetMonth * appData.period;
        }
    
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();


console.log('Расходы за месяц: ' + appData.expensesMonth);

if(appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log('Цель не будет достигнута');
}
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
}

appData.getInfoDeposite();


let wayToUpperCase = function(array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
        arr.push(array[i].charAt(0).toUpperCase() + array[i].substring(1));
    }
    console.log(arr);
    return arr.join(', ');
};
console.log(appData.addExpenses);
console.log(wayToUpperCase(appData.addExpenses));