import {profileBtn, profileForm, newCardBtn, cardForm, closeBtnList, closePopup} from './js/utils.js';
import {initialCards, makeCard, pasteCard} from './js/card.js';
import {openProfilePopup, confirmChanges, openCardPopup, addCard} from './js/modal.js';
import {doValidation} from './js/validate.js';

// создаем начальные карточки
initialCards.forEach((item) => {
  const newCard = makeCard(item); // параметры - ключи name и link текущего элемента массива
  pasteCard(newCard);
});


profileBtn.addEventListener('click', openProfilePopup); // добавляем слушатель на кнопку редактирования профиля
profileForm.addEventListener('submit', confirmChanges); // добавляем слушатель на форму


newCardBtn.addEventListener('click', openCardPopup); // добавляем слушатель на кнопку добавления карточки
cardForm.addEventListener('submit', addCard); // добавляем слушатель на форму


// добавляем слушатель на любую кнопку ЗАКРЫТЬ:
closeBtnList.forEach(function(item) {
  const itemPopup = item.closest('.popup'); // нашли родителя с нужным классом
  item.addEventListener('click', () => closePopup(itemPopup)); // закрываем попап при нажатии на крестик
});

// закрывать при клике по оверлею
// mousedown - чтобы не закрывалось при выделении текста и случайном отпускании за границей попапа
document.addEventListener('mousedown', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
})

// закрывать при нажатии 'Esc'
document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened'); // найти открытый попап по соответствующему селектору
    closePopup(popup);                                     // и закрыть его
  }
});

// запуск проверки всех форм и полей в них
doValidation();



