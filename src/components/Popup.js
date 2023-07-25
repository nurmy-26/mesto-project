class Popup{
  constructor(selector){
    this._selector = selector;
  }
  openPopup() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); // повесить обработчик Esc
  }
  closePopup() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); // убрать обработчик Esc
  }
  _closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_opened'); // найти открытый попап по соответствующему селектору
      this.closePopup(popup);                                     // и закрыть его
    }
  }
  setEventListeners(){
    
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
