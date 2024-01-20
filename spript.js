document.addEventListener('DOMContentLoaded', function () {
    var startBtn = document.getElementById('start-btn');
    var quizScreen = document.getElementById('quiz-screen');
    var endScreen = document.getElementById('end-screen');
    var timerDisplay = document.getElementById('time');
    var submitBtn = document.getElementById('submit-btn');
    var saveBtn = document.getElementById('save-btn');
    var codeInput = document.getElementById('code-input');

    let timer;
    let timeLeft = 90; // Initial time in seconds
    let currentQuestionIndex = 0;
    let score = 0;

    var questions = [
        {
            type: 'multiple-choice',
            question: 'What does the Window Object represent in JavaScript?',
            options: ['The browser window', 'The current HTML document', 'The global environment'],
            correctAnswer: 'The global environment'
        },
    ];

    startBtn.addEventListener('click', startQuiz);
    submitBtn.addEventListener('click', submitAnswer);
    saveBtn.addEventListener('click', saveScore);

    function startQuiz() {
        startBtn.style.display = 'none';
        quizScreen.style.display = 'block';
        showQuestion();
        timer = setInterval(updateTimer, 1000);
    }

    function showQuestion() {
        var currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;

        if (currentQuestion.type === 'multiple-choice') {
            document.getElementById('options').style.display = 'flex';
            codeInput.style.display = 'none';
            createOptions(currentQuestion.options);
        } else if (currentQuestion.type === 'coding') {
            document.getElementById('options').style.display = 'none';
            codeInput.style.display = 'block';
            codeInput.value = ''; // Clear previous code input
        }

        submitBtn.style.display = 'block';
    }

    function createOptions(options) {
        var optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';

        options.forEach((option, index) => {
            var button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(answerIndex) {
        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion.type === 'multiple-choice') {
            const userAnswer = currentQuestion.options[answerIndex];
            if (userAnswer === currentQuestion.correctAnswer) {
                score++;
                timeLeft = 90; // Resets time to 90 seconds on correct answer
                showFeedback('Correct answer!');
            } else {
                timeLeft -= 10; // Subtracts 10 seconds for incorrect answers
                if (timeLeft < 0) timeLeft = 0;
                showFeedback('Incorrect answer');
            }
        } else if (currentQuestion.type === 'coding') {
            const userCode = codeInput.value.trim();
            if (userCode === currentQuestion.correctCode.trim()) {
                score++;
                timeLeft = 90; // Resets time to 90 seconds on correct answer
                showFeedback('Correct answer!');
            } else {
                timeLeft -= 10;
                if (timeLeft < 0) timeLeft = 0;
                showFeedback('Incorrect answer');
            }
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function showFeedback(feedback) {
        const feedbackElement = document.getElementById('feedback');
        feedbackElement.textContent = feedback;
    }

    function submitAnswer() {
        submitBtn.style.display = 'none';
    
        if (questions[currentQuestionIndex].type === 'coding') {
            // In coding challenges, checks the answer immediately
            checkAnswer();
        } else {
            // For multiple-choice questions, proceed to the next question
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                endQuiz();
            }
        }
    }

    function endQuiz() {
        clearInterval(timer);
        quizScreen.style.display = 'none';
        endScreen.style.display = 'block';
        document.getElementById('final-score').textContent = score;
    }

    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            endQuiz();
        }
    }

    function saveScore() {
        var initialsInput = document.getElementById('initials');
        var initials = initialsInput.value.trim().toUpperCase();

        if (initials !== '') {
            // Here you can save the score and initials
            alert(`Score saved: ${score}`);
        } else {
            alert('Please enter your initials.');
        }
    }
});