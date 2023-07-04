import {hideError} from './validate.js';

export const profilePopup = document.querySelector('.popup_type_profile-info'); // попап редактирования профиля
export const cardPopup = document.querySelector('.popup_type_new-card'); // попап добавления новой карточки
export const imagePopup = document.querySelector('.popup_type_image-open'); // попап разворачивания картинки
export const imageFull = document.querySelector('.popup__image'); // изображение из попапа
export const descriptionFull = document.querySelector('.popup__description'); // подпись к изображению

export const profileBtn = document.querySelector('.btn_el_edit');
export const newCardBtn = document.querySelector('.btn_el_add');
export const closeBtnList = document.querySelectorAll('.btn_el_close');

export const profileName = document.querySelector('.profile__name');
export const profileDetail = document.querySelector('.profile__description');

export const profileForm = document.querySelector('.popup__edit-form'); // находим форму в DOM
export const inputName = profileForm.querySelector('.popup__input_type_name');
export const inputDetail = profileForm.querySelector('.popup__input_type_description');

export const cardForm = document.querySelector('.popup__add-form'); // находим форму в DOM
export const inputCardName = cardForm.querySelector('.popup__input_type_name');
export const inputLink = cardForm.querySelector('.popup__input_type_description');

export const cardTemplate = document.querySelector('#card').content; // выбрали шаблон с id card и сохранили его содержимое
export const card = cardTemplate.querySelector('.card'); // шаблон карточки
export const gallery = document.querySelector('.gallery');

// открыть попап
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  const button = popupElement.querySelector('.btn_el_save');
  // при открытии попапа создания новой карточки кнопка должна быть заблокирована
  // (чтоб невозможно было создать пустую карточку)
  if (popupElement === cardPopup) {
    button.disabled = true;
    // при открытии попапа редактирования профиля кнопка должна быть активна
    // (вдруг пользователь передумал менять инф-ю, невозможность сразу кликнуть раздражает)
  } else {
    button.disabled = false;
  }
}

// закрыть попап
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    hideError(popupElement, input);
  })
}