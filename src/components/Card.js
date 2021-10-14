import { cardSelectors } from '../utils/domElements.js';

const { cardBlock, cardTrashIconSelector, cardImgSelector, cardTitleSelector, cardLikeBtn, cardLikeBtnActive } = cardSelectors;

export default class Card {

    constructor(cardInfo, templateSelector, handleCardClick) {
        this._cardInfo = cardInfo;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        const cardTitle = this._cardElement.querySelector(cardTitleSelector);
        
        this._cardImg.style.backgroundImage = `url("${this._cardInfo.link}")`;
        cardTitle.textContent = this._cardInfo.name;

        this._setEventListeners();
        return this._cardElement;
    }
}