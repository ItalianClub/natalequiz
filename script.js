const cardsData = [
  { id: 1, content: "🎄 + 🎁" }, { id: 2, content: "Albero e Regali" },
  { id: 3, content: "🎅 + 🛷" }, { id: 4, content: "Babbo Natale" },
  { id: 5, content: "🎆 + 🎉" }, { id: 6, content: "Capodanno" },
  { id: 7, content: "👵 + 🧹" }, { id: 8, content: "La Befana" }
];

let cards = [];
let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

// Functie om kaarten te schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Spel instellen
function setupGame() {
  cards = shuffle([...cardsData, ...cardsData]); // Maak dubbele kaarten
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  cards.forEach(card => createCard(card));
}

// Kaart maken
function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.content = card.content;

  cardElement.addEventListener("click", () => flipCard(cardElement));
  gameBoard.appendChild(cardElement);
}

// Kaart omdraaien
function flipCard(cardElement) {
  if (flippedCards.length < 2 && !cardElement.classList.contains("flipped")) {
    cardElement.classList.add("flipped");
    cardElement.textContent = cardElement.dataset.content;
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Controleren op een match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.content === card2.dataset.content) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      alert("🎉 Complimenti! Hai trovato tutte le coppie!");
      restartBtn.style.display = "block";
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.textContent = "";
    card2.textContent = "";
  }
  flippedCards = [];
}

// Herstart knop
restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
