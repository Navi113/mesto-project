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
} from '../index.js';

import {
  deleteLike,
  putLike
} from './api';

// Функция формирования карточки
function createCard(card, isOwner, isLiked, displayLikes) {
  const oneCard = template.querySelector('.elements__item').cloneNode(true); // копируем контейнер карточки со всем содержимым
  const cardName = oneCard.querySelector('.elements__title');
  const image = oneCard.querySelector('.elements__image');
  const deleteBtn = oneCard.querySelector('.elements__delete-button');
  const counter = oneCard.querySelector('.elements__like-button-counter'); // счетчик лайков
  const likeBtn = oneCard.querySelector('.elements__like-button');

  cardName.textContent = card.name;
  counter.textContent = displayLikes;
  image.src = card.link;
  image.alt = card.name;

  // Показать иконку корзины на моей карточке
  if (!isOwner) {
    deleteBtn.classList.add('elements__delete-button_disabled');
  }

  // Удаление карточки
  deleteBtn.addEventListener('click', (evt) => {
    evt.target.closest('.elements__item').remove();
    deleteAddedCard(card._id);
  });

  // Лайк карточки
  likeBtn.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('elements__like-button_active')) {
      deleteLike(card._id);
    } else {
      putLike(card._id);
    }
  });

  // Показать мой лайк
  if (isLiked) {
    likeBtn.classList.add('elements__like-button_active');
  }

  // Попап картинки
  image.addEventListener('click', () => {
    popupItemTitle.textContent = cardName.textContent;
    popupItemImage.src = image.getAttribute('src');
    popupItemTitle.alt = cardName.getAttribute('src');
    openPopup(popupImage);
  })

  return oneCard;
}

// Функция добавления карточки в HTML
function addNewCard(card) {
  gallery.prepend(createCard(card, true, false, 0));
}

function deleteAddedCard(id) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '36f58db1-954b-4ac9-895b-0b07efe7ba35',
      'Content-Type': 'application/json'
    }
  })
}



export {
  createCard,
  addNewCard,
};
