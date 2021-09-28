import { cardSelectors, popupPic, popupImgCaption, popupImgIncrease} from './domElements.js';
import { openPopup } from './index.js';

const { cardBlock, cardTrashIconSelector, cardImgSelector, cardTitleSelector, cardLikeBtn, cardLikeBtnActive } = cardSelectors;

export default class Card {

    constructor(cardInfo, templateSelector) {
        this._cardInfo = cardInfo;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(cardBlock)
            .cloneNode(true);
        return cardElement;
    }

    _handlePopupImg() {
        popupImgCaption.textContent = this._cardInfo.name;
        popupImgIncrease.src = this._cardInfo.link;
        popupImgIncrease.alt = `Фото ${this._cardInfo.name}`;
        openPopup(popupPic);
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
            this._handlePopupImg();
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