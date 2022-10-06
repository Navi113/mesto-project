export default class Api {
  constructor(options) {
    this.baseURL = options.baseURL
    this.headers = options.headers
  }

  getUserData() {
    return fetch(`${this.baseURL}/users/me`, {
        headers: this.headers
      })
      .then(this.checkResponse)
  }

  getInitialCards() {
    return fetch(`${this.baseURL}/cards`, {
        headers: this.headers
      })
      .then(this.checkResponse)
  };

  editUserData(name, about) {
    return fetch(`${this.baseURL}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this.checkResponse)
  }

  changeAvatar(avatar) {
    return fetch(`${this.baseURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar
        })
      })
      .then(this.checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this.baseURL}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name,
          link,
        })
      })
      .then(this.checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this.baseURL}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this.headers,
      })
      .then(this.checkResponse)
  }

  putLike(id) {
    return fetch(`${this.baseURL}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this.headers,
      })
      .then(this.checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this.baseURL}/cards/${id}`, {
        method: 'DELETE',
        headers: this.headers,
      })
      .then(this.checkResponse)
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`❗️❗️❗️ Тем временем на барабане ошибка: ${res.status} ${res.statusText}`)
  }
}