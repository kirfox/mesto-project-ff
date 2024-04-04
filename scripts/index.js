// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
addCard = (name, link, deleteCard) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;

  deleteBtn.addEventListener("click", deleteCard);

  return cardElement;
};

// @todo: Функция удаления карточки
deleteCard = (e) => {
  const listCard = e.target.closest(".card");
  listCard.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardList.append(addCard(element.name, element.link, deleteCard));
});
