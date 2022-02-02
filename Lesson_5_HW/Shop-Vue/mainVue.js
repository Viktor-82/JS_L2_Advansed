/* Получаем данные из json
* расмещаем на странице в виде разметки
* делаем метод показать|скрыть корзину
* делаем метод фильтр
* все это на Vue.js */

/* Адреса доступов к json */
const generalUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalogUrl = '/catalogData.json';
const basketUrl = '/getBasket.json';
const checkAddBasketUrl = '/addToBasket.json';
const checkDellBasketUrl = '/deleteFromBasket.json';

// const renderPage = {
//     props: [shop.goods]
// }
/* В js файле объявляем новый объект класса Vue
*  в html подключаем ссылку на cdn и объявляем селектор с которым будет взаимодествовать объект класса Vue */
const shop = new Vue({
    el: '#shop',
    data: { // объект используем как область конструктора в ООП
        container: '.products',
        goods: [],
        allProducts: [],
        filtered: [],
        cartBlock: document.querySelector('.cart-block'),
        visible: false,
        filter: ''
    },
    mounted(){
        fetch( generalUrl+catalogUrl)
            .then(response => response.json())
            .then((data) => this.goods = [...data])
            .then(() => console.log(this.goods))
    },
    methods: {
        // insertMark(product) {
        //     document.querySelector('.products').insertAdjacentHTML('beforeend', this.makeRender(product));
        // },
        makeRender(product){
            let img = 'https://placehold.it/200x150';
            return `<div class="product-item" data-id="${product.id_product}">
                <img src="${img}" alt="Some img">
                <div class="desc">
                    <h3>${product.product_name}</h3>
                    <p>${product.price} $</p>
                    <button class="buy-btn"
                    data-id="${product.id_product}"
                    data-name="${product.product_name}"
                    data-price="${product.price}">Купить</button>
                </div>
            </div>`
        },
        filterEl(filter){
            let regexp = new RegExp(filter, 'i');
            for(item of this.goods){
                let block = document.querySelector(`.product-item[data-id="${item.id_product}"]`);
                if(regexp.test(item.product_name)){
                    block.classList.remove('invisible')
                    block.classList.add('visible')
                } else {
                    block.classList.remove('visible')
                    block.classList.add('invisible')
                }
            }
        }
    }
});

