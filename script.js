const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

const randomWords = [
  "application",
  "programming",
  "interface",
  "javascript",
  "coding",
];

let selectedWord = randomWords[Math.floor(Math.random() * randomWords.length)];

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `
      <span class="letter">${
        correctLetters.includes(letter) ? letter : ""
      }</span>
    `
    )
    .join("")}
`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

function updateWrongLettersEl() {
  //Display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Sorry, you lost!`
    popup.style.display = 'flex'
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
  //Empty arrays
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = randomWords[Math.floor(Math.random() * randomWords.length)];

  displayWord()

  updateWrongLettersEl()
  popup.style.display = 'none'

})

displayWord();
