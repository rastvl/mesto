import { popupImgIncreaseSelector, popupImgCaptionSelector } from "../utils/domElements.js";
import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(popupImgSelector) {
        super(popupImgSelector);
        this._popupImgIncrease = document.querySelector(popupImgIncreaseSelector);
        this._popupImgCaption = document.querySelector(popupImgCaptionSelector);
        this.setEventListeners();
    }

    open(cardInfo) {
        this._popupImgCaption.textContent = cardInfo.name;
        this._popupImgIncrease.src = cardInfo.link;
        this._popupImgCaption.alt = `Фото ${cardInfo.name}`;
        super.open();
    }
}