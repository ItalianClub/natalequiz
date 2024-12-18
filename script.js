const cardsData = [
  "Santo Stefano - La Vigilia di Natale",
  "2",
  "🎄 + 🧦",
  "La mattina di Natale",
  "👵 + 🧹",
  "La Befana",
  "Santo Stefano + La Befana",
  "32",
  "Natale - Capodanno",
  "24",
  "Compleanno del vostro insegnante",
  "3 di gennaio",
  "🎅 + 🎁",
  "Babbo Natale",
  "🎆 + 🥂",
  "Capodanno",
  "San Silvestro - Natale",
  "6",
  "🎄 + 🎆",
  "Albero illuminato"
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
  const cards = shuffle([...cardsData, ...cardsData]);
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];

  cards.forEach((content) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "🎄";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = content;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const content1 = card1.querySelector(".back").textContent;
  const content2 = card2.querySelector(".back").textContent;

  if (content1 === content2) {
    matchedCards.push(card1, card2);
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];

  if (matchedCards.length === cardsData.length * 2) {
    alert("🎉 Complimenti! Je hebt alle paren gevonden!");
    restartBtn.style.display = "block";
  }
}

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

setupGame();
