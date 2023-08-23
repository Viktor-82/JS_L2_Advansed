'use strict';

/* Почему при рендере информация задваивается?
* Впоследствие из-за этого прилетает задвоенная информация в корзину */

class ProductList{
    constructor(container='.products'){ /*, renderItemClass = new ProductItem()*/
        /*this.renderItemClass = renderItemClass;*/
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            /* const item = this.renderItemClass(product); */
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
          block.innerHTML += item.render();
        }
    }
    sum() {
        let sumAllProducts = null; // если не записать null при инициализации результатом функции будет NaN
        for (let i = 0; i < this.goods.length; i++) {
            sumAllProducts += +this.goods[i].price;
        }
        console.log(sumAllProducts);
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id=${this.id}>
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}


/* Вариант 2 добавление товара в корзину с наследованием классов */
class Basket extends ProductList {
    constructor(container = '.basket', goodsInBasket) {
        super(container)
        this.goodsInBasket = [];
    }
    _fetchProducts() {
        super._fetchProducts(); // это для того чтобы получить массив товаров из родителя
        this.init(); // это для запуска остальных функций, по другому не работают
        let a = [];
        document.querySelectorAll('.buy-btn').forEach(el => el.addEventListener('click', event => {
            this.goods.filter(el => {
                if (el.id == event.target.parentNode.dataset.id) {
                    a.push(el);
                    this.goodsInBasket = a;
                    console.log(this.goodsInBasket);
                }
            })
        }))
    }
    init() {
        document.querySelector('.btn-cart').addEventListener('click', event => {
            this.createBasket();
            this.renderBasket();
        })
    }
    createBasket() {
        document.querySelector('header').insertAdjacentHTML('beforeend', '<div class = "basket"></div>');
        console.log(this.goodsInBasket);
    }
    renderBasket(){
        document.querySelector('.btn-card')
        const block = document.querySelector(this.container);
        for (let product of this.goodsInBasket) {
            /* const item = this.renderItemClass(product); */
            const item = new ProductItemInBasket(product);
            block.insertAdjacentHTML("beforeend", item.render());
            block.innerHTML += item.render();
            console.log(block);
        }
    }
}






//     _fetchProductsBasket(){
//             document.querySelectorAll('.buy-btn').forEach(el => el.addEventListener('click', event => {
//             this.goods.push(event.target.parentNode.dataset.id);
//             console.log(this.goods);
//         }))
//     }
//     render() {
//         const block = document.querySelector('.basket');
//         // console.log(block);
//         for (let product of this.goods) {
//             const item = new ProductItemInBasket(product);
//             block.insertAdjacentHTML("beforeend", item.render());
// //           block.innerHTML += item.render();
//         }
//     }





// class Basket {
//     constructor() {
//         this.goods = [];
//         this.createBasket();
//         this._fetchProducts();
//         // this.render();
//     }
//     createBasket() {
//         document.querySelector('header').insertAdjacentHTML('beforeend', '<div class = "basket"></div>');
//     }
//     _fetchProducts(){
//             document.querySelectorAll('.buy-btn').forEach(el => el.addEventListener('click', event => {
//             this.goods.push(event.target.parentNode.dataset.id);
//             console.log(this.goods);
//         }))
//     }
//     render() {
//         const block = document.querySelector('.basket');
//         // console.log(block);
//         for (let product of this.goods) {
//             const item = new ProductItemInBasket(product);
//             block.insertAdjacentHTML("beforeend", item.render());
// //           block.innerHTML += item.render();
//         }
//     }
// }



/* Вариант 2 добавление товара в корзину с наследованием классов */
class ProductItemInBasket extends ProductItem {
    constructor(product, img = 'https://via.placeholder.com/140x100') {
        super(product, img);
    }
    render() {
        return `<div class="product-item-basket">
                <img src="${this.img}">
                <h2>${this.title}</h2>
                <p>${this.price}</p>
                <button class="del-btn">X</button>
            </div>`
    }
}
let list = new ProductList();
// list.sum();
let basket = new Basket();