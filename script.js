console.log("Script geladen!"); // Controleer of het script werkt

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
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");

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

function selectAnswer(button, option) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (option === correctAnswer) {
    button.style.backgroundColor = "#2a9d8f"; // Groen
    score++;
  } else {
    button.style.backgroundColor = "#d62828"; // Rood
  }
  Array.from(optionsElement.children).forEach(btn => btn.disabled = true);
  nextButton.classList.remove("hidden");
}

function resetState() {
  nextButton.classList.add("hidden");
  optionsElement.innerHTML = "";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  document.getElementById("quiz-container").classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.textContent = `Hai ottenuto ${score} su ${questions.length} punti!`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  loadQuestion();
}

loadQuestion();
