let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupSaveButton = document.querySelector('.popup__save-button');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened')
});

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened')
});

function addInfo() {
  let name = document.querySelector('.popup__input_type_name');
  let discription = document.querySelector('.popup__input_type_discription');

  profileTitle.innerHTML = `<h1 class="profile__title">${name.value}</h1>`;
  profileSubtitle.innerHTML = `<p class="profile__subtitle">${discription.value}</p>`;
};

popupSaveButton.addEventListener('click', addInfo);
