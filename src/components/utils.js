export const profilePopup = document.querySelector('.popup_type_profile-info'); // попап редактирования профиля
export const cardPopup = document.querySelector('.popup_type_new-card'); // попап добавления новой карточки
export const avatarPopup = document.querySelector('.popup_type_change-avatar'); // попап смены аватарки
export const imagePopup = document.querySelector('.popup_type_image-open'); // попап разворачивания картинки

export const profileBtn = document.querySelector('.btn_el_edit');
export const newCardBtn = document.querySelector('.btn_el_add');

export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarOverlay = document.querySelector('.profile__avatar-overlay');
export const profileName = document.querySelector('.profile__name');
export const profileDetail = document.querySelector('.profile__description');

export const profileForm = document.querySelector('.popup__edit-form'); // находим форму в DOM
export const inputName = profileForm.querySelector('.popup__input_type_name');
export const inputDetail = profileForm.querySelector('.popup__input_type_description');

export const cardForm = document.querySelector('.popup__add-form'); // находим форму в DOM

export const avatarForm = document.querySelector('.popup__change-avatar-form'); // находим форму смены аватара в DOM
export const avatarLink = avatarForm.querySelector('.popup__input_type_description');

export const gallery = document.querySelector('.gallery');

// settings - это объект, который будем передавать в первом параметре
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.btn_el_save',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__error_type_'
}

//#region handleSubmit
// отображение надписи "Сохранение..." пока идет загрузка (3 и 4 аргументы необязательные)
export function renderLoading(isLoading, button, defaultText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText; // true - отобразит 'Сохранение...'
  } else {
    button.textContent = defaultText; // false - отобразит текст, который был изначально
  }
}

// ф-я, предотвращающая перезагрузку формы при сабмите, меняющая текст кнопки во время и после запроса, очищающая форму
// принимает функцию запроса, объект события и текст во время загрузки (по умолчанию - 'Сохранение...')
export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();

  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки
  const initialText = submitButton.textContent;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      // очищаем форму после успешного ответа от сервера
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    // возвращаем начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}
//#endregion
