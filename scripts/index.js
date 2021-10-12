import {
    gallerySection,
    initialCards,
    formEdit,
    formAddCard,
    editBtn,
    addBtn,
    formConfig,
    placeImgLinkInput,
    nameInput,
    jobInput
} from './domElements.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


const gallery = new Section({
    items: initialCards,
    renderer: (cardInfo) => {
        const card = new Card(cardInfo, '#cardTemplate', _ => {
            const popupIncrease = new PopupWithImage('.popup_place-pic', cardInfo);
            popupIncrease.open();
        });
        const cardElement = card.createCard();
        gallery.addItem(cardElement, true);
    }
}, gallerySection)
gallery.renderItems();


const validatorEditProfile = new FormValidator(formConfig, formEdit);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(formConfig, formAddCard);
validatorAddCard.enableValidation();

const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileCaptionSelector: '.profile__description'
})

const popupEditProfile = new PopupWithForm('.popup-edit', _ => {
    userInfo.setUserInfo({
        name: nameInput.value,
        about: jobInput.value
    })
    popupEditProfile.close();
}, validatorEditProfile);

editBtn.addEventListener('click', _ => {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    jobInput.value = info.about;
    popupEditProfile.open();
});


const popupAddCard = new PopupWithForm('.popup_add-card', _ => {
    const cardInfo = {
        name: placeInput.value,
        link: placeImgLinkInput.value
    }
    const card = new Card(cardInfo, '#cardTemplate', _ => {
        const popupIncrease = new PopupWithImage('.popup_place-pic', cardInfo);
        popupIncrease.open();
    }).createCard();
    gallery.addItem(card, false);
    popupAddCard.close();
}, validatorAddCard);

addBtn.addEventListener('click', _ => {
    popupAddCard.open();
});