const slider = () => {
    'use strict';
    const slide = document.querySelectorAll('.portfolio-item'),
        slider = document.querySelector('.portfolio-content');
    let ulDots = document.querySelector('.portfolio-dots');

    for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement("li");
        if (i === 0) {
            dot.classList.add("dot-active");
        }
        dot.classList.add("dot");
        ulDots.appendChild(dot);
    }
    
const dot = document.querySelectorAll('.dot');

let currentSlide = 0,
    interval;

const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
};

const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
};

const autoPlaySlide = () => {

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if(currentSlide >= slide.length){
        currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
};

const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
};

const stopSlide = () => {
    clearInterval(interval);
};

slider.addEventListener('click', (event) => {
    event.preventDefault();

    let target = event.target;

    if(!target.matches('.portfolio-btn, .dot')){
        return;
    }
    
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

    if(target.matches('#arrow-right')){
        currentSlide++;
    }else if(target.matches('#arrow-left')){
        currentSlide--;
    } else if(target.matches('.dot')){
        dot.forEach((elem, index) => { //здесь элементом выступают точки
            if(elem === target){
                currentSlide = index;
            }
        });
    }

    if(currentSlide >= slide.length) {
        currentSlide = 0;
    }

    if(currentSlide < 0){
        currentSlide = slide.length -1; 
        //длинна массива больше на единцу, чем индекс последнего элемента.
        //для этого мы вычитаем единицу 
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');

});

slider.addEventListener('mouseover', (event) => {
    if(event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')){
            stopSlide();
        }
});

slider.addEventListener('mouseleave', (event) => {
    if(event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')){
            startSlide();
        }
});

startSlide(10000);

};

export default slider;