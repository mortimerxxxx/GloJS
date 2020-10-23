'use strict';

let start = document.getElementById('start');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let depositCheck = document.querySelector('#deposit-check');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

let accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value');

let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');


    
    let appData = {
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        income: {}, //дополнительные доходы
        incomeMonth: 0,
        addIncome: [], //дополнительные доходы
        expenses: {}, //дополнительные расходы
        addExpenses: [], //возможные расходы
        expensesMonth: 0,
        deposit: false,
        percentDeposite: 0,
        moneyDeposite: 0,
        start: function(){

            appData.budget = +salaryAmount.value;

            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();  
            appData.getAddExpenses();
            appData.getAddIncome(); 
            appData.getBudget();

            appData.showResult();
            
        },
        showResult: function () { 
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value = appData.calcPeriod();
            periodSelect.addEventListener('input', () => {
                incomePeriodValue.value = appData.calcPeriod();
            });
        }, 
        addExpensesBlock: function() {

            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            // вставляем cloneExpensesItem перед expensesPlus
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        addIncomeBlock: function() {
            let cloneIncome = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncome, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function(){
            expensesItems.forEach(function(item) {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
        getIncome: function(){
            incomeItems.forEach(function(item) {
                let itemIncomeTitle = item.querySelector('.income-title').value;
                let cashIncomeAmount = item.querySelector('.income-amount').value;
                if(itemIncomeTitle !== '' && cashIncomeAmount !== '') {
                    appData.income[itemIncomeTitle] = cashIncomeAmount;
                }
            });
        },
        getAddExpenses: function () {
            let addExpenses = additionalExpensesItem.value.split(', ');
            addExpenses.forEach(function (item) {
                item = item.trim(); //убираем пробелы в начале и в конце строки
                if (item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },

        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }
        },

        getBudget: function() {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },

        getTargetMonth: function() {
            return targetAmount.value / appData.budgetMonth;
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

        calcPeriod: function(){
            return appData.budgetMonth * periodSelect.value;
        }
};

start.addEventListener('click', () => {
    if(isNaN(salaryAmount.value) || salaryAmount.value === ''){
        alert ('Введите сумму своего дохода');
        salaryAmount.value = '';
    }else {
        appData.start();
    }
});

periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
});

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);


start.setAttribute('disabled', '0');

salaryAmount.addEventListener('input', () => {
    if(salaryAmount.value !== ''){
        start.removeAttribute('disabled');
    }else {
        start.setAttribute('disabled', '0');}
});

// for (let key in appData) {
//     console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
// }

// appData.getInfoDeposite();


// let wayToUpperCase = function(array) {
//     let arr = [];
//     for (let i = 0; i < array.length; i++) {
//         arr.push(array[i].charAt(0).toUpperCase() + array[i].substring(1));
//     }
//     console.log(arr);
//     return arr.join(', ');


