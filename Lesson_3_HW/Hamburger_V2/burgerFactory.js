/* похоже на то что класс получает элемент html и делает из него объект с параметрами имя, общая стоимость, общая цена */
class Param{
/* 4) в конструктор записывается название и значения (приведенные к типу
* number с помощью унарного оператора +) цены и калорийности */
    constructor(element){ // element = селектор:checked с html страницы
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
} 
class Burger{
    constructor(size,add,topping){//add - состав
/* 1) this._select() вызываем функцию и передаем название параметра по которому он будет искать тег в html */
/* 3) выбранный селектор как результат f _select попадает в качестве параметра в класс Param */
/* 5) новый объект класса Param записывается в переменную */
        this.size = new Param(this._select(size));
        this.add = new Param(this._select(add));
/* 6) запуск функции _getToppings с переданным параметром toppings */
/* 11) в this.toppings записывается массив объектов как результат функции _getToppings */
        this.toppings = this._getToppings(topping);
      }
    
    _getToppings(name){
        let result = [];
/* 7) запуск функции _selectAll(name это toppings) */
/* 9) перебираем полученный массив */
        this._selectAll(name).forEach(el => {
/* 10) при каждой итерации вызываем конструктор Param, записываем в obj результат - объект добавляем результат obj
* в конец массива result, возвращаем массив объектов result в место вызова функции _getToppings */
            let obj = new Param(el);
            result.push(obj);
        });
        return result;
    }
/* 2) функция находит в html селектор по переданному параметру и статусу :checked и возвращает этот селектор
 в место откуда она была вызвана */
    _select(name){
        return document.querySelector(`input[name=${name}]:checked`);
    }
/* 8) получили все селекторы toppings из html, с помощью спред оператора записали из как отдельные элементы массива
* и вернули массив с данными селекторов в место вызова функции */
    _selectAll(name){
        return [...document.querySelectorAll(`input[name=${name}]:checked`)];
   }
/* 13) Складываем цифры полученные объекта size свойства  price, объекта add свойства price, добавляем результат
* перебора циклом массива объектов и их значений полей price, возвращаем результат в место вызова метода */
    _sumPrice(){
        //console.log(this.toppings);
        let result = this.size.price + this.add.price;
        this.toppings.forEach(el => result += el.price);
        return result;
    }
/* 14) Все то же самое что и в п.12 (_sumPrice) */
    _sumCalories(){
        let result = this.size.calories + this.add.calories;
        this.toppings.forEach(el => result += el.calories);
        return result;
    }
/* 12) был внешний вызов метода showSum объекта burger класса Burger, внутри метода запускается
* работа функций класса _sumPrice() и _sumCalories */
/* 15) записываем в параметр textContent переданных в вызове burger.showSum() селекторов
* результаты функций _sumPrice() и _sumCalories */
    showSum(price, calories){
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }
}