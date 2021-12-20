import { openModal } from "./utils.js";

export default class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = templateSelector
      .querySelector(".elements__element")
      .cloneNode(true);
  }

  _handleLikeImage(event) {
    const targetHeartElement = event.target;
    targetHeartElement.classList.toggle("elements__heart_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handlePreviewImage() {
    this._image = document.querySelector(".modal_type_preview-image");

    this._image.querySelector(".modal__image-caption").textContent = this._name;
    this._image.querySelector(".modal__image-container").src = this._link;
    this._image.querySelector(".modal__image-container").alt = this._name;
    openModal(this._image);
  }

  _addEventListeners() {
    this._cardElement
      .querySelector(".elements__heart")
      .addEventListener("click", (event) => {
        this._handleLikeImage(event);
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
    this._cardElement = this._template;

    const placeName = this._template.querySelector(".elements__text");

    const PlaceImage = this._template.querySelector(".elements__image");

    placeName.textContent = this._name;

    PlaceImage.style.backgroundImage = `url(${this._link})`;

    this._addEventListeners();

    return this._template;
  }
}