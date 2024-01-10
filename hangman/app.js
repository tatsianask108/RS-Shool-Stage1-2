import { hints } from "./hints.js";

const engKeyboard = [
  113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122,
  120, 99, 118, 98, 110, 109,
];

let currentWord = word;
let mistakesCount = 0;


const keyboard = document.getElementById("keyboard");
const hiddenWord = document.getElementById("word");

const initKeyboard = () => {
  for (let i = 0; i < engKeyboard.length; i++) {
    const button = document.createElement("button");
    button.classList.add("keyboard__btn");
    button.innerText = String.fromCharCode(engKeyboard[i]);
    if (i === 10 || i === 19) {
      const newLiner = document.createElement("div");
      newLiner.classList.add("new-line");
      keyboard.append(newLiner);
    }
    keyboard.append(button);
  }
};

initKeyboard();

const pickRandomWord = () => {
  const { word, hint } = hints[Math.round(Math.random() * hints.length)];
  currentWord = word;
  console.log(word);
  document.getElementById("hint").innerText = hint;
  document.getElementById("guesses-counter").innerText = `0 / ${word.length}`;

  for (let i = 0; i < word.length; i++) {
    const character = document.createElement("li");
    character.classList.add("character");
    hiddenWord.append(character);
  }
};

pickRandomWord();

const renderModal = (gameResult) => {
  const overlay = document.createElement("div"),
    modal = document.createElement("div"),
    text = document.createElement("p"),
    button = document.createElement("button");

  overlay.className = "overlay";
  modal.className = "modal";

  text.innerHTML = `You ${gameResult} the game!<br />Secret word: ${currentWord}`;
  button.className = "modal__btn";
  button.innerText = "Play again";

  modal.append(text, button);
  overlay.append(modal);
  document.body.append(overlay);
};

const initGame = (button, character) => {
  button.classList.add("disabled");
  if (currentWord.includes(character)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === character) {
        hiddenWord.children[index].innerText = letter;
        hiddenWord.children[index].classList.add("character--guessed");
      }
    });
  } else {
    document.getElementById("guesses-counter").innerText = `${mistakesCount + 1} / ${
      currentWord.length
    }`;
    mistakesCount++;
    if (mistakesCount === currentWord.length) {
      const gameResult = "loose";
      renderModal(gameResult);
    }
  }
};

const addListeners = () => {
  keyboard.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      initGame(e.target, e.target.innerText.toLowerCase());
    }
  });
};

addListeners();
