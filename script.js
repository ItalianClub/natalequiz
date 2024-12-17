const cards = [
  { id: 1, content: "Natale - Capodanno", type: "question" }, // 24
  { id: 2, content: "24", type: "answer" },
  { id: 3, content: "San Silvestro - La Vigilia di Natale", type: "question" }, // 7
  { id: 4, content: "7", type: "answer" },
  { id: 5, content: "Rebus: 🎄 + 🧦", type: "question" }, // Natale
  { id: 6, content: "Natale", type: "answer" },
  { id: 7, content: "Santo Stefano + La Befana", type: "question" }, // 32
  { id: 8, content: "32", type: "answer" },
  { id: 9, content: "Rebus: 👵 + 🧹", type: "question" }, // La Befana
  { id: 10, content: "La Befana", type: "answer" }
];

let flippedCards = [];
let matchedCards = [];

// Speelbord maken
function createBoard() {
  const board = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-btn");

  board.innerHTML = "";
  restartButton.classList.add("hidden");
  flippedCards = [];
  matchedCards = [];

  const shuffledCards = shuffle([...cards, ...cards]);
  shuffledCards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = "?";

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.textContent = card.content;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);

    cardElement.addEventListener("click", () => flipCard(cardElement, card));
    board.appendChild(cardElement);
  });
}

// Kaarten schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Kaart omdraaien
function flipCard(cardElement, card) {
  if (cardElement.classList.contains("flipped") || flippedCards.length === 2) return;

  cardElement.classList.add("flipped");
  flippedCards.push({ cardElement, card });

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

// Controleer match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.card.id === card2.card.id && card1.card.type !== card2.card.type) {
    matchedCards.push(card1, card2);
  } else {
    card1.cardElement.classList.remove("flipped");
    card2.cardElement.classList.remove("flipped");
  }

  flippedCards = [];

  if (matchedCards.length === cards.length) {
    document.getElementById("restart-btn").classList.remove("hidden");
    alert("🎉 Complimenti! Hai trovato tutte le coppie! 🎉");
  }
}

// Herstarten
document.getElementById("restart-btn").addEventListener("click", createBoard);

// Start het spel
createBoard();
