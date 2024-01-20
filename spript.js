document.addEventListener('DOMContentLoaded', function () {
    var startBtn = document.getElementById('start-btn');
    var quizScreen = document.getElementById('quiz-screen');
    var endScreen = document.getElementById('end-screen');
    var timerDisplay = document.getElementById('time');
    var submitBtn = document.getElementById('submit-btn');
    var saveBtn = document.getElementById('save-btn');
    var codeInput = document.getElementById('code-input');

    let timer;
    let timeLeft = 60; // Initial time in seconds
    let currentQuestionIndex = 0;
    let score = 0;

    var questions