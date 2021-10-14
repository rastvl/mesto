import { formConfig } from "../utils/domElements.js";
import Popup from "./Popup.js";

const {formSelector, inputSelector} = formConfig;

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, formValidator) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(formSelector);
        this._inputList = this._form.querySelectorAll(inputSelector);
        this._onSubmit = submitCallback;
        this._inputValues = {};
        this._validator = formValidator;
        this.setEventListeners();
    }

    _getInputValues() {
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._onSubmit(this._getInputValues());
        })
    }

    open() {
        this._validator.refresh();
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }
}