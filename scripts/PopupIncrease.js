
import { popupIncreaseSelectors, popupImgCaption, popupImgIncrease } from './domElements.js' 
import Popup from './Popup.js';

const { popupIncreaseSelector: PopupIncreaseSelector } =  popupIncreaseSelectors;

export default class PopupIncrease extends Popup {
    constructor(PopupIncreaseSelector, cardInfo) {
        super(PopupIncreaseSelector);
        this._cardInfo = cardInfo;
    }

    _openPopup() {
        popupImgCaption.textContent = this._cardInfo.name;
        popupImgIncrease.src = this._cardInfo.link;
        popupImgIncrease.alt = `Фото ${this._cardInfo.name}`;
        super._openPopup();
    }
}