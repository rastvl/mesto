const cardTemplate = document.querySelector("#cardTemplate").content;
const gallerySection = document.querySelector(".elements");

const formEdit = document.querySelector('.popup__form_edit');
const formAddCard = document.querySelector('.popup__form_add-card');
const nameInput = formEdit.querySelector('#nameInput');
const jobInput = formEdit.querySelector('#jobInput');

const placeInput = formAddCard.querySelector('#placeInput');
const placeImgLink = formAddCard.querySelector('#placeImgLink');

const popupEdit = document.querySelector('.popup-edit');
const popupAddCard = document.querySelector('.popup_add-card')
const popupPic = document.querySelector('.popup_place-pic');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeEditBtn = document.querySelector('.popup__close_edit');
const closeAddCardBtn = document.querySelector('.popup__close_add-card');
const closePlacePicBtn = document.querySelector('.popup__close_place-pic');

const increasePic = document.querySelector('.place-pic__show');
const caption = document.querySelector('.place-pic__caption');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

function renderCard(cardInfo) {
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
        caption.textContent = cardInfo.name;
        increasePic.src = cardInfo.link;
        increasePic.alt = `Фото ${cardInfo.name}`;
        openPopup(popupPic);
    })

    cardElement.querySelector(".card__like-button").addEventListener('click', evt => {
        const likeButton = evt.target;
        likeButton.classList.toggle('card__like-button_active');
    });
    return cardElement;
}

function addCardToHtml(cardInfo, method) {
    const card = renderCard(cardInfo);
    gallerySection[method](card);
}

function downloadCards(cardsArr) {
    cardsArr.forEach(cardInfo => {
        addCardToHtml(cardInfo, 'append');
    })
}


function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openEditProfilePopup(popup){
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
    openPopup(popup);
}

function editProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopup(popupEdit);
}

function addCardSubmit(evt) {
    evt.preventDefault();
    const cardInfo = {
        name: placeInput.value,
        link: placeImgLink.value
    }
    addCardToHtml(cardInfo, 'prepend');
    closePopup(popupAddCard);
    formAddCard.reset();
}

formEdit.addEventListener('submit', editProfileSubmit);
formAddCard.addEventListener('submit', addCardSubmit);

editBtn.addEventListener('click', _ => {
    openEditProfilePopup(popupEdit);
});
addBtn.addEventListener('click', _ => {
    openPopup(popupAddCard);
});
closeEditBtn.addEventListener('click', _ => {
    closePopup(popupEdit);
});
closeAddCardBtn.addEventListener('click', _ => {
    closePopup(popupAddCard);
})
closePlacePicBtn.addEventListener('click', _ => {
    closePopup(popupPic);
})


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
downloadCards(initialCards);