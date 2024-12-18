const cardsData = [
  { id: 1, question: "🎄 + 🎁", answer: "Albero e Regali" },
  { id: 2, question: "🎅 + 🛷", answer: "Babbo Natale" },
  { id: 3, question: "👵 + 🧹", answer: "La Befana" },
  { id: 4, question: "5 + 3", answer: "8" },
  { id: 5, question: "10 - 4", answer: "6" },
  { id: 6, question: "7 + 2", answer: "9" },
  { id: 7, question: "12 - 5", answer: "7" },
  { id: 8, question: "Compleanno del vostro insegnante", answer: "3 di gennaio" }
];

let cards = [];
let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const frontFace = document.createElement("div");
  frontFace.classList.add("front");
  frontFace.innerText = "🎄";

  const backFace = document.createElement("div");
  backFace.classList.add("back");
  backFace.innerText = card.type === "question" ? card.question : card.answer;

  cardElement.appendChild(frontFace);
  cardElement.appendChild(backFace);

  cardElement.addEventListener("click", () => flipCard(cardElement, card));
  gameBoard.appendChild(cardElement);
}

function flipCard(cardElement, card) {
  if (flippedCards.length < 2 && !cardElement.classList.contains("flipped")) {
    cardElement.classList.add("flipped");
    flippedCards.push({ cardElement, card });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (
    (card1.card.type === "question" && card2.card.answer === card1.card.question) ||
    (card2.card.type === "question" && card1.card.answer === card2.card.question)
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

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
