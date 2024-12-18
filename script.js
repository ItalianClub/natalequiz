const cardsData = [
  { id: 1, pairId: 1, bg: "kersticon.png", content: "Santo Stefano - La Vigilia di Natale", type: "question" },
  { id: 2, pairId: 1, bg: "kersticon.png", content: "2", type: "answer" },
  { id: 3, pairId: 2, bg: "kersticon.png", content: "🎄 + 🧦", type: "question" },
  { id: 4, pairId: 2, bg: "kersticon.png", content: "La mattina di Natale", type: "answer" },
  { id: 5, pairId: 3, bg: "kersticon.png", content: "👵 + 🧹", type: "question" },
  { id: 6, pairId: 3, bg: "kersticon.png", content: "La Befana", type: "answer" },
  { id: 7, pairId: 4, bg: "kersticon2.png", content: "Santo Stefano + La Befana", type: "question" },
  { id: 8, pairId: 4, bg: "kersticon2.png", content: "32", type: "answer" },
  { id: 9, pairId: 5, bg: "kersticon2.png", content: "Natale - Capodanno", type: "question" },
  { id: 10, pairId: 5, bg: "kersticon2.png", content: "24", type: "answer" },
  { id: 11, pairId: 6, bg: "kersticon2.png", content: "Compleanno del vostro insegnante", type: "question" },
  { id: 12, pairId: 6, bg: "kersticon2.png", content: "3 di gennaio", type: "answer" },
  { id: 13, pairId: 7, bg: "kersticon2.png", content: "🎅 + 🎁", type: "question" },
  { id: 14, pairId: 7, bg: "kersticon2.png", content: "Babbo Natale", type: "answer" },
  { id: 15, pairId: 8, bg: "kersticon2.png", content: "🎆 + 🥂", type: "question" },
  { id: 16, pairId: 8, bg: "kersticon2.png", content: "Capodanno", type: "answer" },
  { id: 17, pairId: 9, bg: "kersticon2.png", content: "San Silvestro - Natale", type: "question" },
  { id: 18, pairId: 9, bg: "kersticon2.png", content: "6", type: "answer" },
  { id: 19, pairId: 10, bg: "kersticon2.png", content: "🎁 + 🎟️", type: "question" },
  { id: 20, pairId: 10, bg: "kersticon2.png", content: "La Tombola di Natale", type: "answer" },
];

let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById("game-board");
const progressBar = document.getElementById("progress");
const restartBtn = document.getElementById("restart-btn");
let boardLocked = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupGame() {
  const cards = shuffle([...cardsData]);
  gameBoard.innerHTML = "";
  progressBar.style.width = "0%";
  flippedCards = [];
  matchedCards = [];
  cards.forEach(createCard);
}

function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("card");

  const front = document.createElement("div");
  front.classList.add("front");
  front.style.backgroundImage = `url(${cardData.bg})`;

  const back = document.createElement("div");
  back.classList.add("back");
  back.textContent = cardData.content;

  card.appendChild(front);
  card.appendChild(back);
  gameBoard.appendChild(card);

  card.addEventListener("click", () => flipCard(card, cardData));
}

function flipCard(card, cardData) {
  if (boardLocked || card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  flippedCards.push({ card, cardData });

  if (flippedCards.length === 2) {
    boardLocked = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.cardData.pairId === card2.cardData.pairId) {
    card1.card.classList.add("matched");
    card2.card.classList.add("matched");
    matchedCards.push(card1, card2);
    updateProgressBar();
  } else {
    card1.card.classList.remove("flipped");
    card2.card.classList.remove("flipped");
  }

  flippedCards = [];
  boardLocked = false;

  if (matchedCards.length === cardsData.length / 2) {
    alert("🎉 Complimenti! Alle paren gevonden!");
    restartBtn.style.display = "block";
  }
}

function updateProgressBar() {
  const progress = (matchedCards.length / (cardsData.length / 2)) * 100;
  progressBar.style.width = `${progress}%`;
}

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
