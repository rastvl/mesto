export default class UserInfo {
    constructor({
        profileNameSelector,
        profileCaptionSelector,
        profileAvatarSelector
    }) {
        this._userLogin = document.querySelector(profileNameSelector);
        this._userAbout = document.querySelector(profileCaptionSelector);
        this._userAvatar = document.querySelector(profileAvatarSelector)
    }

    getUserInfo() {
        return {
            name: this._userLogin.textContent,
            about: this._userAbout.textContent,
            userID: this._userID
        }
    }

    setUserInfo(data) {
        this._userLogin.textContent = data.name;
        this._userAbout.textContent = data.about;
        this._userAvatar.src = data.avatar;
        this._userID = data._id;
    }
}