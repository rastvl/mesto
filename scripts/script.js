!function() {
    let formElement = document.querySelector('.popup__form');
    let nameInput = formElement.querySelectorAll('.popup__input')[0];
    let jobInput = formElement.querySelectorAll('.popup__input')[1];
    let popup = document.querySelector('.popup'); 
    let editBtn = document.querySelector('.profile__edit-button');
    let profileName = document.querySelector('.profile__name');
    let profileDesc = document.querySelector('.profile__description');

    function closePopup(){
        popup.classList.remove('popup_opened');
    }

    function openPopup() {
        popup.classList.add('popup_opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileDesc.textContent;
    }

    function formSubmitHandler(evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileDesc.textContent = jobInput.value;
        closePopup();
    }

    formElement.addEventListener('submit', formSubmitHandler);

    editBtn.addEventListener('click', openPopup)

    let closeBtn = document.querySelector('.popup__close');
    closeBtn.addEventListener('click', closePopup)
}()

