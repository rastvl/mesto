export default class UserInfo {
    constructor({
        profileNameSelector,
        profileCaptionSelector
    }) {
        this._userLogin = document.querySelector(profileNameSelector);
        this._userAbout = document.querySelector(profileCaptionSelector);
    }

    getUserInfo() {
        return {
            name: this._userLogin.textContent,
            about: this._userAbout.textContent
        }
    }

    setUserInfo(data) {
        this._userLogin.textContent = data.name;
        this._userAbout.textContent = data.about;
    }
}