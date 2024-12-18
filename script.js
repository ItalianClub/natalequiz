const cardsData = [
  { id: 1, image: "kersticon.png" },
  { id: 2, image: "kersticon2.png" },
  { id: 3, image: "kersticon.png" },
  { id: 4, image: "kersticon2.png" },
  { id: 5, image: "kersticon.png" },
  { id: 6, image: "kersticon2.png" },
  { id: 7, image: "kersticon.png" },
  { id: 8, image: "kersticon2.png" }
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
  cards = shuffle([...cardsData, ...cardsData]); // Dubbele kaarten
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const frontFace = document.createElement("div");
    frontFace.classList.add("front");
    frontFace.style.backgroundColor = "#9c1925";

    const backFace = document.createElement("div");
    backFace.classList.add("back");
    const img = document.createElement("img");
    img.src = card.image;
    backFace.appendChild(img);

    cardElement.appendChild(frontFace);
    cardElement.appendChild(backFace);

    cardElement.addEventListener("click", () => flipCard(cardElement, card));
    gameBoard.appendChild(cardElement);
  });
}

function flipCard(cardElement) {
  if (
    flippedCards.length < 2 &&
    !cardElement.classList.contains("flipped") &&
    !cardElement.classList.contains("matched")
  ) {
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

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
