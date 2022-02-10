Vue.component('make-render', {
    template: `<div class="product-item" data-id="${product.id_product}">
                <img src="${img}" alt="Some img">
                <div class="desc">
                    <h3>${product.product_name}</h3>
                    <p>${product.price} $</p>
                    <button class="buy-btn"
                    data-id="${product.id_product}"
                    data-name="${product.product_name}"
                    data-price="${product.price}"
                    @click="addProductsBasket">Купить</button>
                </div>
            </div>`
})