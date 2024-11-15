class JavaScriptQuiz {
    constructor() {
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.correctAnswers = 0;
        this.totalQuestions = 0;
        this.currentScore = 0;
        this.timer = null;
        this.timeLeft = 30;
        this.isAnswerSelected = false;
  
        // DOM Elements
        this.elements = {
            timer: document.getElementById('timer'),
            timerProgress: document.getElementById('timer-progress'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            currentQuestion: document.getElementById('current-question'),
            totalQuestions: document.getElementById('total-questions'),
            progressFill: document.getElementById('progress-fill'),
            currentScore: document.getElementById('current-score'),
            feedbackModal: document.getElementById('feedback-modal'),
            feedbackText: document.getElementById('feedback-text'),
            continueButton: document.getElementById('continue-button'),
            errorContainer: document.getElementById('error-container')
        };
  
        // Bind methods
        this.init = this.init.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
  
    async init() {
        try {
            this.setupEventListeners();
            await this.fetchQuestions();
            this.startQuiz();
        } catch (error) {
            this.showError('Failed to initialize quiz', error);
        }
    }
  
    setupEventListeners() {
        document.addEventListener('keypress', this.handleKeyPress);
        this.elements.continueButton.addEventListener('click', () => this.hideModal());
    }
  
    handleKeyPress(e) {
        if (!this.isAnswerSelected && e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.option');
            if (options[optionIndex]) {
                options[optionIndex].click();
            }
        }
    }
  
    async fetchQuestions() {
        try {
            const response = await fetch('http://localhost:8080/api/javascript/questions', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
  
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
  
            this.questions = await response.json();
            this.totalQuestions = this.questions.length;
            this.shuffleQuestions();
            this.updateTotalQuestions();
            return true;
        } catch (error) {
            this.showError('Failed to fetch questions', error);
            return false;
        }
    }
  
    startQuiz() {
        this.displayQuestion();
        this.startTimer();
        this.updateProgress();
    }
  
    displayQuestion() {
        if (this.questions.length === 0) return;
  
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.elements.questionText.textContent = currentQuestion.questionText;
        this.elements.optionsContainer.innerHTML = '';
        
        const shuffledOptions = this.shuffleArray([...currentQuestion.options]);
        
        shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = `${index + 1}. ${option}`;
            button.className = 'option';
            button.addEventListener('click', () => this.checkAnswer(option));
            this.elements.optionsContainer.appendChild(button);
        });
  
        this.elements.currentQuestion.textContent = this.currentQuestionIndex + 1;
        this.isAnswerSelected = false;
    }
  
    checkAnswer(selectedOption) {
        if (this.isAnswerSelected) return;
        
        this.isAnswerSelected = true;
        clearInterval(this.timer);
  
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        
        // Visual feedback
        const selectedButton = Array.from(document.querySelectorAll('.option'))
            .find(button => button.textContent.includes(selectedOption));
        
        if (selectedButton) {
            selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            if (!isCorrect) {
                const correctButton = Array.from(document.querySelectorAll('.option'))
                    .find(button => button.textContent.includes(currentQuestion.correctAnswer));
                if (correctButton) {
                    correctButton.classList.add('correct');
                }
            }
        }
  
        // Update score
        if (isCorrect) {
            this.correctAnswers++;
            const timeBonus = Math.floor(this.timeLeft / 2);
            this.currentScore += (100 + timeBonus);
            this.elements.currentScore.textContent = this.currentScore;
        }
  
        // Show feedback
        this.showFeedback(isCorrect, currentQuestion.correctAnswer);
  
        // Progress after delay
        setTimeout(() => {
            if (this.currentQuestionIndex < this.totalQuestions - 1) {
                this.nextQuestion();
            } else {
                this.endQuiz();
            }
        }, 2000);
    }
  
    showFeedback(isCorrect, correctAnswer) {
        const feedback = isCorrect ? 
            'Correct! Well done!' : 
            `Incorrect. The correct answer was: ${correctAnswer}`;
        
        this.elements.feedbackText.textContent = feedback;
        this.elements.feedbackModal.classList.add('show');
    }
  
    hideModal() {
        this.elements.feedbackModal.classList.remove('show');
    }
  
    nextQuestion() {
        this.currentQuestionIndex++;
        this.hideModal();
        this.displayQuestion();
        this.resetTimer();
        this.updateProgress();
    }
  
    startTimer() {
        this.timeLeft = 30;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.nextQuestion(); // Automatically move to the next question when time runs out
            }
        }, 1000);
    }
  
    resetTimer() {
        clearInterval(this.timer);
        this.startTimer();
    }
  
    updateTimerDisplay() {
        this.elements.timer.textContent = this.timeLeft;
        const circumference = 2 * Math.PI * 45;
        const offset = circumference * (1 - this.timeLeft / 30);
        this.elements.timerProgress.style.strokeDashoffset = offset;
        
        // Visual warning when time is low
        if (this.timeLeft <= 5) {
            this.elements.timer.classList.add('warning');
        } else {
            this.elements.timer.classList.remove('warning');
        }
    }
  
    updateProgress() {
        const progress = (this.currentQuestionIndex / this.totalQuestions) * 100;
        this.elements.progressFill.style.width = `${progress}%`;
    }
  
    updateTotalQuestions() {
        this.elements.totalQuestions.textContent = this.totalQuestions;
    }
  
    endQuiz() {
        const results = {
            score: this.currentScore,
            correctAnswers: this.correctAnswers,
            totalQuestions: this.totalQuestions,
            percentage: Math.round((this.correctAnswers / this.totalQuestions) * 100),
            timestamp: new Date().toISOString()
        };
  
        localStorage.setItem('quizResults', JSON.stringify(results));
        window.location.href = 'result.html';
    }
  
    showError(message, error) {
        console.error(message, error);
        this.elements.errorContainer.innerHTML = `
            <div class="error-message">
                <p>${this.sanitizeHTML(message)}</p>
                <p>${this.sanitizeHTML(error.message)}</p>
                <button onclick="quiz.init()">Try Again</button>
            </div>
        `;
    }
  
    // Utility functions
    shuffleQuestions() {
        this.questions = this.shuffleArray(this.questions);
    }
  
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
  
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
  }
  
  // Initialize quiz when document is ready
  document.addEventListener('DOMContentLoaded', () => {
    window.quiz = new JavaScriptQuiz();
    quiz.init();
  });
  