'use strict';

let start = document.getElementById('start');
const cancel = document.querySelector('#cancel');
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
let incomeAmount = document.querySelector('.income-amount');

let data = document.querySelector('.data');

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

        start: function() {
            
            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();  
            this.getAddExpenses();
            this.getAddIncome(); 
            this.getBudget();

            this.showResult();

            this.blocked();
            this.unBlocked();

        },
        showResult: function() { 
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value = this.calcPeriod();
            periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
            });
        }, 

        blocked: function(){
            document.querySelectorAll('.data input[type=text]').forEach(function(item){
                item.disabled = true;
            });
            start.style.display = 'none';
            cancel.style.display = 'block';
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
            expensesItems.forEach(item => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    this.expenses[itemExpenses] = cashExpenses;
                }
            },this);
        },
        getIncome: function(){
            incomeItems.forEach(item => {
                let itemIncomeTitle = item.querySelector('.income-title').value;
                let cashIncomeAmount = item.querySelector('.income-amount').value;
                if(itemIncomeTitle !== '' && cashIncomeAmount !== '') {
                    this.income[itemIncomeTitle] = cashIncomeAmount;
                }
            });
        },

        getAddExpenses: function () {
            let addExpenses = additionalExpensesItem.value.split(', ');
            addExpenses.forEach(item => {
                item = item.trim(); //убираем пробелы в начале и в конце строки
                if (item !== ''){
                    this.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(item => {
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    this.addIncome.push(itemValue);
                }
            });
        },

        getExpensesMonth: function() {
            
            for (let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        },

        getBudget: function () {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },

        getTargetMonth: function() {
            return targetAmount.value / this.budgetMonth;
        },
        
        getStatusIncome: () => {
            if(this.budgetDay > 1200){
                return ('У вас высокий уровень дохода');
            }else if(this.budgetDay > 600) {
                return ('У вас средний уровень дохода');
            }else if (this.budgetDay > 0){
                return ('У вас низкий уровень дохода');
            }else{
                return ('Что-то пошло не так');
            }
        },

        getInfoDeposite: function(){
            if(this.deposit){
                do {
                    appData.percentDeposite = prompt('Какой годовой проуент?', '10');
                } while (isNaN(parseFloat(appData.percentDeposite)));
                do {
                    appData.moneyDeposite = prompt('Какая сумма заложена?', 10000);
                } while (isNaN(parseFloat(appData.percentDeposite)));
                
            }
        }, 

        calcPeriod: function(){
            return this.budgetMonth * periodSelect.value;
        },

        unBlocked: function(){
            cancel.addEventListener('click', function(){

                document.querySelectorAll('.data input[type=text]').forEach(function(item){
                    item.disabled = false;
                    item.value = '';
                });

                document.querySelectorAll('.result input[type=text]').forEach(function(item){
                    item.disabled = false;
                    item.value = '';
                });

                start.style.display = 'block';
                cancel.style.display = 'none';

                start.disabled = true;
                salaryAmount.addEventListener('input', () => {
                    start.disabled = salaryAmount.value.trim() === '';
                });
            });
        },

};

start.addEventListener('click', appData.start.bind(appData));

periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
    
});

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);

start.disabled = true;

salaryAmount.addEventListener('input', () => {
    start.disabled = salaryAmount.value.trim() === '';
});