const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-button")

const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");

const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

const progressBar = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const clock = document.getElementById("timer");



const quizQuestions = [
    {
        text: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctIndex: 2
    },
    {
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctIndex: 1
    },
    {
        text: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctIndex: 3
    },
    {
        text: "Which of these is NOT a programming language?",
        options: ["Java", "Python", "Banana", "JavaScript"],
        correctIndex: 2
    },
    {
        text: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctIndex: 2
    }
];


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

let score = 0;
let currentQuestionIndex = 0;
let timer;
let timeLeft;

startBtn.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)
answerContainer.addEventListener("click", handleAnswerClick)
nextButton.addEventListener("click", goToNextQuestion)



function startQuiz() {

    score = 0;
    currentQuestionIndex = 0;
    scoreSpan.textContent = score;
    progressBar.style.width = "0%";

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {

    answerContainer.innerHTML = "";

    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    questionText.textContent = currentQuestion.text;


    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("answer-btn")
        button.dataset.index = index;
        answerContainer.appendChild(button);
    });

    nextButton.textContent = "Skip";

    startTimer();

}

function startTimer() {
    timeLeft = 15;
    clock.textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        clock.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            goToNextQuestion();
        }
    }, 1000)
}

function handleAnswerClick(event) {

    if (!event.target.classList.contains("answer-btn")) return;

    const clickedButton = event.target;

    Array.from(answerContainer.children).forEach((button) => {
        button.disabled = true;
    })

    const selectedIndex = Number(clickedButton.dataset.index);
    const correctIndex = quizQuestions[currentQuestionIndex].correctIndex;

    Array.from(answerContainer.children).forEach((button, index) => {
        if (index == correctIndex)
            button.classList.add("correct");
        else if (index == selectedIndex)
            button.classList.add("incorrect");
    });

    if (selectedIndex == correctIndex) {
        score++;
        scoreSpan.textContent = score;
    }

    nextButton.textContent = "Next";

}

function showResults() {

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else {
        resultMessage.textContent = "Keep practicing!";
    }
}

function goToNextQuestion() {

    clearInterval(timer);
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    }
    else showResults()
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}

