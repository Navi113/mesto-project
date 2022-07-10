import {
  openPopup
} from './modal.js';

import {
  dropLike,
  deleteCard,
  popupItemImage,
  popupItemTitle,
  popupImage,
  template,
  gallery,
} from '../index.js';

// Функция открытия карточки
function openImage(titleImage, linkImage, altImage) {
  popupItemTitle.textContent = titleImage;
  popupItemImage.src = linkImage;
  popupItemTitle.alt = altImage;
  openPopup(popupImage);
}

// Функция формирования карточки
function createCard(name, link) {
  // копируем контейнер карточки со всем содержимым
  const oneCard = template.querySelector('.elements__item').cloneNode(true);
  // находим селекторы карточки
  const image = oneCard.querySelector('.elements__image'); // картинка
  const imageTitle = oneCard.querySelector('.elements__title'); // название картинки
  const buttonLike = oneCard.querySelector('.elements__like-button'); // кнопка нравится
  const buttonDelete = oneCard.querySelector('.elements__delete-button'); // кнопка удалить

  image.src = link;
  image.alt = name;
  imageTitle.textContent = name;

  buttonLike.addEventListener('click', dropLike)
  buttonDelete.addEventListener('click', deleteCard)

  image.addEventListener('click', function (evt) {
    const card = evt.target.closest('.elements__item');
    const titleImage = card.querySelector('.elements__title').textContent;
    const linkImage = card.querySelector('.elements__image').getAttribute('src');
    const altImage = card.querySelector('.elements__title').getAttribute('alt');
    openImage(titleImage, linkImage, altImage);
  });
  return oneCard;
}

// Функция добавления карточки в HTML
function addCard(oneCard) {
  gallery.prepend(oneCard);
}



export {
  createCard,
  addCard
};
