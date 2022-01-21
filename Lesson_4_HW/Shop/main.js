const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         // window.ActiveXObject -> xhr = new ActiveXObject()
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };
//
// getRequest('tel.json').then(data => {
//
// })

class List {
    constructor(url, container, list = list2){
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }
    getJson(url){ // 4) // 18)
        return fetch(url ? url : `${API + this.url}`) // если url false срабатывает второй операнд тернарного выражения
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data){ // 6) // 20) с помощью оператора REST полученные объекты делаем элементами массива goods
        this.goods = [...data];
        this.render(); // 7) // 21) запускаем .render()
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){ // 8)
        const block = document.querySelector(this.container); // получаем .cart-block // 22) получаем .products
        for (let product of this.goods){
/* обращаемся к словарю const list2, this.constructor.name = class Cart-> в этом ключе словаря значение CartItem->
передаем в CartItem product при вызове */
// (для 8)это new CartItem(product) // 12) в productObj вернулся экземпляр класса CartItem
            const productObj = new this.list[this.constructor.name](product); // 23) new ProductItem()
            console.log(productObj);
            this.allProducts.push(productObj); // 13) // 24) добавляем в конец массива allProducts разметку из productObj
// 14) // 25) в конец .cart-block добавляем разметку запуская в экземпляре объекта CartItem метод render()
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
    _init(){
        return false
    }
}

class Item{ // 10) получили конструктор из переданного product (здесь он el)
    constructor(el, img = 'https://placehold.it/200x150'){
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}
/* 16) Наследуем List с изменением содержимого container и url и передачей нового параметра cart
* -> переменной содержащей результат работы объекта класса new Cart() т.е. разметки карточки товара */
class ProductsList extends List{
    constructor(cart, container = '.products', url = "/catalogData.json"){
        super(url, container);
        this.cart = cart;
        this.getJson() // 17) запускаем метод в базовом классе
            .then(data => this.handleData(data)); // 19)
    }
    _init(){ // 26)
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){ // 27) если в классе элемента есть buy-btn то срабатывает код ->
                this.cart.addProduct(e.target); // 28) вызов метода .addProduct конструктора class Cart
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value)
        })
    }
}


class ProductItem extends Item{}
/* 2) Cart наследует класс List с переназначением значений свойств container и url */
class Cart extends List{
    constructor(container = ".cart-block", url = "/getBasket.json"){
        super(url, container);
        this.getJson() // 3) вызов метода в базовом классе
            .then(data => { // 5) после получения и преобразования json в объект в базовом классе вызываем ->
                this.handleData(data.contents); // -> метод .handleData базового же класса где читаем значение свойства .contents
            });
    }
    addProduct(element){
        this.getJson(`${API}/addToBasket.json`) // 29) вызов метода базового класса List
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id']; // 30) получаем числовое значение id в переменную
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find){ // 31) if true то свойству найденого элемента .quantity увеличиваем кол-во на 1
                        find.quantity++;
                        this._updateCart(find); // 32) вызываем метод _updateCart
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(element){
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){ // 36) проверка на то можем ли мы удалить товар. Ответ должен быть = 1
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find.quantity > 1){ // 37) если количество в элементе больше 1 -> уменьшаем его на 1
                        find.quantity--;
                        this._updateCart(find); // 38) запускаем обновление карточки товара
                    } else { // 39) если количесто в элементе не больше одного то -> убираем из массива allProducts ->
                        this.allProducts.splice(this.allProducts.indexOf(find), 1); // товар с индексом элемента find
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove(); // удаляем из разметки элемент
                    }
                } else {
                    alert('Error');
                }
            })
    }
    _updateCart(product){ // 33) находим блок по id и переписываем в блоках внутри количество и цену товара
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
    }
    _init(){ // 34) инициализируем слушатели событий на кнопках .btn-cart и del-btn
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible'); // показываем / убираем корзину
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('del-btn')){
                this.removeProduct(e.target); // 35) запускаем метод removeProduct() при нажатии на кнопку
            }
        })
    }

}
/* 9) Наследуем Item с заменой картинки в img */
class CartItem extends Item{
    constructor(el, img = 'https://placehold.it/50x100'){
        super(el, img);
        this.quantity = el.quantity;
    }
    render(){ // 11) делаем разметку элемента с применением полученных из базового класса свойств
        return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity*this.price}</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
    }
}
const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};
/* 1) Создание нового экземпляра объекта Cart */
let cart = new Cart();
let products = new ProductsList(cart); // 15) Создание нового экземпляра объекта ProductsList
products.getJson(`getProducts.json`).then(data => products.handleData(data)); // 36) а здесь вылетает ошибка 404

