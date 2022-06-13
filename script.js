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
const buttonEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupProfileForm = popupEditProfile.querySelector('#form-edit-profile');
const inputProfileName = popupProfileForm.querySelector('#form-edit-profile-name');
const inputProfileAbout = popupProfileForm.querySelector('#form-edit-profile-about');

// Добавление карточки
const buttonAdd = document.querySelector('.profile__add-button');
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
const buttonsClose = document.querySelectorAll('.popup__close-button');

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

// Функция лайк
function dropLike(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

// Функция удалить
function deleteCard(evt) {
  evt.target.closest('.elements__item');
  evt.target.closest('.elements__item').remove();
}

// Функция

// Функция отправки формы карточки
function submitFormCard(evt) {
  evt.preventDefault();
  const oneCardElement = createCard(inputAddName.value, inputAddLink.value);
  addCard(oneCardElement);
  inputAddName.value = '';
  inputAddLink.value = '';
  // document.querySelector('#form-text-field').reset(); НЕ РАЗОБРАЛСЯ КАК РАБОТАЕТ
  // document.querySelector('#form-url-field').reset(); НЕ РАЗОБРАЛСЯ КАК РАБОТАЕТ
  togglePopup(popupAddCard);
}

// Функция открытия карточки
function openImage(titleImage, linkImage, altImage) {
  popupItemTitle.textContent = titleImage;
  popupItemImage.src = linkImage;
  togglePopup(popupImage);
}

// Слушатели ---------------------------------------------------------------------------------------

// Слушатель на кнопку редактировать
buttonEdit.addEventListener('click', function () {
  inputProfileName.value = profileTitle.textContent;
  inputProfileAbout.value = profileSubtitle.textContent;
  togglePopup(popupEditProfile);
});

// слушатель на кнопку добавить
buttonAdd.addEventListener('click', function () {
  togglePopup(popupAddCard);
});

// Слушатель на отправку формы редактировать профиль
popupProfileForm.addEventListener('submit', submitFormProfile);

// Слушатель на отправку формы добавление картинки
popupAddForm.addEventListener('submit', submitFormCard);

// Закрытие всех модыльных окон
buttonsClose.forEach(function (popupButtonClose) {
  const popupForClose = popupButtonClose.closest('.popup');
  popupButtonClose.addEventListener('click', function () {
    togglePopup(popupForClose);
  });
});

// Рендерим карточки из массива
initialCards.forEach(function (element) {
  const oneCardElement = createCard(element.name, element.link);
  addCard(oneCardElement);
});
