import { openModal } from "./utils.js";

export default class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = templateSelector;
  }

  _getTemplate() {
    const cardElement = this._template
      .querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeImage() {
    //work with class instance that is specific for the card,
    //NOT events as primarily done below:
    //const targetHeartElement = event.target;
    //targetHeartElement.classList.toggle("elements__heart_active");

    //better to do the following:
    this._cardElement
      .querySelector(".elements__heart")
      .classList.toggle("elements__heart_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null; //-->> good practice to remove the reference to the DOM element after using remove()
  }

  _handlePreviewImage() {
    this._image = document.querySelector(".modal_type_preview-image");

    this._image.querySelector(".modal__image-caption").textContent = this._name;

    //select the DOM element once and reuse it:
    const imagePreview = document.querySelector(".modal__image-container");
    imagePreview.src = this._link;
    imagePreview.alt = this._name;

    openModal(this._image);
  }

  _addEventListeners() {
    this._cardElement
      .querySelector(".elements__heart")
      .addEventListener("click", () => {
        this._handleLikeImage();
      });

    this._cardElement
      .querySelector(".elements__trash")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handlePreviewImage();
      });
  }

  render() {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector(
      ".elements__text"
    ).textContent = this._name;

    this._cardElement.querySelector(
      ".elements__image"
    ).style.backgroundImage = `url(${this._link})`;

    this._addEventListeners();

    return this._cardElement;
  }
}