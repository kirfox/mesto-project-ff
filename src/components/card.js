import { likePutRequest, likeDeleteRequest } from "../components/api.js";


// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
const addCard = (userId, card, deleteCard, likeCard, showCard) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteBtn = cardElement.querySelector(".card__delete-button");
    const likeBtn = cardElement.querySelector(".card__like-button"); 
    const cardImage = cardElement.querySelector(".card__image"); 
    const likeCount = cardElement.querySelector(".card__like-count"); 
    
    if (card.owner._id !== userId) deleteBtn.remove();

    if (card.likes.length > 0) {
      card.likes.forEach(like => {
        if (like._id === userId) likeBtn.classList.add('card__like-button_is-active')
      });
    }
    
    cardElement.querySelector(".card__title").textContent = card.name;
    cardImage.src = card.link;
    likeCount.textContent = card.likes.length;
    cardImage.alt ="На карточке изображено " + card.name;
  
    deleteBtn.addEventListener("click", () => deleteCard(cardElement,card));
    likeBtn.addEventListener("click", () => likeCard(likeBtn, card, likeCount));
    cardImage.addEventListener("click", () => showCard(card.name, card.link));
    return cardElement;
  };

//like
const likeCard = (cardElement, card, likeCount) => {

  if(!(cardElement.classList.contains('card__like-button_is-active'))){
    likePutRequest(card)
      .then(card => {
        cardElement.classList.toggle('card__like-button_is-active');
        likeCount.textContent = card.likes.length}
      )
      .catch( err => console.log(`Ошибка: ${err}`))
  } else {
    likeDeleteRequest(card)
      .then(card => {
        cardElement.classList.toggle('card__like-button_is-active');
        likeCount.textContent = card.likes.length
      })
      .catch( err => console.log(`Ошибка: ${err}`))
  }
};

export {addCard, likeCard}