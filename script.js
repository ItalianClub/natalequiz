// Vragen en antwoorden voor het spel
const cards = [
  { id: 1, content: "Natale - Capodanno", type: "question" }, // 24
  { id: 2, content: "24", type: "answer" },
  { id: 3, content: "San Silvestro - La Vigilia di Natale", type: "question" }, // 7
  { id: 4, content: "7", type: "answer" },
  { id: 5, content: "Rebus: 🎄 + 🧦", type: "question" }, // Natale
  { id: 6, content: "Natale", type: "answer" },
  { id: 7, content: "Santo Stefano + La Befana", type: "question" }, // 32
  { id: 8, content: "32", type: "answer" },
  { id: 9, content: "Rebus: 👵 + 🧹", type: "question" }, // La Befana
  { id: 10, content: "La Befana", type: "answer" }
];

let flippedCards = [];
let matchedCards = [];

// Functie om het speelbord te maken
function createBoard() {
  console.log("Speelbord wordt aangemaakt...");
  const board = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-btn");

  // Controleer of het bord bestaat
  if (!board) {
    console.error("FOUT: 'game-board' niet gevonden!");
    return;
  }

  // Bord resetten
  board.innerHTML = "";
  restartButton.classList.add("hidden");
  flippedCards = [];
  matchedCards = [];

  // Kaarten schudden en toevoegen aan het bord
  const shuffledCards = shuffle([...cards, ...cards]); // Verdubbel kaarten
  shuffledCards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;
    cardElement.dataset.content = card.content;
    cardElement.textContent = "?"; // Achterkant van de kaart

    // Klik-event om de kaart om te draaien
    cardElement.addEventListener("click", () => flipCard(cardElement, card));
    board.appendChild(cardElement);
  });

  console.log("Speelbord aangemaakt met kaarten!");
}

// Functie om kaarten te schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Functie om een kaart om te draaien
function flipCard(cardElement, card) {
  if (cardElement.classList.contains("flipped") || flippedCards.length === 2) return;

  // Toon de inhoud van de kaart
  cardElement.classList.add("flipped");
  cardElement.textContent = card.content;
  flippedCards.push({ cardElement, card });

  // Controleer na 2 kaarten of er een match is
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

// Functie om te controleren of kaarten matchen
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.card.id === card2.card.id && card1.card.type !== card2.card.type) {
    // Match gevonden
    matchedCards.push(card1, card2);
    card1.cardElement.classList.add("hidden");
    card2.cardElement.classList.add("hidden");
  } else {
    // Geen match: draai de kaarten terug
    card1.cardElement.classList.remove("flipped");
    card2.cardElement.classList.remove("flipped");
    card1.cardElement.textContent = "?";
    card2.cardElement.textContent = "?";
  }

  flippedCards = [];

  // Controleer of alle paren zijn gevonden
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert("🎉 Complimenti! Hai trovato tutte le coppie! 🎉");
      document.getElementById("restart-btn").classList.remove("hidden");
    }, 500);
  }
}

// Herstartfunctie
document.getElementById("restart-btn").addEventListener("click", createBoard);

// Start het spel
console.log("Spel wordt gestart...");
createBoard();
