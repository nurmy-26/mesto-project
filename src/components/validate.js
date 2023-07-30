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
  // надо ли передавать форму на вход?
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

/*
// для каждой проверяемой формы создавать экземпляр класса

// проверка всех форм на валидность
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    // создать экземпляр формы
    // и проверить его с помощию enableValidation

    // при 1й загрузке сайта функция деактивирует кнопки
    // switchBtn(form);

    // вешаем слушатели ошибок
    // setValidListeners(form, settings);

    // вешаем на каждую форму слушатель ресета (блокирует кнопки после перезагрузки формы)
    // ...
  })
*/
/*
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.btn_el_save',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__error_type_'
}

// показать ошибку
export function showError(formEl, inputEl, settings) {
  const errorEl = formEl.querySelector(`${settings.errorClass}${inputEl.name}`);
  inputEl.classList.add(settings.inputErrorClass);
  errorEl.textContent = inputEl.validationMessage;
}

// скрыть ошибку
export function hideError(formEl, inputEl, settings) {
  const errorEl = formEl.querySelector(`${settings.errorClass}${inputEl.name}`);
  inputEl.classList.remove(settings.inputErrorClass);
  errorEl.textContent = '';
}

// проверить поле на ошибку
export function isValid(formEl, inputEl, settings) {
  if (inputEl.validity.patternMismatch) {
    // если ошибка срабатывает из-за указанного в pattern, заменить текст ошибки на кастомное сообщение
    inputEl.setCustomValidity(inputEl.dataset.customMessage);
  } else {
    // иначе - на пустую строку для последующего заполнения стандартным сообщением
    inputEl.setCustomValidity('');
  }

  if (!inputEl.validity.valid) {
    showError(formEl, inputEl, settings);
  } else {
    hideError(formEl, inputEl, settings);
  }
}

//есть ли ошибка где-то среди полей формы
export function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

export function disableBtn(buttonEl) {
  buttonEl.disabled = true;
}

export function enableBtn(buttonEl) {
  buttonEl.disabled = false;
}

// вынести вердикт кнопке
export function switchBtn(form) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector))
  const buttonEl = form.querySelector(settings.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    disableBtn(buttonEl);
  } else {
    enableBtn(buttonEl);
  }
};

// повесить слушатель (проверки на ошибку) на каждое поле формы
export function setValidListeners(formEl, settings) {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(formEl, input, settings);
      // по мере заполнения полей выносим вердикт кнопке:
      switchBtn(formEl);
    })
  });
}

// проверка всех форм на валидность
export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    // при 1й загрузке сайта функция деактивирует кнопки
    switchBtn(form);
    // вешаем слушатели ошибок
    setValidListeners(form, settings);
    // вешаем на каждую форму слушатель ресета (блокирует кнопки после перезагрузки формы)
    const button = form.querySelector(settings.submitButtonSelector);
    form.addEventListener('reset', () => {
      disableBtn(button);
    })
  })
}
*/
