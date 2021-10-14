import './../pages/index.css';
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
} from '../utils/domElements.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupIncrease = new PopupWithImage('.popup_place-pic');

function makeCard(cardInfo) {
    const card = new Card(cardInfo, '#cardTemplate', _ => {
        popupIncrease.open(cardInfo);
    });
    return card.createCard();
}

const gallery = new Section({
    items: initialCards,
    renderer: (cardInfo) => {
        const card = makeCard(cardInfo);
        gallery.addItem(card, true);
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

const popupEditProfile = new PopupWithForm('.popup-edit', inputValues => {
    userInfo.setUserInfo({
        name: inputValues.login,
        about: inputValues.job
    })
    popupEditProfile.close();
}, validatorEditProfile);

editBtn.addEventListener('click', _ => {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    jobInput.value = info.about;
    popupEditProfile.open();
});


const popupAddCard = new PopupWithForm('.popup_add-card', inputValues => {
    const cardInfo = {
        name: inputValues.title,
        link: inputValues.link
    }
    const card = makeCard(cardInfo);
    gallery.addItem(card, false);
    popupAddCard.close();
}, validatorAddCard);

addBtn.addEventListener('click', _ => {
    popupAddCard.open();
});