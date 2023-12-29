import { createBoard, markTile } from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 4;

const boardElement = document.getElementById("board");
document.getElementById("mine-count").textContent = NUMBER_OF_MINES;
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
console.log(board);

board.forEach((row) => {
  return row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {});
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
    });
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
