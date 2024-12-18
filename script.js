const cardsData = [
  { id: 1, content: "Santo Stefano - La Vigilia di Natale", answer: "2" },
  { id: 2, content: "🎄 + 🧦", answer: "La mattina di Natale" },
  { id: 3, content: "👵 + 🧹", answer: "La Befana" },
  { id: 4, content: "Santo Stefano + La Befana", answer: "32" },
  { id: 5, content: "Natale - Capodanno", answer: "24" },
  { id: 6, content: "Compleanno del vostro insegnante", answer: "3 di gennaio" },
  { id: 7, content: "🎅 + 🎁", answer: "Babbo Natale" },
  { id: 8, content: "🎆 + 🥂", answer: "Capodanno" },
  { id: 9, content: "San Silvestro - Natale", answer: "6" },
  { id: 10, content: "🎄 + 🎆", answer: "Albero illuminato" }
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
  cards = shuffle([
    ...cardsData.map(card => ({ ...card, type: "question" })),
    ...cardsData.map(card => ({ ...card, type: "answer" }))
  ]);
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  cards.forEach(createCard);
}

// Maak kaarten
function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const frontFace = document.createElement("div");
  frontFace.classList.add("front");
  const img = document.createElement("img");
  img.src = card.type === "question" ? "./kersticon.png" : "./kersticon2.png";
  frontFace.appendChild(img);

  const backFace = document.createElement("div");
  backFace.classList.add("back");
  backFace.textContent = card.type === "question" ? card.content : card.answer;

  cardElement.appendChild(frontFace);
  cardElement.appendChild(backFace);

  cardElement.addEventListener("click", () => flipCard(cardElement, card));
  gameBoard.appendChild(cardElement);
}

// Draai kaarten om
function flipCard(cardElement, card) {
  if (flippedCards.length < 2 && !cardElement.classList.contains("flipped")) {
    cardElement.classList.add("flipped");
    flippedCards.push({ cardElement, card });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Controleer op match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (
    (card1.card.type === "question" && card2.card.answer === card1.card.content) ||
    (card2.card.type === "question" && card1.card.answer === card2.card.content)
  ) {
    card1.cardElement.classList.add("matched");
    card2.cardElement.classList.add("matched");
    matchedCards.push(card1, card2);
  } else {
    card1.cardElement.classList.remove("flipped");
    card2.cardElement.classList.remove("flipped");
  }

  flippedCards = [];

  if (matchedCards.length === cards.length) {
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
