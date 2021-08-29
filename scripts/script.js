(function () {
    function getInititalCards() {
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
        return initialCards;
    }

    function addCardToHtml(cardInfo, method){
        const cardTemplate = document.querySelector("#cardTemplate").content;
        const gallerySection = document.querySelector(".elements");

        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        const cardImg = cardElement.querySelector(".card__image");
        cardImg.style = `background-image: url("${cardInfo.link}");`;

        const cardTitle = cardElement.querySelector(".card__title");
        cardTitle.textContent = cardInfo.name;

        cardElement.querySelector(".card__trash-icon").addEventListener('click', evt => {
            const trashIcon = evt.target;
            const card = trashIcon.closest('.card');
            card.remove();
        });

        cardImg.addEventListener('click', evt => {
            const increasePic = document.querySelector('.place-pic__show');
            const caption = document.querySelector('.place-pic__caption');
            caption.textContent = cardInfo.name;
            increasePic.src = cardInfo.link;
            const popup = document.querySelector('.popup_place-pic');
            popup.classList.toggle('popup_opened');
        })

        cardElement.querySelector(".card__like-button").addEventListener('click', evt => {
            const likeButton = evt.target;
            likeButton.classList.toggle('card__like-button_active');
        });

        gallerySection[method](cardElement);
    }

    function downloadCards(cardsArr) {
        cardsArr.forEach(cardInfo => {
            addCardToHtml(cardInfo, 'append');
        })
    }

    function popupHandlers() {
        const formEdit = document.querySelector('.popup__form_edit');
        const formAddCard = document.querySelector('.popup__form_add-card');
        const nameInput = formEdit.querySelectorAll('.popup__input')[0];
        const jobInput = formEdit.querySelectorAll('.popup__input')[1];

        const placeInput = formAddCard.querySelectorAll('.popup__input')[0];
        const placeImgLink = formAddCard.querySelectorAll('.popup__input')[1];

        const popupEdit = document.querySelector('.popup-edit');
        const popupAddCard = document.querySelector('.popup_add-card')
        const popupPic = document.querySelector('.popup_place-pic');
        const editBtn = document.querySelector('.profile__edit-button');
        const addBtn = document.querySelector('.profile__add-button');
        const closeEditBtn = document.querySelector('.popup__close_edit');
        const closeAddCardBtn = document.querySelector('.popup__close_add-card');
        const closePlacePicBtn = document.querySelector('.popup__close_place-pic');

        const profileName = document.querySelector('.profile__name');
        const profileDesc = document.querySelector('.profile__description');

        function closePopup(popupName) {
            switch (popupName) {
                case 'edit':
                    popupEdit.classList.toggle('popup_opened');
                    break;
                case 'add-card':
                    popupAddCard.classList.toggle('popup_opened');
                    break;
                case 'place-pic':
                    popupPic.classList.toggle('popup_opened');
                    break;
                default:
                    alert('Failed to close popup');
            }

        }

        function openPopup(popupName) {
            switch (popupName) {
                case 'edit':
                    popupEdit.classList.add('popup_opened');
                    nameInput.value = profileName.textContent;
                    jobInput.value = profileDesc.textContent;
                    break;
                case 'add-card':
                    popupAddCard.classList.add('popup_opened');
                    break;
                default:
                    alert('Failed to open popup');
            }
        }

        function EditProfileSubmit(evt) {
            evt.preventDefault();
            profileName.textContent = nameInput.value;
            profileDesc.textContent = jobInput.value;
            closePopup('edit');
        }

        function AddCardSubmit(evt) {
            evt.preventDefault();
            const cardInfo = {
                name: placeInput.value,
                link: placeImgLink.value
            }
            addCardToHtml(cardInfo, 'prepend');
            closePopup('add-card');
        }

        formEdit.addEventListener('submit', EditProfileSubmit);
        formAddCard.addEventListener('submit', AddCardSubmit);

        editBtn.addEventListener('click', _ => {
            openPopup('edit');
        });
        addBtn.addEventListener('click', _ => {
            openPopup('add-card');
        });
        closeEditBtn.addEventListener('click', _ => {
            closePopup('edit');
        });
        closeAddCardBtn.addEventListener('click', _ => {
            closePopup('add-card');
        })
        closePlacePicBtn.addEventListener('click', _ => {
            closePopup('place-pic');
        })
    }

    const initialCards = getInititalCards();
    downloadCards(initialCards);
    popupHandlers();
})()