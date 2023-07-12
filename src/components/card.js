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
export function addFunctional(item, inpName, inpLink, cardObj) {
  // навешиваем возможность "лайкать"
  item.querySelector('.btn_el_like').addEventListener('click', function(evt) {
    const likeNumber = item.querySelector('.card__like-number');

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
  item.querySelector('.btn_el_delete').addEventListener('click', function(evt) {
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
  item.querySelector('.card__image').addEventListener('click', function() {
    openImage(inpName, inpLink); // используем функцию
  });
}

// создание карточки
export function makeCard(object) { // принимает на вход объект
  const cardCopy = card.cloneNode(true); // клонируем содержимое шаблона
  // далее заполняем шаблон
  const imageEl = cardCopy.querySelector('.card__image');
  imageEl.alt = object.name;
  imageEl.src = object.link;
  cardCopy.querySelector('.card__title').textContent = object.name;
  cardCopy.querySelector('.card__like-number').textContent = object.likes.length; // количество лайков

  addFunctional(cardCopy, object.name, object.link, object); // добавляем карточке функционал

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
