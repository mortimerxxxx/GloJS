'use strict';

const start = document.getElementById('start');
const cancel = document.querySelector('#cancel');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const depositCheck = document.querySelector('#deposit-check');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector('.period-amount');
const incomeAmount = document.querySelector('.income-amount');

const data = document.querySelector('.data');


class AppData {
    constructor(){
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {}; //дополнительные доходы
        this.incomeMonth = 0;
        this.addIncome = []; //дополнительные доходы
        this.expenses = {}; //дополнительные расходы
        this.addExpenses = []; //возможные расходы
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposite = 0;
        this.moneyDeposite = 0;
    }
    check() {
        if (salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        }
    }
    
    start () {
    
        cancel.addEventListener('click', function () {
    
            document.querySelectorAll('.data input[type = text]').forEach(function(item){
                item.disabled = false;
                item.value = '';
                periodSelect.value = '0';
                periodAmount.innerHTML = periodSelect.value;
            });
    
            document.querySelectorAll('.result input[type = text]').forEach(function(item) {
                item.disabled = false;
                item.value = '';
            });
    
            start.style.display = 'block';
            cancel.style.display = 'none';
    
            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].remove();
                incomePlus.style.display = 'block';
            }
            for (let i = 1; i < expensesItems.length; i++) {
                expensesItems[i].remove();
                expensesPlus.style.display = 'block';
            }
    
            start.disabled = true;
            salaryAmount.addEventListener('input', () => {
                start.disabled = salaryAmount.value.trim() === '';
            });
        });
    
    
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
    
        this.showResult();
    
        this.blocked();
    
    }


    showResult () {
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
    }
    
    blocked () {
        document.querySelectorAll('.data input[type=text]').forEach(function (item) {
            item.disabled = true;
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    }
    
    addExpensesBlock () {
    
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        // вставляем cloneExpensesItem перед expensesPlus
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    addIncomeBlock () {
        let cloneIncome = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncome, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getExpenses () {
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    }
    getIncome () {
        incomeItems.forEach(item => {
            let itemIncomeTitle = item.querySelector('.income-title').value;
            let cashIncomeAmount = item.querySelector('.income-amount').value;
            if (itemIncomeTitle !== '' && cashIncomeAmount !== '') {
                this.income[itemIncomeTitle] = cashIncomeAmount;
            }
        });
    }
    
    getAddExpenses () {
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(item => {
            item = item.trim(); //убираем пробелы в начале и в конце строки
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome () {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    
    getExpensesMonth () {
    
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    
    getBudget () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    
    getTargetMonth () {
        return targetAmount.value / this.budgetMonth;
    }
    
    getStart ()  {
        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay > 0) {
            return ('У вас низкий уровень дохода');
        } else {
            return ('Что-то пошло не так');
        }
    }
    
    getInfoDeposite () {
        if (this.deposit) {
            do {
                this.percentDeposite = prompt('Какой годовой проуент?', '10');
            } while (isNaN(parseFloat(this.percentDeposite)));
            do {
                this.moneyDeposite = prompt('Какая сумма заложена?', 10000);
            } while (isNaN(parseFloat(this.percentDeposite)));
    
        }
    }
    
    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    }
    eventsListeners () {
    
        start.addEventListener('click', this.start.bind(this));
    
        periodSelect.addEventListener('input', function () {
            periodAmount.innerHTML = periodSelect.value;
        });
    
        incomePlus.addEventListener('click', this.addIncomeBlock);
        expensesPlus.addEventListener('click', this.addExpensesBlock);
    
        start.disabled = true;
    
        salaryAmount.addEventListener('input', () => {
            start.disabled = salaryAmount.value.trim() === '';
        });
    }
    
}

const appData = new AppData();

appData.eventsListeners();




