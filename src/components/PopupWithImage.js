import Popup from './Popup'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._container.querySelector('.popup__image');
    this._description = this._container.querySelector('.popup__description');

  }

  openPopup( {name, link} ) {
    this._image.src = link;
    this._image.alt = name;
    this._description.textContent = name;
    super.openPopup()
  }
}
