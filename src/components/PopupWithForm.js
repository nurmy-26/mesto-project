class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector); // селектор попапа
    this._submitForm = submitForm; // колбек-функция

    this._formElement = document.querySelector(popupSelector).content.querySelector('form');
    this._buttonEl = this._formElement.querySelector('.btn_el_save');
  }

  // собирает данные всех полей формы
  _getInputValues() {

    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input')); // массив полей
    const inputDataList = {}; // объект для сбора данных из полей
    this._inputList.forEach((item) => {
      inputDataList[item.name] = item.value // записываем данные полей в созданный объект (ключ - имя поля)
    })

    return inputDataList; // возвращаем заполненный объект
  }

  // перегрузка родительского метода - должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    // используем переданный колбек сабмита формы _submitForm
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  // перегрузка родительского метода - при закрытии попапа форма должна ещё и сбрасываться
  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}
