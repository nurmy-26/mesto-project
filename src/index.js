import './pages/index.css';


import {profileBtn, profileForm, newCardBtn, cardForm, closePopup, popupList,
  profileName, profileDetail, profileAvatar, avatarOverlay, avatarForm} from './components/utils.js';
import {makeCard, pasteCard} from './components/card.js';
import {openProfilePopup, confirmChanges, openCardPopup, addCard, changeAvatarImg, confirmAvatar} from './components/modal.js';
import {enableValidation, settings} from './components/validate.js';
import {config, getProfileInfo, getInitialCards} from './components/api.js';

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

