const cards = [
  { id: 1, content: "🎄 + 🧦", image: "kersticoon.png" }, // La mattina di Natale
  { id: 2, content: "La mattina di Natale", image: "kersticoon2.png" },
  { id: 3, content: "👵 + 🧹", image: "kersticoon.png" }, // La Befana
  { id: 4, content: "La Befana", image: "kersticoon2.png" },
  { id: 5, content: "🎆 + 🎇", image: "kersticoon.png" }, // Capodanno
  { id: 6, content: "Capodanno", image: "kersticoon2.png" }
];

let flippedCards = [];
let matchedCards = [];

// Bord maken
function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  flippedCards = [];
  matchedCards = [];

  const shuffledCards = shuffle([...cards, ...cards]); // Dubbele set kaarten
  shuffledCards.forEach(card => createCard(board, card));
}

function createCard(board, card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");
  front.style.backgroundImage = `url(${card.image})`;

  const back = document.createElement("div");
  back.classList.add("card-back");
  back.textContent = card.content;

  inner.appendChild(front);
  inner.appendChild(back);
  cardElement.appendChild(inner);

  cardElement.addEventListener("click", () => flipCard(cardElement, card));
  board.appendChild(cardElement);
}

function flipCard(cardElement, card) {
  if (cardElement.classList.contains("flipped") || cardElement.classList.contains("matched") || flippedCards.length === 2) return;

  cardElement.classList.add("flipped");
  flippedCards.push({ cardElement, card });

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.card.content === card2.card.content) {
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
