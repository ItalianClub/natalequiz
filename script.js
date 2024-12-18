const cardsData = [
  "Santo Stefano - La Vigilia di Natale",
  "2",
  "🎄 + 🧦",
  "La mattina di Natale",
  "👵 + 🧹",
  "La Befana",
  "Santo Stefano + La Befana",
  "32",
  "Natale - Capodanno",
  "24",
  "Compleanno del vostro insegnante",
  "3 di gennaio",
  "🎅 + 🎁",
  "Babbo Natale",
  "🎆 + 🥂",
  "Capodanno",
  "San Silvestro - Natale",
  "6",
  "🎄 + 🎆",
  "Albero illuminato"
];

let cards = [];
let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

// Schud kaarten
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Setup het spel
function setupGame() {
  cards = shuffle([...cardsData, ...cardsData]);
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  cards.forEach(createCard);
}

// Maak kaarten
function createCard(content) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const frontFace = document.createElement("div");
  frontFace.classList.add("front");
  const img = document.createElement("img");
  img.src = "./kersticon.png";
  frontFace.appendChild(img);

  const backFace = document.createElement("div");
  backFace.classList.add("back");
  backFace.textContent = content;

  cardElement.appendChild(frontFace);
  cardElement.appendChild(backFace);

  cardElement.addEventListener("click", () => flipCard(cardElement, content));
  gameBoard.appendChild(cardElement);
}

// Draai kaarten om
function flipCard(cardElement, content) {
  if (flippedCards.length < 2 && !cardElement.classList.contains("flipped")) {
    cardElement.classList.add("flipped");
    flippedCards.push({ cardElement, content });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Controleer op match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.content === card2.content) {
    card1.cardElement.classList.add("matched");
    card2.cardElement.classList.add("matched");
    matchedCards.push(card1, card2);
  } else {
    card1.cardElement.classList.remove("flipped");
    card2.cardElement.classList.remove("flipped");
  }

  flippedCards = [];

  if (matchedCards.length === cards.length / 2) {
    alert("🎉 Complimenti! Hai trovato tutte le coppie!");
    restartBtn.style.display = "block";
  }
}

// Herstart het spel
restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

// Start het spel
setupGame();
