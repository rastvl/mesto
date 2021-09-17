const initialCards = [{
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

const cardTemplate = document.querySelector("#cardTemplate").content;
const gallerySection = document.querySelector(".elements");

const formEdit = document.querySelector('.popup__form_edit');
const formAddCard = document.querySelector('.popup__form_add-card');
const nameInput = formEdit.querySelector('#nameInput');
const jobInput = formEdit.querySelector('#jobInput');

const placeInput = formAddCard.querySelector('#placeInput');
const placeImgLinkInput = formAddCard.querySelector('#placeImgLink');

const popupEdit = document.querySelector('.popup-edit');
const popupAddCard = document.querySelector('.popup_add-card')
const popupPic = document.querySelector('.popup_place-pic');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeEditBtn = document.querySelector('.popup__close_edit');
const closeAddCardBtn = document.querySelector('.popup__close_add-card');
const closePlacePicBtn = document.querySelector('.popup__close_place-pic');

const popupImgIncrease = document.querySelector('.place-pic__show');
const popupImgCaption = document.querySelector('.place-pic__caption');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');


function createCard(cardInfo) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    cardImg.style.backgroundImage = `url("${cardInfo.link}")`;
    cardTitle.textContent = cardInfo.name;

    cardElement.querySelector(".card__trash-icon").addEventListener('click', evt => {
        const trashIcon = evt.target;
        const card = trashIcon.closest('.card');
        card.remove();
    });

    cardImg.addEventListener('click', evt => {
        popupImgCaption.textContent = cardInfo.name;
        popupImgIncrease.src = cardInfo.link;
        popupImgIncrease.alt = `Фото ${cardInfo.name}`;
        openPopup(popupPic);
    })

    cardElement.querySelector(".card__like-button").addEventListener('click', evt => {
        const likeButton = evt.target;
        likeButton.classList.toggle('card__like-button_active');
    });
    return cardElement;
}

function renderCard(cardInfo, method) {
    const card = createCard(cardInfo);
    gallerySection[method](card);
}

function downloadCards(cardsArr) {
    cardsArr.forEach(cardInfo => {
        renderCard(cardInfo, 'append');
    })
}

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
    formEdit.refresh();
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
    formAddCard.refresh();
}

formEdit.addEventListener('submit', submitProfileEdit);
formAddCard.addEventListener('submit', submitCardRender);

editBtn.addEventListener('click', _ => {
    openEditProfilePopup();
});
addBtn.addEventListener('click', _ => {
    openPopup(popupAddCard);
    formAddCard.reset();
    formAddCard.refresh();
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

downloadCards(initialCards);