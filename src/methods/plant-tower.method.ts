import type { GameState } from "../types";

const TOWER_PRICE = 20;

export const plantTowerAt = (
  game: GameState,
  row: number,
  col: number,
): GameState => {
  const towerKey = `${row}-${col}`;

  if (game.towers.has(towerKey)) return game;
  if (game.gold < TOWER_PRICE) return game;

  return {
    ...game,
    gold: game.gold - TOWER_PRICE,
    towers: new Set(game.towers).add(towerKey),
  };
};
