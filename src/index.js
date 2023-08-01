import './pages/index.css';

import {settings, profileBtn, newCardBtn, profileAvatar, avatarOverlay, profileName, profileDetail,
  profileForm, inputName, inputDetail, cardForm, inputCardName, inputLink,
  avatarForm, avatarLink, gallery, handleSubmit} from './components/utils.js';

import Api from './components/Api.js';
import Card from './components/Card';
import Section from './components/Section';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import UserInfo from './components/UserInfo';


export let userId; // объявляем id пользователя

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '1d14bffe-bdb7-44a2-9581-cfef3f9374d4', // мой токен
    'Content-Type': 'application/json'
  }
});

// данные профиля на страничке
const userInfo = new UserInfo(profileName, profileDetail, profileAvatar);


// ф-я создания полностью функционирующей и готовой к вставке в галерею карточки
function makeNewCard(item) {
  const card = new Card(item, '#card', liker, deleter, openerImage, userId);
  return card.makeCard();
}

const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(makeNewCard(item));
  }
},
gallery
);

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then (values => {

    const userData = values[0]; // первым получаем объект - данные профиля
    const cards = values[1]; // вторым получаем массив карточек с сервера

    userInfo.setUserInfo(userData);
    userId = userData._id; // присваиваем id пользователя


    cardsList.renderItems(cards.reverse()); // вызов переданной выше колбэк-функции renderer (для каждого item в cards)
    })
    .catch(err => {
      console.log(err);
    })


// попап разворачивания картинки
const imagePopup = new PopupWithImage('.popup_type_image-open');
imagePopup.setEventListeners(); // метод родительского Popup

// ф-я, разворачиваящая картинку
const openerImage = (item) => {
  imagePopup.openPopup(item);
}

// ф-я, обновляющая счетчик лайков на сервере
const liker = (item, evt, likeNumber) => {
  // если лайк уже стоял - убираем его и обновляем инфо на сервере
  if (evt.target.classList.contains('js-active')) {

    api.dislikeCard(item)
      .then((data) => {
        // ? выделить в метод класса и использовать метод
        evt.target.classList.toggle('js-active'); // меняем цвет сердечка на противоположный
        likeNumber.textContent = data.likes.length; // обновляем количество лайков
      })
      .catch((err) => {
        console.log(err);
      });
  // иначе - ставим (и тоже обновляем)
  } else {
    api.likeCard(item)
      .then((data) => {
        evt.target.classList.toggle('js-active'); // меняем цвет сердечка на противоположный
        likeNumber.textContent = data.likes.length; // обновляем количество лайков
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// ф-я, удаляющая карточку
const deleter = (item, deleteBtn) => {
  const cardItem = deleteBtn.closest('.card');
  // удаляем карточку с сервера
  api.deleteCard(item)
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(err);
    })
}

//реквест обновления профиля
function makeProfileRequest() {
  return api.patchProfileInfo(inputName.value, inputDetail.value) // сохраняем введенные данные на сервере
    .then((data) => { // в случае удачного запроса:
      // profileName.textContent = data.name; // меняем имя на введенное
      // profileDetail.textContent = data.about; // меняем подпись на введенную
      userInfo.setUserInfo(data)
      profilePopup.closePopup(); // закрываем попап
    })
    .catch((err) => {
      console.log(err);
    })
}

// колбэк-функция для формы редактирования профиля
const submitProfile = (evt) => handleSubmit(makeProfileRequest, evt);

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
// попап редактирования профиля
const profilePopup = new PopupWithForm('.popup_type_profile-info', (evt) => {
  // передаем колбэк-функцию
  submitProfile(evt);
  });
profilePopup.setEventListeners();

// функция открывающая попап
const openerPopup = (popup) => {
  popup.openPopup();
}

profileBtn.addEventListener('click', () => {
  openerPopup(profilePopup); // открываем попап с использованием функции
  // inputName.value = profileName.textContent; // при открытии заполняем значение поля указанным на странице
  // inputDetail.value = profileDetail.textContent; // при открытии заполняем значение поля указанным на странице
  const dataUserInfo = userInfo.getUserInfo()
  inputName.value = dataUserInfo.name
  inputDetail.value = dataUserInfo.about
  profileFormValidator.enableValidation(); // при открытии нужно проверить поля еще до начала ввода (чтоб кнопка была доступна)
}); // по клику открывается попап




// реквест добавления новой карточки
function makeCardRequest() {
  const cardObj = {name: inputCardName.value, link: inputLink.value};

  return api.postNewCard(cardObj.name, cardObj.link) // добавляем карточку к другим на сервере
      .then((obj) => { // в случае удачного запроса:
        cardsList.addItem(makeNewCard(obj)); // для использования с функцией
        cardPopup.closePopup(); // закрываем попап
      })
      .catch((err) => {
        console.log(err);
      })
}

// колбэк-функция для формы редактирования профиля
const submitNewCard = (evt) => handleSubmit(makeCardRequest, evt);

// ДОБАВЛЕНИЕ КАРТОЧКИ
// попап добавления карточки
const cardPopup = new PopupWithForm('.popup_type_new-card', (evt) => {
  // передаем колбэк-функцию
  submitNewCard(evt);
  });
cardPopup.setEventListeners();

newCardBtn.addEventListener('click', () => {
  openerPopup(cardPopup)
}); // по клику открывается попап


// реквест смены аватара
function makeAvatarRequest() {
  return api.saveAvatar(avatarLink.value) // отправляем обновленную информацию на сервер
    .then((data) => { // в случае удачного запроса:
      // profileAvatar.src = data.avatar; // меняем путь к картинке на введенный
      userInfo.setUserInfo(data)
      avatarPopup.closePopup(); // закрываем попап
    })
    .catch((err) => {
      console.log(err);
    })
}

// колбэк-функция для формы смены аватара
const submitAvatar = (evt) => handleSubmit(makeAvatarRequest, evt);

// СМЕНА АВАТАРА
// попап смены аватара
const avatarPopup = new PopupWithForm('.popup_type_change-avatar', (evt) => {
  // передаем колбэк-функцию
  submitAvatar(evt);
  });
avatarPopup.setEventListeners();

avatarOverlay.addEventListener('click', () => {
  openerPopup(avatarPopup)
}); // по клику открывается попап


// включаем валидацию форм
const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, avatarForm);
avatarFormValidator.enableValidation();

const cardFormValidator = new FormValidator(settings, cardForm);
cardFormValidator.enableValidation();
