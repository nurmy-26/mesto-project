import {profilePopup, cardPopup, avatarPopup, profileName, profileDetail,
        inputName, inputDetail, inputCardName, inputLink, openPopup, closePopup,
        profileAvatar, avatarLink, handleSubmit, profileForm} from './utils.js';
import {pasteCard, makeCard} from './card.js';
import {settings, isValid, switchBtn} from './validate.js';
import {config, patchProfileInfo, postNewCard, saveAvatar} from './Api.js';

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// клик на РЕДАКТИРОВАТЬ:
export function openProfilePopup() {
  openPopup(profilePopup); // открываем попап
  inputName.value = profileName.textContent; // при открытии заполняем значение поля указанным на странице
  inputDetail.value = profileDetail.textContent; // при открытии заполняем значение поля указанным на странице

  const profilePopupInpuList = Array.from(profilePopup.querySelectorAll(settings.inputSelector));
  // при открытии состояние полей и кнопки должно проверяться сразу, еще до начала ввода
  // иначе, если закрыть без сохранения с ошибками, значение полей сбросится, но ошибки и неактивная кнопка останутся
  profilePopupInpuList.forEach((input) => {
      isValid(profilePopup, input, settings);
      switchBtn(profileForm);
    })
}

// клик на СОХРАНИТЬ (редактирование профиля):
export function confirmChanges(evt) {
  function makeRequest() {
    return patchProfileInfo(config, inputName.value, inputDetail.value) // сохраняем введенные данные на сервере
      .then((data) => { // в случае удачного запроса:
        profileName.textContent = data.name; // меняем имя на введенное
        profileDetail.textContent = data.about; // меняем подпись на введенную
        closePopup(profilePopup); // закрываем попап
      });
  }

  handleSubmit(makeRequest, evt); // функция, отвечающая за поведение формы при сабмите
}

// ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
// клик на ДОБАВИТЬ:
export function openCardPopup() {
  openPopup(cardPopup); // открываем попап
}

// клик на СОЗДАТЬ (добавление карточки):
export function addCard(evt) {
  // создаем объект из заполненных полей input
  const cardObj = {name: inputCardName.value, link: inputLink.value};

  function makeRequest() {
    return postNewCard(config, cardObj.name, cardObj.link) // добавляем карточку к другим на сервере
      .then((obj) => { // в случае удачного запроса:
        const newCard = makeCard(obj); // пропускаем ПОЛУЧЕННЫЙ объект через функцию создания новой карточки
        pasteCard(newCard); // добавляем заполненный шаблон в DOM (в начало gallery)
        closePopup(cardPopup); // закрываем попап
      })
  }

  handleSubmit(makeRequest, evt); // функция, отвечающая за поведение формы при сабмите
}

// ФОРМА ИЗМЕНЕНИЯ АВАТАРА
// клик на "редактировать аватарку":
export function changeAvatarImg() {
  openPopup(avatarPopup); // открываем попап
}

// клик на СОХРАНИТЬ (смена аватара):
export function confirmAvatar(evt) {
  function makeRequest() {
    return saveAvatar(config, avatarLink.value) // отправляем обновленную информацию на сервер
    .then((data) => { // в случае удачного запроса:
      profileAvatar.src = data.avatar; // меняем путь к картинке на введенный
      closePopup(avatarPopup); // закрываем попап
    })
  }

  handleSubmit(makeRequest, evt); // функция, отвечающая за поведение формы при сабмите
}
