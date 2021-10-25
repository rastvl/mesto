import { formConfig } from "../utils/domElements.js";
import Popup from "./Popup.js";

const {formSelector, inputSelector, submitButtonSelector} = formConfig;

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, formValidator) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(formSelector);
        this._submitBtn = this._form.querySelector(submitButtonSelector);
        this._submitBtnText = this._submitBtn.textContent;
        this._inputList = this._form.querySelectorAll(inputSelector);
        this._onSubmit = submitCallback;
        this._inputValues = {};
        this._validator = formValidator || null;
        this.setEventListeners();
    }

    _getInputValues() {
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }

    _callOnSubmit = evt => {
        evt.preventDefault();
        this._onSubmit(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._callOnSubmit)
    }

    open() {
        if (this._validator)
            this._validator.refresh();
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }

    waitLoading(isLoading) {
        isLoading ? this._submitBtn.textContent = 'Сохранение...' : this._submitBtn.textContent = this._submitBtnText;
    }

    setSubmitHandler(submitCallback) {
        this._form.removeEventListener('submit', this._callOnSubmit);
        this._form.addEventListener('submit', submitCallback);
    }
}