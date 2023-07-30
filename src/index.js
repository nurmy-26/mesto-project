import './pages/index.css';

import {settings, profileBtn, newCardBtn, profileAvatar, avatarOverlay, profileName, profileDetail,
  profileForm, inputName, inputDetail, cardForm, inputCardName, inputLink,
  avatarForm, avatarLink, gallery, handleSubmit} from './components/utils.js';

import Api from './components/Api.js';
import Card from './components/Card-2';
import Section from './components/Section';
import FormValidator from './components/validate.js';
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
  const card = new Card(item, '#card', liker, deleter, imageOpener, userId);
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
const imageOpener = (item) => {
  imagePopup.openPopup(item);
}

// ф-я, обновляющая счетчик лайков на сервере
const liker = (item, evt, likeNumber) => {
  // если лайк уже стоял - убираем его и обновляем инфо на сервере
  if (evt.target.classList.contains('js-active')) {
    // вместо item нужно item.getId() ?? (проверить и заменить в api !!)
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
  api.deleteCard(item) // вместо item мб нужен id карточки (проверить) !!
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(err);
    })
}

/*
import './pages/index.css';


import {profileBtn, profileForm, newCardBtn, cardForm, closePopup, popupList,
  profileName, profileDetail, profileAvatar, avatarOverlay, avatarForm} from './components/utils.js';
import {makeCard, pasteCard} from './components/card.js';
import {openProfilePopup, confirmChanges, openCardPopup, addCard, changeAvatarImg, confirmAvatar} from './components/modal.js';
import {enableValidation, settings} from './components/validate.js';
import {config, getProfileInfo, getInitialCards} from './components/Api.js';

export let userId; // объявляем id пользователя

// делаем общий запрос на получение инфо профиля и массива начальных карточек
Promise.all([getProfileInfo(config), getInitialCards(config)])
  .then (values => {

    const userData = values[0]; // первым получаем объект - данные профиля
    const cards = values[1]; // вторым получаем массив карточек с сервера

    profileName.textContent = userData.name; // меняем имя на присланное с сервера
    profileDetail.textContent = userData.about; // меняем подпись на присланную с сервера
    profileAvatar.src = userData.avatar; // меняем аватар
    userId = userData._id; // присваиваем id пользователя

    // прогоняем массив полученных карточек через функцию создания
    cards.forEach((item) => {
      const newCard = makeCard(item); // параметры - ключи name и link текущего элемента массива

      pasteCard(newCard);
      });

    })
    .catch(err => {
      console.log(err);
    })


profileBtn.addEventListener('click', openProfilePopup); // добавляем слушатель на кнопку редактирования профиля
profileForm.addEventListener('submit', confirmChanges); // добавляем слушатель на форму


newCardBtn.addEventListener('click', openCardPopup); // добавляем слушатель на кнопку добавления карточки
cardForm.addEventListener('submit', addCard); // добавляем слушатель на форму

avatarOverlay.addEventListener('click', changeAvatarImg); // добавляем слушатель на аватарку
avatarForm.addEventListener('submit', confirmAvatar); // добавляем слушатель на форму


// закрывать при клике по оверлею или крестику
// mousedown - чтобы не закрывалось при выделении текста и случайном отпускании за границей попапа
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('btn_el_close')) {
      closePopup(popup);
    }
  });
});

// запуск проверки всех форм и полей в них
enableValidation(settings);
*/
