// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
const addCard = (card, deleteCard, likeCard, showCard) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteBtn = cardElement.querySelector(".card__delete-button");
    const likeBtn = cardElement.querySelector(".card__like-button"); 
    const cardImage = cardElement.querySelector(".card__image"); 
  
    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__image").alt ="На карточке изображено " + card.name;
  
    deleteBtn.addEventListener("click", () => deleteCard(cardElement));
    likeBtn.addEventListener("click", () => likeCard(likeBtn));
    cardImage.addEventListener("click", () => showCard(cardElement));
    return cardElement;
  };
  
// @todo: Функция удаления карточки
const deleteCard = (cardElement) => cardElement.remove();

//like
const likeCard = (cardElement) => cardElement.classList.toggle('card__like-button_is-active');

export {addCard, deleteCard, likeCard}