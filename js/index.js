import initialCards from "./initialCards.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openModal, closeModal } from "./utils.js";

// wrapper modals
const editProfilePopup = document.querySelector(".modal_type_edit-profile");
const addNewPlacePopup = document.querySelector(".modal_type_add-place");

// wrapper for popup forms
const profileForm = editProfilePopup.querySelector(".form");
const placeForm = addNewPlacePopup.querySelector(".form-add-place");

// select profile name and info:
const userNameElement = document.querySelector(".profile__name");
const userJobElement = document.querySelector(".profile__title");

// input data fields in modal/popup forms
const inputName = document.querySelector(".form__input_type_name");
const inputJob = document.querySelector(".form__input_type_job");

const inputPlace = addNewPlacePopup.querySelector(".form__input_type_place");
const inputLink = addNewPlacePopup.querySelector(".form__input_type_link");

// buttons
const openProfileEditButton = document.querySelector(".profile__edit-button");
const addNewPlacePopupButton = document.querySelector(".profile__add-button");
//const createPlace = addNewPlacePopup.querySelector(".form__button");

// place - elements - template
const placesList = document.querySelector(".elements__list"); //ul of place cards
const placeTemplate = document.querySelector(".elements-template").content;

/**-->> RENDER PLACE CARDS <<--*/

// place initialCards:
initialCards.reverse().forEach((initialCardData) => {
  renderCard(initialCardData);
});

// new card:
function renderCard(data) {
  const card = new Card(data, placeTemplate);
  placesList.prepend(card.render());
}

// submit new card form:
function submitNewPlaceForm(e) {
  e.preventDefault();

  const insertPlace = {
    name: inputPlace.value,
    link: inputLink.value,
  };
  renderCard(insertPlace);
  closeModal(addNewPlacePopup);
}

//**-->> FORM VALIDATION SETTINGS <<--*/

// Assign form elements to variables:
const formSelector = ".form";
const fieldset = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

//**-->> ENABLE FORM VALIDATION <<--*/

const getFormsList = Array.from(document.querySelectorAll(formSelector));

getFormsList.forEach((formElement) => {
  const form = new FormValidator(fieldset, formElement);

  form.enableValidation();
});

// edit profile form
function openProfileModal(editProfilePopup) {
  openModal(editProfilePopup);

  //---->>>>>>  holds initial values inside form when open:
  const userName = userNameElement.textContent
  const userJob = userJobElement.textContent

  inputName.value = userName
  inputJob.value = userJob

  //---->>>>>>  holds empty values inside form when open:
  inputPlace.value = "";
  inputLink.value = "";

  // inputName.value = "";
  // inputJob.value = "";
}

// insert new name into profile:
function submitProfileForm(e) {
  e.preventDefault();

  const nameValue = inputName.value;
  const jobValue = inputJob.value;

  //--->>> allows filling new content into form:
  userNameElement.textContent = nameValue;
  userJobElement.textContent = jobValue;
  

  closeModal(editProfilePopup);
}

// **---->>> EVENT LISTENERS <<----*/

// close ALL modals with x button:
const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    closeModal(event.target.closest(".modal"));
  })
);

openProfileEditButton.addEventListener("click", () =>
  openProfileModal(editProfilePopup)
);

addNewPlacePopupButton.addEventListener("click", () =>
  openProfileModal(addNewPlacePopup)
);

profileForm.addEventListener("submit", submitProfileForm);

placeForm.addEventListener("submit", submitNewPlaceForm);