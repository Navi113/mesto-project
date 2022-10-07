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
  deleteAddedCard,
  loadCard,
  user,
  addLike,
} from '../index.js';

export default class Card {
  constructor(data, templateSelector, ownerId, userId, ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._ownerId = ownerId;
    this._userId = userId;



  }

  // метод получения DOM элемента
  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }
  // метод вешания слушателей на карточку
  // _setEventListeners() {
  //   this._element.querySelector(this._cardSelector).addEventListener('click', () => {

  //   })
  // }


  // Метод создания карточки
  generate() {
    this._element = this._getElement();
    this._element.querySelector('.elements__image').src = this._data.link;
    this._element.querySelector('.elements__image').alt = this._data.name;
    this._element.querySelector('.elements__title').textContent = this._data.name;
    this._element.querySelector('.elements__like-button-counter').textContent = this._data.likes.length;
    this._deleteBtn = this._element.querySelector('.elements__delete-button')
    if (this._ownerId !== this._userId.id) {
      this._deleteBtn.classList.add('elements__delete-button_disabled');
      // if (!isOwner) {
      //   deleteBtn.classList.add('elements__delete-button_disabled');
      // }
      console.log(122)
    }


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
  deleteAddedCard(deleteBtn, oneCard, card._id);

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