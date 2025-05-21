const quizData = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "New York", correct: false },
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Central Style Sheets", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Cascading Simple Sheets", correct: false },
        { text: "Cars SUVs Sailboats", correct: false }
      ]
    },
    {
      question: "What year was JavaScript launched?",
      answers: [
        { text: "1996", correct: false },
        { text: "1995", correct: true },
        { text: "1994", correct: false },
        { text: "None of the above", correct: false }
      ]
    },
    {
      question: "Who developed the theory of relativity?",
      answers: [
        { text: "Isaac Newton", correct: false },
        { text: "Albert Einstein", correct: true },
        { text: "Nikola Tesla", correct: false },
        { text: "Marie Curie", correct: false }
      ]
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      answers: [
        { text: "Gold", correct: false },
        { text: "Oxygen", correct: true },
        { text: "Silver", correct: false },
        { text: "Iron", correct: false }
      ]
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Saturn", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Mars", correct: false }
      ]
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      answers: [
        { text: "Brazil", correct: false },
        { text: "France", correct: true },
        { text: "Germany", correct: false },
        { text: "Argentina", correct: false }
      ]
    },
    {
      question: "HTML stands for?",
      answers: [
        { text: "HyperText Markup Language", correct: true },
        { text: "HyperText Markdown Language", correct: false },
        { text: "Hyperloop Machine Language", correct: false },
        { text: "None of the above", correct: false }
      ]
    }
  ];

  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const nextBtn = document.getElementById('next-btn');
  const resultEl = document.getElementById('result');

  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultEl.textContent = '';
    nextBtn.textContent = 'Next';
    nextBtn.removeEventListener('click', startQuiz);
    nextBtn.addEventListener('click', handleNextClick);
    showQuestion();
  }

  function showQuestion() {
    answered = false;
    nextBtn.disabled = true;
    nextBtn.setAttribute('aria-disabled', 'true');
    clearAnswers();
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      button.classList.remove('correct', 'wrong');
      button.setAttribute('type', 'button');
      button.addEventListener('click', () => selectAnswer(button, answer.correct));
      answersEl.appendChild(button);
    });
  }

  function clearAnswers() {
    while (answersEl.firstChild) {
      answersEl.removeChild(answersEl.firstChild);
    }
  }

  function selectAnswer(button, correct) {
    if (answered) return;
    answered = true;
    if (correct) {
      button.classList.add('correct');
      score++;
    } else {
      button.classList.add('wrong');
      // Highlight correct answer
      Array.from(answersEl.children).forEach(btn => {
        if (quizData[currentQuestionIndex].answers.some(a => a.text === btn.textContent && a.correct)) {
          btn.classList.add('correct');
        }
      });
    }
    nextBtn.disabled = false;
    nextBtn.setAttribute('aria-disabled', 'false');
  }

  function handleNextClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    clearAnswers();
    questionEl.textContent = '';
    nextBtn.textContent = 'Restart Quiz';
    resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
    nextBtn.disabled = false;
    nextBtn.setAttribute('aria-disabled', 'false');
    nextBtn.focus();
    nextBtn.removeEventListener('click', handleNextClick);
    nextBtn.addEventListener('click', startQuiz);
  }

  // Initialize quiz on load
  startQuiz();