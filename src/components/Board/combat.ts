import { boardData, PATH } from "./mapData";
import type { GameState, Towers } from "../../types";

export const countTowersInRange = (
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

export const tick = (
  game: GameState,
  towers: Towers,
): { game: GameState; goldDelta: number } => {
  const damage = countTowersInRange(game.enemyIndex, towers);
  const hp = game.enemyHp - damage;

  if (hp <= 0) {
    return {
      game: {
        ...game,
        enemyIndex: 0,
        enemyHp: 3,
      },
      goldDelta: 10,
    };
  }

  // enemy movement
  if (game.enemyIndex + 1 >= PATH.length) {
    return {
      game: {
        ...game,
        enemyIndex: 0,
        lives: Math.max(0, game.lives - 1),
      },
      goldDelta: 0,
    };
  }

  return {
    game: {
      ...game,
      enemyIndex: game.enemyIndex + 1,
      enemyHp: game.enemyHp - damage,
    },
    goldDelta: 0,
  };
};
