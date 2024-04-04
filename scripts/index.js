// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

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
