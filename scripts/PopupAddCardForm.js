import {
    formAddCard,
    addBtn,
    placeInput,
    placeImgLinkInput,
    cardSelectors,
    gallerySection,
    formConfig
} from './domElements.js'
import Popup from './Popup.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

export default class PopupAddCardForm extends Popup {
    constructor(PopupAddCardSelector, form) {
        super(PopupAddCardSelector);
        this._formValidator = new FormValidator(formConfig, form);
        this._formValidator.enableValidation();
        this._form = form;
    }

    _openPopup() {
        super._openPopup();
        this._form.reset();
        this._formValidator.refresh();
    }

    _submitCardRender = evt => {
        evt.preventDefault();
        const cardInfo = {
            name: placeInput.value,
            link: placeImgLinkInput.value
        }
        const card = new Card(cardInfo, cardSelectors.cardTemplate).createCard();
        gallerySection.prepend(card);
        this._closePopup();
        this._form.reset();
        this._formValidator.refresh();
    }

    _setEventListeners() {
        super._setEventListeners();
        addBtn.addEventListener('click', this._handleOpenBtn);
        formAddCard.addEventListener('submit', this._submitCardRender)
    }
}