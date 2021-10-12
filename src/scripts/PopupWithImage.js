import { popupImgCaption, popupImgIncrease } from "./domElements.js";
import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(popupImgSelector, cardInfo) {
        super(popupImgSelector);
        this._cardInfo = cardInfo;
        this._renderPopup();
    }

    open() {
        popupImgCaption.textContent = this._cardInfo.name;
        popupImgIncrease.src = this._cardInfo.link;
        popupImgIncrease.alt = `Фото ${this._cardInfo.name}`;
        super.open();
    }
}