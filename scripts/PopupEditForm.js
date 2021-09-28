import { nameInput, jobInput, formEdit, profileName, profileDesc, editBtn, formConfig } from './domElements.js' 
import Popup from './Popup.js';
import FormValidator from './FormValidator.js';

export default class PopupEdidForm extends Popup {

    constructor(PopupEdidSelector, form) {
        super(PopupEdidSelector);
        this._formValidator = new FormValidator(formConfig, form);
        this._formValidator.enableValidation();
    }

    _openPopup() {
        nameInput.value = profileName.textContent;
        jobInput.value = profileDesc.textContent;
        super._openPopup();
        this._formValidator.refresh();
    }

    _submitProfileEdit = evt => {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileDesc.textContent = jobInput.value;
        this._closePopup();
    }

    _setEventListeners() {
        super._setEventListeners();
        editBtn.addEventListener('click', this._handleOpenBtn);
        formEdit.addEventListener('submit', this._submitProfileEdit);
    }
}