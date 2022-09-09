// Функция показать ошибку
const showError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Функция спрятать ошибку
const hideError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// Функция проверки формы на валидность
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideError(formElement, inputElement, settings);
  }
};

// Функция обработчик всех полей формы
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Функция обработчик всех форм
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

// Функция проверяющая все ли окна  в форме валидны
const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция переключатель состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
  }
}

export {
  enableValidation,
  toggleButtonState
};
