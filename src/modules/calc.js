const calc = (price = 100) =>{
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

const countSum = () => {
    let total = 0,
        countValue = 1,
        dayValue = 1;

    const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;


    if(calcCount.value > 1){
        countValue += (calcCount.value -1) / 10;
    }

    if(calcDay.value < 5) {
        dayValue *= 2;
    }else if(calcDay.value < 10){
        dayValue *= 1.5;
    }

    if(typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
    }

    totalValue.textContent = total;
};

calcBlock.addEventListener('change', (event) => {
    const target = event.target;

    // if(target.matches('.calck-type') || target.matches('calc-square') || 
    // target.matches('.calc-day') || target.matches('.calc-count')) {
    //     console.log(1);
    // }

    // if(target === calcType || target === calcSquare || 
    //     target === calcDay || target === calcCount){
    //         console.log(1);
    //     }

    if(target.matches('select') || target.matches('input')) {
        countSum();
    }

});

document.addEventListener('input', (event) =>{
    if(event.target.matches('.calc-square') || event.target.matches('.calc-day') || 
    event.target.matches('.calc-count')){
        event.target.value = event.target.value.replace(/\D/g, '');
    }
});

};


export default calc;