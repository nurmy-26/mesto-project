export default class Popup {
  constructor(popupSelector){
    this._container = document.querySelector(popupSelector);
  }

  openPopup() {
    this._container.classList.add('popup_opened');
    // стрелочная функция нужна, чтоб не потерялся контекст this
    document.addEventListener('keydown', (evt) => {
      this._closeByEscape(evt)
    }); // повесить обработчик Esc
  }

  closePopup() {
    this._container.classList.remove('popup_opened');
    // стрелочная функция нужна, чтоб не потерялся контекст this
    document.removeEventListener('keydown', (evt) => {
      this._closeByEscape(evt)
    }); // убрать обработчик Esc
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



/*// закрыть попап при нажатии на Esc (для вызова в обработчиках)
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened'); // найти открытый попап по соответствующему селектору
    closePopup(popup);                                     // и закрыть его
  }
}

// открыть попап
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); // повесить обработчик Esc
}

// закрыть попап
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

  document.removeEventListener('keydown', closeByEscape); // убрать обработчик Esc
}
*/
