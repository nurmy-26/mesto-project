import Popup from './Popup'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector); // селектор попапа
    this._submitForm = submitForm; // колбек-функция handleSubmit(makeRequest, evt)

    this._formElement = this._container.querySelector('.popup__form');
    this._buttonEl = this._formElement.querySelector('.btn_el_save');
  }

  // перегрузка родительского метода - должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    // используем переданный колбек сабмита формы _submitForm
    this._formElement.addEventListener('submit', (evt) => {
      this._submitForm(evt);
    });
  }

  getCardInfo(cardObject, cardElement) {
    this._cardObject = cardObject;
    this._cardElement = cardElement;
  }

  getCardId() {
    return this._cardObject._id
  }

  getCardElement() {
    return this._cardElement
  }
}