!function () {
    let formElement = document.querySelector('.popup__form');
    let nameInput = formElement.querySelectorAll('.popup__input')[0];
    let jobInput = formElement.querySelectorAll('.popup__input')[1];
    let popup = document.querySelector('.popup'); 
    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler(evt) {
        evt.preventDefault();
        let name = nameInput.value;
        let job = jobInput.value;

        let profileName = document.querySelector('.profile__name');
        let profileDesc = document.querySelector('.profile__description');

        profileName.textContent = name;
        profileDesc.textContent = job;
        popup.style.display = "none";
    }

    formElement.addEventListener('submit', formSubmitHandler);

    let editBtn = document.querySelector('.profile__edit-button');
    editBtn.addEventListener('click', _ => {
        popup.style.display = "block";
        // popup.className = "popup popup_opened";
    })

    let closeBtn = document.querySelector('.popup__close');
    closeBtn.addEventListener('click', _ => {
        let popup = document.querySelector('.popup');
        popup.style.display = "none";
    })
}()

