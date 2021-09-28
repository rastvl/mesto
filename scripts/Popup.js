import { popupSelectors } from './domElements.js' 

const { popupSelector, popupOpenedSelector, popupCloseBtn } = popupSelectors;
const isOverlay = target => {
    return target.classList.contains(popupOpenedSelector);
}

export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeBtn = this._popupElement.querySelector(popupCloseBtn);
        //this._setEventListeners();
    }

    _mouseHandler = evt => {
        if (isOverlay(evt.target))
            this._closePopup();
    }

    _setMouseHandler() {
        this._popupElement.addEventListener('mousedown', this._mouseHandler)
    }

    _closePopupEsc = evt => {
        if (evt.key === 'Escape') {
            this._closePopup();
        }
    }

    _setEscHandler() {
        document.addEventListener('keydown', this._closePopupEsc);
    }

    _removeEscHandler() {
        document.removeEventListener('keydown', this._closePopupEsc);
    }

    _openPopup() {
        this._setEscHandler();
        this._popupElement.classList.add(popupOpenedSelector);
    }

    _closePopup() {
        this._popupElement.classList.remove(popupOpenedSelector);
        this._removeEscHandler();
    }

    _handleCloseBtn = evt => {
        this._closePopup();
    }

    //This method shouldn't exist
    _handleOpenBtn = evt => {
        this._openPopup();
    }

    _setEventListeners() {
        this._closeBtn.addEventListener('click', this._handleCloseBtn);
        this._setMouseHandler();
    }

    renderPopup() {
        this._setEventListeners();
    }

}