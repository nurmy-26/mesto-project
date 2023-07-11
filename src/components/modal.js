import {profilePopup, cardPopup, avatarPopup, profileName, profileDetail,
        inputName, inputDetail, inputCardName, inputLink, openPopup, closePopup,
        profileAvatar, avatarLink, renderLoading} from './utils.js';
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
  evt.preventDefault(); // отмена стандартной отправки формы

  profileName.textContent = inputName.value; // меняем имя на введенное
  profileDetail.textContent = inputDetail.value; // меняем подпись на введенную

  // Сохранение...
  const defaultText = profileSubmitBtn.textContent;
  renderLoading(true, profileSubmitBtn, defaultText);

  patchProfileInfo(config, profileName.textContent, profileDetail.textContent) // сохраняем введенные данные на сервере
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
      // Сохранение... - конец отображения
    .finally(() => {
      renderLoading(false, profileSubmitBtn, defaultText);
    });

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

  // создаем объект из заполненных полей input и с пустым счетчиком лайков
  const cardObj = {name: inputCardName.value, link: inputLink.value, likes: []};
  const newCard = makeCard(cardObj); // пропускаем объект через функцию создания новой карточки

  // Сохранение...
  const defaultText = cardSubmitBtn.textContent;
  renderLoading(true, cardSubmitBtn, defaultText);

  // отправляем ее к карточкам на сервер
  postNewCard(config, cardObj.name, cardObj.link)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
      // Сохранение... - конец отображения
    .finally(() => {
      renderLoading(false, cardSubmitBtn, defaultText);
    });

  pasteCard(newCard); // добавляем заполненный шаблон в DOM (в начало gallery)
  inputCardName.value = ""; // при новом открытии поле должно быть пустым
  inputLink.value = ""; // при новом открытии поле должно быть пустым

  closePopup(cardPopup); // закрываем попап
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
  evt.preventDefault(); // отмена стандартной отправки формы

  profileAvatar.src = avatarLink.value; // меняем путь к картинке на введенный

  // Сохранение...
  const defaultText = avatarSubmitBtn.textContent;
  renderLoading(true, avatarSubmitBtn, defaultText);

  // обновляем на сервере
  saveAvatar(config, profileAvatar.src)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
      // Сохранение... - конец отображения
    .finally(() => {
      renderLoading(false, avatarSubmitBtn, defaultText);
    });


  avatarLink.value = ""; // очищаем поле ввода перед закрытием
  closePopup(avatarPopup); // закрываем попап
}
