
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products', category = "/catalogData.json"){
        this.cat = category;
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this.data = null;
        // this.fetchProducts();
        // this.acyncrRender();
    }

    getJson(url) {
        let URL = (url ? url : `${API + this.cat}`);
        return fetch(URL)
            .then(response => response.json())
            .then(data => this.goods = [...data])
    }

    returnGoods(){
        return this.goods;
    }

    // fetchProducts(url) { // меняем метод. список товаров получаем из удаленного json
    //     let URL = (url ? url : `${API + this.cat}`);
    //               fetch(URL)
    //                 .then(response => response.json())
    //                 .then(data => this.goods = [...data])
    //                 .then(() => console.log(this.goods))
    // }

    // acyncrRender() {
    //     setTimeout(() => {
    //         this.render();
    //     }, 100)
    // }

    render() {
          const block = document.querySelector(this.container);
            for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
    }
//     getSum() {
// //         let s = 0;
// //         this.goods.forEach(item=>{
// //             s += item.price;
// //         })
//
//
// //        for(let product of this.goods){
// //            s += product.price;
// //        }
//         //reduce используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
// //        let res = this.allProducts.reduce((s, item) => s + item.price,0);
//         alert(res);
//     }

}


class ProductItem {
	constructor(product, img = 'https://via.placeholder.com/200x150'){
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		this.img = img;
		
	}
	
	render() {
		 return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
	}
}

/* В этой версии не реализовано уменьшение количество товара в корзине по клику */
class Basket {
    constructor() {
        this.goodsFromProductsList = [];
        this.goodsInBasket = [];
        // this.acyncrAddGoods();
        this.init();
    }

    init(){
        let a = new ProductsList()
        a.getJson()
            .then(() => a.render())
            .then(() => this.goodsFromProductsList = a.returnGoods())
            .then(() => this.addGood())

    }
    // acyncrAddGoods() {
    //     setTimeout(() => {
    //         this.addGood();
    //     }, 200)
    // }
    addGood() { // вариант 1
        document.querySelectorAll('.buy-btn').forEach(el =>   {
            el.addEventListener('click', event =>  {
/*  Была ошибка в которой существовал один раз созданный массив объектов (а не каждый раз вновь создаваемый) и работа
* с ним велась добавлением его элементов в другой объект. При записи this.goodsInBasket.push(el) в goodsInBasket
* копировалась ссылка на объект находящийся в  goodsFromProductsList поэтому все действия с  */
                    this.goodsFromProductsList.forEach( el => { //
                    if (el.id_product == +event.target.parentNode.dataset.id && this.goodsInBasket.find(i => i.id_product == el.id_product)) {
                        console.dir(this.goodsFromProductsList)
                        this.changeGood(el);
                    } else if (el.id_product == +event.target.parentNode.dataset.id){
                        this.goodsInBasket.push({...el});
                        this.render();
                        console.dir(this.goodsInBasket)
                    }
                });
            })
        })
    }

    removeGood() {
        document.querySelectorAll('.del-btn').forEach(el => {
            el.addEventListener('click', () => {
                let a = this.goodsInBasket.findIndex(item => item.id_product == +el.dataset.id);
                this.goodsInBasket.splice(a, 1);
                this.render();
            })
        })
    }
    //
    changeGood(el) {
        this.goodsInBasket.forEach(item => {
            if(item.id_product == el.id_product) {
                item.price += el.price;
            }
        })
        this.render();
    }
    showBasket() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.container-basket').classList.toggle('invisible');
        })
    }

    render() {
            let productsInBasket = [];
            let basket = document.querySelector('.basket');
            if(this.goodsInBasket.length == 0) {
                basket.innerHTML = '';
            } else {
                for (let product of this.goodsInBasket) {
                    const productObj = new ElemBasket(product);
                    productsInBasket.push(productObj.render());
                    basket.innerHTML = productsInBasket.join(' ');
                    this.removeGood();
            }
        }
    }
}

class ElemBasket {
    constructor(product, img = 'https://via.placeholder.com/50x100') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item-basket" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="descr">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="del-btn" data-id="${this.id}">X</button>
                </div>                
                </div>`
    }
}

// let productList = new ProductsList(); // 1)

let basket = new Basket();


// list.getSum();
// let basket = new Basket();
// basket.addGood();
// basket.render();
basket.showBasket();
// basket.removeGood();