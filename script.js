const cardsData = [
  { id: 1, content: "🎄 + 🎁", image: "kersticon1.png" },
  { id: 2, content: "Albero e Regali", image: "kersticon2.png" },
  { id: 3, content: "🎅 + 🛷", image: "kersticon3.png" },
  { id: 4, content: "Babbo Natale", image: "kersticon4.png" },
  { id: 5, content: "🎆 + 🎉", image: "kersticon5.png" },
  { id: 6, content: "Capodanno", image: "kersticon6.png" },
  { id: 7, content: "👵 + 🧹", image: "kersticon7.png" },
  { id: 8, content: "La Befana", image: "kersticon8.png" },
  { id: 9, content: "Santo Stefano + Natale", image: "kersticon9.png" },
  { id: 10, content: "26 dicembre", image: "kersticon10.png" },
  { id: 11, content: "Compleanno del vostro insegnante", image: "kersticon11.png" },
  { id: 12, content: "3 di gennaio", image: "kersticon12.png" },
  { id: 13, content: "Natale - Capodanno", image: "kersticon13.png" },
  { id: 14, content: "24 dicembre", image: "kersticon14.png" },
  { id: 15, content: "Regali di Natale", image: "kersticon15.png" },
  { id: 16, content: "🎁", image: "kersticon16.png" }
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
  cards = shuffle([...cardsData, ...cardsData]);
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

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
