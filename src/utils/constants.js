// Константы

// Аватар
export const avatar = document.querySelector('.profile__avatar');
const editAvatarButton = document.querySelector(".profile__edit-avatar");
export const avatarPopup = document.querySelector("#popup-edit-avatar");
const avatarLink = document.querySelector('#form-avatar-input-url');
const profileAvatarForm = document.querySelector('#form-edit-avatar');
const editAvatarDot = document.querySelector('#popop-save-button-avatar');
const dotBtn = document.querySelector('#popup-save-btn');


// Профиль

export const buttonEdit = document.querySelector('.profile__edit-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupProfileForm = popupEditProfile.querySelector('#form-edit-profile');
const inputProfileName = popupProfileForm.querySelector('#form-input-name');
const inputProfileAbout = popupProfileForm.querySelector('#form-input-about');

// Карточки
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddForm = popupAddCard.querySelector('#form-add-img');
const inputAddName = popupAddForm.querySelector('#form-input-place');
const inputAddLink = popupAddForm.querySelector('#form-input-url');
const inputs = popupAddForm.querySelectorAll('.form__input');
const submitBtn = popupAddForm.querySelector('.popup__save-button');

// Шаблон
const template = document.querySelector('.card-template').content;
const gallery = document.querySelector('.elements__list');

// Попап картинки
const popupImage = document.querySelector('.popup_image');
const popupItemImage = popupImage.querySelector('.popup__image');
const popupItemTitle = popupImage.querySelector('.popup__image-subtitle');

// Валидация
export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};