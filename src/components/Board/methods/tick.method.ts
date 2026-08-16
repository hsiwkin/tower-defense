import type { EnemyState, GameState } from "../../../types";
import { countTowersInRange } from "./count-towers-in-range.method";
import { PATH } from "../mapData";

export const tick = (game: GameState): GameState => {
  const enemies: EnemyState[] = [];
  let gold = game.gold;
  let lives = game.lives;

  for (const enemy of game.enemies) {
    const damage = countTowersInRange(enemy.pathIndex, game.towers);
    const hp = enemy.hp - damage;
    let pathIndex = enemy.pathIndex + 1;

    if (hp <= 0) {
      gold += 10;
      continue;
    }
    if (pathIndex >= PATH.length) {
      lives = Math.max(0, lives - 1);
      pathIndex = 0;
    }

    enemies.push({
      ...enemy,
      hp,
      pathIndex,
    });
  }

  return {
    ...game,
    enemies,
    gold,
    lives,
  };
};
