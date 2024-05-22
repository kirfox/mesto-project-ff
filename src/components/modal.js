const openPopup = (element) => {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandlerEscape);
};

function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandlerEscape);
}

function keyHandlerEscape(evt) {
  if (evt.key === "Escape") {
    const isOpened = document.querySelector(".popup_is-opened");
    closePopup(isOpened);
  }
}



export { closePopup, openPopup };
