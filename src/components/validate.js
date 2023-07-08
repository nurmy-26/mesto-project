export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.btn_el_save',
  // inactiveButtonClass: 'popup__button_disabled', - не нужен, так как у меня атрибут, а не класс
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__error_type_'
}

// показать ошибку
export function showError(formEl, inputEl, settings) {
  // const errorEl = formEl.querySelector(`.popup__error_type_${inputEl.name}`);
  const errorEl = formEl.querySelector(`${settings.errorClass}${inputEl.name}`);
  inputEl.classList.add(settings.inputErrorClass);
  errorEl.textContent = inputEl.validationMessage;
}

// скрыть ошибку
export function hideError(formEl, inputEl, settings) {
  // const errorEl = formEl.querySelector(`.popup__error_type_${inputEl.name}`);
  const errorEl = formEl.querySelector(`${settings.errorClass}${inputEl.name}`);
  inputEl.classList.remove(settings.inputErrorClass);
  errorEl.textContent = '';
}

// проверить поле на ошибку
export function isValid(formEl, inputEl, settings) {
  if (inputEl.validity.patternMismatch) {
    // если ошибка срабатывает из-за указанного в pattern, заменить текст ошики на кастомное сообщение
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

// вынести вердикт кнопке
export function switchBtn(inputList, buttonEl) {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
  } else {
    buttonEl.disabled = false;
  }
};

// повесить слушатель (проверки на ошибку) на каждое поле формы
export function setValidListeners(formEl, settings) {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const button = formEl.querySelector(settings.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(formEl, input, settings);
      // по мере заполнения полей выносим вердикт кнопке:
      switchBtn (inputList, button);
    })
  })
}

// проверка всех форм на валидность
export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    setValidListeners(form, settings);
  })
}
