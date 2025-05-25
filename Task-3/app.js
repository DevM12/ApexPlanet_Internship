const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');

    questionEl.textContent = quizData[currentQuestion].question;
    optionsEl.innerHTML = '';

    quizData[currentQuestion].options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => {
            if (option === quizData[currentQuestion].answer) {
                alert('Correct!');
            } else {
                alert('Wrong!');
            }
            currentQuestion = (currentQuestion + 1) % quizData.length;
            loadQuestion();
        };
        optionsEl.appendChild(btn);
    });
}

loadQuestion();



// API Fetch Logic
function fetchJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            document.getElementById('joke').textContent = `${data.setup} - ${data.punchline}`;
        })
        .catch(error => {
            document.getElementById('joke').textContent = 'Failed to fetch joke.';
        });
}