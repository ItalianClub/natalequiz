const cardsData = [
  { id: 1, pairId: 1, bg: "kersticon.png", content: "Santo Stefano - La Vigilia di Natale" },
  { id: 2, pairId: 1, bg: "kersticon.png", content: "2" },
  { id: 3, pairId: 2, bg: "kersticon.png", content: "🎄 + 🧦" },
  { id: 4, pairId: 2, bg: "kersticon.png", content: "La mattina di Natale" },
  { id: 5, pairId: 3, bg: "kersticon.png", content: "👵 + 🧹" },
  { id: 6, pairId: 3, bg: "kersticon.png", content: "La Befana" },
  { id: 7, pairId: 4, bg: "kersticon2.png", content: "Santo Stefano + La Befana" },
  { id: 8, pairId: 4, bg: "kersticon2.png", content: "32" },
  { id: 9, pairId: 5, bg: "kersticon2.png", content: "Natale - Capodanno" },
  { id: 10, pairId: 5, bg: "kersticon2.png", content: "24" },
  { id: 11, pairId: 6, bg: "kersticon2.png", content: "Compleanno del vostro insegnante" },
  { id: 12, pairId: 6, bg: "kersticon2.png", content: "3 di gennaio" },
  { id: 13, pairId: 7, bg: "kersticon2.png", content: "🎅 + 🎁" },
  { id: 14, pairId: 7, bg: "kersticon2.png", content: "Babbo Natale" },
  { id: 15, pairId: 8, bg: "kersticon2.png", content: "🎆 + 🥂" },
  { id: 16, pairId: 8, bg: "kersticon2.png", content: "Capodanno" },
  { id: 17, pairId: 9, bg: "kersticon2.png", content: "San Silvestro - Natale" },
  { id: 18, pairId: 9, bg: "kersticon2.png", content: "6" },
  { id: 19, pairId: 10, bg: "kersticon2.png", content: "🎁 + 🎟️" },
  { id: 20, pairId: 10, bg: "kersticon2.png", content: "La Tombola di Natale" }
];

let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById("game-board");
const progressBar = document.getElementById("progress");
const restartBtn = document.getElementById("restart-btn");

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
  flippedCards = [];
  matchedCards = [];
  cards.forEach(createCard);
}

function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("card");
  const front = document.createElement("div");
  const back = document.createElement("div");
  front.classList.add("front");
  back.classList.add("back");
  back.textContent = cardData.content;
  card.appendChild(front);
  card.appendChild(back);
  gameBoard.appendChild(card);
  card.addEventListener("click", () => flipCard(card, cardData));
}

function flipCard(card, cardData) {
  if (flippedCards.length >= 2) return;
  card.classList.add("flipped");
  flippedCards.push({ card, cardData });
  if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.cardData.pairId === card2.cardData.pairId) {
    card1.card.classList.add("matched");
    card2.card.classList.add("matched");
    matchedCards.push(card1, card2);
  } else {
    setTimeout(() => {
      card1.card.classList.remove("flipped");
      card2.card.classList.remove("flipped");
    }, 1000);
  }
  flippedCards = [];
}

restartBtn.addEventListener("click", setupGame);

setupGame();
