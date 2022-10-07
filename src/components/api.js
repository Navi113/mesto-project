export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL
    this._headers = options.headers
  }
// Получение данных пользователя
  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
  }
// Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
        headers: this._headers
      })
      .then(this._checkResponse)
  };
// Редактирование данных пользователя
  editUserData(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._checkResponse)
  }
// Изменение аватара
  changeAvatar(avatar) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._checkResponse)
  }
// Добавление карточки
  addCard(name, link) {
    return fetch(`${this._baseURL}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        })
      })
      .then(this._checkResponse)
  }
// Удаление карточки
  deleteLike(id) {
    return fetch(`${this._baseURL}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse)
  }
// Поставить лайк
  putLike(id) {
    return fetch(`${this._baseURL}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._checkResponse)
  }
// Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse)
  }
// Проверка
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
  }
}