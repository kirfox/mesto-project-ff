import "../pages/index.css";
import { addCard, likeCard } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getInitialCards, getProfileInfo, addCardRequest, editProfileRequest, editAvatarRequest, deleteCardRequest } from "./components/api.js"

let userId;
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

const popupDeleteCard = document.querySelector(".popup_type_delete");
const cardFormDelete = popupDeleteCard.querySelector(".popup__form");
const popupCloseDeleteCard = popupDeleteCard.querySelector(".popup__close");

popupNewCard.classList.add("popup_is-animated");
popupEditProfile.classList.add("popup_is-animated");
popupCard.classList.add("popup_is-animated");
popupEditAvatar.classList.add("popup_is-animated");
popupDeleteCard.classList.add("popup_is-animated");


const validationConfigAddCard = {
  formSelector: cardFormElement,
  inputSelector: [cardName, cardUrl],
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
}

const validationConfigEditProfile = {
  formSelector: profileFormElement,
  inputSelector: [popupName, popupDescription],
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
}

const validationConfigEditAvatar = {
  formSelector: profileFormEditAvatar,
  inputSelector: [popupUrl],
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
}

enableValidation(validationConfigAddCard)
enableValidation(validationConfigEditProfile)
enableValidation(validationConfigEditAvatar)

//Вывести карточки на страницу и получить инфу профиля  
Promise.all([ getProfileInfo(), getInitialCards()]).then(([profile, cards]) =>  {
  
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about; 
  profileAvatar.style.backgroundImage = `url(${profile.avatar})`;
  userId = profile._id;

  cards.forEach((element) => {
    cardList.append(addCard(userId, element, deleteCard, likeCard, showCard));
  });
})
  .catch( err => console.log(`Ошибка: ${err}`))


//open popup add card
profileAddBtn.addEventListener("click", () => {
  clearValidation(cardFormElement, validationConfigAddCard)
  openPopup(popupNewCard)
});

//open popup edit profile
profileEditBtn.addEventListener("click", () => {
  
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;

  clearValidation(profileFormElement, validationConfigEditProfile)
  openPopup(popupEditProfile);
});

//open popup edit profile avatar
profileAvatar.addEventListener("click", () => {
  clearValidation(profileFormEditAvatar, validationConfigEditAvatar)
  openPopup(popupEditAvatar);
})

//when click on the card image
const showCard = (name, link) => {
  openPopup(popupCard);
  popupImage.src = link;
  popupCaption.textContent = name;
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
    .then((card) => {
      cardList.prepend(addCard(userId, card, deleteCard, likeCard, showCard));
      closePopup(popupNewCard);
      clearValidation(cardFormElement, validationConfigAddCard)
    })
    .catch( err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      btn.textContent = 'Сохранить'
      cardName.value = "";
      cardUrl.value = "";
    })
}

//edit profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  const btn = evt.target.querySelector('.popup__button');
  btn.textContent = 'Сохранить...'

  editProfileRequest(popupName, popupDescription)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupEditProfile);
      clearValidation(profileFormEditAvatar, validationConfigEditAvatar)
    })
    .catch( err => console.log(`Ошибка: ${err}`))
    .finally(() => btn.textContent = 'Сохранить')

  
}

//edit avatar profile
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  const btn = evt.target.querySelector('.popup__button');
  btn.textContent = 'Сохранить...'

  editAvatarRequest(popupUrl)
    .then(res => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupEditAvatar);
      clearValidation(profileFormEditAvatar, validationConfigEditAvatar)
    })
    .catch( err => console.log(`Ошибка: ${err}`))
    .finally(() => btn.textContent = 'Сохранить')
}


// @todo: Функция удаления карточки
const deleteCard = (cardElement, card) => {
  openPopup(popupDeleteCard)
  cardFormDelete.setAttribute('id', card._id)
  cardElement.setAttribute('id', card._id)
};


//delete card
function handleCardDeleteSubmit(evt) {
  evt.preventDefault();
  deleteCardRequest(evt.target.id)
    .then(() => {
      const card = cardList.querySelector(`#${CSS.escape(evt.target.id)}`);
      card.remove()
      closePopup(popupDeleteCard);
    })
    .catch( err => console.log(`Ошибка: ${err}`))
  
}