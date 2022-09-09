import './pages/index.css';

import {
  getUserData,
  getInitialCards,
  editUserData,
  changeAvatar,
  addCard,
} from './components/api.js'

import {
  createCard,
  addNewCard,
} from './components/card.js';

import {
  openPopup,
  closePopup,
  renderFormLoading
} from './components/modal.js';

import {
  enableValidation,
  toggleButtonState,
} from './components/validate.js';

// Сервер
const user = {
  id: '',
};


// Аватар
const avatar = document.querySelector('.profile__avatar');
const editAvatarButton = document.querySelector(".profile__edit-avatar");
const avatarPopup = document.querySelector("#popup-edit-avatar");
const avatarLink = document.querySelector('#form-avatar-input-url');
const profileAvatarForm = document.querySelector('#form-edit-avatar');
const editAvatarDot = document.querySelector('#popop-save-button-avatar');
const dotBtn = document.querySelector('#popup-save-btn');


// Профиль
const buttonEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupEditProfile = document.querySelector('#popup-edit-profile');
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
const template = document.querySelector('#item-template').content;
const gallery = document.querySelector('.elements__list');

// Попап картинки
const popupImage = document.querySelector('.popup_image');
const popupItemImage = popupImage.querySelector('.popup__image');
const popupItemTitle = popupImage.querySelector('.popup__image-subtitle');

// Функция отправки формы редактироания профиля
function submitFormProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputProfileName.value;
  profileSubtitle.textContent = inputProfileAbout.value;
  closePopup(popupEditProfile);
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
  toggleButtonState(inputs, submitBtn);
});

// Слушатель на отправку формы редактировать профиль
popupProfileForm.addEventListener('submit', submitFormProfile);



// Закрытие всех попапов кликом на оверлей и кнопку закрыть
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

// Вызов функции проверки форм на валидность (объект с параметрами в качестве аргумента)
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

// Получение данных с сервера
Promise.all([getUserData(), getInitialCards()])
  .then(([data, cards]) => {
    avatar.src = data.avatar;
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    user.id = data._id;
    loadCard(cards);
  })
  .catch(err => {
    console.log(err);
  });


const loadCard = (cards) => {
  cards.forEach((card) => {
    const displayLikes = card.likes.length; // количество лайков
    const isOwner = card.owner._id === user.id; // Определить владельца карты (true/false)
    const isLiked = card.likes.some(like => like._id === user.id) // если хотя бы один эл true, то выполняется

    gallery.append(createCard(card, isOwner, isLiked, displayLikes));
  })
}

// Обновить информацию в профиле
function editProfileInfo(evt) {
  renderFormLoading(true, dotBtn)
  evt.preventDefault();
  editUserData(inputProfileName.value, inputProfileAbout.value)
    .then(res => {
      profileTitle.textContent = res.name;
      profileSubtitle.textContent = res.about;
      closePopup(popupEditProfile)
    })

    .catch((err) => {
      console.log(err.message)
    })
    .finally(() => {
      renderFormLoading(false, dotBtn);
    })
}

function submitCardForm() {
  renderFormLoading(true, submitBtn);
  addCard(inputAddName.value, inputAddLink.value)
    .then((res) => {
      addNewCard(res);
      closePopup(popupAddCard);
      inputAddName.value = "";
      inputAddLink.value = "";
      popupAddForm.reset();
    })
    .catch((err) => {
      console.log(err.message)
    })
    .finally(() => {
      renderFormLoading(false, submitBtn);
    })
}

// Слушатель на отправку формы добавление картинки
popupAddForm.addEventListener('submit', submitCardForm);

// Функция
function handleProfileAvatarSubmit(evt) {
  renderFormLoading(true, editAvatarDot)
  evt.preventDefault();
  changeAvatar(avatarLink.value)
    .then(res => {
      console.log(res)
      avatar.src = avatarLink.value;
      closePopup(avatarPopup)
    })
    .catch((err) => {
      console.log(err.message)
    })
    .finally(() => {
      renderFormLoading(false, editAvatarDot);
    })
}

// Слушатель на кнопку редактировать аватар
editAvatarButton.addEventListener("click", function () {
  openPopup(avatarPopup);
  toggleButtonState(inputs, submitBtn);
});

// Слушатель на отправку формы аватара
profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit)

popupProfileForm.addEventListener("submit", editProfileInfo);

export {
  template,
  gallery,
  popupImage,
  popupItemImage,
  popupItemTitle,
  loadCard,
  user,
};
