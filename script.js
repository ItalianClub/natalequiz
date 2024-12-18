const cardsData = [
  { bg: "kersticon.png", content: "Vraag 1" },
  { bg: "kersticon2.png", content: "Antwoord 1" },
  { bg: "kersticon.png", content: "Vraag 2" },
  { bg: "kersticon2.png", content: "Antwoord 2" }
];

let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById("game-board");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupGame() {
  console.log("Spel wordt ingesteld...");
  const cards = shuffle([...cardsData, ...cardsData]); // Verdubbel kaarten
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
  gameBoard.appendChild(card);

  card.addEventListener("click", () => flipCard(card, cardData));
}

function flipCard(card, cardData) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push({ card, cardData });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.cardData.content === card2.cardData.content) {
    console.log("Match gevonden!");
    card1.card.classList.add("matched");
    card2.card.classList.add("matched");
    matchedCards.push(card1, card2);
  } else {
    card1.card.classList.remove("flipped");
    card2.card.classList.remove("flipped");
  }

  flippedCards = [];
}

setupGame();
