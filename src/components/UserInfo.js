export default class UserInfo {
  constructor({ profileTitle, profileSubtitle, avatar }) {
    this._nameUser = profileTitle;
    this._jobUser = profileSubtitle;
    this._urlAvatarUser = avatar;
  }
  
  getUserInfo() {
     return {
      name: this._nameUser.textContent,
      about: this._jobUser.textContent,
      avatar: this._urlAvatarUser.src
    }
  }
  
  setUserInfo(data) {
    this._nameUser.textContent = data.name;
    this._jobUser.textContent = data.about;
    this._urlAvatarUser.src = data.avatar;
  }
 } 