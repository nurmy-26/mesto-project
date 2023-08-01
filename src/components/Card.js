export default class Card {
  // liker, deleter, imageOpener - функции-колбеки, используют запросы (т.е. методы) класса api
  constructor(object, selectorTemplate, liker, openDeletePopup, imageOpener, userId){
    this._object = object;
    this._selectorTemplate = selectorTemplate;
    this._liker = liker;
    this._openDeletePopup = openDeletePopup;
    this._imageOpener = imageOpener;
    this._userId = userId;
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

  getId() { // мб пригодится если делать подтверждение удаления
    // id карточки
    return this._object._id;
  }

  // likes - можно брать из ответа сервера
  renewLikes(likes) {
    this._object.likes = likes;
    this._likeNumber.textContent = this._object.likes.length;
    this._likeBtn.classList.toggle('js-active');
  }

  isLiked() {
    // если среди лайков есть мой (пользователя) - вернет true
    return this._object.likes.some(item => item._id === this._userId)
  }

  _countLikes() {
    // меняет счетчик лайков в разметке и отвечает за покраску сердечка
    this._likeNumber.textContent = this._object.likes.length;

    if (this.isLiked()) {
      this._likeBtn.classList.add('js-active');
    } else {
      this._likeBtn.classList.remove('js-active');
    }
  }

  _removeDelBtn() {
    // если карточка не моя, убираем иконку удаления
    if (this._object.owner._id !== this._userId) {
      this._cardCopy.querySelector('.btn_el_delete').remove();
    }
  }

  _addFunctional() {
    // используем колбеки (будем передавать запросы Api)
    this._likeBtn.addEventListener('click', () => this._liker(this._object, this));
    // this._deleteBtn.addEventListener('click', () => this._deleter(this._object, this));
    this._deleteBtn.addEventListener('click', () => this._openDeletePopup(this._object, this));
    this._imageEl.addEventListener('click', () => this._imageOpener(this._object));
  }

// создает и возвращает полностью готовую карточку
  makeCard() {
    this._cardCopy = this._getElement(); // клонируем содержимое шаблона
    // сразу находим все нужные элементы для дальнейшего исп-я (в т.ч. в функции addFunctional)
    this._imageEl = this._cardCopy.querySelector('.card__image');
    this._likeNumber = this._cardCopy.querySelector('.card__like-number');
    this._likeBtn = this._cardCopy.querySelector('.btn_el_like');
    this._deleteBtn = this._cardCopy.querySelector('.btn_el_delete');

    // далее заполняем шаблон
    this._imageEl.alt = this._object.name;
    this._imageEl.src = this._object.link;
    this._cardCopy.querySelector('.card__title').textContent = this._object.name;

    // добавляем карточке функционал (вешаем слушатели)
    this._addFunctional();

    // если карточка не моя, убираем иконку удаления
    this._removeDelBtn();

    // если среди лайков есть мой, закрашиваем сердечко
    this._countLikes();

    return this._cardCopy;
  }

  delete() {
    // удаляет карточку из разметки
    this._cardItem = this._deleteBtn.closest('.card');
    this._cardItem.remove();
  }
}


