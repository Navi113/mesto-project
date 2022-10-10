import {
  closePopup,
  openPopup
} from './modal.js';

import {
  popupItemImage,
  popupItemTitle,
  popupImage,
  template,
  gallery,
  loadCard,
  user,
  userId
} from '../index.js';

  export default class Card {
    constructor({ data, templateSelector,api, userId }) {
      this._data = data;
      this._templateSelector = templateSelector;
      this._ownerId = data.owner._id;
      this._userId = userId;
      this._cardId = data._id;
      this._api = api;
      this._cardLikes = data.likes;
    }

  // Метод получения DOM элемента
  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  // Метод вешания слушателей на карточку
  _setEventListeners() {
    // Слушатель на кнопку удалить
    this._deleteBtn.addEventListener('click', () => {
      this._deleteCard();
    })

    // Слушатель на кнопку лайка
    this._likeBtn.addEventListener('click', () => {
      this._addLike()
    })
  }
  // Метод счетчик лайков
  _displayLikes(res) {
    this._likeCounter.textContent = res.likes.length;
  }

  // Метод добавить лайк
  _addLike() {
    if (this._likeBtn.classList.contains('elements__like-button_active')) {
      this._api.deleteLike(this._cardId)
        .then((res) => {
          this._likeBtn.classList.remove('elements__like-button_active');
          this._displayLikes(res);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._api.putLike(this._cardId)
        .then((res) => {
          this._likeBtn.classList.add('elements__like-button_active');
          this._displayLikes(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }


  // Метод удаления карточки
  _deleteCard() {
    this._api.deleteCard(this._cardId)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  // Метод создания карточки
  generate() {
    this._element = this._getElement();
    this._element.querySelector('.elements__image').src = this._data.link;
    this._element.querySelector('.elements__image').alt = this._data.name;
    this._element.querySelector('.elements__title').textContent = this._data.name;
    this._element.querySelector('.elements__like-button-counter').textContent = this._data.likes.length;
    this._deleteBtn = this._element.querySelector('.elements__delete-button');
    this._likeBtn = this._element.querySelector('.elements__like-button');
    this._likeCounter = this._element.querySelector('.elements__like-button-counter')

    if (this._ownerId !== this._userId) {
      this._deleteBtn.classList.add('elements__delete-button_disabled');
    }

    if (this._cardLikes.some(like => like._id === userId)) {
      this._likeBtn.classList.add('elements__like-button_active');
    }

    this._setEventListeners();

    return this._element
  }

}

// Функция формирования карточки
// function createCard(card, isOwner) {
//   const oneCard = template.querySelector('.elements__item').cloneNode(true); // копируем контейнер карточки со всем содержимым
//   const cardName = oneCard.querySelector('.elements__title');
//   const image = oneCard.querySelector('.elements__image');
//   const deleteBtn = oneCard.querySelector('.elements__delete-button');

//   cardName.textContent = card.name;
//   image.src = card.link;
//   image.alt = card.name;

//   // Показать иконку корзины на моей карточке
//   if (!isOwner) {
//     deleteBtn.classList.add('elements__delete-button_disabled');
//   }

//   // Попап картинки
//   image.addEventListener('click', () => {
//     popupItemTitle.textContent = cardName.textContent;
//     popupItemImage.src = image.getAttribute('src');
//     popupItemTitle.alt = cardName.getAttribute('src');
//     openPopup(popupImage);
//   })

//   return oneCard;
// }

// Функция добавления карточки в HTML
// function addNewCard(card) {
//   gallery.prepend(createCard(card, true, false, 0));
// }

// Функция показать лайки
function displayLikes(likeCounter, card) {
  likeCounter.textContent = card.likes.length;
}

export {
  //createCard,
 // addNewCard,
};