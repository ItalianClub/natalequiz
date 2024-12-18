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

// Verdubbel kaarten om 8 paren te maken
function setupGame() {
  cards = shuffle([...cardsData, ...cardsData]);
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  cards.forEach(createCard);
}

// Schud de kaarten
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Maak kaarten aan
function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const frontFace = document.createElement("div");
  frontFace.classList.add("front");

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

// Draai kaarten om
function flipCard(cardElement) {
  if (flippedCards.length < 2 && !cardElement.classList.contains("flipped")) {
    cardElement.classList.add("flipped");
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Controleer op een match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.querySelector("img").src === card2.querySelector("img").src) {
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
  }

  flippedCards = [];
}

// Herstart de game
restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
