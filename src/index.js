import '../pages/index.css';
import { initialCards } from './cards.js'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");


const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const popup = document.querySelector(".popup");


// @todo: Функция создания карточки
const addCard = (card, deleteCard) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt ="На карточке изображено " + card.name;

  deleteBtn.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => {
  cardElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardList.append(addCard(element, deleteCard));
});

//попап
profileEditBtn.addEventListener("click", () => {
  popupTypeEdit.style.display = 'flex';
  const popupClose =  popupTypeEdit.querySelector(".popup__close");
  popupClose.addEventListener("click", closePopup);
  
}) 

profileAddBtn.addEventListener("click", () => {
  popupTypeNewCard.style.display = 'flex'
  const popupClose =  popupTypeNewCard.querySelector(".popup__close");
  popupClose.addEventListener("click", closePopup) 
}) 

cardList.addEventListener("click", (evt) => {
  popupTypeImage.style.display = 'flex'
  const popupClose =  popupTypeImage.querySelector(".popup__close");
  const popupImage =  popupTypeImage.querySelector(".popup__image");
  popupImage.src=evt.target.src
  popupClose.addEventListener("click", closePopup)
}) 

function closePopup(evt) {
  const popup = evt.target.closest('.popup')
  popup.style.display = 'none';
  evt.target.removeEventListener('click', closePopup);
}

document.addEventListener('keydown', keyHandlerEscape)

function keyHandlerEscape(evt) {
  if ((evt.key === 'Escape') && (popupTypeNewCard.style.display != 'none' || popupTypeEdit.style.display != 'none' || popupTypeImage.style.display != 'none')) { 
    popupTypeNewCard.style.display = 'none'
    popupTypeEdit.style.display = 'none'
    popupTypeImage.style.display = 'none'
  }
  evt.target.removeEventListener('click', keyHandlerEscape);
}

document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup')) closePopup(evt);
})