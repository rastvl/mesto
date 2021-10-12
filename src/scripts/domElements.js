export const cardSelectors = {
    cardTemplate: '#cardTemplate',
    cardBlock: '.card',
    cardTrashIconSelector: '.card__trash-icon',
    cardImgSelector: '.card__image',
    cardTitleSelector: '.card__title',
    cardLikeBtn: '.card__like-button',
    cardLikeBtnActive: 'card__like-button_active'
}

export const popupSelectors = {
    popupSelector: '.popup',
    popupOpenedSelector: 'popup_opened',
    popupCloseBtn: '.popup__close'
}

export const popupEditSelectors = {
    popupEditSelector: '.popup-edit',
}

export const popupAddCardSelectors = {
    popupAddCardSelector: '.popup_add-card',
}

export const popupIncreaseSelectors = {
    popupIncreaseSelector: '.popup_place-pic'
}

export const formConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_type_error",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active"
}

export const cardTemplate = document.querySelector("#cardTemplate").content;
export const gallerySection = document.querySelector(".elements");

export const formEdit = document.querySelector('.popup__form_edit');
export const formAddCard = document.querySelector('.popup__form_add-card');
export const nameInput = formEdit.querySelector('#nameInput');
export const jobInput = formEdit.querySelector('#jobInput');

export const placeInput = formAddCard.querySelector('#placeInput');
export const placeImgLinkInput = formAddCard.querySelector('#placeImgLink');

export const popupEdit = document.querySelector('.popup-edit');
export const popupAddCard = document.querySelector('.popup_add-card')
export const popupPic = document.querySelector('.popup_place-pic');
export const editBtn = document.querySelector('.profile__edit-button');
export const addBtn = document.querySelector('.profile__add-button');
export const closeEditBtn = document.querySelector('.popup__close_edit');
export const closeAddCardBtn = document.querySelector('.popup__close_add-card');
export const closePlacePicBtn = document.querySelector('.popup__close_place-pic');

export const popupImgIncrease = document.querySelector('.place-pic__show');
export const popupImgCaption = document.querySelector('.place-pic__caption');

export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');



export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];