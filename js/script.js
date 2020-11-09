window.addEventListener('DOMContentLoaded', function () {
            'use strict';

            //Timer
            function countTimer(deadline) {
                let timerHours = document.querySelector('#timer-hours'),
                    timerMinutes = document.querySelector('#timer-minutes'),
                    timerSeconds = document.querySelector('#timer-seconds');

                function getTimeRemaining() {
                    let dateStop = new Date(deadline).getTime(),
                        dateNow = new Date().getTime(),
                        timeRemaining = (dateStop - dateNow) / 1000, //высчитываем количество секунд
                        seconds = Math.floor(timeRemaining % 60), //секунд не можут быть больше 60
                        minutes = Math.floor((timeRemaining / 60) % 60), //высчитываем минуты.
                        hours = Math.floor(timeRemaining / 60 / 60);
                    return {
                        timeRemaining,
                        hours,
                        minutes,
                        seconds
                    };
                }
                /* % 24, делим на колличество минут и секунд.
                чтобы почитать посчиать дни, мы должны из часов получить остаток по делению на 24 часа
                и переменную дней разделить на чекунды, минуты и на 24 часа

                day = Math.floor(timeRemaining / 60 / 60 / 24); */
                let updateClock = function () {
                    let timer = getTimeRemaining();

                    function zero(n) {
                        if (n < 10) {
                            return '0' + n;
                        } else {
                            return n;
                        }
                    }

                    if (timer.timeRemaining > 0) {
                        timerHours.textContent = zero(timer.hours);
                        timerMinutes.textContent = zero(timer.minutes);
                        timerSeconds.textContent = zero(timer.seconds);
                    } else if (timer.timeRemaining < 0) {
                        clearInterval(updateClock, 1000);
                        timerHours.textContent = '00';
                        timerMinutes.textContent = '00';
                        timerSeconds.textContent = '00';
                    }
                };
                updateClock();
                setInterval(updateClock, 1000);
            }
            countTimer("7 november 2020");


            //menu
            const toggleMenu = () => {
                const menu = document.querySelector('menu'),
                    menuItems = menu.querySelectorAll('ul>li>a'),
                    body = document.querySelector('body');
                const handlerMenu = () => {
                    menu.classList.toggle('active-menu');
                };
                body.addEventListener('click', event => {
                    let target = event.target,
                        target2 = event.target;
                        target = target.closest('.menu');
                    if(target){
                        handlerMenu();
                    }else if(target2.classList.contains('close-btn')){
                        handlerMenu();
                    }else if(target2.matches('ul>li>a')){
                        handlerMenu();
                    }
                });
            };

            toggleMenu();

            //popup

            const togglePopUp = () => {
                const popup = document.querySelector('.popup'),
                    popupBtn = document.querySelectorAll('.popup-btn');
                let popupContent = document.querySelector('.popup-content');

                popupBtn.forEach((elem) => {
                    elem.addEventListener('click', () => {
                        if(window.innerWidth > 768){
                            popupContent.style.opacity = "0";
                            let n = 0;
                            const timer = setInterval(() => {
                                n+=0.1;
                                popupContent.style.opacity = `${n}`;
    
                                if (popupContent.style.opacity === "1") {
                                    clearInterval(timer);
                                }
    
                            }, 30);
                            popup.style.display = 'block';
                        }else{
                            popup.style.display = 'block';
                            popupContent.style.opacity = "1";
                        }
                    });
                }); 

                popup.addEventListener('click', (event) => {
                    let target = event.target;

                    if(target.classList.contains('popup-close')){
                        if(window.innerWidth > 768){
                            popupContent.style.opacity = "1";
                            let n = 1;
                            const timer = setInterval(() => {
                                n-=0.1;
                                popupContent.style.opacity = `${n}`;
    
                                if (popupContent.style.opacity === "-0.1") {
                                    popup.style.display = 'none';
                                    clearInterval(timer);
                                }
    
                            }, 30);
                            
                        }else{
                            popup.style.display = 'none';
                        }
                    }else {
                        target = target.closest('.popup-content');
                        if(!target){
                            popup.style.display = 'none';
                        }
                    }
                });
            };
            togglePopUp();

            //Tabs

            const tabs = () => {
                const tabHeader = document.querySelector('.service-header'),
                        tab = tabHeader.querySelectorAll('.service-header-tab'),
                        tabContetnt = document.querySelectorAll('.service-tab');

                const toggleTabContent = (index) => {
                    for(let i = 0; i < tabContetnt.length; i++){
                        if(index === i){
                            tab[i].classList.add('active');
                            tabContetnt[i].classList.remove('d-none');
                        }else {
                            tab[i].classList.remove('active');
                            tabContetnt[i].classList.add('d-none');
                        }
                    }
                };
                    tabHeader.addEventListener('click', (event) => {
                        let target = event.target;
                            target = target.closest('.service-header-tab');
                        if(target){
                            tab.forEach((item, i) =>{
                                if(item === target){
                                    toggleTabContent(i);
                                }
                            });
                        }
                    });
            };
            tabs();

            //slider

            const slider =  () => {

                const slide = document.querySelectorAll('.portfolio-item'),
                    slider = document.querySelector('.portfolio-content');
                let ulDots = document.querySelector('.portfolio-dots');
            
                for (let i = 0; i < slide.length; i++) {
                    const dot = document.createElement("li");
                    if (i === 0) {
                        dot.classList.add("dot-active");
                    }
                    dot.classList.add("dot");
                    ulDots.append(dot);
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
            slider();

            // изменение картинки
            
            const changeImage = () => {
                let imageSrc;

                document.addEventListener('mouseout', event => {
                    if(event.target.matches('.command__photo')){
                        event.target.src = imageSrc;
                    }
                    });
                document.addEventListener('mouseover', (event) => {
                    if(event.target.matches('.command__photo')){
                        imageSrc = event.target.src;
                        event.target.src = event.target.dataset.img;                            
                    }
                });
            };

            changeImage();

            //ввод только чисел в калькуляторе

            document.addEventListener('input', (event) =>{
                if(event.target.matches('.calc-item ')){
                    event.target.value = event.target.value.replace(/\D/g, '');
                }
            });
        });