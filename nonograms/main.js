const cluesTop = [
  // [0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
];

const cluesLeft = [[], [1, 1], [], [3], []];

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
  for (let i = 0; i < 5; i++) {
    const row = document.createElement("div");
    row.className = "row";

    grid.appendChild(row);

    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.className = "cell cell-game";
      cell.dataset.row = i;
      cell.dataset.column = j;

      row.appendChild(cell);
      // if(solution[i][j] === 1) {
      //   cell.classList.add('checked');
      // }
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
      cell.className = "cell";
      if (cluesTop[i][j] !== 0) {
        cell.innerText = cluesTop[i][j];
    }

      row.appendChild(cell);
    }
  }

  return cluesTopElement;
};

const startGame = () => {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  container.className = "container";

  body.appendChild(container);

  const grid = createGrid();
  const cluesTopElement = createCluesTop();
  //const cluesLeftElement = createCluesLeft();
  //const emptyGrid = createEmptyGrid();

  // ??
  //container.appendChild(emptyGrid);
  container.appendChild(cluesTopElement);
  //container.appendChild(cluesLeftElement);
  container.appendChild(grid);

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell-game")) {
      const rowIndex = e.target.dataset.row;
      const columnIndex = e.target.dataset.column;

      const gameCell = game[rowIndex][columnIndex];

      // game[rowIndex][columnIndex] = !gameCell;

      if (gameCell === 0) {
        game[rowIndex][columnIndex] = 1;
      } else {
        game[rowIndex][columnIndex] = 0;
      }

      e.target.classList.toggle("checked");
      // checkEndGame()
    }
  });
};

startGame();
