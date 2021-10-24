import { cardSelectors } from '../utils/domElements.js';

const { cardBlock, cardTrashIconSelector, cardImgSelector, cardTitleSelector, cardLikeBtn, cardLikeBtnActive, cardLikesSelector } = cardSelectors;

export default class Card {

    constructor(cardInfo, templateSelector, handleCardClick, handleCardLike, handleCardDelete) {
        this._userID = cardInfo.userID;

        this._likesList = cardInfo.likes;
        this._cardInfo = cardInfo;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike
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
        this._cardElement.remove();
    }


    _handleLikeBtn(likeBtn) {
        likeBtn.classList.toggle(cardLikeBtnActive);
        this._handleCardLike(this, this._cardInfo);
    }

    _renderLikesContainer() {
        this._cardLikesElement.textContent = this._likesList.length;
        this._cardLikeBtn.classList.remove(cardLikeBtnActive);
        this._likesList.forEach(likeObj => {
            //console.log(likeObj)
            if (likeObj._id == this._userID) {
                this._cardLikeBtn.classList.add(cardLikeBtnActive)
            }

        })
    }

    updateLikes(likesArr) {
        this._likesList = likesArr;
        this._renderLikesContainer();
    }

    _setEventListeners() {
        this._cardElement.querySelector(cardTrashIconSelector).addEventListener('click', evt => {
            this._handleTrashIcon();
        });

        this._cardImg.addEventListener('click', _ => {
            this._handleCardClick();
        })

        this._cardElement.querySelector(cardLikeBtn).addEventListener('click', evt => {
           this._handleLikeBtn(evt.target);
        });
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImg = this._cardElement.querySelector(cardImgSelector);
        //const cardLikes = this._cardElement.querySelector(cardLikesSelector);
        this._cardLikesElement = this._cardElement.querySelector(cardLikesSelector);
        const cardTitle = this._cardElement.querySelector(cardTitleSelector);

        this._cardLikeBtn = this._cardElement.querySelector(cardLikeBtn);

        this._cardImg.style.backgroundImage = `url("${this._cardInfo.link}")`;
        cardTitle.textContent = this._cardInfo.name;

        this._cardLikesElement.textContent = this._likesList.length;
        this._renderLikesContainer();

        this._setEventListeners();
        return this._cardElement;
    }
}