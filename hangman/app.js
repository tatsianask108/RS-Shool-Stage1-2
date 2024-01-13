import { hints } from "./js/hints.js";

const engKeyboard = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

let currentWord;
let mistakesCount = 0;
let guessedCount = 0;

const body = document.getElementById("body");

const initApp = () => {
  const createElement = (elTag, elClass, elId, elInnerText, elSrc) => {
    const element = document.createElement(elTag);
    if (elClass) element.classList.add(elClass);
    if (elId) element.id = elId;
    if (elInnerText) element.innerText = elInnerText;
    if (elSrc) element.src = elSrc;

    return element;
  };

  const container = document.createElement("div");
  const gallows = document.createElement("div");
  const quiz = document.createElement("div");

  container.classList.add("container");

  // gallows
  gallows.classList.add("gallows");
  gallows.append(createElement("img", "gallows-img", null, null, "./assets/img/gallows.png"));
  const wrapper = createElement("div", "wrapper", null, null);
  gallows.append(wrapper);
  wrapper.append(createElement("div", "body-parts-container", "body-parts-container", null, null));
  // gallows.innerHTML = `
  //   <img class="gallows-img" src="./assets/img/gallows.png" alt="gallows" />
  //   <div class="wrapper">
  //     <div class="body-parts-container" id="body-parts-container">
  //     </div>
  //   </div>`;

  quiz.classList.add("quiz");
  const content = createElement("div", "content", null, null, null);
  quiz.append(content);
  quiz.append(createElement("div", "keyboard", "keyboard", null, null));
  content.append(createElement("h1", null, null, "Hangman Game", null));
  content.append(createElement("ul", "word", "word", null, null));
  const hint = createElement("p", "hint", null, "Hint: ", null);
  content.append(hint);
  hint.append(createElement("span", "hint-question", "hint", null, null));
  createElement();
  const guessesText = createElement("p", "guesses-text", null, "Incorrect guesses: ", null);
  content.append(guessesText);
  guessesText.append(createElement("span", "guesses-counter", "guesses-counter", null, null));
  // quiz.innerHTML = `
  //   <div class="content">
  //     <h1>Hangman Game</h1>
  //     <ul class="word" id="word"></ul>
  //     <p class="hint">Hint: <span id="hint"></span></p>
  //     <p class="guesses-text">
  //       Incorrect guesses: <span class="guesses-counter" id="guesses-counter"></span>
  //     </p>
  //   </div>
  //   <div class="keyboard" id="keyboard"></div>`;

  body.prepend(container);
  container.append(gallows);
  container.append(quiz);
};
initApp();

const keyboard = document.getElementById("keyboard");
const hiddenWord = document.getElementById("word");
const container = document.getElementById("body-parts-container");

const initKeyboard = () => {
  for (let i = 0; i < engKeyboard.length; i++) {
    const button = document.createElement("button");
    button.classList.add("keyboard__btn");
    button.innerText = engKeyboard[i];
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
  const { word, hint } = hints[Math.floor(Math.random() * hints.length)];
  currentWord = word.toUpperCase();
  console.log("♡ Make sure, you are using english keyboard ♡");
  console.log("correct word: " + currentWord);
  document.getElementById("hint").innerText = hint;
  document.getElementById("guesses-counter").innerText = `0 / 6`;

  for (let i = 0; i < word.length; i++) {
    const character = document.createElement("li");
    character.classList.add("character");
    hiddenWord.append(character);
  }
};

pickRandomWord();

const restartGame = () => {
  hiddenWord.innerHTML = "";
  container.innerHTML = "";
  const buttons = keyboard.querySelectorAll(".keyboard__btn");
  buttons.forEach((button) => button.classList.remove("disabled"));
  console.clear();
  mistakesCount = 0;
  guessedCount = 0;
  const modal = document.getElementById("overlay");
  modal.remove();
  pickRandomWord();
};

const renderModal = (gameResult) => {
  const overlay = document.createElement("div"),
    modal = document.createElement("div"),
    text = document.createElement("p"),
    button = document.createElement("button");

  overlay.className = "overlay";
  overlay.id = "overlay";
  modal.className = "modal";

  text.innerHTML = `You ${gameResult} the game!<br />Secret word: ${currentWord}`;
  button.className = "modal__btn";
  button.innerText = "Play again";
  button.id = "play-again-button";

  modal.append(text, button);
  overlay.append(modal);
  document.body.append(overlay);

  button.addEventListener("click", restartGame);
};

const playGameStep = (button, character) => {
  button.classList.add("disabled");
  if (currentWord.includes(character)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === character) {
        hiddenWord.children[index].innerText = letter;
        hiddenWord.children[index].classList.add("character--guessed");
        guessedCount++;
      }
    });
  } else {
    document.getElementById("guesses-counter").innerText = `${mistakesCount + 1} / 6`;
    mistakesCount++;
    addBodyPart(mistakesCount);
  }

  if (mistakesCount === 6) {
    renderModal("loose");
  }

  if (guessedCount === currentWord.length) {
    renderModal("won");
  }
};

const addBodyPart = (bodyPart) => {
  const part = document.createElement("img");
  part.classList = `body-part-${bodyPart}`;
  part.src = `assets/img/body-part-${bodyPart}.png`;

  container.append(part);
};
const addClickListener = () => {
  keyboard.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      playGameStep(e.target, e.target.innerText);
    }
  });
};
addClickListener();

const addKeypressListener = () => {
  document.addEventListener("keyup", (e) => {
    const pressed_key = e.key.toUpperCase();
    if (engKeyboard.includes(pressed_key)) {
      const button = Array.from(keyboard.children).filter((el) => el.innerHTML === pressed_key);
      if (button[0].classList.contains("disabled")) {
        return;
      }
      playGameStep(button[0], pressed_key);
    }
  });
};
addKeypressListener();
