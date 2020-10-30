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
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector('.period-amount');
const incomeAmount = document.querySelector('.income-amount');
const depositeBank = document.querySelector('.deposit-bank');
const depositeAmount = document.querySelector('.deposit-amount');
const depositePercent = document.querySelector('.deposit-percent');
const depositeCalc = document.querySelector('.deposit-calc');

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

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposite();
        this.getBudget();
    
        this.showResult();
    
        this.blocked();
    
    }

    reset() {

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

        depositeBank.style.display = 'none';
        depositeCalc.style.display = 'none';

        depositCheck.checked = false;
        depositeBank.value = '';
        start.disabled = true;
        salaryAmount.addEventListener('input', () => {
            start.disabled = salaryAmount.value.trim() === '';
        });

        
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

    getIncome() {
        incomeItems.forEach((items) => {
            const itemIncome = items.querySelector(".income-title").value,
            cashIncome = items.querySelector(".income-amount").value;
            if (itemIncome !== "" && cashIncome !== "") {
            this.income[itemIncome] = cashIncome;
            }
        });
        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
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
        const monthDeposite = this.moneyDeposite * (this.percentDeposite / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposite;
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
    
    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    }

    getInfoDeposite () {
        if (this.deposit) {
                this.percentDeposite = depositePercent.value;
                this.moneyDeposite = depositAmount.value;
            }
    }

    changePercent() {
        const valueSelect = this.value;
        if(valueSelect === 'other') {
            depositePercent.style.display = 'inline-block';
            start.disabled = true;
        }else {
            depositePercent.value = valueSelect;
            depositePercent.style.display = 'none';
            start.disabled = false;
        }

    }

    depositeHandler() {
        if(depositCheck.checked){
            depositeBank.style.display = 'inline-block';
            depositeAmount.style.display = 'inline-block';
            this.deposit = true;
            depositeBank.addEventListener('change', this.changePercent);
        }else {
            depositeBank.style.display = 'none';
            depositeAmount.style.display = 'none';
            depositeBank.value = '';
            depositeAmount.value = '';
            this.deposit = false;
            depositeBank.removeEventListener('change', this.changePercent);
        }
    }
    showDepositeCalc() {
        if(depositeBank.value === 'other'){
            depositeCalc.style.display = 'inline-block';
        }
    }


    eventsListeners () {
    
        start.addEventListener('click', this.start.bind(this));

        depositeBank.addEventListener('change', function(){
            depositeCalc.style.display = 'block';
        });

        cancel.addEventListener("click", AppData.prototype.reset.bind(this));
    
        periodSelect.addEventListener('input', function () {
            periodAmount.innerHTML = periodSelect.value;
        });
    
        incomePlus.addEventListener('click', this.addIncomeBlock);
        expensesPlus.addEventListener('click', this.addExpensesBlock);
    
        
        start.disabled = true;
    
        salaryAmount.addEventListener('input', () => {
            start.disabled = salaryAmount.value.trim() === '';
        });

        depositCheck.addEventListener('change', this.depositeHandler.bind(this));
        
        depositPercent.addEventListener('input', function(){          
            depositPercent.value = depositPercent.value.replace(/[^0-9]/, "");
            if(depositePercent.value < 0 || depositePercent.value > 100){
                start.disabled = true;
                alert("Вы ввели некорректное значение");
                depositePercent.value = '';
            }else if(depositPercent.value !== ''){
                start.disabled = false;
            }
        });
    }
    
}

const appData = new AppData();

appData.eventsListeners();





