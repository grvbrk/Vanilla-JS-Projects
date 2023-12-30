export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export function createBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = getMinePositions(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUSES.HIDDEN;
      const tile = {
        element,
        x,
        y,
        mine: minePositions.some((p) => isPositionMatch(p, { x, y })),
        get status() {
          // tile.status
          return this.element.dataset.status;
        },
        set status(value) {
          //tile.status === TILE_STATUSES.xyz
          this.element.dataset.status = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}

export function markTile(tile) {
  //   if (
  //     tile.status !== TILE_STATUSES.HIDDEN &&
  //     tile.status !== TILE_STATUSES.MARKED
  //   ) {
  //     return;
  //   }

  // If marked => Hidden, if Hidden => Marked
  if (tile.status === TILE_STATUSES.MARKED) tile.status = TILE_STATUSES.HIDDEN;
  else tile.status = TILE_STATUSES.MARKED;
}

export function revealTile(board, tile) {
  // Any tile which is not "Hidden" (Marked, Mine or Number) will prematurely return
  if (tile.status !== TILE_STATUSES.HIDDEN) return;
  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE;
    return;
  }
  tile.status = TILE_STATUSES.NUMBER;
  const adjacentTiles = nearbyTiles(board, tile);
  const mines = adjacentTiles.filter((tile) => tile.mine);
  if (mines.length != 0) {
    tile.element.textContent = mines.length;
  }
  if (mines.length === 0) {
    adjacentTiles.forEach((tile) => revealTile(board, tile));
  }
}

export function checkWin(board) {
  //Check if every single hidden or marked tile is a mine
  const hiddenTiles = [];
  board.forEach((row) => {
    row.forEach((tile) => {
      if (
        tile.status === TILE_STATUSES.HIDDEN ||
        tile.status === TILE_STATUSES.MARKED
      ) {
        hiddenTiles.push(tile);
      }
    });
  });
  return hiddenTiles.every((tile) => tile.mine);
}

export function checkLose(board) {
  //Check if even one tile has it's status set as mine
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUSES.MINE;
    });
  });
}

function nearbyTiles(board, { x, y }) {
  const tiles = [];
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) tiles.push(tile);
    }
  }
  return tiles;
}

function getMinePositions(boardSize, numberOfMines) {
  const positions = [];
  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some((p) => isPositionMatch(p, position))) {
      positions.push(position);
    }
  }
  return positions;
}

function isPositionMatch(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}
