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
  //deleteAddedCard,
  loadCard,
  user,
  addLike,
} from '../index.js';

export default class Card {
  constructor(data, templateSelector, ownerId, userId, cardId, api) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._ownerId = ownerId;
    this._userId = userId;
    this._cardId = cardId;
    this._api = api;
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
    if (this._ownerId !== this._userId.id) {
      this._deleteBtn.classList.add('elements__delete-button_disabled');
    }

    this._setEventListeners();

    return this._element
  }

}

// Функция формирования карточки
function createCard(card, isOwner) {
  const oneCard = template.querySelector('.elements__item').cloneNode(true); // копируем контейнер карточки со всем содержимым
  const cardName = oneCard.querySelector('.elements__title');
  const image = oneCard.querySelector('.elements__image');
  const deleteBtn = oneCard.querySelector('.elements__delete-button');
  const counter = oneCard.querySelector('.elements__like-button-counter'); // счетчик лайков
  const likeBtn = oneCard.querySelector('.elements__like-button');

  cardName.textContent = card.name;
  image.src = card.link;
  image.alt = card.name;

  // Показать иконку корзины на моей карточке
  if (!isOwner) {
    deleteBtn.classList.add('elements__delete-button_disabled');
  }

  // Попап картинки
  image.addEventListener('click', () => {
    popupItemTitle.textContent = cardName.textContent;
    popupItemImage.src = image.getAttribute('src');
    popupItemTitle.alt = cardName.getAttribute('src');
    openPopup(popupImage);
  })
  // Вызов функции удалить добавленную карчтоку
  //deleteAddedCard(deleteBtn, oneCard, card._id);

  // Вызов функции показать лайки
  displayLikes(counter, card);

  // Добавить лайк
  addLike(likeBtn, card._id, counter)

  return oneCard;
}

// Функция добавления карточки в HTML
function addNewCard(card) {
  gallery.prepend(createCard(card, true, false, 0));
}

// Функция показать лайки
function displayLikes(likeCounter, card) {
  likeCounter.textContent = card.likes.length;
}

export {
  createCard,
  addNewCard,
  displayLikes,
};