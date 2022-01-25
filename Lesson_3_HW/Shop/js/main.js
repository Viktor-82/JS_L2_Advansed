class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    }
    
    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
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
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
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

let list = new ProductsList();
list.render();
// list.getSum();

/* В этой версии не реализовано уменьшение количество товара в корзине по клику */
class Basket {
    constructor() {
        this.goodsInBasket = [];
        this.addGood();
    }

    addGood() {
        document.querySelectorAll('.buy-btn').forEach(el => {
            el.addEventListener('click', event => {
                let product = new ProductsList().goods.forEach(el => {
                    // здесь ошибка функция вызывается несколько раз пока .stopPropagation() не поставишь, а с ним
                    // if(this.goodsInBasket.find(item => item.id == +event.target.parentNode.dataset.id)) {
                    //     this.changeGood(event).stopPropagation();
                    // } else
                    //     if (el.id == +event.target.parentNode.dataset.id) {
                    //     this.goodsInBasket.push(el);
                    //     this.render(); // при каждом добавлении элемента вызывается рендер
                    // }
                    if (el.id == +event.target.parentNode.dataset.id) {
                    if(this.goodsInBasket.find(item => item.id == +event.target.parentNode.dataset.id)) {
                        this.changeGood(el);
                    } else {
                        this.goodsInBasket.push(el);
                        this.render(); // при каждом добавлении элемента вызывается рендер
                    }
                   }
                });
            })
        })
    }

    removeGood() {
        document.querySelectorAll('.del-btn').forEach(el => {
            el.addEventListener('click', () => {
                let a = this.goodsInBasket.findIndex(item => item.id == +el.dataset.id);
                this.goodsInBasket.splice(a, 1);
                this.render();
            })
        })
    }
    //
    changeGood(el) {
        // console.dir(el); // объект получаем все ок!
        this.goodsInBasket.forEach(item => {
            if(item.id == el.id) {
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
        this.id = product.id;
        this.title = product.title;
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

let basket = new Basket();
// basket.addGood();
// basket.render();
basket.showBasket();
// basket.removeGood();