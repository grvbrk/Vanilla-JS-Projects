import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
} from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 4;

const boardElement = document.getElementById("board");
document.getElementById("mine-count").textContent = NUMBER_OF_MINES;
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

board.forEach((row) => {
  return row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
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
