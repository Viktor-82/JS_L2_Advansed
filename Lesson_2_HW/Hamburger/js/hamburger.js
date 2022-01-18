'use strict';

class Burger {
    constructor() {
        this.salary = null;
        this.calories = null;
        this.checkForm();
        this.reset();
    }
    checkForm() {
        document.querySelector('.submit').addEventListener('click', ()=>{
            document.querySelectorAll('input').forEach(el => {
                if(el.checked) {
                    // console.log(el.id);
                    this.salary += +el.dataset.price;
                    this.calories += +el.dataset.calories;
                    console.log(this.salary);
                    console.log(this.calories);
                    console.dir(el);
                }
            });
            this.renderResult();
            this.addMarkupResult();
        })
    }
    renderResult() {
        return `<div class="generalPrice">Цена заказа ${this.salary} рублей </div>
                <div class="generalCalories">Калорийность ${this.calories} калорий</div>`
    }
    addMarkupResult() {
        let markupResult = this.renderResult();
        document.querySelector('.hamburger').insertAdjacentHTML('beforeend', markupResult);
    }
    reset() {
        document.querySelector('.reset').addEventListener('click', event => {
            this.salary = null;
            this.calories = null;
            document.querySelector('.generalPrice').remove();
            document.querySelector('.generalCalories').remove();
            document.querySelectorAll('input').forEach(el => {
                    el.checked = false;
            });
            document.getElementById('1').checked = true;
        })
    }
}

let makburger = new Burger();