import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
    gallerySection,
    initialCards,
    formEdit,
    formAddCard,
    editBtn,
    addBtn,
    closeEditBtn,
    closeAddCardBtn,
    closePlacePicBtn,
    popupEdit,
    popupAddCard,
    popupPic,
    profileName,
    profileDesc,
    formConfig,
    placeImgLinkInput
} from './domElements.js';


function renderCard(cardInfo, method) {
    const card = new Card(cardInfo, '#cardTemplate');
    const cardElement = card.createCard();
    gallerySection[method](cardElement);
}

function downloadCards(cardsArr) {
    cardsArr.forEach(cardInfo => {
        renderCard(cardInfo, 'append');
    })
}
downloadCards(initialCards);

const closePopupEsc = evt => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function setEscHandler() {
    document.addEventListener('keydown', closePopupEsc)
}

function removeEscHandler() {
    document.removeEventListener('keydown', closePopupEsc)
}

const isOverlay = target => {
    return target.classList.contains('popup_opened');
}

const mouseHandler = evt => {
    if (isOverlay(evt.target))
        closePopup(evt.target);
}

function setMouseHandler(popup) {
    popup.addEventListener('mousedown', mouseHandler)
}

function openPopup(popup) {
    setEscHandler();
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeEscHandler();
}

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
    validatorEditProfile.refresh();
    openPopup(popupEdit);
}

function submitProfileEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopup(popupEdit);
}

function submitCardRender(evt) {
    evt.preventDefault();
    const cardInfo = {
        name: placeInput.value,
        link: placeImgLinkInput.value
    }
    renderCard(cardInfo, 'prepend');
    closePopup(popupAddCard);
    formAddCard.reset();
    validatorAddCard.refresh();
}

formEdit.addEventListener('submit', submitProfileEdit);
formAddCard.addEventListener('submit', submitCardRender);

editBtn.addEventListener('click', _ => {
    openEditProfilePopup();
});
addBtn.addEventListener('click', _ => {
    openPopup(popupAddCard);
    formAddCard.reset();
    validatorAddCard.refresh();
});
closeEditBtn.addEventListener('click', _ => {
    closePopup(popupEdit);
});
closeAddCardBtn.addEventListener('click', _ => {
    closePopup(popupAddCard);
});
closePlacePicBtn.addEventListener('click', _ => {
    closePopup(popupPic);
});
setMouseHandler(popupEdit);
setMouseHandler(popupAddCard);
setMouseHandler(popupPic);

const validatorEditProfile = new FormValidator(formConfig, formEdit);
validatorEditProfile.enableValidation();
const validatorAddCard = new FormValidator(formConfig, formAddCard);
validatorAddCard.enableValidation();