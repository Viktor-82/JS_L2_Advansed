/* Задача.
Пишем код с чистого листа, в коде используем:
наследования классов
использование словаря
запросы json на получение товаров в каталог
 -> получение подтверждения на запись и удаление
 -> получение товаров в корзину (отдельный json)
 Реализуем уменьшение товара по нажатию .del-btn, а также удаления по этой же кнопке */

/* Url адреса:
* общий репозиторий https://github.com/GeekBrainsTutorial/online-store-api/tree/master/responses
* каталог https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json
* корзина https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json
* подтверждение добавления в корзину https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json
* подтверждение удаления https://github.com/GeekBrainsTutorial/online-store-api/blob/master/responses/deleteFromBasket.json  */

/* Адреса доступов к json */
const generalUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalogUrl = '/catalogData.json';
const basketUrl = '/getBasket.json';
const checkAddBasketUrl = '/addToBasket.json';
const checkDellBasketUrl = '/deleteFromBasket.json';

/* Универсальный класс для получения и обработки данных с сервера, добавления разметки в указанный селектор
* Особенности - максимально унифицированный и обезличенный для того чтобы можно было использовать его как обработчик
* данных передаваемых из классов потомков. Вызывается также только из потомков. Для подключения классов возвращающих
* разметку при вызове из потомков используется унифицированная форма записи вызова рендера из словаря */
class UniversalList {
    constructor(container, url, list = valueDictionary) { // входные параметры приходят только из потомков
        this.goods = []; // массив для хранения товаров страницы
        this.goodsInBasket = []; // массив для хранения товаров корзины
        this.filtered = [];
        this.container = container;
        this.list = list;
        this._init(); // объявлен для того чтобы не объявлять в классах наследниках
    }
    /* Метод получает данные json и преобразует их в объект */
    getJson(url){
        return fetch(url ? url : generalUrl+catalogUrl)
            .then(response => response.json())
    }

    /* Метод записывает данные в массив this.goods и запускает insertMark */
    launchRender(data) {
        this.goods = [...data];
        this.insertMark();
    }

    /* Метод создает получает разметку товаров и вставляет их на страницу в определенный селектор */
    insertMark() {
        const block = document.querySelector(this.container);
        this.goods.forEach(el => {
/* Обращение к словарю в данной записи делает класс универсальным т.к. на вход можно передать любые данные */
            let productEl = new this.list[this.constructor.name](el);
            this.goodsInBasket.push(productEl);
            block.insertAdjacentHTML('beforeend', productEl.render());
        })
    }

    filter(value) {
        const regex = new RegExp(value, 'i')
        this.filtered = this.goodsInBasket.filter(product => regex.test(product.title))
        this.goodsInBasket.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible')
            } else {
                block.classList.remove('invisible')
            }
        })
    }

    /* Метод ничего не делает конкретно в этом классе. */
    _init(){
        return false
    }
}

/* Для рендера карточки товара на странице */
class UniversalRender {
    constructor(product, img){
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                    data-id="${this.id}"
                    data-name="${this.title}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}

/* Для получения данных о товарах страницы и отрисовки разметки. Работает в паре с PageRender */
class Page extends UniversalList {
    constructor(basket, container = '.products', url = '/catalogData.json') {
        super(container, url)
        this.getJson()
            .then(data => this.launchRender(data)) // вызвали рендер отрисовали базовую страницу
        this.basket = basket;
    }
    _init() {
        document.querySelector('.products').addEventListener('click', element => { // 2 поэтому вешаем на тот селектор который есть
            if(element.target.classList.contains('buy-btn')){ // 1 если вешать обработчики сразу на .buy-btn то этих элементов еще нет.
                this.basket.addGoods(element.target); // здесь идет обращение к переданному в объект классу и его методу
            }
        })
        let block = document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault()
            this.filter(document.querySelector('.search-field').value);
        })
    }
}

/* Для отрисовки карточки товара на странице. Работает в паре с Page */
class PageRender extends UniversalRender {
    constructor(product, img = 'https://placehold.it/200x150') {
        super(product, img);
    }
}

/* Для создания/очистки корзины. Работает в паре с RenderGoodsInBasket */
class Basket extends UniversalList {
    constructor(container = '.cart-block', url = '/getBasket.json') {
        super(container, url)
    }
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible') // показать/скрыть корзину
        });
        document.querySelector(this.container).addEventListener('click', event => {
            if(event.target.classList.contains('del-btn')) {
                this.removeGood(event.target)
            }
        });
    }
    /* Метод добавляет товары в корзину после проверки разрешения. Запускается из другого класса */
    addGoods(element) { // element прилетел из class Page при нажатии на кнопку .buy-btn
        /* Здесь из метода можно еще раз обратиться к методу родителького класса для запроса JSON */
        this.getJson(`${generalUrl}${checkAddBasketUrl}`)
            .then(data => {
                if(data.result == 1) {
                    let productId = +element.dataset.id;
                    let find = this.goodsInBasket.find(product => product.id == productId)
                    if(find) {
                        find.quantity++
                        this.updateCart(find)
                    } else {
                        let product = {
                            id_product: productId,
                            product_name: element.dataset.name,
                            price: element.dataset.price,
                            quantity: 1,
                        }
                        this.goods = [product];
                        this.insertMark();
                    }
                }
            })
    }
    /* Метод уменьшает/удаляет товары в корзине */
    removeGood(el) {
        this.getJson(`${generalUrl}${checkDellBasketUrl}`)
            .then(data => {
                if(data.result == 1) {
                    let dataId = el.dataset.id
                    let find = this.goodsInBasket.find(product => product.id == dataId)
                    if(find.quantity > 1) {
                        find.quantity--
                        this.updateCart(find)
                    } else {
                        this.goodsInBasket.splice(this.goodsInBasket.indexOf(find), 1)
                        document.querySelector(`.cart-item[data-id="${find.id}"]`).remove()
                    }
                }
            })
    }

    /* Метод обновляет количество и цену в карточке товара в корзине */
    updateCart(product) {
        let card = document.querySelector(`.cart-item[data-id="${product.id}"`);
        card.querySelector('.product-quantity').innerText = `Quantity: ${product.quantity}`;
        card.querySelector('.product-price').innerText = `$ ${product.quantity*product.price}`;
   }
}
/* Для рендера карточки товара - цена количество название картинка. Работает в паре с Basket */
class BasketRender extends UniversalRender {
    constructor(product, img = 'https://placehold.it/50x100'){
        super(product, img)
        this.quantity = product.quantity;
    }
    render(){
     return `<div class="cart-item" data-id="${this.id}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.title}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity*this.price}</p>
            <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
        </div>`
    }
}

/* Словарь - объектоподобная сущность при обращении к которой по ключу можно получить значение
* Полезен для унификации классов в данном случае */
const valueDictionary = {
    Page: PageRender,
    Basket: BasketRender
};
let basket = new Basket();
let product = new Page(basket);



