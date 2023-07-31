export default class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}, formElement) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector))
    this._buttonEl = formElement.querySelector(this._submitButtonSelector);
  }

  // показать ошибку
_showError(inputEl) {
  const errorEl = this._formElement.querySelector(`${this._errorClass}${inputEl.name}`);
  inputEl.classList.add(this._inputErrorClass);
  errorEl.textContent = inputEl.validationMessage;
}

// скрыть ошибку
_hideError(inputEl) {
  const errorEl = this._formElement.querySelector(`${this._errorClass}${inputEl.name}`);
  inputEl.classList.remove(this._inputErrorClass);
  errorEl.textContent = '';
}

  // проверить поле на ошибку
_isValid(inputEl) {
  if (inputEl.validity.patternMismatch) {
    // если ошибка срабатывает из-за указанного в pattern, заменить текст ошибки на кастомное сообщение
    inputEl.setCustomValidity(inputEl.dataset.customMessage);
  } else {
    // иначе - на пустую строку для последующего заполнения стандартным сообщением
    inputEl.setCustomValidity('');
  }

  if (!inputEl.validity.valid) {
    this._showError(inputEl);
  } else {
    this._hideError(inputEl);
  }
}

//есть ли ошибка где-то среди полей формы
_hasInvalidInput() {
  return this._inputList.some(input => !input.validity.valid);
}

_disableBtn() {
  this._buttonEl.disabled = true;
}

_enableBtn() {
  this._buttonEl.disabled = false;
}

// вынести вердикт кнопке
_switchBtn() {
  if (this._hasInvalidInput()) {
    this._disableBtn();
  } else {
    this._enableBtn();
  }
};

// повесить слушатель (проверки на ошибку) на каждое поле формы
_setValidListeners() {
  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._isValid(input);
      // по мере заполнения полей выносим вердикт кнопке:
      this._switchBtn();
    })
  });
}

  // проверка формы на валидность
enableValidation() {
    // при 1й загрузке сайта функция деактивирует кнопки
    this._switchBtn();
    // вешаем слушатели ошибок
    this._setValidListeners();
    // вешаем на каждую форму слушатель ресета (блокирует кнопки после перезагрузки формы)
    this._formElement.addEventListener('reset', () => {
      this._disableBtn();
    })
}

}


