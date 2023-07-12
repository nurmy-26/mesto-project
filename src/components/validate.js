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
    setValidListeners(form, settings);
  })
}
