import Api from './components/Api.js';
import './pages/index.css';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

export const api = new Api({
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '36f58db1-954b-4ac9-895b-0b07efe7ba35',
    'Content-Type': 'application/json'
  }
})

// import {
//   addNewCard,
// } from './components/Card.js';

import {
  openPopup,
  closePopup,
  renderFormLoading
} from './components/modal.js';

import {
  enableValidation,
  toggleButtonState,
} from './components/validate.js';

import {
  config,
  profileTitle,
  profileSubtitle,
  avatar,
  popupEditProfile,
  buttonEdit,
  avatarPopup
} from './utils/constants.js';

// Сервер
export let userId = '';


// Аватар
// const avatar = document.querySelector('.profile__avatar');
const editAvatarButton = document.querySelector(".profile__edit-avatar");
// const avatarPopup = document.querySelector("#popup-edit-avatar");
const avatarLink = document.querySelector('#form-avatar-input-url');
const profileAvatarForm = document.querySelector('#form-edit-avatar');
const editAvatarDot = document.querySelector('#popop-save-button-avatar');
const dotBtn = document.querySelector('#popup-save-btn');


// Профиль
// const buttonEdit = document.querySelector('.profile__edit-button');
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');
// const popupEditProfile = document.querySelector('#popup-edit-profile');
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
// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__input',
//   submitButtonSelector: '.popup__save-button',
//   inputErrorClass: 'form__input_type_error',
//   errorClass: 'form__input-error_active'
// });

// Вызов функции проверки форм на валидность (объект с параметрами в качестве аргумента)

const enableUserValidate = new FormValidator(config, popupProfileForm);
const enableAvatarValidate = new FormValidator(config, profileAvatarForm);
const enableNewCardValidate = new FormValidator(config, popupAddForm);

enableUserValidate.enableValidation();
enableAvatarValidate.enableValidation();
enableNewCardValidate.enableValidation();


// Получение данных с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([data, cards]) => {
    // avatar.src = data.avatar;
    // profileTitle.textContent = data.name;
    // profileSubtitle.textContent = data.about;
    userId = data._id;
    userInfo.setUserInfo(data);
    cardList.renderItems(cards);
    // loadCard(cards);
  })
  .catch(err => {
    console.log(err);
  });

const userInfo = new UserInfo({
  profileTitle,
  profileSubtitle,
  avatar
});

const imgPopupOpen = document.querySelector('.popup_image');

const popupWithImage = new PopupWithImage(imgPopupOpen);
popupWithImage.setEventListeners();

const createOneCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: '.card-template',
    api,
    userId,
    handleCardClick: (data) => {
      popupWithImage.open(data);
    },
  });

  const cardElement = card.generate();
  return cardElement;
}

const cardList = new Section({
  renderer: (data) => {
    cardList.setItem(createOneCard(data));
  }
}, gallery);

// Редактирование профиля
const formEditUser = new PopupWithForm(popupEditProfile, {
  handleSubmit: (data) => {
    formEditUser.renderLoading(true);
    api.editUserData(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        formEditUser.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        formEditUser.renderLoading(false);
      });
  }
});
formEditUser.setEventListeners();

buttonEdit.addEventListener('click', () => {
  formEditUser.open();
  formEditUser.setInputValues(userInfo.getUserInfo());
  enableUserValidate.resetValidation();

});

// Редактирование аватара
const formEditAvatar = new PopupWithForm(avatarPopup, {
  handleSubmit: (data) => {
    formEditAvatar.renderLoading(true);
    console.log(data)
    api.changeAvatar(data.url)
      .then((data) => {
        userInfo.setUserInfo(data);
        formEditAvatar.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        formEditAvatar.renderLoading(false);
      });
  }
});
formEditAvatar.setEventListeners();

editAvatarButton.addEventListener('click', () => {
  enableAvatarValidate.resetValidation();
  formEditAvatar.open();
});

// Добавление карточки
const formNewCard = new PopupWithForm(popupAddCard, {
  handleSubmit: (data) => {
    formNewCard.renderLoading(true);
    console.log(data)
    api.addCard(data.place, data.url)
      .then((data) => {
        cardList.setItem(createOneCard(data));
        formNewCard.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        formNewCard.renderLoading(false);
      });
  }
})
formNewCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  enableNewCardValidate.resetValidation();
  formNewCard.open();
});

// const loadCard = (cards) => {
//   cards.forEach((card) => {
//     const cartochka = new Card(card, '.card-template', api, user.id)
//     gallery.append(cartochka.generate())
//   })
// }

// Обновить информацию в профиле
function editProfileInfo(evt) {
  renderFormLoading(true, dotBtn, 'Сохранение...', 'Сохранить')
  evt.preventDefault();
  api.editUserData(inputProfileName.value, inputProfileAbout.value)
    .then(res => {
      profileTitle.textContent = res.name;
      profileSubtitle.textContent = res.about;
      closePopup(popupEditProfile)
    })

    .catch((err) => {
      console.log(err.message)
    })
    .finally(() => {
      renderFormLoading(false, dotBtn, 'Сохранение...', 'Сохранить');
    })
}

// Добавить карточку
function submitCardForm() {
  renderFormLoading(true, submitBtn, 'Создание...', 'Создать');
  api.addCard(inputAddName.value, inputAddLink.value)
    .then((res) => {
      //addNewCard(res);
      closePopup(popupAddCard);
      popupAddForm.reset();
    })
    .catch((err) => {
      console.log(err.message)
    })
    .finally(() => {
      renderFormLoading(false, submitBtn, 'Создание...', 'Создать');
    })
}

// Слушатель на отправку формы добавление картинки
popupAddForm.addEventListener('submit', submitCardForm);

// Функция добавления аватара
// function handleProfileAvatarSubmit(evt) {
//   renderFormLoading(true, editAvatarDot, 'Сохранение...', 'Сохранить')
//   evt.preventDefault();
//   api.changeAvatar(avatarLink.value)
//     .then(() => {
//       avatar.src = avatarLink.value;
//       closePopup(avatarPopup);
//       profileAvatarForm.reset();
//     })
//     .catch((err) => {
//       console.log(err.message)
//     })
//     .finally(() => {
//       renderFormLoading(false, editAvatarDot, 'Сохранение...', 'Сохранить');
//     })
// }

// Слушатель на кнопку редактировать аватар
editAvatarButton.addEventListener("click", function () {
  openPopup(avatarPopup);
  // toggleButtonState(inputs, submitBtn);
});

// Слушатель на отправку формы аватара
//profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit)

// Слушатель на отправку формы редактирования данных пользователя
popupProfileForm.addEventListener("submit", editProfileInfo);

export {
  template,
  gallery,
  popupImage,
  popupItemImage,
  popupItemTitle,
  // loadCard,
  // user,
};