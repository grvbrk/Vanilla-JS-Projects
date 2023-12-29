const TILE_STATUSES = {
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
      element.dataset.val = TILE_STATUSES.HIDDEN;
      const tile = {
        element,
        x,
        y,
        mine: minePositions.some((p) => isPositionMatch(p, { x, y })),
        get val() {
          return this.element.dataset.val;
        },
        set val(value) {
          this.element.dataset.val = value;
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
  if (tile.val === TILE_STATUSES.MARKED) tile.val = TILE_STATUSES.HIDDEN;
  else tile.val = TILE_STATUSES.MARKED;
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
