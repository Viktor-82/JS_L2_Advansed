Vue.component('basket', {
    template: '<button class="btn-cart" type="button"  @click="visible=!visible">Корзина</button>' +
        '<div class="cart-block" v-if="visible"></div>'
})