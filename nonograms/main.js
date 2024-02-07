import { DEFAULT_LEVEL } from "./js/constants.js";
import nonograms from "./js/nonograms-source.js";
import { leftCluesGenerator, topCluesGenerator } from "./js/clues-generators.js";
import { startTimer, pauseTimer, resetTimer } from "./js/timer.js";
import renderScoreModal from "./js/score-modal.js";
import renderModal from "./js/modal.js";
import {
  disableButtons,
  unDisableButtons,
  setWinToLocalStorage,
  formatTimeToSeconds,
} from "./js/utilities.js";
import { sounds, soundsHandler } from "./js/sounds.js";
import { setTheme, changeTheme } from "./js/themes.js";

let curLevel;
let curPicture;
let solution;
let game;

const renderPageTemplate = () => {
  const template = `<header class="header">
  <h1>Nonograms</h1>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <h3 id="score-table">Score Table</h3>
      </li>
      <li class="nav__item">
        <div class="icon icon-theme" id="theme-icon"></div>
      </li>
      <li class="nav__item">
      <input type="checkbox" name="sounds" id="sounds-state">
      <label for="sounds-state" class="nav__item-label">
        <div class="icon icon-sound-on" id="sound-icon"></div>
      </label>
      </li>
    </ul>
  </nav>
</header>
<main id="main-container" class="main__container">
<div id="game-container" class="game-container"></div>
</main>
<footer class="footer"> 
  <a class="footer__link" href="https://github.com/tatsianask108" target="_blank">
  <span class="icon icon-github"></span>
  <span>Tatsiana(GitHub)</span>
  </a>
</footer>`;

  document.body.insertAdjacentHTML("afterbegin", template);
  document.getElementById("score-table").addEventListener("click", renderScoreModal);
  document.getElementById("theme-icon").addEventListener("click", changeTheme);
};

const playRandomGame = () => {
  const playedNonogramObj = nonograms[Math.floor(Math.random() * nonograms.length)];
  curLevel = playedNonogramObj.level;
  curPicture = playedNonogramObj.title;
  solution = playedNonogramObj.scheme;

  document.querySelector(`#form-levels #${curLevel}`).checked = true;

  renderTitlesList(curLevel);

  document.querySelector(`#form-titles #${curPicture}`).checked = true;
  resetTimer();
  renderGameField(solution);
  unDisableButtons();
};

const playSavedGame = () => {
  game = JSON.parse(localStorage.getItem("savedGameState"));
  solution = JSON.parse(localStorage.getItem("savedGameSolution"));
  curLevel = localStorage.getItem("savedGameLevel");
  curPicture = localStorage.getItem("savedGamePicture");

  document.querySelector(`#form-levels #${curLevel}`).checked = true;
  renderTitlesList(curLevel);
  document.querySelector(`#form-titles #${curPicture}`).checked = true;

  resetTimer();
  // const gameTimer = document.getElementById("game-timer");
  // const savedTime = localStorage.getItem("savedGameTime");
  // gameTimer.textContent = savedTime;
  renderGameField(solution, game);
  unDisableButtons();
};
//create levels and titles
const createLevels = () => {
  const levelsContainer = document.createElement("form");
  levelsContainer.id = "form-levels";
  levelsContainer.classList.add("levels-container");
  levelsContainer.innerHTML = `
  <input type="radio" name="level" value="easy" id="easy">
  <label for="easy" class="level level_easy">
    <span>easy(5x5)</span>
  </label>

  <input type="radio" name="level" value="medium" id="medium">
  <label for="medium" class="level level_medium">
    <span>medium(10x10)</span>
  </label>

  <input type="radio" name="level" value="hard" id="hard">
  <label for="hard" class="level level_hard">
    <span>hard(15x15)</span>
  </label>
  `;
  return levelsContainer;
};

