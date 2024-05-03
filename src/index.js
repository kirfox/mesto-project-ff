import '../pages/index.css';
import { initialCards } from './components/cards.js'
import {addCard, deleteCard, likeCard} from './components/card.js'
import {closePopup, openPopup, keyHandlerEscape} from './components/modal.js'

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupName = popupTypeEdit.querySelector(".popup__input_type_name");
const popupDescription = popupTypeEdit.querySelector(".popup__input_type_description");
const formElement = document.querySelector(".popup__form");
const cardName = popupTypeNewCard.querySelector(".popup__input_type_card-name");
const cardUrl = popupTypeNewCard.querySelector(".popup__input_type_url");
const popupImage =  popupTypeImage.querySelector(".popup__image");
const popupCaption =  popupTypeImage.querySelector(".popup__caption");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

popupTypeNewCard.classList.add('popup_is-animated')
popupTypeEdit.classList.add('popup_is-animated')
popupTypeImage.classList.add('popup_is-animated')

//open form add card
profileAddBtn.addEventListener("click", () => {
  const popupClose =  popupTypeNewCard.querySelector(".popup__close");
  const formElement = popupTypeNewCard.querySelector(".popup__form");
  
  openPopup(popupTypeNewCard)
  popupClose.addEventListener("click", closePopup) 
  formElement.addEventListener('submit', handleFormSubmitAddCard);
}) 

//open form edit profile
profileEditBtn.addEventListener("click", () => {
  const popupClose = popupTypeEdit.querySelector(".popup__close");

  openPopup(popupTypeEdit)
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
  popupClose.addEventListener("click", closePopup);
}) 

//when click on the card image
const showCard = (cardElement) => {
  const popupClose =  popupTypeImage.querySelector(".popup__close");

  openPopup(popupTypeImage)
  popupImage.src=cardElement.querySelector(".card__image").src
  popupCaption.textContent=cardElement.querySelector(".card__description").textContent
  popupClose.addEventListener("click", closePopup)
}


//close popup when press escape
document.addEventListener('keydown', keyHandlerEscape)

//edit profile
formElement.addEventListener('submit', handleFormSubmit);

//add new card 
function handleFormSubmitAddCard(evt) {
  evt.preventDefault(); 

  const card = {};
  card.name = cardName.value;
  card.link  = cardUrl.value;

  cardList.prepend(addCard(card, deleteCard, likeCard, showCard));
  closePopup(evt);

  cardName.value ='';
  cardUrl.value ='';
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(evt);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardList.append(addCard(element, deleteCard, likeCard, showCard));
});


export {popupTypeNewCard, popupTypeEdit, popupTypeImage}
