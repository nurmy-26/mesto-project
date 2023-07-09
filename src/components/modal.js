import {profilePopup, cardPopup, profileName, profileDetail,
        inputName, inputDetail, inputCardName, inputLink, openPopup, closePopup} from './utils.js';
import {pasteCard, makeCard} from './card.js';
import {settings, isValid, switchBtn} from './validate.js';

const profilePopupInpuList = Array.from(profilePopup.querySelectorAll(settings.inputSelector));
const profileSubmitBtn = profilePopup.querySelector(settings.submitButtonSelector);
const cardPopupInpuList = Array.from(cardPopup.querySelectorAll(settings.inputSelector));
const cardSubmitBtn = cardPopup.querySelector(settings.submitButtonSelector);

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// клик на РЕДАКТИРОВАТЬ:
export function openProfilePopup() {
  openPopup(profilePopup); // открываем попап
  inputName.value = profileName.textContent; // при открытии заполняем значение поля указанным на странице
  inputDetail.value = profileDetail.textContent; // при открытии заполняем значение поля указанным на странице

  // при открытии состояние полей и кнопки должно проверяться сразу, еще до начала ввода
  // иначе, если закрыть без сохранения с ошибками, значение полей сбросится, но ошибки и неактивная кнопка останутся
  profilePopupInpuList.forEach((input) => {
      isValid(profilePopup, input, settings);
      switchBtn (profilePopupInpuList, profileSubmitBtn);
    })
}

// клик на СОХРАНИТЬ (редактирование профиля):
export function confirmChanges(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  profileName.textContent = inputName.value; // меняем имя на введенное
  profileDetail.textContent = inputDetail.value; // меняем подпись на введенную

  closePopup(profilePopup); // закрываем попап
}


// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
// клик на ДОБАВИТЬ:
export function openCardPopup() {
  openPopup(cardPopup); // открываем попап

  // при открытии кнопка должна быть неактивна, чтобы не позволить создать пустую карточку
  switchBtn (cardPopupInpuList, cardSubmitBtn);
}

// клик на СОЗДАТЬ (добавление карточки):
export function addCard(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  const cardObj = {name: inputCardName.value, link: inputLink.value}; // создаем объект из заполненных полей input
  const newCard = makeCard(cardObj); // пропускаем объект через функцию создания новой карточки

  pasteCard(newCard); // добавляем заполненный шаблон в DOM (в начало gallery)
  inputCardName.value = ""; // при новом открытии поле должно быть пустым
  inputLink.value = ""; // при новом открытии поле должно быть пустым

  closePopup(cardPopup); // закрываем попап
}
