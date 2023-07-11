import './pages/index.css';


import {profileBtn, profileForm, newCardBtn, cardForm, closePopup, popupList,
  profileName, profileDetail, profileAvatar, avatarOverlay, avatarForm} from './components/utils.js';
import {makeCard, pasteCard} from './components/card.js';
import {openProfilePopup, confirmChanges, openCardPopup, addCard, changeAvatarImg, confirmAvatar} from './components/modal.js';
import {enableValidation, settings} from './components/validate.js';

import {config, getProfileInfo, getInitialCards} from './components/api.js';
getProfileInfo(config) // получаем объект пользователя с сервера
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    profileName.textContent = data.name; // меняем имя на присланное с сервера
    profileDetail.textContent = data.about; // меняем подпись на присланную с сервера
    profileAvatar.src = data.avatar; // меняем аватар
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards(config) // получаем массив карточек с сервера
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    // создаем начальные карточки из присланного массива
    data.forEach((item) => {
      const newCard = makeCard(item); // параметры - ключи name и link текущего элемента массива

      // если карточка не моя, убираем иконку удаления
      if (item.owner._id !== '0c4e7ce2312fb70a3ec855e5') {
        newCard.querySelector('.btn_el_delete').remove();
      }

      pasteCard(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// создаем начальные карточки (старый способ, из папки)
/*
initialCards.forEach((item) => {
  const newCard = makeCard(item); // параметры - ключи name и link текущего элемента массива
  pasteCard(newCard);
}); */


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

