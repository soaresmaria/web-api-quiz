// Var FOR TIMER 
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;

//Var FOR BUTTONS
const start = document.querySelector("#start");

// Var FOR START
const codersIntro = document.querySelector("#challenge-begins");

// Var for all questions
var questionsEl = document.querySelector(".all-question");

// Element locations var
let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;

// Final score var
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// High score var 
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];
// Call out the answer class buttton
const ansBtn = document.querySelectorAll("button.answer-btn")

// Var submit, view scores
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");

// Var answer call
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");

// Array of five question, zero based, number correctly. 
const questions = [ 
    {
        question: "Commonly used data types DO Not include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed with _______.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];

// Timer function starts
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// Quiz begins
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Set question function
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// Event function check answers process
function checkAnswer(event) {
    event.preventDefault();

    //Element for right or wrong
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // RIGHT OR WRONG ANSWER CONDITIONAL STATEMENTS CORRECT
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // RIGHT OR WRONG ANSWER CONDITIONAL STATEMENTS WRONG
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // CYCLE 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // High score list
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });

      scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // STORAGE OF SCORE 
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", scoreList());
}

function displayScores() {
    let storedScoreList = parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// CLEAR THE STORE
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}
// Start timer and display first question when click start quiz
start.addEventListener("click", startQuiz);

// Check answer listener event
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Adding a submit score
submitScrBtn.addEventListener("click", addScore);

// Go back listener event function
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

// CLEAR SCORE
clearScrBtn.addEventListener("click", clearScores);

// HIGH SCORE BUTTON ALERT AND DISPLAY LISTENER EVENT
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Hey. Take Quiz. There is No High Score.");
    }
});

