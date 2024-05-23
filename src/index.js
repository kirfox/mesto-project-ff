import "../pages/index.css";
import { addCard, deleteCard, likeCard } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getInitialCards, getProfileInfo, addCardRequest, editProfileRequest, editAvatarRequest, deleteCardRequest } from "./components/api.js"

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

const popupNewCard = document.querySelector(".popup_type_new-card");
const cardName = popupNewCard.querySelector(".popup__input_type_card-name");
const cardUrl = popupNewCard.querySelector(".popup__input_type_url");
const cardFormElement = popupNewCard.querySelector(".popup__form");
const popupCloseCard = popupNewCard.querySelector(".popup__close");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupName = popupEditProfile.querySelector(".popup__input_type_name");
const popupDescription = popupEditProfile.querySelector(".popup__input_type_description");
const profileFormElement = popupEditProfile.querySelector(".popup__form");
const popupCloseEdit = popupEditProfile.querySelector(".popup__close");

const popupCard = document.querySelector(".popup_type_image");
const popupImage = popupCard.querySelector(".popup__image");
const popupCaption = popupCard.querySelector(".popup__caption");
const popupCloseImage = popupCard.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");  
const popupUrl = popupEditAvatar.querySelector(".popup__input_type_link");
const profileFormEditAvatar = popupEditAvatar.querySelector(".popup__form");
const popupCloseEditAvatar  = popupEditAvatar.querySelector(".popup__close");

export const popupDeleteCard = document.querySelector(".popup_type_delete");
export const cardFormDelete = popupDeleteCard.querySelector(".popup__form");
const popupCloseDeleteCard = popupDeleteCard.querySelector(".popup__close");

popupNewCard.classList.add("popup_is-animated");
popupEditProfile.classList.add("popup_is-animated");
popupCard.classList.add("popup_is-animated");
popupEditAvatar.classList.add("popup_is-animated");
popupDeleteCard.classList.add("popup_is-animated");

//get profile info
getProfileInfo()
  .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about; 
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch( err => console.log(`Ошибка: ${err}`))

//open popup add card
profileAddBtn.addEventListener("click", () => {
  
  const validationConfig = {
    formSelector: cardFormElement,
    inputSelector: [cardName, cardUrl],
    submitButtonSelector: 'popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
  }
  
  clearValidation(cardFormElement, validationConfig)
  enableValidation(validationConfig)
  openPopup(popupNewCard)
});

//open popup edit profile
profileEditBtn.addEventListener("click", () => {
  
  const validationConfig = {
    formSelector: profileFormElement,
    inputSelector: [popupName, popupDescription],
    submitButtonSelector: 'popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
  }

  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;

  clearValidation(profileFormElement, validationConfig)
  enableValidation(validationConfig)
  openPopup(popupEditProfile);
});

//open popup edit profile avatar
profileAvatar.addEventListener("click", () => {

  const validationConfig = {
    formSelector: profileFormEditAvatar,
    inputSelector: [popupUrl],
    submitButtonSelector: 'popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
  }
  
  clearValidation(profileFormEditAvatar, validationConfig)
  enableValidation(validationConfig)
  openPopup(popupEditAvatar);
})

//when click on the card image
const showCard = (cardElement) => {
  openPopup(popupCard);
  popupImage.src = cardElement.querySelector(".card__image").src;
  popupCaption.textContent = cardElement.querySelector(".card__description").textContent;
};

//close popup when click on the overlay
popupNewCard.addEventListener("click", (evt) => closePopup(evt.target));
popupEditProfile.addEventListener("click", (evt) => closePopup(evt.target));
popupCard.addEventListener("click", (evt) => closePopup(evt.target));
popupEditAvatar.addEventListener("click", (evt) => closePopup(evt.target));
popupDeleteCard.addEventListener("click", (evt) => closePopup(evt.target));

//actions when click on submit in the form
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileFormEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);
cardFormDelete.addEventListener("submit", handleCardDeleteSubmit);

//close card on click X
popupCloseImage.addEventListener("click", () => closePopup(popupCard));
popupCloseCard.addEventListener("click", () => closePopup(popupNewCard));
popupCloseEdit.addEventListener("click", () => closePopup(popupEditProfile));
popupCloseEditAvatar.addEventListener("click", () => closePopup(popupEditAvatar));
popupCloseDeleteCard.addEventListener("click", () => closePopup(popupDeleteCard));

//add new card
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const btn = evt.target.querySelector('.popup__button');
  btn.textContent = 'Сохранить...'

  addCardRequest(cardName, cardUrl)
    .catch( err => console.log(`Ошибка: ${err}`))
    .finally(() => btn.textContent = 'Сохранить')

  closePopup(popupNewCard);

  cardName.value = "";
  cardUrl.value = "";
}

//edit profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  const btn = evt.target.querySelector('.popup__button');
  btn.textContent = 'Сохранить...'

  editProfileRequest(popupName, popupDescription)
    .catch( err => console.log(`Ошибка: ${err}`))
    .finally(() => btn.textContent = 'Сохранить')

  closePopup(popupEditProfile);
}

//edit avatar profile
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  const btn = evt.target.querySelector('.popup__button');
  btn.textContent = 'Сохранить...'

  editAvatarRequest(popupUrl)
    .catch( err => console.log(`Ошибка: ${err}`))
    .finally(() => btn.textContent = 'Сохранить')

  closePopup(popupEditAvatar);
}

//delete card
function handleCardDeleteSubmit(evt) {
  evt.preventDefault();
  deleteCardRequest(evt.target.id)

  closePopup(popupDeleteCard);
}

//Вывести карточки на страницу
Promise.all([getInitialCards()]).then((res) =>  {
  res[0].forEach((element) => {
      cardList.append(addCard(element, deleteCard, likeCard, showCard));
    });
})
  .catch( err => console.log(`Ошибка: ${err}`))
