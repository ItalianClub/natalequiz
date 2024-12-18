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
const progressBar = document.getElementById("progress-bar");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupGame() {
  const cards = shuffle(
    pairs.flatMap((pair, index) => [
      { type: "question", content: pair.question, bg: index % 2 === 0 ? "./kersticon.png" : "./kersticon2.png" },
      { type: "answer", content: pair.answer, bg: index % 2 === 0 ? "./kersticon2.png" : "./kersticon.png" }
    ])
  );

  gameBoard.innerHTML = "";
  progressBar.innerHTML = `<div></div>`;
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
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push({ card, cardData });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (
    (card1.cardData.type === "question" && card2.cardData.type === "answer" &&
      pairs.some((pair) => pair.question === card1.cardData.content && pair.answer === card2.cardData.content)) ||
    (card2.cardData.type === "question" && card1.cardData.type === "answer" &&
      pairs.some((pair) => pair.question === card2.cardData.content && pair.answer === card1.cardData.content))
  ) {
    card1.card.classList.add("matched");
    card2.card.classList.add("matched");
    matchedCards.push(card1, card2);

    updateProgressBar();
  } else {
    card1.card.classList.remove("flipped");
    card2.card.classList.remove("flipped");
  }

  flippedCards = [];
}

function updateProgressBar() {
  const progress = (matchedCards.length / (pairs.length * 2)) * 100;
  progressBar.firstElementChild.style.width = `${progress}%`;
}

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
