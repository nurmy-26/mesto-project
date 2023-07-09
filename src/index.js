import './pages/index.css';

import {profileBtn, profileForm, newCardBtn, cardForm, closePopup, popupList} from './components/utils.js';
import {initialCards, makeCard, pasteCard} from './components/card.js';
import {openProfilePopup, confirmChanges, openCardPopup, addCard} from './components/modal.js';
import {enableValidation, settings} from './components/validate.js';

// создаем начальные карточки
initialCards.forEach((item) => {
  const newCard = makeCard(item); // параметры - ключи name и link текущего элемента массива
  pasteCard(newCard);
});


profileBtn.addEventListener('click', openProfilePopup); // добавляем слушатель на кнопку редактирования профиля
profileForm.addEventListener('submit', confirmChanges); // добавляем слушатель на форму


newCardBtn.addEventListener('click', openCardPopup); // добавляем слушатель на кнопку добавления карточки
cardForm.addEventListener('submit', addCard); // добавляем слушатель на форму


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

