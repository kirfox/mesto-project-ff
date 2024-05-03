const openPopup = (element) => element.classList.add('popup_is-opened');


function closePopup(evt) {
    let popup;

    if (evt.target === undefined) {
        popup = evt;
    } else {
        popup = evt.target.closest('.popup')
    }

    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopup);
}

function keyHandlerEscape(evt) {
    if (evt.key === 'Escape') { 
      const isOpened = document.querySelector(".popup_is-opened");
      closePopup(isOpened)
    }
  }

//close popup click on the overlay
document.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) closePopup(evt);
})

export {closePopup, openPopup, keyHandlerEscape}