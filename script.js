const cardsData = [
  { bg: "kersticon.png", content: "Santo Stefano - La Vigilia di Natale", type: "question" },
  { bg: "kersticon2.png", content: "2", type: "answer" },
  { bg: "kersticon.png", content: "🎄 + 🧦", type: "question" },
  { bg: "kersticon2.png", content: "La mattina di Natale", type: "answer" },
  { bg: "kersticon.png", content: "👵 + 🧹", type: "question" },
  { bg: "kersticon2.png", content: "La Befana", type: "answer" },
  { bg: "kersticon.png", content: "Santo Stefano + La Befana", type: "question" },
  { bg: "kersticon2.png", content: "32", type: "answer" },
  { bg: "kersticon.png", content: "Natale - Capodanno", type: "question" },
  { bg: "kersticon2.png", content: "24", type: "answer" },
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
  const cards = shuffle([...cardsData, ...cardsData]); // Verdubbel kaarten
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
    card1.cardData.type === "question" &&
    card2.cardData.type === "answer" &&
    cardsData.some((pair) => pair.content === card1.cardData.content && pair.content === card2.cardData.content)
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

  if (matchedCards.length === cardsData.length) {
    alert("🎉 Complimenti! Je hebt alle paren gevonden!");
    restartBtn.style.display = "block";
  }
}

function updateProgressBar() {
  const progress = (matchedCards.length / cardsData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
