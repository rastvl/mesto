function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
    const formsList = Array.from(document.querySelectorAll(formSelector));

    formsList.forEach(form => {
        const btn = form.querySelector(submitButtonSelector);
        form.addEventListener('submit', evt => {
            evt.preventDefault();
            btn.classList.add(inactiveButtonClass);
            btn.disabled = true;
        })
        setEventListeners(form, inputSelector, btn, inactiveButtonClass, inputErrorClass, errorClass);
        form.refresh = function() {
            refreshForm(form, inputSelector, btn, inactiveButtonClass, inputErrorClass, errorClass);
        }
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
        return !input.validity.valid || input.value == '';
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

function setEventListeners(form, inputSelector, btn, inactiveButtonClass, inputErrorClass, errorClass) {
    //Get all input fields
    const inputsList = Array.from(form.querySelectorAll(inputSelector));

    inputsList.forEach(input => {
        input.addEventListener('input', _ => {
            isValid(form, input, inputErrorClass, errorClass);
            toggleButtonState(inputsList, btn, inactiveButtonClass);
        })
    })
}

function refreshForm(form, inputSelector, btn, inactiveButtonClass, inputErrorClass, errorClass) {
    const inputsList = Array.from(form.querySelectorAll(inputSelector));
    toggleButtonState(inputsList, btn, inactiveButtonClass);
    inputsList.forEach(input => {
        hideInputError(form, input, inputErrorClass, errorClass)
    })
}

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_type_error",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active"
});
