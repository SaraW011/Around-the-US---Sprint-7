// Closing the Popup by Pressing Esc
export function closePopupWithEscape(event) {
  const key = event.key;
  if (key == "Escape") {
    closeModal(document.querySelector(".modal_open"));
  }
}

//Closing the Popup by Clicking on the Overlay
export function modalOverlayClickOut(event) {
  if (
    event.target.classList.contains("modal_open") ||
    event.target.classList.contains(`modal__image-wrapper`)
  ) {
    closeModal(event.target);
  }
}

//-->> open + close modals + remove event listeners:

export function openModal(popup) {
  popup.classList.add("modal_open");
  document.addEventListener("keydown", closePopupWithEscape);
  document.addEventListener("click", modalOverlayClickOut);
}

export function closeModal(popup) {
  popup.classList.remove("modal_open");
  document.removeEventListener("keydown", closePopupWithEscape);
  document.removeEventListener("click", modalOverlayClickOut);
}