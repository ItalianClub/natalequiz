const questions = [
  {
    question: "Rebus: 🎄 + 🕯️ = ?",
    options: ["Natale", "Capodanno", "La Befana", "San Silvestro"],
    answer: "Natale"
  },
  {
    question: "Somma: Natale (25) - Capodanno (1) = ?",
    options: ["24", "26", "7", "31"],
    answer: "24"
  },
  {
    question: "Rebus: 👵 + 🧹 = ?",
    options: ["Natale", "La Befana", "Santo Stefano", "La Vigilia di Natale"],
    answer: "La Befana"
  },
  {
    question: "Somma: San Silvestro (31) - La Vigilia di Natale (24) = ?",
    options: ["6", "7", "5", "8"],
    answer: "7"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");

// Vragen laden
function loadQuestion() {
  resetState();
  const currentQuestion = questions[currentQ