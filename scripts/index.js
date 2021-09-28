import Card from './Card.js';
import PopupAddCardForm from './PopupAddCardForm.js';
import PopupEdidForm from './PopupEditForm.js';
import PopupIncrease from './PopupIncrease.js';
import {
    gallerySection,
    initialCards,
    popupIncreaseSelectors,
    formEdit,
    formAddCard
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

const popupEdit = new PopupEdidForm('.popup-edit', formEdit);
const popupAddCard = new PopupAddCardForm('.popup_add-card', formAddCard);
const popupPic = new PopupIncrease(popupIncreaseSelectors.popupIncreaseSelector);
popupEdit.renderPopup();
popupAddCard.renderPopup();
popupPic.renderPopup();