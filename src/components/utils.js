export const popupList = document.querySelectorAll('.popup'); // все попапы
export const profilePopup = document.querySelector('.popup_type_profile-info'); // попап редактирования профиля
export const cardPopup = document.querySelector('.popup_type_new-card'); // попап добавления новой карточки
export const avatarPopup = document.querySelector('.popup_type_change-avatar'); // попап смены аватарки
export const imagePopup = document.querySelector('.popup_type_image-open'); // попап разворачивания картинки
export const imageFull = document.querySelector('.popup__image'); // изображение из попапа
export const descriptionFull = document.querySelector('.popup__description'); // подпись к изображению

export const profileBtn = document.querySelector('.btn_el_edit');
export const newCardBtn = document.querySelector('.btn_el_add');
export const closeBtnList = document.querySelectorAll('.btn_el_close');

export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarOverlay = document.querySelector('.profile__avatar-overlay');
export const profileName = document.querySelector('.profile__name');
export const profileDetail = document.querySelector('.profile__description');

export const profileForm = document.querySelector('.popup__edit-form'); // находим форму в DOM
export const inputName = profileForm.querySelector('.popup__input_type_name');
export const inputDetail = profileForm.querySelector('.popup__input_type_description');

export const cardForm = document.querySelector('.popup__add-form'); // находим форму в DOM
export const inputCardName = cardForm.querySelector('.popup__input_type_name');
export const inputLink = cardForm.querySelector('.popup__input_type_description');

export const avatarForm = document.querySelector('.popup__change-avatar-form'); // находим форму смены аватара в DOM
export const avatarLink = avatarForm.querySelector('.popup__input_type_description');

export const cardTemplate = document.querySelector('#card').content; // выбрали шаблон с id card и сохранили его содержимое
export const card = cardTemplate.querySelector('.card'); // шаблон карточки
export const gallery = document.querySelector('.gallery');

// закрыть попап при нажатии на Esc (для вызова в обработчиках)
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened'); // найти открытый попап по соответствующему селектору
    closePopup(popup);                                     // и закрыть его
  }
}

// открыть попап
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); // повесить обработчик Esc
}

// закрыть попап
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

  document.removeEventListener('keydown', closeByEscape); // убрать обработчик Esc
}

// отображение надписи "Сохранение..." пока идет загрузка
export function renderLoading(isLoading, button, defaultText) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = defaultText;
  }
}
