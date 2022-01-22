'use strict';
const TodoItem = {
    props: ['todo'], // входной параметр
    template: `<li>{{todo.text}}</li>`
}
const app = new Vue({
    el: '#app', // название элемента html к которому привязан объект Vue
    data: {
        // name: 'Geek', // в html в поле input прописан атрибут v-model для связи с этим полем
        names: ['Frodo', 'Sam', 'Meriadoc', 'Peregrin'],
    },
    methods: {
        clickHandler() { // для вызова метода в html ставится @(тип события)="название метода"
            console.log('click');
        },
        mounted() {
            // метод предназначен для того чтобы срабатывать при загрузке
        }
    },
    components: {
        TodoItem // Регистрация компонента
    },
    computed: { // Вычисляемые свойства
        upperCaseName(){
            return this.name.toUpperCase();
        }
    }
}); // создаем объект класса Vue
console.log(app);