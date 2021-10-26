import { cardSelectors } from '../utils/domElements.js';

const { cardBlock, cardTrashIconSelector, cardTrashIconShow: cardTrashIconShowSelector, cardImgSelector, cardTitleSelector, cardLikeBtn, cardLikeBtnActive, cardLikesSelector } = cardSelectors;

export default class Card {

    constructor(cardInfo, templateSelector, handleCardClick, handleCardLike, handleCardDelete) {
        //console.log(cardInfo)
        this._userID = cardInfo.userID;
        this._cardOwnerId = cardInfo.owner._id;
        this._likesList = cardInfo.likes;
        this._cardInfo = cardInfo;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike
        this._handleCardDelete = handleCardDelete
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(cardBlock)
            .cloneNode(true);
        return cardElement;
    }

    _handleTrashIcon() {
        this._handleCardDelete(this._cardElement, this._cardInfo._id);
    }


    _handleLikeBtn(likeBtn) {
        likeBtn.classList.toggle(cardLikeBtnActive);
        const isLike = likeBtn.classList.contains(cardLikeBtnActive);
        this._handleCardLike(this, this._cardInfo, isLike);
    }

    _renderLikesContainer() {
        this._cardLikesElement.textContent = this._likesList.length;
        this._cardLikeBtn.classList.remove(cardLikeBtnActive);
        const isLiked = this._likesList.some(like => like._id === this._userID);
        if (isLiked) {
            this._cardLikeBtn.classList.add(cardLikeBtnActive);
        }
    }

    updateLikes(likesArr) {
        this._likesList = likesArr;
        this._renderLikesContainer();
    }

    _setEventListeners() {
        this._cardTrashIcon.addEventListener('click', evt => {
            this._handleTrashIcon();
        });

        this._cardImg.addEventListener('click', _ => {
            this._handleCardClick();
        })

        this._cardLikeBtn.addEventListener('click', evt => {
           this._handleLikeBtn(evt.target);
        });
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImg = this._cardElement.querySelector(cardImgSelector);
        this._cardLikesElement = this._cardElement.querySelector(cardLikesSelector);
        const cardTitle = this._cardElement.querySelector(cardTitleSelector);
        this._cardTrashIcon = this._cardElement.querySelector(cardTrashIconSelector);

        this._cardLikeBtn = this._cardElement.querySelector(cardLikeBtn);
        this._cardImg.style.backgroundImage = `url("${this._cardInfo.link}")`;
        cardTitle.textContent = this._cardInfo.name;
        this._cardLikesElement.textContent = this._likesList.length;
        if (this._userID == this._cardOwnerId)
            this._cardTrashIcon.classList.add(cardTrashIconShowSelector);

        this._renderLikesContainer();

        this._setEventListeners();
        return this._cardElement;
    }
}