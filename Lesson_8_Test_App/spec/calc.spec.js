const action = require('../calc') // подключили внешний файл по ссылке в переменную
/* Сами пишем числа и сами вычисляем результат. Смысл этого мозгоёбства непонятен */
describe('Возведение в степень', ()=>{
    it('2 ^ 3', ()=>{
        expect(action.pow(2,3)).toBe(8); // перевод на русский - ожидается что результат работы pow должен быть равен 8
    })
})
/* Запускаем второе свойство объекта action которое называется fact */
describe('Факториал', ()=>{
    it('3!', ()=>{
        expect(action.fact(3)).toBe(6); // перевод на русский - ожидается что результат работы pow должен быть равен 8
    });
    it('5!', ()=>{
        expect(action.fact(5)).toBe(120); // перевод на русский - ожидается что результат работы pow должен быть равен 8
    })
})