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
                setInterval(updateClock, 1000);
            }
            countTimer("5 november 2020");


            //menu
            const toggleMenu = () => {

                const btnMenu = document.querySelector('.menu'),
                    menu = document.querySelector('menu'),
                    closeBtn = document.querySelector('.close-btn'),
                    menuItems = menu.querySelectorAll('ul>li');
                const handlerMenu = () => {
                    menu.classList.toggle('active-menu');
                };
                btnMenu.addEventListener('click', handlerMenu);
                closeBtn.addEventListener('click', handlerMenu);

                menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
            };

            toggleMenu();

            //popup

            const togglePopUp = () => {
                const popup = document.querySelector('.popup'),
                    popupBtn = document.querySelectorAll('.popup-btn'),
                    popupCloseBtn = document.querySelector('.popup-close');
                let popupContent = document.querySelector('.popup-content');

                  popupBtn.forEach((elem) => {
                    elem.addEventListener('click', () => {
                        if(window.innerWidth > 768){
                            popupContent.style.opacity = "0";
                            let n = 0;
                            const timer = setInterval(() => {
                                n+=0.1;
                                popupContent.style.opacity = `${n}`;
    
                                if (popupContent.style.opacity === "1.1") {
                                    clearInterval(timer);
                                }
    
                            }, 30);
                            popup.style.display = 'block';
                        }else{
                            popup.style.display = 'block';
                        }
                    });
                });
                    popupCloseBtn.addEventListener('click', () => {
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
                        
                    });
                }); 
            };
            togglePopUp();
        });
