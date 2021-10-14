export default class FormValidator {

    constructor(formConfig, form) {
        this._form = form;
        this._inputSelector = formConfig.inputSelector;
        this._submitButtonSelector = formConfig.submitButtonSelector;
        this._inactiveButtonClass = formConfig.inactiveButtonClass;
        this._inputErrorClass = formConfig.inputErrorClass;
        this._errorClass = formConfig.errorClass;
        this._submitButtonSelector = formConfig.submitButtonSelector;
        this._submitBtn = form.querySelector(this._submitButtonSelector);
        this._inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }


    _showInputError(inputElement) {
        const errElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errElement.classList.add(this._errorClass);
        errElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errElement.textContent = '';
        errElement.classList.remove(this._errorClass);
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid)
            this._showInputError(inputElement);
        else
            this._hideInputError(inputElement);
    }

    _hasInvalidInput() {
        return this._inputsList.some(input => {
            return !input.validity.valid || input.value == '';
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitBtn.classList.add(this._inactiveButtonClass);
            this._submitBtn.disabled = true;
        } else {
            this._submitBtn.classList.remove(this._inactiveButtonClass);
            this._submitBtn.disabled = false;
        }
    }

    _setEventListeners() {
        this._inputsList.forEach(input => {
            input.addEventListener('input', _ => {
                this._isValid(input);
                this._toggleButtonState();
            })
        })
    }

    refresh() {
        this._toggleButtonState();
        this._inputsList.forEach(input => {
            this._hideInputError(input);
        })
    }

    enableValidation() {
        this._setEventListeners();
    }

}