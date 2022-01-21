'use strict';

// /* 1) Переписан пример из урока проверки на email с описания на классы */
// // console.log("test@mail.ru".match(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$/i));
// console.log("test@mail.ru".match(/^[\w-]+@[\w-]+\.[a-z]{2,4}$/i));

// /* 2) Замена кавычек одинарных на двойные */
// let a = "One: 'Hi Mary.' Two: 'Oh, hi.'\n" +
//         "One: 'How are you doing?'\n" +
//         "Two: 'I'm doing alright. How about you?'\n" +
//         "    One: 'Not too bad. The weather is great isn't it?'\n" +
//         "    Two: 'Yes. It's absolutely beautiful today.'\n" +
//         "One: 'I wish it was like this more frequently.'\n" +
//         "Two: 'Me too.'\n" +
//         "One: 'So where are you going now?'\n" +
//         "Two: 'I'm going to meet a friend of mine at the department store.'\n" +
//         "One: 'Going to do a little shopping?'\n" +
//         "Two: 'Yeah, I have to buy some presents for my parents.'\n" +
//         "One: 'What's the occasion?'\n" +
//         "    Two: 'It's their anniversary.'\n" +
//         "One: 'That's great. Well, you better get going. You don't want to be late.'\n" +
//         "Two: 'I'll see you next time.'\n" +
//         "One: 'Sure. Bye.'";
// let b = a.replace(/'/g, '"');
// console.log(b);

// /* Поменять одинарные кавычки на двойные только там где они не являются опострофами It's, I'm - не меняем */
// let a = "One: 'Hi Mary.' Two: 'Oh, hi.'\n" +
//         "One: 'How are you doing?'\n" +
//         "Two: 'I'm doing alright. How about you?'\n" +
//         "    One: 'Not too bad. The weather is great isn't it?'\n" +
//         "    Two: 'Yes. It's absolutely beautiful today.'\n" +
//         "One: 'I wish it was like this more frequently.'\n" +
//         "Two: 'Me too.'\n" +
//         "One: 'So where are you going now?'\n" +
//         "Two: 'I'm going to meet a friend of mine at the department store.'\n" +
//         "One: 'Going to do a little shopping?'\n" +
//         "Two: 'Yeah, I have to buy some presents for my parents.'\n" +
//         "One: 'What's the occasion?'\n" +
//         "    Two: 'It's their anniversary.'\n" +
//         "One: 'That's great. Well, you better get going. You don't want to be late.'\n" +
//         "Two: 'I'll see you next time.'\n" +
//         "One: 'Sure. Bye.'";
// let b = a.replace(/\s'/g, ' "').replace(/'\n/g, '"\n').replace(/'\s/g, '" '); // в такой последовательности рабочий вариант
// console.log(b);

// /* Создать форму обратной связи с полями Имя, Телефон, Емэйл, текст, кнопка отправить. Валидация полей:
//     Имя - только буквы
//     Телефон вид +7(000)000-0000
//     Емэйл mymail@mail.ru или my.mail@mail.ru или my-mail@mail.ru
//     Текст произвольный
//     Если одно из полей не прошло валидацию выделить это поле красной рамкой и сообщить об ошибке */
// let name = document.querySelector('.name');
// let phone = document.querySelector('.phone');
// let email = document.querySelector('.email');
// let text = document.querySelector('.text');
// document.querySelector('.send').addEventListener('click', () => {
//     // console.dir(name.value);
// /* Символы латиницы, кирилицы, с них строка начинается и что не менее важно заканчивается.
// Между буквенными символами может быть символ пробела  */
//     if (name.value.search(/^[a-z\s/а-яё]+$/ig) === -1) {
//         console.log('Некорректные данные в поле name')
// /* Изменение цвета background наглядней показывает ошибки при тестировании одного поля. Выделенные рамки сливаются
// и невозможно понять ошибка на тестируемом поле или на соседних. */
//             name.style.backgroundColor = 'lightblue';
//             // name.value = 'введите корректные данные';
//     }
//     if (phone.value.search(/^\+7\(\d{3}\)\d{3}\-(\d{4})+$/ig) === -1) { // работает!!!
//         console.log('Некорректные данные')
//             phone.style.backgroundColor = 'lightblue';
//     }
//     // все работает но не получается поставить органичение на количество больше 1 знака @
//     if (email.value.search(/(^[a-z\.|\-a-z]+)@([a-z]+)\.([a-z]{2,4})$/ig) === -1) { //(email.value.search(/([^\.*]+)@([a-z]+)\.([a-z]{2,4})$/ig)
//         console.log('Некорректные данные в поле Email')
//             email.style.backgroundColor = 'lightblue';
//     }
//     if (text.value.search(/abc/ig) === -1) { // здесь
//         console.log('Некорректные данные')
//             text.style.backgroundColor = 'lightblue';
//     }
// })


























