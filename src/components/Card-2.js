class Card {
  constructor(object, selectorTemplate){
    this._object = object;
    this._selectorTemplate = selectorTemplate;
  }
  _getElement() {
    // клонирует и возвращает разметку формы
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
  // функция "вставить карточку" в начало галереи
  pasteCard(card) {
    gallery.prepend(card);
  }
  // функционал карточки (лайки, удаление, разворот картинки)
  _addFunctional(likeBtn,deleteBtn,likeNumber,imageEl) {
    // навешиваем возможность "лайкать"
    likeBtn.addEventListener('click', function(evt) {

  // если лайк уже стоял - убираем его и обновляем инфо на сервере
      if (evt.target.classList.contains('js-active')) {
        dislikeCard(cardObj)
          .then((data) => {
            evt.target.classList.toggle('js-active'); // меняем цвет сердечка на противоположный
            likeNumber.textContent = data.likes.length; // обновляем количество лайков
          })
          .catch((err) => {
            console.log(err);
          });
      // иначе - ставим (и тоже обновляем)
      } else {
        likeCard(cardObj)
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
      deleteCard(cardObj)
        .then(() => {
          cardItem.remove();
        })
        .catch((err) => {
          console.log(err);
        })
    });

    // навешиваем возможность разворачивать картинку на каждую картинку
    imageEl.addEventListener('click', function() {
      // openImage(inpName, inpLink);
      // используем функцию
      const imgPopup = new PopupWithImage('popup_type_image-open');
      imgPopup.openPopup(this._object);
    });
  }


  makeCard() { // принимает на вход объект
    const cardCopy = this._getElement(); // клонируем содержимое шаблона
    // сразу находим все нужные элементы для дальнейшего исп-я (в т.ч. в функции addFunctional)
    const imageEl = cardCopy.querySelector('.card__image');
    const likeNumber = cardCopy.querySelector('.card__like-number');
    const likeBtn = cardCopy.querySelector('.btn_el_like');
    const deleteBtn = cardCopy.querySelector('.btn_el_delete');
    // далее заполняем шаблон
    imageEl.alt = this._object.name;
    imageEl.src = this._object.link;
    cardCopy.querySelector('.card__title').textContent = this._object.name;
    cardCopy.querySelector('.card__like-number').textContent = this._object.likes.length; // количество лайков

    this._addFunctional(likeBtn,deleteBtn,likeNumber,imageEl); // добавляем карточке функционал

    // если карточка не моя, убираем иконку удаления
    if (this._object.owner._id !== userId) {
      cardCopy.querySelector('.btn_el_delete').remove();
    }

    // если среди лайков есть мой, закрашиваем сердечко
    if (this._object.likes.some(item => {
      return item._id === userId
    })) {
      cardCopy.querySelector('.btn_el_like').classList.add('js-active');
    }

    return cardCopy;
  }

}
