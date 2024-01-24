const cluesTop = [
  // [0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
];

const cluesLeft = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3],
  [0, 0, 0, 0, 0],
];

const solution = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
];

const game = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const createGrid = () => {
  const grid = document.createElement("div");
  grid.className = "grid";

  // create game
  for (let i = 0; i < solution.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "row--game");

    grid.appendChild(row);

    for (let j = 0; j < solution[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell cell--game";
      cell.dataset.row = i;
      cell.dataset.column = j;

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

  // create clues top
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("div");
    row.className = "row";

    cluesTopElement.appendChild(row);

    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "cell--top");
      if (cluesTop[i][j] !== 0) {
        cell.innerText = cluesTop[i][j];
      }

      row.appendChild(cell);
    }
  }

  return cluesTopElement;
};

const createCluesLeft = () => {
  const cluesLeftElement = document.createElement("div");
  cluesLeftElement.className = "clues-left";

  // create clues left
  for (let i = 0; i < 5; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "row--left");

    cluesLeftElement.appendChild(row);

    for (let j = 0; j < 5; j++) {
      if (cluesLeft[i][j] !== 0) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = cluesLeft[i][j];
        row.appendChild(cell);
      }
    }
  }

  return cluesLeftElement;
};

const createEmptyGrid = () => {
  const emptyGridElement = document.createElement("div");
  emptyGridElement.className = "empty-grid";
  return emptyGridElement;
};

const checkEndGame = () => {
  const cells = document.querySelectorAll(".cell.cell--game");

  for (const cell of cells) {
    if (
      (cell.secretValue === 1 && !cell.classList.contains("checked")) ||
      (cell.secretValue === 0 && cell.classList.contains("checked"))
    ) {
      return false;
    }
  }
  setTimeout(() => {
    alert("Great! You have solved the nonogram!");
    document.querySelector(".container").remove();
    startGame();
  }, "500");
};

const startGame = () => {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  container.className = "container";

  body.appendChild(container);

  const grid = createGrid();
  const cluesTopElement = createCluesTop();
  const cluesLeftElement = createCluesLeft();
  const emptyGrid = createEmptyGrid();

  container.appendChild(emptyGrid);
  container.appendChild(cluesTopElement);
  container.appendChild(cluesLeftElement);
  container.appendChild(grid);

  grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell--game")) {
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
};

startGame();