const createTitlesList = (chosenLevel) => {
  const filteredNonograms = nonograms.filter((nonogram) => nonogram.level === chosenLevel);
  const titlesContainer = document.createElement("form");
  titlesContainer.classList.add("titles-container");
  titlesContainer.id = "form-titles";

  for (let i = 0; i < filteredNonograms.length; i++) {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "title";
    input.value = filteredNonograms[i].title;
    input.id = filteredNonograms[i].title;

    const label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.className = "level";

    const span = document.createElement("span");
    span.textContent = filteredNonograms[i].title;

    label.append(span);
    titlesContainer.append(input, label);
  }

  return titlesContainer;
};

//create grid
/**
 *
 * @param {*} preset Matrix of the Saved Game or Game Solution
 * @returns
 */
const createGrid = (solution, preset) => {
  const grid = document.createElement("div");
  grid.className = "grid";
  grid.id = "grid";

  for (let i = 0; i < solution.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "row-game");

    grid.appendChild(row);

    for (let j = 0; j < solution[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell cell-game";
      cell.dataset.row = i;
      cell.dataset.column = j;

      if (preset && preset[i][j] === 1) {
        cell.classList.add("marked");
      }

      if (solution[i][j] === 1) {
        Object.assign(cell, { secretValue: 1 });
      } else {
        Object.assign(cell, { secretValue: 0 });
      }
      row.appendChild(cell);
    }
  }

  return grid;
};

const createCluesTop = (solution) => {
  const cluesTop = topCluesGenerator(solution);
  const cluesTopElement = document.createElement("div");

  const colsArray = [];
  let maxCells = 0;

  cluesTopElement.className = "clues-top";

  for (let col = 0; col < cluesTop.length; col++) {
    const collElement = document.createElement("div");
    collElement.className = "coll";

    for (let row = 0; row < cluesTop.length; row++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      if (cluesTop[row][col] !== 0) {
        cell.textContent = cluesTop[row][col];
        collElement.appendChild(cell);
      }
    }

    colsArray.push(collElement);
    if (collElement.children.length > maxCells) {
      maxCells = collElement.children.length;
    }
  }

  colsArray.map((column) => {
    for (let i = column.children.length; i < maxCells; i++) {
      let emptyCell = document.createElement("div");
      emptyCell.className = "cell empty";
      column.prepend(emptyCell);
    }
    cluesTopElement.appendChild(column);
  });

  return cluesTopElement;
};

const createCluesLeft = (solution) => {
  const cluesLeft = leftCluesGenerator(solution);
  const cluesLeftElement = document.createElement("div");
  cluesLeftElement.className = "clues-left";

  for (let i = 0; i < cluesLeft.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "row-left");

    cluesLeftElement.appendChild(row);

    for (let j = 0; j < cluesLeft.length; j++) {
      if (cluesLeft[i][j] !== 0) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "cell-clues-left");
        cell.textContent = cluesLeft[i][j];
        row.appendChild(cell);
      }
    }

    if (!row.children.length) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
  }

  return cluesLeftElement;
};

const createEmptyGrid = () => {
  const emptyGridElement = document.createElement("div");
  emptyGridElement.className = "empty-grid";
  return emptyGridElement;
};
//create grid

// render page layout
const renderLevels = () => {
  const levelsContainer = createLevels();
  const gameContainer = document.getElementById("game-container");
  gameContainer.prepend(levelsContainer);
};

const renderTitlesList = (value) => {
  const titlesForm = document.getElementById("form-titles");
  const levelsForm = document.getElementById("form-levels");

  if (titlesForm) {
    titlesForm.remove();
  }
  const titlesContainer = createTitlesList(value);
  levelsForm.after(titlesContainer);

  titlesContainer.addEventListener("change", (e) => {
    const chosenPicture = e.target.value;
    curPicture = chosenPicture;

    console.log("curLevel", curLevel, "curPicture", curPicture);

    solution = nonograms.filter(
      (nonogram) => nonogram.level === curLevel && nonogram.title === curPicture
    )[0].scheme;

    resetTimer();
    renderGameField(solution, false);
    unDisableButtons();
  });
};

