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
  const cards = shuffle([...cardsData]); // Geen duplicatie, 16 unieke kaarten
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

  // Controleer of de kaarten matchen op basis van type en content
  if (
    card1.cardData.type === "question" &&
    card2.cardData.type === "answer" &&
    card1.cardData.content === card2.cardData.content
  ) {
    // Correcte match: markeer als "matched"
    card1.card.classList.add("matched");
    card2.card.classList.add("matched");

    // Voeg kaarten toe aan de lijst met gematchte kaarten
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
  if (matchedCards.length === cardsData.length / 2) {
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
