// Data voor de kaarten
const cardsData = [
  { id: 1, bg: "kersticon.png", content: "Santo Stefano - La Vigilia di Natale", type: "question" },
  { id: 2, bg: "kersticon.png", content: "2", type: "answer" },
  { id: 3, bg: "kersticon.png", content: "🎄 + 🧦", type: "question" },
  { id: 4, bg: "kersticon.png", content: "La mattina di Natale", type: "answer" },
  { id: 5, bg: "kersticon.png", content: "👵 + 🧹", type: "question" },
  { id: 6, bg: "kersticon.png", content: "La Befana", type: "answer" },
  { id: 7, bg: "kersticon2.png", content: "Santo Stefano + La Befana", type: "question" },
  { id: 8, bg: "kersticon2.png", content: "32", type: "answer" },
  { id: 9, bg: "kersticon2.png", content: "Natale - Capodanno", type: "question" },
  { id: 10, bg: "kersticon2.png", content: "24", type: "answer" },
  { id: 11, bg: "kersticon2.png", content: "Compleanno del vostro insegnante", type: "question" },
  { id: 12, bg: "kersticon2.png", content: "3 di gennaio", type: "answer" },
  { id: 13, bg: "kersticon2.png", content: "🎅 + 🎁", type: "question" },
  { id: 14, bg: "kersticon2.png", content: "Babbo Natale", type: "answer" },
  { id: 15, bg: "kersticon2.png", content: "🎆 + 🥂", type: "question" },
  { id: 16, bg: "kersticon2.png", content: "Capodanno", type: "answer" },
];

// Variabelen voor spelstatus
let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById("game-board");
const progressBar = document.getElementById("progress");
const restartBtn = document.getElementById("restart-btn");

// Functie om kaarten te schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Spel initialiseren
function setupGame() {
  const cards = shuffle([...cardsData, ...cardsData]); // Verdubbel de kaarten
  gameBoard.innerHTML = "";
  progressBar.style.width = "0%";
  flippedCards = [];
  matchedCards = [];
  cards.forEach(createCard);
}

// Kaarten genereren
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

// Kaart omdraaien
function flipCard(card, cardData) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
    card.classList.add("flipped");
    flippedCards.push({ card, cardData });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Controleren op een match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (
    card1.cardData.type === "question" &&
    card2.cardData.type === "answer" &&
    card1.cardData.content === card2.cardData.content
  ) {
    // Correcte match: markeer als "matched"
    card1.card.classList.add("matched");
    card2.card.classList.add("matched");

    // Visuele feedback voor correcte match
    card1.card.querySelector(".back").style.backgroundColor = "#e6ded0";
    card2.card.querySelector(".back").style.backgroundColor = "#e6ded0";
    card1.card.style.transition = "transform 0.3s ease, background-color 0.3s ease";
    card2.card.style.transition = "transform 0.3s ease, background-color 0.3s ease";

    matchedCards.push(card1, card2);

    // Update voortgang
    updateProgressBar();
  } else {
    // Geen match: draai kaarten terug
    card1.card.classList.remove("flipped");
    card2.card.classList.remove("flipped");
  }

  flippedCards = [];

  // Controleer of alle kaarten gematcht zijn
  if (matchedCards.length === cardsData.length) {
    setTimeout(() => {
      alert("🎉 Complimenti! Alle paren gevonden!");
      restartBtn.style.display = "block";
    }, 300);
  }
}

// Voortgangsbalk bijwerken
function updateProgressBar() {
  const progress = (matchedCards.length / (cardsData.length / 2)) * 100;
  progressBar.style.transition = "width 0.5s ease";
  progressBar.style.width = `${progress}%`;
}

// Herstartknop functionaliteit
restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  setupGame();
});

// Start het spel
setupGame();
