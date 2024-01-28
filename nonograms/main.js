import renderModal from "./js/modal.js";
import { startTimer, resetTimer, pauseTimer } from "./js/timer.js";
import { solution, cluesLeft, cluesTop } from "./js/clues-generators.js";

let game = solution.map((row) => {
  return Array(row.length).fill(0);
});

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
    //   createGrid
    // });
    renderModal(gameTimer);
    resetTimer();
    document.querySelector(".container").remove();
    renderGameField();
    addGridListeners();
  }, "400");
};

const resetGame = () => {
  const cells = document.querySelectorAll(".cell.cell-game");
  cells.forEach((el) => {
    el.classList.remove("crossed", "checked");
    el.textContent = "";
  });
  resetTimer();
};

const renderGameField = (preset) => {
  const body = document.body;
  const gameField = document.getElementById("game-field");

  if (gameField) {
    gameField.remove();
  }

  const container = document.createElement("div");
  container.id = "game-field";
  container.className = "container";

  body.prepend(container);

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

const showSolution = () => {
  pauseTimer();
  renderGameField(solution);
  const buttons = document.querySelectorAll("button");
  console.log(buttons);
  buttons.forEach((btn) => btn.classList.add("btn-disabled"));
};

const renderButtons = () => {
  const body = document.body;

  const gameTimer = document.createElement("div");
  gameTimer.id = "game-timer";
  gameTimer.textContent = "00 : 00";
  body.append(gameTimer);

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset Game";
  body.append(resetBtn);
  resetBtn.addEventListener("click", resetGame);

  const showSolutionBtn = document.createElement("button");
  showSolutionBtn.id = "show-solution-btn";
  showSolutionBtn.textContent = "Show Solution";
  body.append(showSolutionBtn);
  showSolutionBtn.addEventListener("click", () => {
    showSolution();
  });

  const saveBtn = document.createElement("button");
  saveBtn.id = "save-btn";
  saveBtn.textContent = "Save Game";
  body.append(saveBtn);
  saveBtn.addEventListener("click", () => {
    console.log(game);
    localStorage.setItem("currentGame", JSON.stringify(game));
  });

};

renderButtons();

// function startGame() {
//   addGridListeners();
// }
