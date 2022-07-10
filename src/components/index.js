import {
  createCard,
  addCard,
} from './card.js';

import {
  openPopup,
  closePopup,
} from './modal.js';

import {
  enableValidation
} from './validate.js';

// Массив-заготовка фотограий
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Редактирование профиля
const buttonEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupProfileForm = popupEditProfile.querySelector('#form-edit-profile');
const inputProfileName = popupProfileForm.querySelector('#form-input-name');
const inputProfileAbout = popupProfileForm.querySelector('#form-input-about');

// Добавление карточки
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddForm = popupAddCard.querySelector('#form-add-img');
const inputAddName = popupAddForm.querySelector('#form-input-place');
const inputAddLink = popupAddForm.querySelector('#form-input-url');

// Шаблон
const template = document.querySelector('#item-template').content;
const gallery = document.querySelector('.elements__list');

// Попап картинки
const popupImage = document.querySelector('.popup_image');
const popupItemImage = popupImage.querySelector('.popup__image');
const popupItemTitle = popupImage.querySelector('.popup__image-subtitle');

// Кнопка закрытия
const buttonsClose = document.querySelectorAll('.popup__close-button');

// Функция отправки формы редактироания профиля
function submitFormProfile(evt) {
  evt.preventDefault(); // сбрасываем перезагрузку страницы
  profileTitle.textContent = inputProfileName.value;
  profileSubtitle.textContent = inputProfileAbout.value;
  // Многоходовочка :D
  if (inputProfileName.value === '  ') {
    profileTitle.textContent = 'Ершов Иван';
  }
  if (inputProfileAbout.value === '  ') {
    profileSubtitle.textContent = 'Студент Яндекс.Практикум';
  }
  closePopup(popupEditProfile);
}

// Функция лайк
function dropLike(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

// Функция удалить
function deleteCard(evt) {
  evt.target.closest('.elements__item');
  evt.target.closest('.elements__item').remove();
}

// Функция отправки формы карточки
function submitFormCard(evt) {
  evt.preventDefault();
  const oneCardElement = createCard(inputAddName.value, inputAddLink.value);
  addCard(oneCardElement);
  closePopup(popupAddCard);
  inputAddName.value = '';
  inputAddLink.value = '';
}

// Слушатель на кнопку редактировать
buttonEdit.addEventListener('click', function () {
  inputProfileName.value = profileTitle.textContent;
  inputProfileAbout.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});

// Слушатель на кнопку добавить
buttonAdd.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// Слушатель на отправку формы редактировать профиль
popupProfileForm.addEventListener('submit', submitFormProfile);

// Слушатель на отправку формы добавление картинки
popupAddForm.addEventListener('submit', submitFormCard);

// Закрытие всех модыльных окон
buttonsClose.forEach(function (popupButtonClose) {
  const popupForClose = popupButtonClose.closest('.popup');
  popupButtonClose.addEventListener('click', function () {
    closePopup(popupForClose);
  });
});

// Рендерим карточки из массива
initialCards.forEach(function (element) {
  const oneCardElement = createCard(element.name, element.link);
  addCard(oneCardElement);
});

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

export {
  template,
  gallery,
  popupImage,
  popupItemImage,
  popupItemTitle,
  dropLike,
  deleteCard
};
