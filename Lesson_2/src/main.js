'use strict';
/* Начало предыдущего ДЗ (1) */
// const products = [
//     {id: 1, title: 'Notebook', price: 2000, img: 'https://placehold.it/200x150'},
//     {id: 2, title: 'Mouse', price: 20, img: 'https://placehold.it/200x150'},
//     {id: 3, title: 'Keyboard', price: 200, img: 'https://placehold.it/200x150'},
//     {id: 4, title: 'Gamepad', price: 50, img: 'https://placehold.it/200x150'},
// ];
// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение
// const renderProduct = (item) => {
// // деструктуризация. раскладываем значения элементов объекта в отдельные переменные
//     let {id, title, price, img} = item;
//     return `<div class="product-item" data-id="${id}">
//                 <img src="${img}" alt="#">
//                 <h3>${title}</h3>
//                 <p>${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
// /* Решение с циклом для удаления запятой */
//     // const productsList = list.map(item => renderProduct(item));
//     // document.querySelector('.products').innerHTML = productsList;
//     // productsList.forEach(el => document.querySelector('.products').innerHTML += el)
// /* При разборе ДЗ урока 1 добавлено альтернативное решение с удалением запятых на странице
// * при выводе разметки */
// /* Решение с методом массива .join() и переназначением разделителя внутри метода */
//     document.querySelector('.products').innerHTML = list.map(item =>
//     renderProduct(item)).join(' ');
// };
//
// renderPage(products);
/* Окончание предыдущего ДЗ (1) */



/* Урок 2. Тема: Объектно ориентированное программирование (ООП) */
// В программировании есть два подхода:
// 1) процедурный
// 2) объектно-ориентированный
// ООП необходим если програмный продукт будет в дальнейшем масштабироваться для избежания дублирования кода
// перед началом работ над задачей происходит проектирование (нужно знать solid и паттерны проектирования).
// На больших проектах этим занимаются аналитики или/и TeamLead (руководитель команды)
// Основные принципы ООП должны делать код максимально компактным и универсальным.

/* ООП основано на объектах и классах
* Класс - структура данных у которой есть свойства и методы
* все что имеет свойство и выполняет действия - это класс
* Объект - это экземпляр класса. Сущность созданная по шаблону класса. Объект класса.
* Принципы ООП
* 1) Наследование классов. Цель - избежать дублирование кода.
* (класс состоит из методов и свойств) Есть "базовые классы" (он же "суперкласс", он же "родительский класс")
* от которого создаются другие классы (называются "потомки" или "дочерние классы" или "подклассы").
* Они имеют свои уникальные свойства и методы и главное потомки могут обращаться к свойствам и методам
* базового класса. !Это позволяет не вызывать к классах потомках дублирующие методы! Поэтому в потомках
* пишутся только уникальные присущие исключительно им методы и свойства
* 2) Полиморфизм. (Много форм одного метода) Можно переопределять методы базового класса в потомках
* но логическая цель методов базового класса и потомков должна быть одинаковой (лечить, водить и т.д).
* 3) Инкапсуляция (работа с доступом) методы разных потомков делаются недоступными для других классов,
* а в родительском классе наоборот методы делаются открытыми чтобы потомки могли обратится к ним */