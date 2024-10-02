// Array of question objects with question text and answers (correct or incorrect)
const questions = [
    {
        question: "Which is the largest animal in the world?", // Question text
        answer: [ // Array of possible answers
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the tallest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: false },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: true },
        ]
    },
    {
        question: "Which is the fastest land animal?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the largest bird in the world?",
        answer: [
            { text: "Eagle", correct: false },
            { text: "Ostrich", correct: true },
            { text: "Penguin", correct: false },
            { text: "Peacock", correct: false },
        ]
    }
];

// DOM elements for displaying question, answer buttons, and the next button
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // Tracks the current question index
let score = 0; // Stores the player's score

// Function to start the quiz, resetting score and current question index
function startQuiz() {
    currentQuestionIndex = 0; // Resets question index to 0
    score = 0; // Resets score
    nextButton.innerHTML = "Next"; // Sets the next button text
    showQuestion(); // Displays the first question
}

// Function to display the current question and answers
function showQuestion() {
    resetState(); // Clears the previous question's answers
    let currentQuestion = questions[currentQuestionIndex]; // Gets the current question
    let questionNo = currentQuestionIndex + 1; // Increments question number (1-based)
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Displays the question

    // Creates and displays each answer button
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button"); // Creates a new button
        button.classList.add("btn"); // Adds the "btn" class to the button
        button.innerText = answer.text; // Sets the button text to the answer text
        answerButtons.appendChild(button); // Adds the button to the DOM
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Marks correct answers with data attribute
        }
        button.addEventListener("click", selectAnswer); // Adds click event listener for answer selection
    });
}

// Function to reset the state of the quiz (hides next button and clears previous answers)
function resetState() {
    nextButton.style.display = "none"; // Hides the next button initially
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Removes all answer buttons
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target; // Gets the clicked button
    const isCorrect = selectedBtn.dataset.correct === "true"; // Checks if the answer is correct
    if (isCorrect) {
        selectedBtn.classList.add("correct"); // Adds correct styling if answer is correct
        score++; // Increments score if correct
    } else {
        selectedBtn.classList.add("incorrect"); // Adds incorrect styling if answer is wrong
    }

    // Marks all answers as correct/incorrect and disables further clicks
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Highlights the correct answer
        }
        button.disabled = true; // Disables all buttons after selection
    });
    nextButton.style.display = "block"; // Displays the next button after answering
}

// Function to display the score at the end of the quiz
function showScore() {
    resetState(); // Clears the quiz state
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // Displays the score
    nextButton.innerHTML = "Play Again"; // Changes the button text to "Play Again"
    nextButton.style.display = "block"; // Shows the button for replay
}

// Function to handle the next button click (goes to the next question or shows score)
function handleNextButton() {
    currentQuestionIndex++; // Increments the question index
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Shows the next question if available
    } else {
        showScore(); // Shows the final score if quiz is finished
    }
}

// Event listener for the next button (handles both next question and restart)
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton(); // Proceeds to next question
    } else {
        startQuiz(); // Restarts the quiz
    }
});

// Initializes the quiz when the page loads
startQuiz();
