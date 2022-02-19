/* Метод .toBe() сравнение простых значений */
describe('Сравнение простых значений ', ()=> {
    it('Функция сравнивает числа', ()=>{ // функция вторым параметром
        let x = 10;
        expect(x).toBe(10) // метод toBe сравнивает числа и строки
    });
    it('Проверка соответствия переменной x значению 21', ()=>{ // функция вторым параметром
        let x = 21;
        expect(x).toBe(21) // метод toBe сравнивает числа и строки
    })
});
/* Метод .toEqual сравнение объектов */
describe('Сравнение объектов', ()=>{
    it('Функция сравнивает объекты', ()=>{
        let test = ()=>{};
        let user1 = {
            name: 'Иван',
            age:25,
            go: test
        };
        let user2 = {
            name: 'Иван',
            age:25, 
            go: test
        }
        expect(user1).toEqual(user2) // запуск проверки
    });
    /* Метод .toMatch проверка на соответствие регулярному выражению */
    it('RegExp', ()=>{
        let text = 'Test aBCd jasmine';
        expect(text).toMatch(/ABCD/i)
    });
    it('Array', ()=>{
        let arr = ['one', 'two'];
        expect(arr).toContain('two')
    })
})