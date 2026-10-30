const typeArea = document.getElementById("type-area");
const cardResult = document.getElementById("main-card");
const restartBtn = document.getElementById("reset-btn");
const timeCard = document.getElementById("time");
const wpmCard = document.getElementById("wpm");
const accuracyCard = document.getElementById("accuracy");

let sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes a person better every single day.",
    "I am learning to build websites with HTML and CSS.",
    "A small step forward is better than standing still.",
    "Typing fast is easy when you do not look at the keys.",
    "The sun was warm and the sky was clear and blue."
];

let timeLeft = 30;
let timer = null;
let correctChars = 0;
timeCard.textContent = timeLeft + "s";

function loadSentence() {
    cardResult.textContent = "";

    let randomIndex = Math.floor(Math.random() * sentences.length);
    let currentSentence = sentences[randomIndex];
    currentSentence.split("").forEach(function (character) {
        const span = document.createElement("span");
        span.textContent = character;
        cardResult.appendChild(span);
    });
}
loadSentence();

typeArea.addEventListener("input", function () {

    if (timer === null) {
        timer = setInterval(function () {
            timeLeft--;
            timeCard.textContent = timeLeft + "s";
            const elapsedMinutes = (30 - timeLeft) / 60;
            const words = correctChars / 5;
            const wpm = Math.round(words / elapsedMinutes);
            wpmCard.textContent = wpm;
            if (timeLeft <= 0) {
                clearInterval(timer);
                typeArea.disabled = true;
            }
        }, 1000);
    }

    const spans = cardResult.querySelectorAll("span");
    const typedChars = typeArea.value.split("");
    let correct = 0;

    spans.forEach(function (span, index) {
        const typedChar = typedChars[index];
        span.classList.remove("correct");
        span.classList.remove("wrong");
        if (typedChar === undefined) {

        } else if (typedChar === span.textContent) {
            span.classList.add("correct");
            correct++;
        } else {
            span.classList.add("wrong");
        }
    });

    correctChars = correct;

    if (typedChars.length > 0) {
        accuracyCard.textContent = Math.round(correct / typedChars.length * 100) + "%";
    }
});

restartBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    timeLeft = 30;
    correctChars = 0;
    typeArea.value = "";
    typeArea.disabled = false;
    timeCard.textContent = timeLeft + "s";
    wpmCard.textContent = 0;
    accuracyCard.textContent = 0 + "%";
    loadSentence();
    typeArea.focus();
});