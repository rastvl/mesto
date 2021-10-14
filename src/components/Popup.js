import {
    popupSelectors
} from "../utils/domElements.js"

const {
    popupOpenedSelector,
    popupCloseBtn
} = popupSelectors;


export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeBtn = this._popupElement.querySelector(popupCloseBtn);
    }

    _isOverlay = target => {
        return target.classList.contains(popupOpenedSelector);
    }

    _mouseHandler = evt => {
        if (this._isOverlay(evt.target))
            this.close();
    }

    _setMouseHandler() {
        this._popupElement.addEventListener('mousedown', this._mouseHandler)
    }

    _closePopupEsc = evt => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _setEscHandler() {
        document.addEventListener('keydown', this._closePopupEsc);
    }

    _removeEscHandler() {
        document.removeEventListener('keydown', this._closePopupEsc);
    }

    open() {
        this._setEscHandler();
        this._popupElement.classList.add(popupOpenedSelector);
    }

    close() {
        this._popupElement.classList.remove(popupOpenedSelector);
        this._removeEscHandler();
    }

    _handleCloseBtn = evt => {
        this.close();
    }

    _handleOpenBtn = evt => {
        this.open();
    }

    setEventListeners() {
        this._closeBtn.addEventListener('click', this._handleCloseBtn);
        this._setMouseHandler();
    }

}