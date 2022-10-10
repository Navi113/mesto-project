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

import {
  config,
  profileTitle,
  profileSubtitle,
  avatar,
  popupEditProfile,
  buttonEdit,
  avatarPopup,
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
  popupItemTitle

} from './utils/constants.js';

// Сервер
export let userId = '';

// Проверка валидности форм
const enableUserValidate = new FormValidator(config, popupProfileForm);
const enableAvatarValidate = new FormValidator(config, profileAvatarForm);
const enableNewCardValidate = new FormValidator(config, popupAddForm);

enableUserValidate.enableValidation();
enableAvatarValidate.enableValidation();
enableNewCardValidate.enableValidation();


// Получение данных с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    cardList.renderItems(cards);
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

// Попап открытия фото
const popupWithImage = new PopupWithImage(imgPopupOpen);
popupWithImage.setEventListeners();

// Функция создания карточки
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

// Вставка карточек на страницу
const cardList = new Section({
  renderer: (data) => {
    cardList.setItem(createOneCard(data));
  }
}, gallery);

// Редактирование профиля
const formEditUser = new PopupWithForm(popupEditProfile, {
  handleSubmit: (data) => {
    formEditUser.renderLoading(true);
    api.editUserData(data.name, data.about)
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

// Слушатель события на открытие формы редактирования профиля
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

// Слушатель события на открытие формы редактирования аватара
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


export {
  template,
  gallery,
  popupImage,
  popupItemImage,
  popupItemTitle,
};