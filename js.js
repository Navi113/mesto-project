const popup = document.querySelector('.popup');
const userName = document.querySelector('.popup__input_name');
const discription = document.querySelector('.popup__input_discription');
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle');
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

userName.value = profileTitle.textContent;
discription.value = profileSubtitle.textContent;

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function one () {
  popup.classList.remove('popup_opened');
  userName.value = profileTitle.textContent;
  discription.value = profileSubtitle.textContent;
});

const formElement = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
   evt.preventDefault();

profileTitle.textContent = `${userName.value}`;
profileSubtitle.textContent = `${discription.value}`;
};
formElement.addEventListener('submit', formSubmitHandler);
