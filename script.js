// Переменные -------------------------------------------------------------------------------------

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
const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupProfileForm = popupEditProfile.querySelector('#form-edit-profile');
const inputProfileName = popupProfileForm.querySelector('#form-edit-profile-name');
const inputProfileAbout = popupProfileForm.querySelector('#form-edit-profile-about');

// Добавление карточки
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-add-card');
const popupAddForm = popupAddCard.querySelector('#form-add-img');
const inputAddName = popupAddForm.querySelector('#form-text-field');
const inputAddLink = popupAddForm.querySelector('#form-url-field');

// Шаблон
const template = document.querySelector('#item-template').content;
const gallery = document.querySelector('.elements__list');

// Попап картинки
const popupImage = document.querySelector('.popup_image');
const popupItemImage = popupImage.querySelector('.popup__image');
const popupItemTitle = popupImage.querySelector('.popup__image-subtitle');

// Кнопка закрытия
const closeButton = document.querySelectorAll('.popup__close-button');

// Функции ----------------------------------------------------------------------------------------

// Функция открытия/закрытия попапов
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Функция отправки формы редактироания профиля
function submitFormProfile(evt) {
  evt.preventDefault(); // сбрасываем перезагрузку страницы
  profileTitle.textContent = inputProfileName.value;
  profileSubtitle.textContent = inputProfileAbout.value;
  if (inputProfileName.value === ' ') {
    profileTitle.textContent = 'Ершов Иван';
  }
  if (inputProfileAbout.value === ' ') {
    profileSubtitle.textContent = 'Студент Яндекс.Практикум';
  }
  togglePopup(popupEditProfile);
}
// Функция добавления карточки в HTML
function addCard(oneCard) {
  gallery.prepend(oneCard);
}

// Функция формирования карточки
function createCard(name, link) {
  // копируем контейнер карточки со всем содержимым
  const oneCard = template.querySelector('.elements__item').cloneNode(true);
  // находим селекторы карточки
  const image = oneCard.querySelector('.elements__image'); // картинка
  const imageTitle = oneCard.querySelector('.elements__title'); // название картинки
  const likeButton = oneCard.querySelector('.elements__like-button'); // кнопка нравится
  const deleteButton = oneCard.querySelector('.elements__delete-button'); // кнопка удалить

  image.src = link;
  image.alt = name;
  imageTitle.textContent = name;

  dropLike(likeButton);
  deleteCard(deleteButton);
  clickImage(image);

  return oneCard;
}

// Функция лайк
function dropLike(like) {
  // Слушатель на лайк
  like.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
}

// Функция удалить
function deleteCard(del) {
  // Слушатель на удаление
  del.addEventListener('click', function (evt) {
    const card = evt.target.closest('.elements__item');
    card.remove();
  });
}

// Функция отправки формы карточки
function submitFormCard(evt) {
  evt.preventDefault();
  const oneCardElement = createCard(inputAddName.value, inputAddLink.value);
  addCard(oneCardElement);
  inputAddName.value = '';
  inputAddLink.value = '';
  togglePopup(popupAddCard);
}

// Функция открытия карточки
function openImage(titleImage, linkImage, altImage) {
  popupImage.querySelector('.popup__image-subtitle').textContent = titleImage;
  popupImage.querySelector('.popup__image').src = linkImage;
  popupImage.querySelector('.popup__image-subtitle').alt = altImage;
  togglePopup(popupImage);
}

// Функция слушатель на картинку
function clickImage(cardImage) {
  cardImage.addEventListener('click', function (evt) {
    const card = evt.target.closest('.elements__item');
    const titleImage = card.querySelector('.elements__title').textContent;
    const linkImage = card.querySelector('.elements__image').getAttribute('src');
    const altImage = card.querySelector('.elements__title').getAttribute('alt');
    openImage(titleImage, linkImage, altImage);
  });
}

// Слушатели ---------------------------------------------------------------------------------------

// Слушатель на кнопку редактировать
editButton.addEventListener('click', function () {
  togglePopup(popupEditProfile);
  inputProfileName.value = profileTitle.textContent;
  inputProfileAbout.value = profileSubtitle.textContent;
});

// слушатель на кнопку добавить
addButton.addEventListener('click', function () {
  togglePopup(popupAddCard);
});

// Слушатель на отправку формы редактировать профиль
popupProfileForm.addEventListener('submit', submitFormProfile);

// Слушатель на отправку формы добавление картинки
popupAddForm.addEventListener('submit', submitFormCard);

// Закрытие всех модыльных окон
closeButton.forEach(function (closeModal) {
  const buttonClose = closeModal.closest('.popup');
  closeModal.addEventListener('click', function () {
    togglePopup(buttonClose);
  });
});

// Рендерим карточки из массива
initialCards.forEach(function (element) {
  const oneCardElement = createCard(element.name, element.link);
  addCard(oneCardElement);
});
