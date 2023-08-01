export default class Popup {
  constructor(popupSelector){
    this._container = document.querySelector(popupSelector);
    this._closeByEscape = this._closeByEscape.bind(this); // привязываем контекст
  }

  openPopup() {
    this._container.classList.add('popup_opened');
    // стрелочная функция нужна, чтоб не потерялся контекст this
    document.addEventListener('keydown', this._closeByEscape); // повесить обработчик Esc
  }

  closePopup() {
    this._container.classList.remove('popup_opened');
    // стрелочная функция нужна, чтоб не потерялся контекст this
    document.removeEventListener('keydown', this._closeByEscape); // убрать обработчик Esc
  }

  _closeByEscape(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  // закрывать при клике по оверлею или крестику
  // mousedown - чтобы не закрывалось при выделении текста и случайном отпускании за границей попапа
  setEventListeners() {
    this._container.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup();
      }
      if (evt.target.classList.contains('btn_el_close')) {
        this.closePopup();
      }
    });
  }
}



