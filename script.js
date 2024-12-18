const pairs = [
  { question: "Santo Stefano - La Vigilia di Natale", answer: "2" },
  { question: "🎄 + 🧦", answer: "La mattina di Natale" },
  { question: "👵 + 🧹", answer: "La Befana" },
  { question: "Santo Stefano + La Befana", answer: "32" },
  { question: "Natale - Capodanno", answer: "24" },
  { question: "Compleanno del vostro insegnante", answer: "3 di gennaio" },
  { question: "🎅 + 🎁", answer: "Babbo Natale" },
  { question: "🎆 + 🥂", answer: "Capodanno" },
  { question: "San Silvestro - Natale", answer: "6" },
  { question: "🎄 + 🎆", answer: "Albero illuminato" }
];

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
  const cards = shuffle(
    pairs.flatMap((pair) => [
      { type: "question", content: pair.question, bg: "./kersticon.png" },
      { type: "answer", content: pair.answer, bg: "./kersticon2.png" }
    ])
  );

  gameBoard.innerHTML = "";
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

  card.addEventListener("click", () => flipCard(card, cardData));
  gameBoard.appendChild(card);
}

function flipCard(card, cardData) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
    card.classList.add("flipped");
    flippedCards.push({ card, cardData });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (
    (card1.cardData.type === "question" && card2.cardData.type === "answer" &&
      pairs.some((pair
