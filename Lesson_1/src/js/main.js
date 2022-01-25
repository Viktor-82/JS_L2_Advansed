'use strict';

const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'https://placehold.it/200x150'},
    {id: 2, title: 'Mouse', price: 20, img: 'https://placehold.it/200x150'},
    {id: 3, title: 'Keyboard', price: 200, img: 'https://placehold.it/200x150'},
    {id: 4, title: 'Gamepad', price: 50, img: 'https://placehold.it/200x150'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
// деструктуризация. раскладываем значения элементов объекта в отдельные переменные
            let {id, title, price, img} = item;
    return `<div class="product-item" data-id="${id}">
                <img src="${img}" alt="#">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    // const productsList = list.map(item => renderProduct(item.title,item.price,item.img,item.id));
    // пробуем переписать на передачу объекта
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    // document.querySelector('.products').innerHTML = productsList;
/* Запятая на веб странице появляется потому что в разметку HTML вставляется массив
* данных со всеми знаками. Чтобы этого избежать добавим элементы в разметку поочередно при помощи цикла */
    productsList.forEach(el => document.querySelector('.products').innerHTML += el)
};

renderPage(products);

/* Ура! Получилось!!! */