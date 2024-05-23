import { deleteCardRequest, likePutRequest, likeDeleteRequest } from "../components/api.js";
import { openPopup } from "./modal.js";
import { popupDeleteCard, cardFormDelete } from "../index.js"

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
const addCard = (card, deleteCard, likeCard, showCard) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteBtn = cardElement.querySelector(".card__delete-button");
    const likeBtn = cardElement.querySelector(".card__like-button"); 
    const cardImage = cardElement.querySelector(".card__image"); 
    const likeCount = cardElement.querySelector(".card__like-count"); 
    
    if (card.owner._id !== "34dde54b084d6798c88ac757") deleteBtn.remove();

    if (card.likes.length > 0) {
      card.likes.forEach(like => {
        if (like._id === '34dde54b084d6798c88ac757') likeBtn.classList.add('card__like-button_is-active')
      });
    }
    
    cardElement.querySelector(".card__title").textContent = card.name;
    cardImage.src = card.link;
    likeCount.textContent = card.likes.length;
    cardImage.alt ="На карточке изображено " + card.name;
  
    deleteBtn.addEventListener("click", () => deleteCard(card));
    likeBtn.addEventListener("click", () => likeCard(likeBtn, card, likeCount));
    cardImage.addEventListener("click", () => showCard(cardElement));
    return cardElement;
  };

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  openPopup(popupDeleteCard)
  cardFormDelete.setAttribute('id', card._id)
};

//like
const likeCard = (cardElement, card, likeCount) => {

  cardElement.classList.toggle('card__like-button_is-active');

  if(cardElement.classList.contains('card__like-button_is-active')){
    likePutRequest(card)
      .then(card => likeCount.textContent = card.likes.length)
      .catch( err => console.log(`Ошибка: ${err}`))
  } else {
    likeDeleteRequest(card)
      .then(card => likeCount.textContent = card.likes.length)
      .catch( err => console.log(`Ошибка: ${err}`))
  }
};

export {addCard, deleteCard, likeCard}