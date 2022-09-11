// Конфиг для дальнейшей удобной вставки
const config = {
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '36f58db1-954b-4ac9-895b-0b07efe7ba35',
    'Content-Type': 'application/json'
  }
}

// Функция проверки ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`❗️❗️❗️ Тем временем на барабане ошибка: ${res.status} ${res.statusText}`)
}


// // Функция для получения информации о пользователе с сервера
const getUserData = () => {
  return fetch(`${config.baseURL}/users/me`, {
      headers: config.headers
    })
    .then(checkResponse)
};

// Функция получения начальных карточек
const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
      headers: config.headers
    })
    .then(checkResponse)
};

// Функция редактирования информации (взятой с сервера) о пользователе в DOM
const editUserData = (name, about) => {
  return fetch(`${config.baseURL}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(checkResponse)
}

// Загрузка нового аватара
const changeAvatar = (avatar) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => checkResponse(res))
}

// Добавление новой карточки
const addCard = (name, link) => {
  return fetch(`${config.baseURL}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name,
        link,
      })
    })
    .then(checkResponse)
}

const deleteLike = (id) => {
  return fetch(`${config.baseURL}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
}

const putLike = (id) => {
  return fetch(`${config.baseURL}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(checkResponse)
}

const deleteCard = (id) => {
  return fetch(`${config.baseURL}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
}

export {
  getUserData,
  getInitialCards,
  editUserData,
  changeAvatar,
  addCard,
  config,
  deleteLike,
  putLike,
  deleteCard
}
