// Константы

// Аватар
const avatar = document.querySelector('.profile__avatar');
const editAvatarButton = document.querySelector(".profile__edit-avatar");
const avatarPopup = document.querySelector("#popup-edit-avatar");
const profileAvatarForm = document.querySelector('#form-edit-avatar');

// Профиль
const buttonEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupProfileForm = popupEditProfile.querySelector('#form-edit-profile');

// Карточки
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddForm = popupAddCard.querySelector('#form-add-img');

// Шаблон
const template = document.querySelector('.card-template').content;
const gallery = document.querySelector('.elements__list');

// Попап картинки
const popupImage = document.querySelector('.popup_image');
const popupItemImage = popupImage.querySelector('.popup__image');
const popupItemTitle = popupImage.querySelector('.popup__image-subtitle');

// Валидация
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export {
  editAvatarButton,
  profileAvatarForm,
  popupProfileForm,
  buttonAdd,
  popupAddCard,
  popupAddForm,
  template,
  gallery,
  popupImage,
  popupItemImage,
  popupItemTitle,
  avatar,
  avatarPopup,
  buttonEdit,
  profileTitle,
  profileSubtitle,
  popupEditProfile,
  config
}