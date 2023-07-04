import {card, gallery, imageFull, descriptionFull, imagePopup, openPopup} from './utils.js';

// массив начальных карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функция "вставить карточку" в начало галереи
export function pasteCard(card) {
  gallery.prepend(card);
}

//функция разворачивания картинки
export function openImage(name, link) {
  imageFull.src = link; // при открытии заполняем значение поля указанным на странице
  imageFull.alt = name;
  descriptionFull.textContent = name;

  openPopup(imagePopup); // и показываем попап с заполненным содержимым
}

// функционал карточки (лайки, удаление, разворот картинки)
export function addFunctional(item, inpName, inpLink) {
  // навешиваем возможность "лайкать"
  item.querySelector('.btn_el_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('js-active');
  });

  // навешиваем возможность удалять
  item.querySelector('.btn_el_delete').addEventListener('click', function(evt) {
    const cardItem = evt.target.closest('.card');
    cardItem.remove();
  });

  // навешиваем возможность разворачивать картинку на каждую картинку
  item.querySelector('.card__image').addEventListener('click', function() {
    openImage(inpName, inpLink); // используем функцию
  });
}

// создание карточки
export function makeCard(object) { // принимает на вход объект
  const cardCopy = card.cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон
  cardCopy.querySelector('.card__image').alt = object.name;
  cardCopy.querySelector('.card__image').src = object.link;
  cardCopy.querySelector('.card__title').textContent = object.name;

  addFunctional(cardCopy, object.name, object.link); // добавляем карточке функционал

  return cardCopy;
}