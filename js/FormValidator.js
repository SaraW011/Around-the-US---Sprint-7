// Define input field's behavior depending on the field's validity.

// Select all form elements and assign them to variables:
class FormValidator {
  constructor(fieldset, formElement) {
    this._inputSelector = fieldset.inputSelector;
    this._submitButtonSelector = fieldset.submitButtonSelector;
    this._inactiveButtonClass = fieldset.inactiveButtonClass;
    this._inputErrorClass = fieldset.inputErrorClass;
    this._errorClass = fieldset.errorClass;
    this._formElement = formElement;
  }
  //the above 2 constructor arguments are referred to in the following as "this":

  // #1: Find the error element

  _showInputError(inputElement, validationMessage) { 
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  // #2: hide and reset the error element

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  
  //#3: check if field is valid

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, inputElement.validationMessage);
    }
  }

  // toggle button state after checking validity

  _toggleButtonState(inputList, buttonElement) {
    const hasInvalidInput = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasInvalidInput) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

    _setEventListeners() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
     
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    };

  //Enable validation for all forms:

  enableValidation() {
    this._formElement.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    
    this._setEventListeners();
  }

}

export default FormValidator;