const questions = [
    {
        question: "What is the capital of France?",
        options: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Rome", correct: false },
            { text: "Random", correct: false },
        ]
    },
    {
        question: "What is the traditional Indian greeting?",
        options: [
            { text: "Namaste", correct: true },
            { text: "Salaam", correct: false },
            { text: "Aloha", correct: false },
            { text: "Konnichiwa", correct: false },
        ]
    },
    {
        question: " Which festival is known as the 'Festival of Lights' in India?",
        options: [
            { text: "Holi", correct: false },
            { text: "Diwali", correct: true },
            { text: "Eid", correct: false },
            { text: "Navratri", correct: false },
        ]
    },
    {
        question: " What is the traditional Indian system of medicine that focuses on balance in the body's energies?",
        options: [
            { text: "Unani", correct: false },
            { text: "Siddha", correct: false },
            { text: "Ayurveda", correct: true },
            { text: "Homeopathy", correct: false },
        ]
    },
    {
        question: "What is the national currency of India?",
        options: [
            { text: "Rupiah", correct: false },
            { text: "Yen", correct: false },
            { text: "Rupee", correct: true },
            { text: "Other", correct: false },
        ]
    },
  
];

const questionElement = document.getElementById("question");
const optionButtons = document.getElementById("option-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    let currentQuestionIndex = 0;
    let score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add("btn");
        optionButtons.appendChild(button);
        if (option.correct) {
            button.dataset.correct = option.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if (iscorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(optionButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Finish";
    nextButton.style.display = "block";
  
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
        // questionElement.innerHTML = "Thank you";
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})
startQuiz();