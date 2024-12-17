const cards = [
  { id: 1, image: "kersticoon.png" },
  { id: 2, image: "kersticoon2.png" }
];

let gameCards = [];
let flippedCards = [];
let matchedCards = [];

// Bord maken
function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  gameCards = [];

  // Kaarten verdelen: 10 van elk icoon
  for (let i = 0; i < 10; i++) {
    gameCards.push({ id: i, image: cards[0].image });
    gameCards.push({ id: i + 10, image: cards[1].image });
  }

  const shuffledCards = shuffle(gameCards);
  shuffledCards.forEach((card, index) => createCard(board, card, index));
}

function createCard(board, card, index) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.index = index;

  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");
  front.style.backgroundImage = `url(${card.image})`;

  const back = document.createElement("div");
  back.classList.add("card-back");
  back.textContent = "?";

  inner.appendChild(front);
  inner.appendChild(back);
  cardElement.appendChild(inner);
  board.appendChild(cardElement);

  cardElement.addEventListener("click", () => flipCard(cardElement, card));
}

function flipCard(cardElement, card) {
  if (cardElement.classList.contains("flipped") || flippedCards.length === 2) return;

  cardElement.classList.add("flipped");
  flippedCards.push({ cardElement, card });

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.card.image === card2.card.image) {
    card1.cardElement.classList.add("matched");
    card2.cardElement.classList.add("matched");
    matchedCards.push(card1, card2);
  } else {
    card1.cardElement.classList.remove("flipped");
    card2.cardElement.classList.remove("flipped");
  }

  flippedCards = [];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.getElementById("restart-btn").addEventListener("click", createBoard);
createBoard();