const renderTimer = () => {
  const timer = document.getElementById("timer-container");
  if (timer) {
    timer.remove();
  }
  const titlesForm = document.getElementById("form-titles");
  const timerContainer = document.createElement("div");
  timerContainer.id = "timer-container";
  timerContainer.textContent = "Timer: ";
  const gameTimer = document.createElement("span");
  gameTimer.id = "game-timer";
  gameTimer.textContent = "00:00";
  timerContainer.append(gameTimer);
  titlesForm.after(timerContainer);
};

const renderGameField = (solution, preset) => {
  console.clear();
  console.log("↓ Nonogram solution ↓", solution);
  const isGameField = document.getElementById("game-field");

  if (isGameField) {
    isGameField.remove();
  }

  const gameField = document.createElement("div");
  gameField.id = "game-field";
  gameField.className = "game-field";

  const timer = document.getElementById("timer-container");
  timer.after(gameField);

  game = solution.map((row) => {
    return Array(row.length).fill(0);
  });

  const grid = createGrid(solution, preset);
  // console.log("solution", solution);
  const cluesTopElement = createCluesTop(solution);
  const cluesLeftElement = createCluesLeft(solution);
  const emptyGrid = createEmptyGrid();

  gameField.appendChild(emptyGrid);
  gameField.appendChild(cluesTopElement);
  gameField.appendChild(cluesLeftElement);
  gameField.appendChild(grid);

  addGridListeners();
};

const renderGameCreationButtons = () => {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";

  const gameCreationButtonsContainer = document.createElement("div");
  gameCreationButtonsContainer.id = "game-creation-buttons";
  gameCreationButtonsContainer.className = "game-creation-buttons";

  const randomGameBtn = document.createElement("button");
  randomGameBtn.id = "random-game-btn";
  randomGameBtn.textContent = "Random Game";
  randomGameBtn.classList.add("btn");
  randomGameBtn.addEventListener("click", () => {
    playRandomGame();
  });

  const continueGameBtn = document.createElement("button");
  continueGameBtn.id = "continue-game-btn";
  continueGameBtn.textContent = "Continue Saved Game";
  continueGameBtn.classList.add("btn");

  const isSavedGame = localStorage.getItem("savedGameLevel");
  if (!isSavedGame) {
    continueGameBtn.classList.add("btn-disabled");
  }
  continueGameBtn.addEventListener("click", () => {
    playSavedGame();
  });

  const additionalButtons = document.createElement("div");
  additionalButtons.classList.add("additional-buttons");
  additionalButtons.id = "additional-buttons";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset Game";
  resetBtn.classList.add("btn");
  additionalButtons.append(resetBtn);
  resetBtn.addEventListener("click", resetGame);

  const showSolutionBtn = document.createElement("button");
  showSolutionBtn.id = "show-solution-btn";
  showSolutionBtn.textContent = "Show Solution";
  showSolutionBtn.classList.add("btn");
  additionalButtons.append(showSolutionBtn);
  showSolutionBtn.addEventListener("click", showSolution);

  const saveBtn = document.createElement("button");
  saveBtn.id = "save-btn";
  saveBtn.textContent = "Save Game";
  saveBtn.classList.add("btn");
  additionalButtons.append(saveBtn);
  saveBtn.addEventListener("click", () => {
    document.getElementById("continue-game-btn").classList.remove("btn-disabled");
    localStorage.setItem("savedGameState", JSON.stringify(game));
    localStorage.setItem("savedGameSolution", JSON.stringify(solution));
    localStorage.setItem("savedGameLevel", curLevel);
    localStorage.setItem("savedGamePicture", curPicture);
    const currTime = document.getElementById("game-timer").innerText;
    localStorage.setItem("savedGameTime", currTime);
  });

  gameCreationButtonsContainer.append(randomGameBtn);
  gameCreationButtonsContainer.append(continueGameBtn);
  const main = document.getElementById("main-container");
  buttonsContainer.append(gameCreationButtonsContainer);
  buttonsContainer.append(additionalButtons);
  main.append(buttonsContainer);
};

