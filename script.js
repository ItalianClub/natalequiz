const cards = [
  { id: 1, content: "San Silvestro - La Vigilia di Natale", type: "question" },
  { id: 2, content: "7", type: "answer" },
  { id: 3, content: "Natale - Capodanno", type: "question" },
  { id: 4, content: "24", type: "answer" },
  { id: 5, content: "Natale + Capodanno", type: "question" },
  { id: 6, content: "26", type: "answer" },
  { id: 7, content: "Santo Stefano + La Befana", type: "question" },
  { id: 8, content: "32", type: "answer" }
];

let flippedCards = [];
let matchedCards = [];

// Bord maken
function createBoard() {
  const board = document.getElementById("game-board");
  const shuffledCards = shuffle([...cards, ...cards]); // Verdubbel de kaarten
  board.innerHTML = "";

  shuffledCards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;
    cardElement.dataset.content = card.content;
    cardElement.textContent = "?";

    cardElement.addEventListener("click", () => flipCard(cardElement, card));
    board.appendChild(cardElement);
  });
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
  const [card1, card2] =
