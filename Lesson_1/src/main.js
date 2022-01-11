'use strict'

// Math.pow(2, 3); // ES 5
// // alert(2 ** 3); // в стандаре ES 6 оператор степени **
//
// var obj = {
//     a:1,
//     b:2
// }
//
// var arr = Object.values(obj); // массив данных
// // var arr = Object.keys(obj); // массив ключей
// console.log(arr)

// var arr = [];
// arr.push(obj.a);
// arr.push(obj.b);

// Отличия между ES-5 и ES-6
// var PI = 3.14; // константа в ES-5 всего лишь номинальная
// const PI = 3.14; // ES-6

// Отличия let и var let local   var global
// var a = 1;
// if(a) {
//     var a = 2;
//     console.log(a); // 2
// }
// console.log(a); // 2

// let a = 1;
// if(a) {
//     let a = 2;
//     console.log(a); // 2
// }
// console.log(a); // 1

// let a = 1;
// if(a) {
//     a = 2;
//     console.log(a); // 2
// }
// console.log(a); // 2

// if(1) {
//     let a = 2;
//     console.log(a); // 2
// }
// console.log(a); // undefined

// let i = 5;
// for (let i = 0; i < 2; i++) {
//     console.log(i) // 0 1
// }
// console.log(i); // 5

// Template literals (шаблонные строки)

// let firstName = 'Иван';
// let lastName = 'Иванов';
// let year = 1990;
//
// function getAge(yearOfBirthDay) {
//     let date = new Date(); // date - это объект класса
//     return date.getFullYear() - yearOfBirthDay;
// }

// const FIO = firstName + " " + lastName + ", рожденный в " + year + " году, ему " + getAge(year); // ES-5 больше не используем
// const FIO = `${firstName} ${lastName}, рожденный в ${year} году, ему ${getAge(year)} лет\n`; // ES-6 // \n - это перенос строки
// console.log(FIO);
// любая строка является объектом. => можно обратится к свойствам объекта
// console.log(FIO.indexOf("Иванов")); // какой индекс вхождения подстроки в строке (будет 5)
// console.log(FIO.endsWith("лет")); // оканчивается ли строчкой "лет"
// console.log(FIO.repeat(3)); // строка повторится 3 раза

// Стрелочные функции
// если в константу присваиваем функцию то название константы не обязательно писать в верхнем регистре
// const sum = function (a) {
//     return a + 10;
// }

// const sum = a => a + 10; // return в стрелочной функции присутствует по умолчанию
// alert(sum(5));

// const sum = (a, b = 1) => {
//     a = +a; // если в a передать строку то a будет NaN
//     if(!isNaN(a)) {
//         console.log(a + b);
//     }else{
//         console.log('Вы ввели не число')
//     }
// }
//
// sum("2"); // 3

// let arr = ["PHP", "JS", "Java", "C#"];
/* Основные методы массива в которые можно передать функции в качестве аргумента:
* forEach()
* map()
* filter()
* find()
* (выучить) */
// arr.forEach((item, i) => console.log(`${i + 1}) ${item}`)); // forEach может принимать 2 параметра

/* Метод map() - применяет функцию к каждому элементу массива и возвращает новый массив в соответствии со значением,
* полученным после вычисления */
// let r = [2,3,4,5,6,7];
// let s = r.map(item => Math.PI * item ** 2);
// console.log(s);

/* Метод filter() проверит каждый элемент массива и вернет новый массив с элементами по заданным параметрам */
// let r = [8,2,3,4,5,6,7];
// let rMoreThen5 = r.filter(item => item > 5);
// console.log(rMoreThen5);

/* Метод find() найдет и выведет первый найденный элемент по заданным параметрам (не массив) */
// let findItemWithR3 = r.find(item => item == 3);
// console.log(findItemWithR3);

// let r = [8,2,3,4,5,6,7];
// /* filter() получаем новый массив по параметрам , map приводим к массиву площадей с помощью переданной формулы,
// toFixed() округляем до количества знаков после запятой переданных в метод (до 2)
// * содержащийся в map массив перебираем forEach и выводим в консоль каждый элемент */
// console.log(r.filter(item => item > 3).map(item => (Math.PI * item ** 2).toFixed(2)).forEach(item => console.log(item)));

/* Особенности стрелочных функций */
// Область видимости
// let box = {
//     color: 'green',
//     position: 10,
//     clickMe: function () {
//         document.querySelector('button').addEventListener('click', function () {
//             console.log(this);
//             console.log(`Контейнер №${this.position} имеет цвет ${this.color}`);
//         });
//     }
// }
// // при function declaration this будет указывать на button
// box.clickMe(); // Контейнер №undefined цвет undefined


// в стрелочной функции this будет указывать на объект и его свойства в котором она вызвана
// у стрелочной функции нет собственного this. Они используют this базового элемента (кнопка вложена в box)
// let box = {
//     color: 'green',
//     position: 10,
//     clickMe: function () {
// // когда функция запускается по событию, то она в качестве первого параметра принимает глобальный объект event
//         document.querySelector('button').addEventListener('click', e => {
//             e.target.style.color = 'red';
//             console.log(`Контейнер №${this.position} имеет цвет ${this.color}`);
//         });
//     }
// }
// box.clickMe(); // Контейнер №10 цвет green
//
// let button = document.querySelector('button');
// // toggle работает только с классами. Если был удаляет, если не был добавляет
// button.onclick = function () {
//     this.classList.toggle("x");
// }

/* Деструктуризация - это механизм который позволяет извлечь части из составных данных */
// let mas = ['Иван', 20];
// // let name = mas[0]; // старая форма присваивания
// // let age = mas[1];
// // создались переменные name и age и в них присвоились значения массива. Цикл для присвоения значений здесь не нужен.
/* Деструктуризация массива */
// let [name, age] = mas;
// alert(name); // Иван

// let obj = {
//     firstName: 'Иван',
//     lastName: 'Иванов',
//     professions: ['программист', 'системный администратор']
// }
// /* Дестуктуризация объекта */
// /* Из свойства firstName присваиваем значение в переменную name, из свойства lastName объекта obj присваиваем
// * значение в переменную lastName (в этом случае lastName это новая переменная просто название со свойством объекта
// * совпадают и в нее записывается значение из свойства объекта lastName) из массива professions данные
// * присваиваем в переменные p1, p2 */
// let {firstName:name, lastName, professions: [p1,p2]} = obj; // итого имеем 4 новые переменные name, lastName, p1, p2.

// let info = year => {
//     let age = new Date().getFullYear() - year;
//     return [age, 65 - age];
// }
// // запускается функция, ей присваивается массив, парсим массив
// let [age, leftWork] = info(1990);
// console.log(age);
// console.log(leftWork);

// /* Оператор REST и оператор SPREAD */
// // Оператор REST (...letName) - упаковка элементов в массив
// function testRest(a, b, ...c) {
//     console.log(c);
// }
// testRest(1,2,3,4,5); // [3, 4, 5]
//
// // Оператор SPREAD (...arrName) - распаковка массива в отдельные элементы
// const values = [2, 43, 54, 56, 76, 34, 32, 2];
// console.log(Math.max(...values));

// /* Копирование элементов свойств массива с помощью оператора ... */
// let arr1 = ['one', 'two'];
// let arr2 = ['first', ...arr1, 'second'];
// console.log(arr2);

