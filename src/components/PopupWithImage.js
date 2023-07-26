import Popup from './Popup'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageSelector = this._popupSelector.querySelector('.popup__image');
    this._descriptionSelector = this._popupSelector.querySelector('.popup__description');

  }

  openPopup( {name, link} ) {
    this._imageSelector.src = link;
    this._imageSelector.alt = name;
    this._descriptionSelector.textContent = name;
    super.openPopup()
  }
}
