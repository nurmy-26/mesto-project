import { userId } from '../../src/index.js'
export default class Card {
  // liker, deleter, imageOpener - функции-колбеки, используют запросы (т.е. методы)  класса api (объявим в index.js)
  constructor(object, selectorTemplate, liker, deleter, imageOpener){
    // из object нам понадобятся: _id, name, link, likes, owner._id
    this._object = object;
    this._selectorTemplate = selectorTemplate;
    this._liker = liker;
    this._deleter = deleter;
    this._imageOpener = imageOpener;
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

  _isLiked() {
    // если среди лайков есть мой (пользователя) - вернет true
    return this._object.likes.some(item => item._id === userId)
  }

  _countLikes() {
    // меняет счетчик лайков в разметке и отвечает за покраску сердечка
    this._likeNumber.textContent = this._object.likes.length;

    if (this._isLiked()) {
      this._likeBtn.classList.add('js-active');
    } else {
      this._likeBtn.classList.remove('js-active');
    }
  }

  _removeDelBtn() {
    // если карточка не моя, убираем иконку удаления
    if (this._object.owner._id !== userId) {
      this._cardCopy.querySelector('.btn_el_delete').remove();
    }
  }

  _addFunctional() {
    // используем колбеки (будем передавать запросы Api)
    this._likeBtn.addEventListener('click', (evt) => this._liker(this._object, evt, this._likeNumber));
    this._deleteBtn.addEventListener('click', () => this._deleter(this._object, this._deleteBtn));
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
    // удаляет карточку
    this._cardCopy.remove();
  }
}

  // функция "вставить карточку" в начало галереи - это addItem класса Section
  // pasteCard(card) {
  //   gallery.prepend(card);
  // }
