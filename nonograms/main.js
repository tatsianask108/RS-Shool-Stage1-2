import nonograms from "./js/nonograms-source.js";
import { leftCluesGenerator, topCluesGenerator } from "./js/clues-generators.js";
import { startTimer, resetTimer, pauseTimer } from "./js/timer.js";
import renderModal from "./js/modal.js";

const playedNonogram = nonograms[Math.floor(Math.random() * nonograms.length)];
const solution = playedNonogram.scheme;
let game = solution.map((row) => {
  return Array(row.length).fill(0);
});

//create levels and titles
const createLevels = () => {
  const levelsContainer = document.createElement("form");
  levelsContainer.id = "form-levels";
  levelsContainer.classList.add("levels-container");
  levelsContainer.innerHTML = `
  <input type="radio" name="level" value="easy" id="easy">
  <label for="easy" class="level">
    <span>easy(5x5)</span>
  </label>

  <input type="radio" name="level" value="medium" id="medium">
  <label for="medium" class="level">
    <span>medium(10x10)</span>
  </label>

  <input type="radio" name="level" value="hard" id="hard">
  <label for="hard" class="level">
    <span>hard(15x15)</span>
  </label>
  `;
  return levelsContainer;
};
const createTitlesList = (chosenLevel) => {
  const filteredNonograms = nonograms.filter((nonogram) => nonogram.level === chosenLevel);
  console.log(chosenLevel);
  const titlesContainer = document.createElement("form");
  titlesContainer.classList.add("titles-container");
  titlesContainer.id = "titles-form";

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
const createGrid = (preset) => {
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
        cell.classList.add("checked");
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

const createCluesTop = () => {
  const cluesTop = topCluesGenerator(solution);
  const cluesTopElement = document.createElement("div");
  cluesTopElement.className = "clues-top";

  for (let col = 0; col < cluesTop.length; col++) {
    const cellElement = document.createElement("div");

    for (let row = 0; row < cluesTop.length; row++) {
      const rowElement = document.createElement("div");

      if (cluesTop[row][col] !== 0) {
        rowElement.textContent = cluesTop[row][col];
        cellElement.appendChild(rowElement);
      }
    }
    cluesTopElement.appendChild(cellElement);
  }

  return cluesTopElement;
};

const createCluesLeft = () => {
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
        cell.classList.add("cell");
        cell.textContent = cluesLeft[i][j];
        row.appendChild(cell);
      }
    }
  }

  return cluesLeftElement;
};

const createEmptyGrid = () => {
  const emptyGridElement = document.createElement("div");
  return emptyGridElement;
};
//create grid

// render page layout
const renderLevels = () => {
  const levelsContainer = createLevels();
  document.body.prepend(levelsContainer);
};
renderLevels();

const renderTitlesList = (value) => {
  const titlesForm = document.getElementById("titles-form");
  const levelsForm = document.getElementById("form-levels");

  if (titlesForm) {
    titlesForm.remove();
  }
  const titlesContainer = createTitlesList(value);
  levelsForm.after(titlesContainer);
};
renderTitlesList("easy");

const renderGameField = (preset) => {
  const gameField = document.getElementById("game-field");

  if (gameField) {
    gameField.remove();
  }

  const container = document.createElement("div");
  container.id = "game-field";
  container.className = "container";

  const titlesForm = document.getElementById("titles-form");
  titlesForm.after(container);

  const grid = createGrid(preset);
  const cluesTopElement = createCluesTop();
  const cluesLeftElement = createCluesLeft();
  const emptyGrid = createEmptyGrid();

  container.appendChild(emptyGrid);
  container.appendChild(cluesTopElement);
  container.appendChild(cluesLeftElement);
  container.appendChild(grid);
};
renderGameField();

const renderButtons = () => {
  const body = document.body;

  const randomGameBtn = document.createElement("button");
  randomGameBtn.id = "random-game-btn";
  randomGameBtn.textContent = "Random Game";
  body.prepend(randomGameBtn);

  const savedGameBtn = document.createElement("button");
  savedGameBtn.id = "saved-game-btn";
  savedGameBtn.textContent = "Continue Saved Game";
  randomGameBtn.after(savedGameBtn);

  const gameTimer = document.createElement("div");
  gameTimer.id = "game-timer";
  gameTimer.textContent = "00 : 00";
  body.append(gameTimer);

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset Game";
  body.append(resetBtn);

  const showSolutionBtn = document.createElement("button");
  showSolutionBtn.id = "show-solution-btn";
  showSolutionBtn.textContent = "Show Solution";
  body.append(showSolutionBtn);

  const saveBtn = document.createElement("button");
  saveBtn.id = "save-btn";
  saveBtn.textContent = "Save Game";
  body.append(saveBtn);
  saveBtn.addEventListener("click", () => {
    console.log(game);
    localStorage.setItem("currentGame", JSON.stringify(game));
  });

  // const continueBtn = document.createElement("button");
  // continueBtn.id = "continue-btn";
  // continueBtn.textContent = "Continue Game";
  // body.append(continueBtn);
  // continueBtn.addEventListener("click", () => {
  //   const currentGame = JSON.parse(localStorage.getItem("currentGame"));
  //   game = currentGame;
  //   console.log(game);
  //   renderGameField(game);
  //   addGridListeners();
  // });
};
renderButtons();
// render page layout



//check every game step
const checkEndGame = () => {
  const cells = document.querySelectorAll(".cell.cell-game");

  for (const cell of cells) {
    if (
      (cell.secretValue === 1 && !cell.classList.contains("checked")) ||
      (cell.secretValue === 0 && cell.classList.contains("checked"))
    ) {
      return false;
    }
  }
  const gameTimer = document.getElementById("game-timer").textContent;
  setTimeout(() => {
    // renderModal(gameTimer, () => {
    //   newGame()...
    // });
    renderModal(gameTimer);
    resetTimer();
    renderGameField();
    addGridListeners();
  }, "400");
};
//check every game step



const resetGame = () => {
  const cells = document.querySelectorAll(".cell.cell-game");
  cells.forEach((el) => {
    el.classList.remove("crossed", "checked");
    el.textContent = "";
  });
  resetTimer();
};

const showSolution = () => {
  pauseTimer();
  renderGameField(solution);
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.add("btn-disabled"));
};

const addGridListeners = () => {
  const formLevels = document.getElementById("form-levels");
  formLevels.addEventListener("change", (e) => {
    const chosenLevel = e.target.value;
    renderTitlesList(chosenLevel);
    // addEventListeners();
    // startGame();
  });

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

      e.target.classList.toggle("checked");
      checkEndGame();
    }
  });

  grid.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("cell-game")) {
      if (e.target.classList.contains("crossed")) {
        e.target.classList.remove("crossed");
        e.target.innerHTML = "";
      } else {
        e.target.classList.add("crossed");
        e.target.innerHTML = "✖";
      }
    }
  });

  grid.addEventListener("pointerup", () => {
    startTimer();
  });
};
addGridListeners();

const addButtonsListeners = () => {
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.addEventListener("click", resetGame);

  const showSolutionBtn = document.getElementById("show-solution-btn");
  showSolutionBtn.addEventListener("click", showSolution);
};
addButtonsListeners();
