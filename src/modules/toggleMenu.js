const toggleMenu = () => {
    'use strict';
    const menu = document.querySelector('menu'),
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

export default toggleMenu;