const cards = [
  { id: 1, content: "Natale - Capodanno", type: "question" },
  { id: 2, content: "24", type: "answer" },
  { id: 3, content: "San Silvestro - La Vigilia di Natale", type: "question" },
  { id: 4, content: "7", type: "answer" },
  { id: 5, content: "Rebus: 🎄 + 🧦", type: "question" },
  { id: 6, content: "Natale", type: "answer" },
  { id: 7, content: "Santo Stefano + La Befana", type: "question" },
  { id: 8, content: "32", type: "answer" },
  { id: 9, content: "Rebus: 👵 + 🧹", type: "question" },
  { id: 10, content: "La Befana", type: "answer" }
];

let flippedCards = [];
let matchedCards = [];

// Bord maken
function createBoard() {
  console.log("Bord wordt aangemaakt...");
  const board = document.getElementById("game-board");
  
  if (!board) {
    console.error("FOUT: #game-board niet gevonden!");
    return;
  }

  const restartButton = document.getElementById("restart-btn");
  restartButton.classList.add("hidden");

  const shuffledCards = shuffle([...cards, ...cards]);
  board.innerHTML = "";
  flippedCards = [];
  matchedCards = [];

  shuffledCards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;
    cardElement.dataset.content = card.content;

    cardElement.addEventListener("click", () => flipCard(cardElement, card));
    board.appendChild(cardElement);
  });

  console.log("Bord is succesvol aangemaakt!");
}

// Kaarten schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Kaart omdraaien
function flipCard(cardElement, card) {
  if (cardElement.classList.contains("flipped") || flippedCards.length === 2) return;

  cardElement.classList.add("flipped");
  cardElement.textContent = card.content;
  flippedCards.push({ cardElement, card });

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

// Controleer match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (
    card1.card.id === card2.card.id &&
    card1.card.type !== card2.card.type
  ) {
    matchedCards.push(card1, card2);
    card1.cardElement.classList.add("hidden");
    card2.cardElement.classList.add("hidden");
  } else {
    card1.cardElement.classList.remove("flipped");
    card2.cardElement.classList.remove("flipped");
    card1.cardElement.textContent = "";
    card2.cardElement.textContent = "";
  }

  flippedCards = [];

  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert("🎉 Complimenti! Hai trovato tutte le coppie! 🎉");
      document.getElementById("restart-btn").classList.remove("hidden");
    }, 500);
  }
}

// Herstartfunctie
document.getElementById("restart-btn").addEventListener("click", createBoard);

// Start spel
console.log("Script geladen! Spel wordt gestart...");
createBoard();
