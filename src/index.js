import "../pages/index.css";
import { initialCards } from "./components/cards.js";
import { addCard, deleteCard, likeCard } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";

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
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

popupNewCard.classList.add("popup_is-animated");
popupEditProfile.classList.add("popup_is-animated");
popupCard.classList.add("popup_is-animated");

//open popup add card
profileAddBtn.addEventListener("click", () => openPopup(popupNewCard));

//open popup edit profile
profileEditBtn.addEventListener("click", () => {
  openPopup(popupEditProfile);
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
});

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

//actions when click on submit in the form
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//close card on click X
popupCloseImage.addEventListener("click", () => closePopup(popupCard));
popupCloseCard.addEventListener("click", () => closePopup(popupNewCard));
popupCloseEdit.addEventListener("click", () => closePopup(popupEditProfile));

//add new card
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const card = {};
  card.name = cardName.value;
  card.link = cardUrl.value;

  cardList.prepend(addCard(card, deleteCard, likeCard, showCard));
  closePopup(popupNewCard);

  cardName.value = "";
  cardUrl.value = "";
}

//edit profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;

  closePopup(popupEditProfile);
}



//validate










// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardList.append(addCard(element, deleteCard, likeCard, showCard));
});