//check every game step
const checkWin = () => {
  const cells = document.querySelectorAll(".cell.cell-game");

  for (const cell of cells) {
    if (
      (cell.secretValue === 1 && !cell.classList.contains("marked")) ||
      (cell.secretValue === 0 && cell.classList.contains("marked"))
    ) {
      return false;
    }
  }
  const gameTimer = document.getElementById("game-timer").textContent;
  const formattedTime = formatTimeToSeconds(gameTimer);
  setTimeout(() => {
    renderModal(formattedTime);
    sounds.audioWinGame.play();
    pauseTimer();
    const grid = document.getElementById("grid");
    grid.classList.add("grid-disabled");
    disableButtons();
    setWinToLocalStorage(formattedTime, curLevel, curPicture);
  }, "400");
};
//check every game step

const resetGame = () => {
  const grid = document.getElementById("grid");
  grid.classList.remove("grid-disabled");

  const cells = document.querySelectorAll(".cell.cell-game");
  cells.forEach((el) => {
    el.classList.remove("crossed", "marked");
    el.textContent = "";
  });
  unDisableButtons();
  resetTimer();
};
export default resetGame;

const showSolution = () => {
  pauseTimer();
  renderGameField(solution, solution);
  const grid = document.getElementById("grid");
  grid.classList.add("grid-disabled");
  disableButtons();
};

const addGridListeners = () => {
  const grid = document.getElementById("grid");
  grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell-game")) {
      const rowIndex = e.target.dataset.row;
      const columnIndex = e.target.dataset.column;

      const gameCell = game[rowIndex][columnIndex];

      if (gameCell === 0) {
        game[rowIndex][columnIndex] = 1;
      } else {
        game[rowIndex][columnIndex] = 0;
      }

      if (e.target.classList.contains("marked")) {
        e.target.classList.remove("marked");
        sounds.audioErase.play();
      } else {
        e.target.classList.add("marked");
        sounds.audioMarkCell.play();
      }

      if (e.target.classList.contains("crossed")) {
        e.target.classList.remove("crossed");
        e.target.textContent = "";
        e.target.classList.add("marked");
        sounds.audioMarkCell.play();
      }
      checkWin();
    }
  });

  grid.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("cell-game")) {
      if (e.target.classList.contains("crossed")) {
        e.target.classList.remove("crossed");
        e.target.innerHTML = "";
        sounds.audioErase.play();
      } else {
        e.target.classList.add("crossed");
        e.target.innerHTML = "✖";
        sounds.audioCrossCell.play();
      }
      if (e.target.classList.contains("marked")) {
        e.target.classList.remove("marked");
        e.target.classList.add("crossed");
      }
    }
    checkWin();
  });

  grid.addEventListener("pointerup", () => {
    startTimer();
  });
};

const addFormListener = () => {
  const formLevels = document.getElementById("form-levels");
  formLevels.addEventListener("change", (e) => {
    const chosenLevel = e.target.value;
    curLevel = chosenLevel;
    renderTitlesList(chosenLevel);
  });
};

const initGameOnLoad = () => {
  const defaultNonogramObj = nonograms.filter((nonogram) => nonogram.level === "easy")[0];
  solution = defaultNonogramObj.scheme;
  curLevel = defaultNonogramObj.level;
  curPicture = defaultNonogramObj.title;

  document.querySelector(`#form-levels #${curLevel}`).checked = true;
  document.querySelector(`#form-titles #${curPicture}`).checked = true;
};

const initLocalStorage = () => {
  const scoreList = localStorage.getItem("tatskScoreList");
  if (!scoreList) {
    localStorage.setItem("tatskScoreList", "[]");
  }

  const theme = localStorage.getItem("tatskTheme");
  if (!theme) {
    localStorage.setItem("tatskTheme", "light");
  }
};

const startGame = () => {
  renderPageTemplate();
  renderGameCreationButtons();
  renderLevels();
  renderTitlesList(DEFAULT_LEVEL);
  addFormListener();
  initGameOnLoad();
  initLocalStorage();
  renderTimer();
  renderGameField(solution);
  soundsHandler();
  setTheme();
};

startGame();
