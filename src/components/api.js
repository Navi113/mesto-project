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

function deleteLike(id) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
}

function putLike(id) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(checkResponse)
}

// Запрос на удаление своей карточки
// const delCard = (id) => {
//   return fetch(`${config.baseURL}/cards/${id}`, {
//       method: 'DELETE',
//       headers: config.headers
//     })
//     .then(checkResponse)
// }

// const deleteCard = (id) => {
//     fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/${id}`, {
//         method: 'DELETE',
//         headers: config.headers
//       })
//       .then(checkResponse)

// Для себя (объект карточек в консоли)
fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
  .then((data) => {
    console.log(data);
  })

// Для себя (объект пользователя в консоли)
fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
  .then(data => console.log(data))
// const like =

// Проверка id пользователя
// const isOwner = (owner) => {
//   return fetch(`${config.baseURL}/cards`, {
//       headers: config.headers,
//       body: JSON.stringify({
//         owner
//       })
//     })
//     .then(checkResponse)
// };

// function getSmileIfTrue(isOwner) {
//   if (userId.id == card.owner._id) {
//     console.log(':-)');
//   }
// }

// Функция проверки лайка
// const isLiked = () => {

// };

// Фугкция счетчика лайков
// const displayLikes = () => {

// };

// Получил с сервера JSON с массивом карточек --------------------------------------------------------------------
// fetch(`${config.baseURL}/cards`, {
//   headers: config.headers
// })
// .then(res => res.json())
// .then((data) => {
//   console.log(data); //объект
//   console.log(data[0].owner); // владелец
//   console.log(data[0].likes); // количество лайков
//   console.log(data[0].owner._id); // id владельца
// });

// function getLikes(callback) {
//   fetch('https://nomoreparties.co/v1/plus-cohort-12/cards', {
//       headers: config.headers
//     })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       callback(data);
//     });
// }

// Функция получить лайки
// const getLikes = (callback) => {
//   return fetch(`${config.baseURL}/cards`, {
//       headers: config.headers
//     })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       callback(data);
//     })
//     .then(checkResponse)
// };

// const showLikes = (info) => {
//   info.forEach((item) => console.log(item.likes))
// }

// //
// getLikes(showLikes);


export {
  getUserData,
  getInitialCards,
  editUserData,
  changeAvatar,
  addCard,
  config,
  deleteLike,
  putLike
}
