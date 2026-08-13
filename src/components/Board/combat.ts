import { boardData, PATH } from "./mapData";

export const countTowersInRangeCount = (
  enemyIndex: number,
  towers: Set<string>,
): number => {
  const enemyPosition = PATH[enemyIndex];
  const ROWS = boardData.length;
  const COLS = boardData[0].length;

  const d = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return d
    .map(([dRow, dCol]) => [dRow + enemyPosition.row, dCol + enemyPosition.col])
    .filter(([row, col]) => {
      if (row < 0 || row >= ROWS) return false;
      if (col < 0 || col >= COLS) return false;

      if (towers.has(`${row}-${col}`)) return true;

      return false;
    }).length;
};
