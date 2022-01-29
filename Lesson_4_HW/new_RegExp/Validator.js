class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя должно содержать только буквы',
            phone: 'Телефон должен соответствовать шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }

    _validateForm() {
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for(let error of errors) { // 1 если есть в форме элементы с классом error-msg то удаляем их
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields) {
        this._validate(field)
        }
        if(![...document.getElementById(this.form).querySelectorAll('.invalid')].length){
            this.valid = true;
        }
    }
    _validate(field){
        if(this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)){
                field.classList.add('invalid'); // класс который добавляет красную рамку полю
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }
    _addErrorMsg(field){ // метод создает и добавляет html разметку с уведомлением об ошибке
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
/* Метод вешает слушатель событий на input и в зависимости от того проходит ли вводимое содержимое проверку регулярными
* выражениями добавляет/убирает классы input(ов) и селектор в котором выводится сообщение об ошибке */
    _watchField(field){ //
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`)
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid')
                field.classList.add('valid')
                if(error){
                    error.remove()
                }
            } else {
                field.classList.remove('valid')
                field.classList.add('invalid');
                if(!error){
                    this._addErrorMsg(field)
                }
            }
        })
    }
}
