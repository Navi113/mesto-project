// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.querySelector('#form-add-img').reset();
}

// Функция закрытия попапа кликом на оверлей
function clickOver(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

document.addEventListener('click', clickOver);

// Функция закрытия попапа нажатием на Esc
function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector('.popup_opened')
    closePopup(openPopup);
  }
}

document.addEventListener('keydown', keyHandler);

export {
  openPopup,
  closePopup
}
