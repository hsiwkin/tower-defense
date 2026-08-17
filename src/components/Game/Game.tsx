import { Board } from "../Board/Board";
import { useEffect, useState } from "react";
import type { GameState, TileType } from "../../types";
import { tick } from "../../methods/tick.method";
import "./Game.css";

export const Game = () => {
  const [game, setGame] = useState<GameState>({
    lives: 3,
    enemies: [
      { id: "a", pathIndex: 0, hp: 3, maxHp: 3 },
      { id: "b", pathIndex: 8, hp: 3, maxHp: 3 },
    ],
    gold: 100,
    towers: new Set(),
  });

  useEffect(() => {
    if (game.lives <= 0) return;

    const id = setInterval(() => {
      setGame((g) => tick(g));
    }, 500);

    return () => clearInterval(id);
  }, [game.lives, game.towers]);

  const plantTower = (row: number, col: number) => {
    const TOWER_PRICE = 20;
    const towerKey = `${row}-${col}`;

    if (game.towers.has(towerKey)) return;
    if (game.gold < TOWER_PRICE) return;

    setGame((prev) => {
      if (prev.gold < TOWER_PRICE) return prev;
      if (prev.towers.has(towerKey)) return prev;

      return {
        ...prev,
        gold: prev.gold - TOWER_PRICE,
        towers: new Set(prev.towers).add(towerKey),
      };
    });
  };

  return (
    <>
      <div className="hud">
        <span>Gold: {game.gold}</span>
        <span>Lives: {game.lives}</span>
        {game.lives === 0 && <span>Game Over!</span>}
      </div>
      <Board game={game} plantTower={plantTower} />
    </>
  );
};
