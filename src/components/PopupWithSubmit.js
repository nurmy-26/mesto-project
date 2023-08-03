import Popup from './Popup'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector); // селектор попапа
    this._submitForm = submitForm; // колбек-функция handleSubmit(makeRequest, evt)

    this._formElement = this._container.querySelector('.popup__form');
  }

  // перегрузка родительского метода - должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    // используем переданный колбек сабмита формы _submitForm
    this._formElement.addEventListener('submit', (evt) => {
      this._submitForm(evt);
    });
  }

  // записываем полученные данные карточки
  setCardInfo(cardObject, cardElement) {
    this._cardObject = cardObject;
    this._cardElement = cardElement;
  }

 // получить ID карточки
  getCardId() {
    return this._cardObject._id
  }

 // получить елемент карточки
  getCardElement() {
    return this._cardElement
  }
}
