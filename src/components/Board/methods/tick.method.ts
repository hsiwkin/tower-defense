import type { GameState } from "../../../types";
import { countTowersInRange } from "./count-towers-in-range.method";
import { PATH } from "../mapData";

export const tick = (game: GameState): GameState => {
  const damage = countTowersInRange(game.enemyIndex, game.towers);
  const hp = game.enemyHp - damage;

  if (hp <= 0) {
    return {
      ...game,
      enemyIndex: 0,
      enemyHp: 3,
      gold: game.gold + 10,
    };
  }

  // enemy movement
  if (game.enemyIndex + 1 >= PATH.length) {
    return {
      ...game,
      enemyIndex: 0,
      lives: Math.max(0, game.lives - 1),
    };
  }

  return {
    ...game,
    enemyIndex: game.enemyIndex + 1,
    enemyHp: game.enemyHp - damage,
  };
};
