import hints from './js/hints.js';
import engKeyboard from './js/eng-keyboard.js';
import initApp from './js/init-app.js';

initApp();

let currentWord;
let mistakesCount = 0;
let guessedCount = 0;
const keyboard = document.getElementById('keyboard');
const hiddenWord = document.getElementById('word');
const container = document.getElementById('body-parts-container');

const initKeyboard = () => {
  for (let i = 0; i < engKeyboard.length; i++) {
    const button = document.createElement('button');
    button.classList.add('keyboard__btn');
    button.innerText = engKeyboard[i];
    if (i === 10 || i === 19) {
      const newLiner = document.createElement('div');
      newLiner.classList.add('new-line');
      keyboard.append(newLiner);
    }
    keyboard.append(button);
  }
};
initKeyboard();

const pickRandomWord = () => {
  const { word, hint } = hints[Math.floor(Math.random() * hints.length)];
  currentWord = word.toUpperCase();
  console.log('♡ Make sure, you are using english keyboard ♡');
  console.log(`correct word: ${currentWord}`);
  document.getElementById('hint').innerText = hint;
  document.getElementById('guesses-counter').innerText = `0 / 6`;

  for (let i = 0; i < word.length; i++) {
    const character = document.createElement('li');
    character.classList.add('character');
    hiddenWord.append(character);
  }
};

pickRandomWord();

const restartGame = () => {
  hiddenWord.innerHTML = '';
  container.innerHTML = '';
  const buttons = keyboard.querySelectorAll('.keyboard__btn');
  buttons.forEach((button) => button.classList.remove('disabled'));
  console.clear();
  mistakesCount = 0;
  guessedCount = 0;
  const modal = document.getElementById('overlay');
  modal.remove();
  pickRandomWord();
};

const renderModal = (gameResult) => {
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const text = document.createElement('p');
  const button = document.createElement('button');

  overlay.className = 'overlay';
  overlay.id = 'overlay';
  modal.className = 'modal';

  text.innerHTML = `You ${gameResult} the game!<br />Secret word: ${currentWord}`;
  button.className = 'modal__btn';
  button.innerText = 'Play again';
  button.id = 'play-again-button';

  modal.append(text, button);
  overlay.append(modal);
  document.body.append(overlay);

  button.addEventListener('click', restartGame);
};

const addBodyPart = (bodyPart) => {
  const part = document.createElement('img');
  part.classList = `body-part-${bodyPart}`;
  part.src = `assets/img/body-part-${bodyPart}.png`;

  container.append(part);
};

const blockKeyboard = () => {
  const buttons = keyboard.querySelectorAll('.keyboard__btn');
  buttons.forEach((button) => button.classList.add('disabled'));
};

const playGameStep = (button) => {
  button.classList.add('disabled');
  const character = button.innerText;
  if (currentWord.includes(character)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === character) {
        hiddenWord.children[index].innerText = letter;
        hiddenWord.children[index].classList.add('character--guessed');
        guessedCount++;
      }
    });
  } else {
    document.getElementById('guesses-counter').innerText = `${mistakesCount + 1} / 6`;
    mistakesCount++;
    addBodyPart(mistakesCount);
  }

  if (mistakesCount === 6) {
    renderModal('loose');
    blockKeyboard();
  }

  if (guessedCount === currentWord.length) {
    renderModal('won');
    blockKeyboard();
  }
};

const addClickListener = () => {
  const NODE_NAME_BUTTON = 'BUTTON';

  keyboard.addEventListener('click', (event) => {
    const { target } = event;
    const { nodeName = '' } = target;

    if (nodeName === NODE_NAME_BUTTON) {
      playGameStep(target);
    }
  });
};
addClickListener();

const addKeypressListener = () => {
  document.addEventListener('keyup', (e) => {
    const pressedKey = e.key.toUpperCase();
    if (engKeyboard.includes(pressedKey)) {
      const button = Array.from(keyboard.children).filter((el) => el.innerHTML === pressedKey);
      if (button[0].classList.contains('disabled')) {
        return;
      }
      playGameStep(button[0]);
    }
  });
};
addKeypressListener();
