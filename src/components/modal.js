import {profilePopup, cardPopup, avatarPopup, profileName, profileDetail,
        inputName, inputDetail, inputCardName, inputLink, openPopup, closePopup,
        profileAvatar, avatarLink, renderLoading, handleSubmit, request} from './utils.js';
import {pasteCard, makeCard} from './card.js';
import {settings, isValid, switchBtn} from './validate.js';
import {config, patchProfileInfo, postNewCard, saveAvatar} from './api.js';

const profilePopupInpuList = Array.from(profilePopup.querySelectorAll(settings.inputSelector));
const profileSubmitBtn = profilePopup.querySelector(settings.submitButtonSelector);
const cardPopupInpuList = Array.from(cardPopup.querySelectorAll(settings.inputSelector));
const cardSubmitBtn = cardPopup.querySelector(settings.submitButtonSelector);
const avatarPopupInpuList = Array.from(avatarPopup.querySelectorAll(settings.inputSelector));
const avatarSubmitBtn = avatarPopup.querySelector(settings.submitButtonSelector);

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

  // при открытии кнопка должна быть неактивна, чтобы не позволить создать пустую карточку
  switchBtn (cardPopupInpuList, cardSubmitBtn);
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

  // при открытии кнопка должна быть неактивна
  switchBtn (avatarPopupInpuList, avatarSubmitBtn);
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


/* старые варианты сабмита форм с подробными шагами
// клик на СОХРАНИТЬ (редактирование профиля):
export function confirmChanges(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  // Сохранение...
  const defaultText = profileSubmitBtn.textContent;
  renderLoading(true, profileSubmitBtn, defaultText);

  patchProfileInfo(config, inputName.value, inputDetail.value) // сохраняем введенные данные на сервере
    .then((data) => { // в случае удачного запроса:
      profileName.textContent = data.name; // меняем имя на введенное
      profileDetail.textContent = data.about; // меняем подпись на введенную
      closePopup(profilePopup); // закрываем попап
    })
    .catch((err) => {
      console.log(err);
    })
      // Сохранение... - конец отображения
    .finally(() => {
      renderLoading(false, profileSubmitBtn, defaultText);
    });
}

// клик на СОЗДАТЬ (добавление карточки):
export function addCard(evt) {
  // создаем объект из заполненных полей input
  const cardObj = {name: inputCardName.value, link: inputLink.value};

  // создаем объект из заполненных полей input
  const cardObj = {name: inputCardName.value, link: inputLink.value};

  // Сохранение...
  const defaultText = cardSubmitBtn.textContent;
  renderLoading(true, cardSubmitBtn, defaultText);

  // отправляем ее к карточкам на сервер
  postNewCard(config, cardObj.name, cardObj.link)
    .then((obj) => { // в случае удачного запроса:
      const newCard = makeCard(obj); // пропускаем ПОЛУЧЕННЫЙ объект через функцию создания новой карточки
      pasteCard(newCard); // добавляем заполненный шаблон в DOM (в начало gallery)
      inputCardName.value = ""; // при новом открытии поле должно быть пустым
      inputLink.value = ""; // при новом открытии поле должно быть пустым

      closePopup(cardPopup); // закрываем попап
    })
    .catch((err) => {
      console.log(err);
    })
      // Сохранение... - конец отображения
    .finally(() => {
      renderLoading(false, cardSubmitBtn, defaultText);
    });
}

// клик на СОХРАНИТЬ (смена аватара):
export function confirmAvatar(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  // Сохранение...
  const defaultText = avatarSubmitBtn.textContent;
  renderLoading(true, avatarSubmitBtn, defaultText);

  // обновляем на сервере
  saveAvatar(config, avatarLink.value)
    .then((data) => { // в случае удачного запроса:
      profileAvatar.src = data.avatar; // меняем путь к картинке на введенный
      avatarLink.value = ""; // очищаем поле ввода перед закрытием
      closePopup(avatarPopup); // закрываем попап
    })
    .catch((err) => {
      console.log(err);
    })
      // Сохранение... - конец отображения
    .finally(() => {
      renderLoading(false, avatarSubmitBtn, defaultText);
    });
}
*/
