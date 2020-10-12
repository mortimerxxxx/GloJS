'use strickt';

let lang = prompt('ru', 'en');


if (lang === 'ru') {
    console.log('Понедельник', 'Вторник', 'Среда');
}else if (lang === 'en'){
    console.log('Monday', 'Tuesday', 'Wednesday');
}

switch (lang){
    case 'ru':
        console.log('Понедельник', 'Вторник', 'Среда');
        break;
    case 'en':
        console.log('Monday', 'Tuesday', 'Wednesday');
        break;
}


let array = [
    ['Понедельник', 'Вторник'],
    ['Monday', 'Tuesday']
];

lang === 'ru' ? console.log(array[0]) : console.log(array[1]);


/*let namePerson = prompt('Как тебя зовут?', 'Артем') === 'Артем' ? 'Директор' : 
prompt('Как тебя зовут?', 'Максим') === 'Максим' ? 'Преподаватель' : 'студент';

console.log(namePerson);*/

let namePerson = prompt('Как тебя зовут?');

namePerson === 'Артем' ? console.log("Директор") : namePerson === "Максим" ? console.log('Преподаватель') : console.log("Студент");
