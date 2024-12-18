const cardsData = [
  { id: 1, image: "./kersticon1.png" },
  { id: 2, image: "./kersticon2.png" },
  { id: 3, image: "./kersticon1.png" },
  { id: 4, image: "./kersticon2.png" },
  { id: 5, image: "./kersticon1.png" },
  { id: 6, image: "./kersticon2.png" },
  { id: 7, image: "./kersticon1.png" },
  { id: 8, image: "./kersticon2.png" }
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
  cards = shuffle([...cardsData, ...cardsData]); // Maak dubbele kaarten
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  cards.forEach((card, index) => createCard(card, index));
}

function createCard(card, index) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.index = index;

  const frontFace = document.createElement("div");
  frontFace.classList.add("front");
  frontFace.textContent = "🎄";

  const backFace = document.createElement("div");
  backFace.classList.add("back");
  const img = document.createElement("img");
  img.src = card.image;
  backFace.appendChild(img);

  cardElement.appendChild(frontFace);
  cardElement.appendChild(backFace);

  cardElement.addEventListener("click", () => flipCard(cardElement));
  gameBoard.appendChild(cardElement);
}

function flipCard(cardElement) {
  if (flippedCards.length < 2 && !cardElement.classList.contains("flipped")) {
    cardElement.classList.add("flipped");
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  const img1 = card1.querySelector("img").src;
  const img2 = card2.querySelector("img").src;

  if (img1 === img2) {
    matchedCards.push(card1, card2);
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];

  if (matchedCards.length === cards.length) {
    alert("🎉 Complimenti! Je hebt alle paren gevonden!");
    restartBtn.style.display = "block";
  }
}

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
