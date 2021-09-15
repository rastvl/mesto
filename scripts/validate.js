function enableValidation(selectorKeys) {
    const {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    } = selectorKeys;
    const formsList = Array.from(document.querySelectorAll(`.${formSelector}`));

    formsList.forEach(form => {
        form.addEventListener('submit', evt => {
            evt.preventDefault();
        })
        setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    })


}

function showInputError(formElement, inputElement, inputErrorClass, errClass) {
    const errElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errElement.classList.add(errClass);
    errElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, inputErrorClass, errClass) {
    const errElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errElement.textContent = '';
    errElement.classList.remove(errClass);
}


function isValid(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid)
        showInputError(formElement, inputElement, inputErrorClass, errorClass);
    else
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
}

function hasInvalidInput(inputsList) {
    return inputsList.some(input => {
        return !input.validity.valid;
    })
}

function toggleButtonState(inputsList, btn, inactiveBtnClass) {
    if (hasInvalidInput(inputsList)) {
        btn.classList.add(inactiveBtnClass);
        btn.disabled = true;
    } else {
        btn.classList.remove(inactiveBtnClass);
        btn.disabled = false;
    }
}

function setEventListeners(form, inputSelector, btnSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    //Get all input fields
    const inputsList = Array.from(form.querySelectorAll(`.${inputSelector}`));
    //Get submit button
    const btn = form.querySelector(`.${btnSelector}`);


    inputsList.forEach(input => {
        input.addEventListener('input', _ => {
            isValid(form, input, inputErrorClass, errorClass);
            toggleButtonState(inputsList, btn, inactiveButtonClass);
        })
    })
}

enableValidation({
    formSelector: "popup__form",
    inputSelector: "popup__input",
    submitButtonSelector: "popup__submit",
    inactiveButtonClass: "popup__submit_type_error",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active"
});
