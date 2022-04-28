const popupEditProfile = document.querySelector('#popup-edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelectorAll('.popup__close-button');

// попап добавление новых карточек
const popupAddCard = document.querySelector('#popup-add-card');
const buttonAddCard = document.querySelector('.profile__add-button');

// редактирование профиля
const formEditProfile = document.querySelector('.form');
const nameInput = document.querySelector('#form-edit-profile-name');
const aboutInput = document.querySelector('#form-edit-profile-about');
const nameUser = document.querySelector('.profile__title');
const aboutUser = document.querySelector('.profile__subtitle');

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// закрытие всех попапов
buttonClosePopup.forEach(function(btn) {
  btn.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  })
})

// слушатель на кнопку редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  nameInput.value = nameUser.textContent;
  aboutInput.value = aboutUser.textContent;
  openPopup(popupEditProfile);
});

// слушатель на кнопку добавить карточку
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// функция отправки формы
function formSubmit(evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  aboutUser.textContent = aboutInput.value;
  closePopup(popupEditProfile);
};

// слушатель на отправку формы
formEditProfile.addEventListener('submit', formSubmit);

// массив карточек
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

