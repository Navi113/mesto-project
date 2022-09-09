// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', keyHandler);
}

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyHandler);
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

// Функция отображения загрузки на кнопке
const renderFormLoading = (isLoading, submitButton) => {
  if(isLoading) {
    submitButton.textContent = 'Coхранение...'
  } else {
    submitButton.textContent = 'Сохранить'
  }
}

export {
  openPopup,
  closePopup,
  renderFormLoading
}
