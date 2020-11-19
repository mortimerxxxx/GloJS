function countTimer(deadline) {
    'use strict';
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

export default countTimer;