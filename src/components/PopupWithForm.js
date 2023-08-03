import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector); // селектор попапа
    this._submitForm = submitForm; // колбек-функция handleSubmit(makeRequest, evt)

    this._formElement = this._container.querySelector('.popup__form');
    this._buttonEl = this._formElement.querySelector('.btn_el_save');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'))// массив полей
  }

  // собирает данные всех полей формы
  _getInputValues() {
    const formInfoList = {}; // объект для сбора данных из полей
    this._inputList.forEach((item) => {
      formInfoList[item.name] = item.value // записываем данные полей в созданный объект (ключ - имя поля)
    })

    return formInfoList; // возвращаем заполненный объект
  }

  // перегрузка родительского метода - должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    this._formElement.addEventListener('submit', (evt, formInfo) => {
      this._submitForm(evt, formInfo);
    });
  }

  // перегрузка родительского метода - при закрытии попапа форма должна ещё и сбрасываться
  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}
