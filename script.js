console.log("Script geladen!"); // Controleer of script.js wordt geladen

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

// HTML-elementen ophalen
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");

// Vraag laden
function loadQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(button, option));
    optionsElement.appendChild(button);
  });
}

// Antwoord controleren
function selectAnswer(button, option) {
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (option === correctAnswer) {
    button.style.backgroundColor = "#2a9d8f"; // Groen
    score++;
  } else {
    button.style.backgroundColor = "#d62828"; // Rood
  }

  // Knoppen blokkeren
  Array.from(optionsElement.children).forEach(btn => btn.disabled = true);
  nextButton.classList.remove("hidden");
}

// Volgende vraag
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

// Quiz resetten
function resetState() {
  nextButton.classList.add("hidden");
  optionsElement.innerHTML = "";
}

// Score weergeven
function showScore() {
  document.getElementById("quiz-container").classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.textContent = `Hai ottenuto ${score} su ${questions.length} punti!`;
}

// Quiz herstarten
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  loadQuestion();
}

nextButton.addEventListener("click", nextQuestion);

// Start quiz bij paginaladen
loadQuestion();
