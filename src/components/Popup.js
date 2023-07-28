class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape); // повесить обработчик Esc
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_opened');
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
    this._popupSelector.addEventListener('mousedown', (evt) => {
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
