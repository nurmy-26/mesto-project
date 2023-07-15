import {userId} from '../index.js';
import {card, gallery, imageFull, descriptionFull, imagePopup, openPopup} from './utils.js';
import {config, deleteCard, likeCard, dislikeCard} from './api.js';

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
export function addFunctional(inpName, inpLink, cardObj, imageEl, likeNumber, likeBtn, deleteBtn) {
  // навешиваем возможность "лайкать"
  likeBtn.addEventListener('click', function(evt) {

// если лайк уже стоял - убираем его и обновляем инфо на сервере
    if (evt.target.classList.contains('js-active')) {
      dislikeCard(config, cardObj)
        .then((data) => {
          evt.target.classList.toggle('js-active'); // меняем цвет сердечка на противоположный
          likeNumber.textContent = data.likes.length; // обновляем количество лайков
        })
        .catch((err) => {
          console.log(err);
        });
    // иначе - ставим (и тоже обновляем)
    } else {
      likeCard(config, cardObj)
        .then((data) => {
          evt.target.classList.toggle('js-active'); // меняем цвет сердечка на противоположный
          likeNumber.textContent = data.likes.length; // обновляем количество лайков
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // навешиваем возможность удалять
  deleteBtn.addEventListener('click', function(evt) {
    const cardItem = evt.target.closest('.card');

    // удаляем карточку с сервера
    deleteCard(config, cardObj)
      .then(() => {
        cardItem.remove();
      })
      .catch((err) => {
        console.log(err);
      })
  });

  // навешиваем возможность разворачивать картинку на каждую картинку
  imageEl.addEventListener('click', function() {
    openImage(inpName, inpLink); // используем функцию
  });
}

// создание карточки
export function makeCard(object) { // принимает на вход объект
  const cardCopy = card.cloneNode(true); // клонируем содержимое шаблона
  // сразу находим все нужные элементы для дальнейшего исп-я (в т.ч. в функции addFunctional)
  const imageEl = cardCopy.querySelector('.card__image');
  const likeNumber = cardCopy.querySelector('.card__like-number');
  const likeBtn = cardCopy.querySelector('.btn_el_like');
  const deleteBtn = cardCopy.querySelector('.btn_el_delete');
  // далее заполняем шаблон
  imageEl.alt = object.name;
  imageEl.src = object.link;
  cardCopy.querySelector('.card__title').textContent = object.name;
  cardCopy.querySelector('.card__like-number').textContent = object.likes.length; // количество лайков

  addFunctional(object.name, object.link, object, imageEl, likeNumber, likeBtn, deleteBtn); // добавляем карточке функционал

  // если карточка не моя, убираем иконку удаления
  if (object.owner._id !== userId) {
    cardCopy.querySelector('.btn_el_delete').remove();
  }

  // если среди лайков есть мой, закрашиваем сердечко
  if (object.likes.some(item => {
    return item._id === userId
  })) {
    cardCopy.querySelector('.btn_el_like').classList.add('js-active');
  }

  return cardCopy;
}
