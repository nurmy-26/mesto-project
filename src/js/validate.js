// показать ошибку
export function showError(formEl, inputEl) {
  const errorEl = formEl.querySelector(`.popup__error_type_${inputEl.name}`);
  inputEl.classList.add('popup__input_invalid');
  errorEl.textContent = inputEl.validationMessage;
}

// скрыть ошибку
export function hideError(formEl, inputEl) {
  const errorEl = formEl.querySelector(`.popup__error_type_${inputEl.name}`);
  inputEl.classList.remove('popup__input_invalid');
  errorEl.textContent = '';
}

// проверить поле на ошибку
export function isValid(formEl, inputEl) {
  if (inputEl.validity.patternMismatch) {
    // если ошибка срабатывает из-за указанного в pattern, заменить текст ошики на кастомное сообщение
    inputEl.setCustomValidity(inputEl.dataset.customMessage);
  } else {
    // иначе - на пустую строку для последующего заполнения стандартным сообщением
    inputEl.setCustomValidity('');
  }

  if (!inputEl.validity.valid) {
    showError(formEl, inputEl);
  } else {
    hideError(formEl, inputEl);
  }
}

// вынести вердикт кнопке
export function switchBtn (button, formEl) {
  // переменная булевого типа (true - если всё ок, false - в форме есть невалидное поле)
  const formValidity = formEl.checkValidity();
  // отрицание, т.к. если всё ок - это true, а нам нужно false (и наоборот)
  button.disabled = !formValidity;
}

// повесить слушатель (проверки на ошибку) на каждое поле формы
export function setValidListeners(formEl) {
  const inputList = Array.from(formEl.querySelectorAll('.popup__input'));
  const button = formEl.querySelector('.btn_el_save');

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(formEl, input);
      // по мере заполнения полей выносим вердикт кнопке:
      switchBtn (button, formEl);
    })
  })
}

// проверка всех форм на валидность
export function doValidation() {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((form) => {
    setValidListeners(form);
  })
}
