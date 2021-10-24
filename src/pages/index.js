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
    jobInput,
    profileDesc,
    profileName,
    profileAva
} from '../utils/domElements.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/API';

let gallery;

const popupIncrease = new PopupWithImage('.popup_place-pic');

function handleCardLike(card, cardInfo) {
    api.likeCard(cardInfo._id).then(res => {
        card.updateLikes(res.likes);
    });

}

function makeCard(cardInfo) {
    cardInfo.userID = userInfo.getUserInfo().userID;
    const card = new Card(cardInfo, '#cardTemplate',
        _ => {
            popupIncrease.open(cardInfo);
        },
        handleCardLike
    );
    return card.createCard();
}

const options = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-29',
    headers: {
        authorization: '78d500a1-0825-40b4-9b92-2b8f678f6707',
        'Content-Type': 'application/json'
    }
}
const api = new Api(options);


// const gallery = new Section({
//     items: initialCards,
//     renderer: (cardInfo) => {
//         const card = makeCard(cardInfo);
//         gallery.addItem(card, true);
//     }
// }, gallerySection)
// gallery.renderItems();


const validatorEditProfile = new FormValidator(formConfig, formEdit);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(formConfig, formAddCard);
validatorAddCard.enableValidation();

const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileCaptionSelector: '.profile__description',
    profileAvatarSelector: '.profile__avatar'
})

const popupEditProfile = new PopupWithForm('.popup-edit', inputValues => {
    popupEditProfile.waitLoading(true);
    api.refreshUserInfo(inputValues.login, inputValues.job)
        .then(newUserData => {
            popupEditProfile.waitLoading(false);
            userInfo.setUserInfo(newUserData);
            popupEditProfile.close();
        })
        .catch(err => console.log(err))
    // userInfo.setUserInfo({
    //     name: inputValues.login,
    //     about: inputValues.job
    // })
    // popupEditProfile.close();
}, validatorEditProfile);

editBtn.addEventListener('click', _ => {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    jobInput.value = info.about;
    popupEditProfile.open();
});


const popupAddCard = new PopupWithForm('.popup_add-card', inputValues => {
    popupAddCard.waitLoading(true);
    api.addCard(inputValues.title, inputValues.link)
        .then(cardInfo => {
            const card = makeCard(cardInfo);
            popupAddCard.waitLoading(false);
            gallery.addItem(card, false);
            popupAddCard.close();
        })
        .catch(err => console.log(err))
    // const cardInfo = {
    //     name: inputValues.title,
    //     link: inputValues.link
    // }
    // const card = makeCard(cardInfo);
    // gallery.addItem(card, false);
    // popupAddCard.close();
}, validatorAddCard);

addBtn.addEventListener('click', _ => {
    popupAddCard.open();
});

Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData);
        gallery = new Section({
            items: cards,
            renderer: (cardInfo) => {
                const card = makeCard(cardInfo);
                gallery.addItem(card, true);
            }
        }, gallerySection)
        gallery.renderItems();
    })
    .catch(err => console.log(err));

//console.log(userData)