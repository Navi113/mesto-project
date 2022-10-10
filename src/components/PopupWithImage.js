import Popup from './Popup.js';
 
export default class PopupWithImage extends Popup {
  constructor (popup) {
    super(popup);
    this._imgBigSize = document.querySelector('.popup__image');
    this._imgPopupCaption = document.querySelector('.popup__image-subtitle');
  }
 
  open (data) {
    this._imgBigSize.src = data.link;
    this._imgBigSize.alt = data.name;
    this._imgPopupCaption.textContent = data.name;
    super.open();
  }
}
