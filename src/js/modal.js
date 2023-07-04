import {profilePopup, cardPopup, profileName, profileDetail,
        inputName, inputDetail, inputCardName, inputLink, openPopup, closePopup} from './utils.js';
import {pasteCard, makeCard} from './card.js';

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// клик на РЕДАКТИРОВАТЬ:
export function openProfilePopup() {
  openPopup(profilePopup); // открываем попап
  inputName.value = profileName.textContent; // при открытии заполняем значение поля указанным на странице
  inputDetail.value = profileDetail.textContent; // при открытии заполняем значение поля указанным на странице
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
  inputCardName.value = ""; // при открытии поле должно быть пустым
  inputLink.value = ""; // при открытии поле должно быть пустым
}

// клик на СОЗДАТЬ (добавление карточки):
export function addCard(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  const cardObj = {name: inputCardName.value, link: inputLink.value}; // создаем объект из заполненных полей input
  const newCard = makeCard(cardObj); // пропускаем объект через функцию создания новой карточки

  pasteCard(newCard); // добавляем заполненный шаблон в DOM (в начало gallery)

  closePopup(cardPopup); // закрываем попап
}
