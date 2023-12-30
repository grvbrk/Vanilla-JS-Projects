import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.getElementById("board");
const messageText = document.getElementById("subtext");
document.getElementById("mine-count").textContent = NUMBER_OF_MINES;

board.forEach((row) => {
  return row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd();
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      calcMinesLeft();
    });
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);

function calcMinesLeft() {
  let count = 0;
  board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.status === TILE_STATUSES.MARKED) count++;
    });
  });
  document.getElementById("mine-count").textContent = NUMBER_OF_MINES - count;
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    // #NEW

    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You win";

    board.forEach((row) => {
      row.forEach((tile) => {
        if (
          tile.status === TILE_STATUSES.HIDDEN ||
          tile.status === TILE_STATUSES.MARKED
        ) {
          tile.status = TILE_STATUSES.MINE;
        }
      });
    });
  }

  if (lose) {
    messageText.textContent = "You lose";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) {
          tile.status === TILE_STATUSES.HIDDEN;
        }
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}
