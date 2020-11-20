const sendForm = () => {
                'use strict';
    const errorMessage = 'Что-то пошло не так',
        loadMessage = `
        <div class="loadMessage"></div>
        `,
        sucessMessage = 'Спасибо! МЫ скоро свяжемся с вами';
    
    //получаем форму по id
    // const form = document.getElementById('form1');

    const form = document.querySelectorAll('form');
    const input = document.querySelectorAll('input');
    const popup = document.querySelector('.popup');
    let checkEmail;
    
    for(let i = 0; i < form.length; i++) {
        form[i].addEventListener('submit', function (event) {
            
            //отменяем перезагрузку страницы
            event.preventDefault();

            if(form[i]){
                let formi = i+1;
                checkEmail = `form${formi}-email`;
            }
            const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            const address = document.getElementById(checkEmail).value;
            if (reg.test(address) === false) {
                alert("Введите корректный e-mail");
                return;
            }
            // document.addEventListener('input', (event) => {
            //     let target = event.target;
            //     if(target.matches('.form-email')){
            //         // target.value = target.value.replace(/(\W)@/gi, '');
            //         target.value = target.value.replace(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{3,4})$/gi, '');
            //     }
            // });
            

            //добавляем в форму наши сообщения
            this.appendChild(statusMessage);

            //добавляем сообщение о загрузке данных
            statusMessage.innerHTML = loadMessage;

            //получение данных
            /*создаем экземпляр класса formData */
            const formData = new FormData(this);
            
            /*отправка в JSON формате*/
            let body = {};
            
            formData.forEach((val, key) => {
                body[key] = val;
            });
            //передаем body и callback функуию
            postData(body)
                .then((response) => {
                    if(response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = sucessMessage;

                    setTimeout(() => {
                        statusMessage.textContent = '';
                    },1000);

                    setTimeout(() => {
                        popup.style.display = 'none';
                    },3000);
                    
                    input.forEach((elem) => {
                        elem.value = "";
                        });
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

            }



        );
    }

    document.addEventListener('input', (event) => {
        let target = event.target;

        if(target.matches('.form-name') || target.matches('.mess') || target.matches('.top-form-name')){
            target.value = target.value.replace(/[^А-Яа-яЁе \,\.\!\?]/gi, '');
        }
    });



    // document.addEventListener('input', (event) => {
    //     let target = event.target;

    //     if(target.matches('.form-phone')){
    //         mask: '+{7}(000)000-00-00';
    //         target.value = target.value.replace(/[^+0-9]/gi, "");
    //     }
    // });

    //Добавление элемента на страницу в котором будут располгаться сообщения
    const statusMessage = document.createElement('div');

    statusMessage.style.cssText = 'font-size: 2rem; color:  #19b5fe';

const postData = (body) => {

    return fetch('./server.php', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

};

};

export default sendForm;