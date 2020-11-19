const changeImage = () => {
    'use strict';
    document.addEventListener('mouseover', (event) => {
        if(event.target.matches('.command__photo')){
            event.target.src = event.target.dataset.img;
        }
    });
    document.addEventListener('mouseout', event => {
        if(event.target.matches('.command__photo')){
            const datasetImg = event.target.dataset.img,
            startSrc = datasetImg.replace(/a(?=.jpg)/g, "");
            event.target.src = startSrc;     
        }
        });
};


export default changeImage;