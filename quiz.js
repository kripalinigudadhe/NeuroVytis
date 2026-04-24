const questions = [
    { q: "Do you forget recent conversations?", type: "memory" },
    { q: "Do you misplace items often?", type: "memory" },
    { q: "Do you repeat questions unknowingly?", type: "memory" },

    { q: "Do you have trouble focusing?", type: "attention" },
    { q: "Do you get distracted easily?", type: "attention" },

    { q: "Do you get confused in familiar places?", type: "orientation" },
    { q: "Do you forget dates or time?", type: "orientation" },

    { q: "Do you struggle finding words?", type: "language" },
    { q: "Do you stop mid-sentence?", type: "language" },

    { q: "Do you struggle making decisions?", type: "executive" },
    { q: "Do you find daily tasks difficult?", type: "executive" }
];

const options = ["Never", "Sometimes", "Often", "Always"];

let currentQ = 0;
let answers = new Array(questions.length).fill(null);

// LOAD QUESTION
function loadQuestion() {
    const q = questions[currentQ];

    document.getElementById("quizQuestion").innerText = q.q;

    document.getElementById("quizOptions").innerHTML = options.map((opt, i) => `
        <button class="option-btn ${answers[currentQ] === i ? 'selected' : ''}" 
        onclick="selectOption(${i})">${opt}</button>
    `).join("");

    updateProgress();
}

// SELECT OPTION
function selectOption(index) {
    answers[currentQ] = index;

    document.querySelectorAll(".option-btn").forEach((btn, i) => {
        btn.classList.toggle("selected", i === index);
    });
}

// NEXT
function nextQuestion() {
    if (answers[currentQ] === null) {
        alert("Please select an option!");
        return;
    }

    currentQ++;

    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// PREVIOUS
function prevQuestion() {
    if (currentQ > 0) {
        currentQ--;
        loadQuestion();
    }
}

// PROGRESS
function updateProgress() {
    let progress = ((currentQ + 1) / questions.length) * 100;
    document.getElementById("progressFill").style.width = progress + "%";
    document.getElementById("progressText").innerText =
        `Question ${currentQ + 1} of ${questions.length}`;
}

// RESULT
function showResult() {

    let total = answers.reduce((a, b) => a + b, 0);
    let max = questions.length * 3;

    let percent = Math.round((total / max) * 100);

    let stage = "";
    let message = "";

    if (percent <= 20) {
        stage = "Normal";
        message = "✅ Cognitive health looks good.";
    } 
    else if (percent <= 40) {
        stage = "Mild Cognitive Impairment";
        message = "⚠️ Slight memory issues detected.";
    } 
    else if (percent <= 65) {
        stage = "Early Alzheimer’s";
        message = "⚠️ Early signs detected.";
    } 
    else if (percent <= 85) {
        stage = "Moderate Alzheimer’s";
        message = "⚠️ Noticeable decline.";
    } 
    else {
        stage = "Severe Alzheimer’s";
        message = "🚨 High cognitive impairment.";
    }

    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("quizSummary").style.display = "block";

    document.getElementById("finalScore").innerText = percent + "%";
    document.getElementById("stageResult").innerHTML = `
        <b>Stage:</b> ${stage} <br><br> ${message}
    `;

    // SAVE TO BACKEND
    fetch("http://localhost:5000/save-quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            score: percent,
            stage: stage,
            answers: answers
        })
    });
}

// START
loadQuestion();